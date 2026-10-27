// Pantalla Recuperar contraseña: paso 1 (correo y código) y paso 2 (nueva contraseña).
// El estado "paso" decide cuál de los dos formularios se muestra.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario.jsx';
import Mensaje from '../components/Mensaje.jsx';
import usarClaseCuerpo from '../utils/usarClaseCuerpo.js';
import usarMensaje from '../utils/usarMensaje.js';
import { validarCorreo, validarClave, validarIgual } from '../utils/validaciones.js';

function RecuperarContrasena() {
  usarClaseCuerpo('pg-recuperar');
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState({ email: '', codigo: '', newPass: '', confPass: '' });
  const [errores, setErrores] = useState({});
  const [mensaje, mostrarMensaje] = usarMensaje();

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  function enviarPaso1(e) {
    e.preventDefault();
    const nuevos = {
      email: validarCorreo(datos.email),
      codigo: /^[0-9]{6}$/.test(datos.codigo.trim()) ? '' : 'El código tiene 6 números.',
    };
    setErrores(nuevos);
    if (nuevos.email || nuevos.codigo) {
      mostrarMensaje('Revisa los campos marcados en rojo.', 'error');
      return;
    }
    setPaso(2);
    mostrarMensaje('Código verificado. Escribe tu nueva contraseña.', 'ok');
  }

  function enviarPaso2(e) {
    e.preventDefault();
    const nuevos = {
      newPass: validarClave(datos.newPass),
      confPass: validarIgual(datos.confPass, datos.newPass),
    };
    setErrores(nuevos);
    if (nuevos.newPass || nuevos.confPass) {
      mostrarMensaje('Revisa los campos marcados en rojo.', 'error');
      return;
    }
    mostrarMensaje('¡Contraseña actualizada correctamente!', 'ok');
    setTimeout(() => navigate('/login'), 1200);
  }

  return (
    <>
      <div className="recover-header">
        <h1>Recuperar contraseña</h1>
      </div>
      <div className="recover-body">
        <div className="recover-card">
          {paso === 1 && (
            <div id="step1" style={{ display: 'block' }}>
              <form noValidate onSubmit={enviarPaso1}>
                <CampoFormulario id="email" tipo="email" etiqueta="Escribe tu correo electrónico"
                  placeholder="correo@ejemplo.com" valor={datos.email} onCambio={cambiar('email')}
                  error={errores.email} />
                <CampoFormulario id="codigo" etiqueta="Ingresa el código de confirmación"
                  placeholder="Código de 6 números" inputMode="numeric" valor={datos.codigo}
                  onCambio={cambiar('codigo')} error={errores.codigo} />
                <button type="submit" className="btn btn-primary">Ingresar</button>
              </form>
              <p className="recover-note">
                Te enviaremos un código de verificación a tu correo electrónico registrado.
              </p>
            </div>
          )}
          {paso === 2 && (
            <div id="step2" style={{ display: 'block' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", color: 'var(--primary)', marginBottom: 24, fontSize: '1.5rem' }}>
                Nueva contraseña
              </h2>
              <form noValidate onSubmit={enviarPaso2}>
                <CampoFormulario id="newPass" tipo="password" etiqueta="Nueva contraseña"
                  placeholder="Mínimo 6 caracteres" valor={datos.newPass}
                  onCambio={cambiar('newPass')} error={errores.newPass} />
                <CampoFormulario id="confPass" tipo="password" etiqueta="Confirmar contraseña"
                  placeholder="Mínimo 6 caracteres" valor={datos.confPass}
                  onCambio={cambiar('confPass')} error={errores.confPass} />
                <button type="submit" className="btn btn-primary">Guardar contraseña</button>
              </form>
            </div>
          )}
          <div className="recover-back">
            <Link to="/login">← Volver al inicio de sesión</Link>
          </div>
        </div>
      </div>
      <Mensaje mensaje={mensaje} />
    </>
  );
}

export default RecuperarContrasena;
