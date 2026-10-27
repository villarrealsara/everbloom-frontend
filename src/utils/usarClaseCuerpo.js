// Hook personalizado: pone la clase del <body> que usa cada pantalla (pg-inicio, pg-login...).
// La hoja de estilos del prototipo diseña cada pantalla según esa clase.
import { useEffect } from 'react';

export default function usarClaseCuerpo(clase) {
  useEffect(() => {
    document.body.className = clase;
    return () => {
      document.body.className = '';
    };
  }, [clase]);
}
