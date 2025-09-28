import { useEffect, useRef } from "react";
  
export function useCloseModalOnClickOutside(setShowForm){
    
  //ref contains opened modal window(DOM element)
  const modalElement = useRef();
  

  useEffect(function(){
    function handleClick(e){

      if (modalElement.current && !modalElement.current.contains(e.target)){
        setShowForm((show)=>!show)
        }
    }

    document.addEventListener('click', handleClick, true)

    
    //clearing up the event listener
    return() => {
      document.removeEventListener('click', handleClick)
    }

    }, [setShowForm]
  );
    
    return {modalElement}
  }
