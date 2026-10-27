// Pantalla 404: se muestra cuando la dirección no existe.
import { Link } from 'react-router-dom';
import NavSuperior from '../components/NavSuperior.jsx';
import usarClaseCuerpo from '../utils/usarClaseCuerpo.js';

function NoEncontrada() {
  usarClaseCuerpo('pg-404');
  return (
    <>
      <NavSuperior subtitulo="Flores Eternas" />
      <div className="error-body">
        <div className="error-left">
          <div className="bell-wrapper">
            <span className="bell-emoji">🔔</span>
            <span className="alert-badge">⚠️</span>
          </div>
        </div>
        <div className="error-right">
          <div className="error-code">404</div>
          <p className="error-msg">
            Lo sentimos mucho... La página solicitada<br />no se encuentra disponible.
          </p>
          <div className="error-actions">
            <Link className="btn btn-primary" to="/">Inicio</Link>
            <a className="btn btn-outline" href="mailto:hola@everbloom.com">Soporte</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoEncontrada;
