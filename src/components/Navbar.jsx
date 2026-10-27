// Componente Navbar: barra de menú de arriba con botón de hamburguesa para el celular.
// Usa el estado "abierto" (useState) para mostrar u ocultar el menú.
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ activo = 'inicio' }) {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <nav className="navbar" aria-label="Menú principal">
      <div className="navbar-logo">
        <span>EverBloom</span>
      </div>
      <button
        className="hamburger"
        type="button"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-controls="navLinks"
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
      >
        <span></span><span></span><span></span>
      </button>
      <ul className={`navbar-links${abierto ? ' open' : ''}`} id="navLinks" onClick={cerrar}>
        <li><Link to="/" className={activo === 'inicio' ? 'active' : ''}>Inicio</Link></li>
        <li><Link to="/">Catálogo</Link></li>
        <li><Link to="/productos/nuevo">Nuevo producto</Link></li>
        <li><Link to="/pedido-confirmado">Mis Pedidos</Link></li>
        <li><Link to="/login">Perfil</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
