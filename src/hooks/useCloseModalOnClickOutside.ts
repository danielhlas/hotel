import { useEffect, useRef } from "react";
  

export function useCloseModalOnClickOutside(onClose: () => void) {
    
  //ref contains opened modal window(DOM element)
  const modalElementRef = useRef<HTMLElement | null>(null);

  useEffect(function(){
    function handleClick(e: MouseEvent){
      
      if (!(e.target instanceof Node)) return;
      if (e.target instanceof Element && e.target.closest("[data-outside-ignore]")) return;
      if (modalElementRef.current && !modalElementRef.current.contains(e.target)) onClose();
    }

    document.addEventListener("click", handleClick, true);
    //clear up the event listener
    return() => {
      document.removeEventListener('click', handleClick, true)
    }

    }, [onClose]
  );
    
    return {modalElementRef}
  }
