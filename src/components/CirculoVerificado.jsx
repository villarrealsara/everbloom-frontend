// Componente CirculoVerificado: círculo con el visto bueno de la pantalla "Pedido confirmado".
// Usa useState para mostrar un check dibujado (SVG) si la imagen no se puede cargar.
import { useState } from 'react';
import imagenVerificado from '../assets/img/verificado.jpg';

function CirculoVerificado() {
  const [fallaImagen, setFallaImagen] = useState(false);
  return (
    <div className="confirm-right">
      <div className="check-circle">
        {!fallaImagen && (
          <img src={imagenVerificado} alt="Verificado" onError={() => setFallaImagen(true)} />
        )}
        {fallaImagen && (
          <svg className="check-svg" viewBox="0 0 100 100">
            <path d="M20 52 L42 72 L80 30" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default CirculoVerificado;
