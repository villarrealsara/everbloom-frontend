// Pantalla Realizar pedido: resumen del producto elegido y formulario con los datos de entrega.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EncabezadoPedido from '../components/EncabezadoPedido.jsx';
import CampoFormulario from '../components/CampoFormulario.jsx';
import Mensaje from '../components/Mensaje.jsx';
import usarClaseCuerpo from '../utils/usarClaseCuerpo.js';
import usarMensaje from '../utils/usarMensaje.js';
import { validarObligatorio, validarCorreo, validarTelefono, formatearPrecio } from '../utils/validaciones.js';
import { leerPedido, guardarPedido } from '../services/pedidoService.js';

function RealizarPedido() {
  usarClaseCuerpo('pg-pedido');
  const navigate = useNavigate();
  const pedido = leerPedido();
  const producto = pedido.producto || 'Ramo Premium Everbloom';
  const precio = formatearPrecio(pedido.precio ?? 45000);
  const [datos, setDatos] = useState({ nombre: '', email: '', telefono: '', direccion: '' });
  const [errores, setErrores] = useState({});
  const [mensaje, mostrarMensaje] = usarMensaje();

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  function enviar(e) {
    e.preventDefault();
    const nuevos = {
      nombre: validarObligatorio(datos.nombre, 'tu nombre completo'),
      email: validarCorreo(datos.email),
      telefono: validarTelefono(datos.telefono),
      direccion: validarObligatorio(datos.direccion, 'la dirección de entrega'),
    };
    setErrores(nuevos);
    if (Object.values(nuevos).some((x) => x !== '')) {
      mostrarMensaje('Revisa los campos marcados en rojo.', 'error');
      return;
    }
    guardarPedido(datos);
    mostrarMensaje('Pedido realizado. Te llevamos a la confirmación.', 'ok');
    setTimeout(() => navigate('/pedido-confirmado'), 900);
  }

  function cancelar() {
    if (window.confirm('¿Deseas cancelar el pedido?')) {
      mostrarMensaje('Pedido cancelado.', 'info');
      setTimeout(() => navigate('/'), 600);
    }
  }

  return (
    <>
      <EncabezadoPedido
        titulo="Realizar Pedido"
        texto="Completa los datos a continuación para confirmar tu pedido. Nos aseguraremos de que tu entrega llegue a tiempo."
      />
      <div className="order-body">
        <div className="order-summary">
          <h2>Resumen de tu pedido y datos de entrega.</h2>
          <div className="summary-item">
            <p>🌷 <span id="sumProducto">{producto}</span></p>
            <span className="link">Cantidad: 1 — <strong id="sumPrecio">{precio}</strong></span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-item">
            <p>Total a pagar:</p>
            <span className="link"><strong id="sumTotal">{precio}</strong> (envío incluido)</span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-item">
            <p>Fecha de entrega:</p>
            <span className="link">Estimada: 3–5 días hábiles</span>
          </div>
        </div>
        <div className="order-form-box">
          <form noValidate onSubmit={enviar}>
            <CampoFormulario id="clienteName" etiqueta="Nombre completo del cliente"
              placeholder="Nombre completo del cliente" valor={datos.nombre}
              onCambio={cambiar('nombre')} error={errores.nombre} />
            <CampoFormulario id="clienteEmail" tipo="email" etiqueta="Correo electrónico"
              placeholder="Correo electrónico" valor={datos.email}
              onCambio={cambiar('email')} error={errores.email} />
            <CampoFormulario id="clienteTel" tipo="tel" etiqueta="Número de teléfono"
              placeholder="Ej: 3001234567" valor={datos.telefono}
              onCambio={cambiar('telefono')} error={errores.telefono} />
            <CampoFormulario id="clienteDir" tipo="textarea" etiqueta="Dirección de entrega completa"
              placeholder="Dirección de entrega completa" valor={datos.direccion}
              onCambio={cambiar('direccion')} error={errores.direccion} />
            <div className="order-actions">
              <button type="button" className="btn btn-outline" onClick={cancelar}>Cancelar pedido</button>
              <button type="submit" className="btn btn-primary">Confirmar pedido</button>
            </div>
          </form>
        </div>
      </div>
      <div className="btn-back">
        <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className="order-footer">
        2024 - Everbloom © — Política de Privacidad · Términos y Condiciones
      </div>
      <Mensaje mensaje={mensaje} />
    </>
  );
}

export default RealizarPedido;
