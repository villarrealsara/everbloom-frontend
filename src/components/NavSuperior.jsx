// Componente NavSuperior: encabezado sencillo de las pantallas "Pedido confirmado" y "404".
// Props: subtitulo (texto pequeño bajo el logo, opcional)
import { Link } from 'react-router-dom';

function NavSuperior({ subtitulo }) {
  return (
    <div className="top-nav">
      {subtitulo ? (
        <div className="brand">EverBloom <small>{subtitulo}</small></div>
      ) : (
        <span className="brand">EverBloom</span>
      )}
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/">Catálogo</Link>
        {!subtitulo && <Link to="/pedido-confirmado" aria-current="page">Pedidos</Link>}
      </nav>
    </div>
  );
}

export default NavSuperior;
