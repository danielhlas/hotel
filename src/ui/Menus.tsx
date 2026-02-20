import { createContext, useContext, useState } from "react";
import type { ReactNode } from 'react';

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

type UlProps = {
  position: {
    x: number;
    y: number;
  }
}
const StyledList = styled.ul<UlProps>`
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


type MenusContextType = {
  selectedMenuId: number | null;
  setSelectedMenuId: React.Dispatch<React.SetStateAction<number | null>>; 
  positionOfMenu: {x: number, y: number};
  setPositionOfMenu: React.Dispatch<React.SetStateAction<{x: number, y: number}>>;
}
const MenusContext = createContext<MenusContextType | undefined>(undefined)


//Compound Component
function Menus({ children }:{ children: ReactNode }) {
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null); //tracks which menu is selected/opened
  const [positionOfMenu, setPositionOfMenu] = useState({x:0, y:0});

  return (
    <MenusContext.Provider value={{selectedMenuId, setSelectedMenuId, positionOfMenu, setPositionOfMenu}}>
      {
      children
      /* passes variables/functions to children comp (Toggle, List, Button)*/
      }
    </MenusContext.Provider>
  )
}


function Toggle({ id } : { id: number }) {

  const context = useContext(MenusContext);
  if (!context) throw new Error("MenusContext missing");
  const { selectedMenuId, setSelectedMenuId, setPositionOfMenu } = context;



  function handleToggleClick(e: React.MouseEvent<HTMLButtonElement>) {
    
    if (id !== selectedMenuId) {
      const positionOfButton = e.currentTarget.getBoundingClientRect(); 
      setSelectedMenuId(id) //open this menu
      setPositionOfMenu({ //set position of menu to position of button
        x: -8,
        y: positionOfButton.height,
      });
    }

    else {
      setSelectedMenuId(null) //if same menu is clicked again, close it
    }
  }

  return(
    <StyledToggle onClick={handleToggleClick}>
      <HiEllipsisVertical/> {/*three dots icon*/}
    </StyledToggle>
  )
}

type ListProps = {
  id: number;
  children: ReactNode;
}
function List({ id, children }: ListProps) { // list of Buttons
  
  const context = useContext(MenusContext);
  if (!context) throw new Error("MenusContext not found");
  const {selectedMenuId, positionOfMenu, setSelectedMenuId} = context

  //custom hook to close menu on click outside
  const { modalElementRef } = useCloseModalOnClickOutside(() => setSelectedMenuId(null)) 

  //if this menu is not selected, dont render anything
  if (id !== selectedMenuId) return null; 

  return( 
  <StyledList position={positionOfMenu} ref={modalElementRef}>
       { children } {/*/ children are multiple Button components */}
  </StyledList>
)}

type ButtonProps = {
  children: ReactNode;
  icon: ReactNode;
  selectedBtnFunction: () => void;
}
function Button({ children, icon, selectedBtnFunction }: ButtonProps) {//Button components (inside List)
  
  const context = useContext(MenusContext);
  if (!context) throw new Error("MenusContext not found");
  const { setSelectedMenuId } = context;

  function handleOnClick() {
    selectedBtnFunction(); //executes function passed from CabinRow (e.g. duplicateCabin)
    setSelectedMenuId(null); //close the menu after clicking a button
  }

  return <li>
    <StyledButton onClick={handleOnClick}>
      <span>{icon} {children}</span>  
    </StyledButton>
  </li> 
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;