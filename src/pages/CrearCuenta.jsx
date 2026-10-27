// Pantalla Crear cuenta. Valida el formulario de registro (el registro real queda para el módulo de usuarios).
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario.jsx';
import Mensaje from '../components/Mensaje.jsx';
import usarClaseCuerpo from '../utils/usarClaseCuerpo.js';
import usarMensaje from '../utils/usarMensaje.js';
import {
  validarObligatorio, validarCorreo, validarTelefono, validarClave, validarIgual,
} from '../utils/validaciones.js';
import imagenRegistro from '../assets/img/flores-crear-cuenta.jpg';

const VACIO = { nombre: '', apellido: '', email: '', telefono: '', password: '', confirm: '' };

function CrearCuenta() {
  usarClaseCuerpo('pg-registro');
  const navigate = useNavigate();
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [mensaje, mostrarMensaje] = usarMensaje();

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  function validar() {
    const nuevos = {
      nombre: validarObligatorio(datos.nombre, 'tu nombre'),
      apellido: validarObligatorio(datos.apellido, 'tu apellido'),
      email: validarCorreo(datos.email),
      telefono: validarTelefono(datos.telefono, false),
      password: validarClave(datos.password),
      confirm: validarIgual(datos.confirm, datos.password),
    };
    setErrores(nuevos);
    return Object.values(nuevos).every((x) => x === '');
  }

  function enviar(e) {
    e.preventDefault();
    if (!validar()) {
      mostrarMensaje('Revisa los campos marcados en rojo.', 'error');
      return;
    }
    mostrarMensaje('Cuenta creada correctamente. Ahora inicia sesión.', 'ok');
    setTimeout(() => navigate('/login'), 1200);
  }

  return (
    <>
      <div className="register-wrapper">
        <div className="register-image">
          <img src={imagenRegistro} alt="Flores EverBloom" />
        </div>
        <div className="register-panel">
          <div className="register-box">
            <h1 className="register-title">Crear cuenta</h1>
            <form noValidate onSubmit={enviar}>
              <div className="name-row">
                <CampoFormulario id="nombre" etiqueta="Nombre *" placeholder="Tu nombre"
                  valor={datos.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
                <CampoFormulario id="apellido" etiqueta="Apellido *" placeholder="Tu apellido"
                  valor={datos.apellido} onCambio={cambiar('apellido')} error={errores.apellido} />
              </div>
              <CampoFormulario id="email" tipo="email" etiqueta="Correo electrónico *"
                placeholder="correo@ejemplo.com" valor={datos.email} onCambio={cambiar('email')}
                error={errores.email} />
              <CampoFormulario id="telefono" tipo="tel" etiqueta="Teléfono (opcional)"
                placeholder="Ej: 3001234567" valor={datos.telefono} onCambio={cambiar('telefono')}
                error={errores.telefono} />
              <CampoFormulario id="password" tipo="password" etiqueta="Contraseña *"
                placeholder="Mínimo 6 caracteres" autoComplete="new-password"
                valor={datos.password} onCambio={cambiar('password')} error={errores.password} />
              <CampoFormulario id="confirm" tipo="password" etiqueta="Confirmar contraseña *"
                placeholder="Repite la contraseña" valor={datos.confirm}
                onCambio={cambiar('confirm')} error={errores.confirm} />
              <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
            <p className="register-back">
              ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
            </p>
          </div>
        </div>
      </div>
      <Mensaje mensaje={mensaje} />
    </>
  );
}

export default CrearCuenta;
