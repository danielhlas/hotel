import { set } from "date-fns";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useCloseModalOnClickOutside } from "../hooks/useCloseModalOnClickOutside";

const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  z-index: 1;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext()

//Compound Component
function Menus({ children }) {
  const [selectedMenuId, setSelectedMenuId] = useState(""); //tracks which menu is selected/opened
  const [positionOfMenu, setPositionOfMenu] = useState({x:0, y:0});

  return (
    <MenusContext.Provider value={{selectedMenuId, setSelectedMenuId, positionOfMenu, setPositionOfMenu}}>
      {/* passes variables/funcitons to children compp (Toggle, List, Button)*/}
      {children}
    </MenusContext.Provider>
  )
}

function Toggle({ id }) {
  const {selectedMenuId, setSelectedMenuId, setPositionOfMenu} = useContext(MenusContext)

  function handleToggleClick(e) {
    
    if (id !== selectedMenuId) {
      const positionOfButton = e.target.closest("button").getBoundingClientRect(); 
      setSelectedMenuId(id) //open this menu
      setPositionOfMenu({ //set position of menu to position of button
        x: -8,
        y: positionOfButton.height,
      });
    }

    else {
      setSelectedMenuId("") //if same menu is clicked again, close it
    }
  }

  return(
    <StyledToggle onClick={handleToggleClick}>
      <HiEllipsisVertical/> {/*three dots icon*/}
    </StyledToggle>
  )
}


function List({ id, children }) { //its list of Buttons
  const {selectedMenuId, positionOfMenu, setSelectedMenuId} = useContext(MenusContext)

  //custom hook to close menu on click outside
  const  { modalElement }  = useCloseModalOnClickOutside(() => setSelectedMenuId("")) 

  //if this menu is not selected, dont render anything
  if (id !== selectedMenuId) return null; 

  return( 
  <StyledList position={positionOfMenu} ref={modalElement}>
       { children } {/*/ children are mulptiple Button components */}
    </StyledList>
)}


function Button({ children, icon, onClick }) {//Button components (inside List)
  const {setSelectedMenuId} = useContext(MenusContext)

  function handleOnClick() {
    onClick(); //executes function passed from CabinRow (e.g. duplicateCabin)
    setSelectedMenuId(""); //close the menu after clicking a button
  }

  return <li>
    <StyledButton onClick={handleOnClick}>
      <span>{icon} {children} </span>  
    </StyledButton>
  </li> 
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;