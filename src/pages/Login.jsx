// Pantalla Iniciar sesión. Valida los campos y, si están bien, entra al catálogo.
// Nota: el back-end aún no tiene módulo de usuarios, por eso el ingreso es simulado como en el prototipo.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario.jsx';
import Mensaje from '../components/Mensaje.jsx';
import usarClaseCuerpo from '../utils/usarClaseCuerpo.js';
import usarMensaje from '../utils/usarMensaje.js';
import { validarCorreo, validarClave } from '../utils/validaciones.js';
import imagenLogin from '../assets/img/flores-inicio-sesion.jpg';

function Login() {
  usarClaseCuerpo('pg-login');
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [mensaje, mostrarMensaje] = usarMensaje();

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  function validar() {
    const nuevos = {
      email: validarCorreo(datos.email),
      password: datos.password === '' ? 'Escribe tu contraseña.' : '',
    };
    setErrores(nuevos);
    return !nuevos.email && !nuevos.password;
  }

  function enviar(e) {
    e.preventDefault();
    if (!validar()) {
      mostrarMensaje('Revisa los campos marcados en rojo.', 'error');
      return;
    }
    mostrarMensaje('¡Bienvenida a EverBloom!', 'ok');
    setTimeout(() => navigate('/'), 900);
  }

  return (
    <>
      <div className="login-wrapper">
        <div className="login-image">
          <img src={imagenLogin} alt="Flores EverBloom" />
        </div>
        <div className="login-form-side">
          <div className="login-brand">
            <span className="brand-name">EverBloom</span>
            <span className="brand-tagline">Flores Eternas</span>
          </div>
          <h1 className="login-title">Iniciar sesión</h1>
          <p className="login-subtitle">Inicia sesión para continuar</p>
          <form className="login-form" noValidate onSubmit={enviar}>
            <CampoFormulario id="email" tipo="email" etiqueta="Escribe tu correo electrónico"
              placeholder="correo@ejemplo.com" valor={datos.email} onCambio={cambiar('email')}
              error={errores.email} />
            <CampoFormulario id="password" tipo="password" etiqueta="Escribe tu contraseña"
              placeholder="Tu contraseña" valor={datos.password} onCambio={cambiar('password')}
              error={errores.password} />
            <button type="submit" className="btn btn-primary">Acceder</button>
          </form>
          <div className="login-links">
            <Link to="/recuperar-contrasena">Recuperar contraseña</Link>
            <Link to="/crear-cuenta">Crear cuenta</Link>
          </div>
        </div>
      </div>
      <Mensaje mensaje={mensaje} />
    </>
  );
}

export default Login;
