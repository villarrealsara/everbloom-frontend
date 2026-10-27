// Hook personalizado: muestra un mensaje (toast) y lo quita solo a los 4 segundos.
import { useState, useEffect } from 'react';

export default function usarMensaje() {
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (!mensaje) return undefined;
    const temporizador = setTimeout(() => setMensaje(null), 4000);
    return () => clearTimeout(temporizador); // limpia el temporizador si el componente se quita
  }, [mensaje]);

  function mostrarMensaje(texto, tipo = 'info') {
    setMensaje({ texto, tipo, id: Date.now() });
  }

  return [mensaje, mostrarMensaje];
}
