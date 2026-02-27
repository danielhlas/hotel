import { useState, useEffect } from "react";

export function useWindowSize() {
  // Inicializujeme stav s aktuální šířkou okna
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    // Funkce, která se zavolá při každé změně velikosti
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    // Přidáme "posluchače" na událost resize
    window.addEventListener("resize", handleResize);

    // Důležité: Odstraníme posluchače při zavření komponenty (úklid)
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize.width;
}