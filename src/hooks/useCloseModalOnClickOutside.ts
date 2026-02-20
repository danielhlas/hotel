import { useEffect, useRef } from "react";
  

export function useCloseModalOnClickOutside(setShowForm: React.Dispatch<React.SetStateAction<boolean>>) {
    
  //ref contains opened modal window(DOM element)
  const modalElementRef = useRef<HTMLUListElement | null>(null);

  useEffect(function(){
    function handleClick(e: MouseEvent){
      
      if (modalElementRef.current && e.target instanceof Node && !modalElementRef.current.contains(e.target)){
        setShowForm(false)
        }
    }

    document.addEventListener('click', handleClick, true)

    
    //clearing up the event listener
    return() => {
      document.removeEventListener('click', (handleClick))
    }

    }, [setShowForm]
  );
    
    return {modalElementRef}
  }
