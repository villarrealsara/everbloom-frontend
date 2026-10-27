// Pantalla Pedido confirmado: muestra el número de pedido y los datos que se guardaron al confirmar.
import { Link } from 'react-router-dom';
import NavSuperior from '../components/NavSuperior.jsx';
import CirculoVerificado from '../components/CirculoVerificado.jsx';
import Mensaje from '../components/Mensaje.jsx';
import usarClaseCuerpo from '../utils/usarClaseCuerpo.js';
import usarMensaje from '../utils/usarMensaje.js';
import { formatearPrecio } from '../utils/validaciones.js';
import { leerPedido } from '../services/pedidoService.js';

function PedidoConfirmado() {
  usarClaseCuerpo('pg-confirmado');
  const pedido = leerPedido();
  const [mensaje, mostrarMensaje] = usarMensaje();
  const fecha = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  const numero = pedido.numero || 'EVB-00000';

  return (
    <>
      <NavSuperior />
      <div className="confirm-section">
        <div className="confirm-left">
          <p className="confirm-intro">¡Gracias por tu compra!</p>
          <h1 className="confirm-title">Pedido Realizado<br />Correctamente</h1>
          <div className="confirm-data">
            <p>Número de Pedido: <strong id="numPedido">#{numero}</strong></p>
            <p>Fecha: <strong id="fechaPedido">{fecha}</strong></p>
            <p>Estado: <strong>En preparación</strong></p>
            <p>Contacto: <strong>hola@everbloom.com</strong></p>
          </div>
          <div className="client-info" id="clienteBox">
            <h3>Datos de entrega</h3>
            <p><strong>Cliente:</strong> <span>{pedido.nombre || '—'}</span></p>
            <p><strong>Email:</strong> <span>{pedido.email || '—'}</span></p>
            <p><strong>Teléfono:</strong> <span>{pedido.telefono || '—'}</span></p>
            <p><strong>Dirección:</strong> <span>{pedido.direccion || '—'}</span></p>
            <p><strong>Producto:</strong> <span>{pedido.producto || '—'}</span></p>
            <p><strong>Total:</strong> <span>{pedido.precio != null ? formatearPrecio(pedido.precio) : '—'}</span></p>
          </div>
          <div className="confirm-actions">
            <Link className="btn btn-outline" to="/">Volver al Catálogo</Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => mostrarMensaje(`Tu pedido ${numero} está en preparación.`, 'ok')}
            >
              Ver Pedido
            </button>
          </div>
        </div>
        <CirculoVerificado />
      </div>
      <Mensaje mensaje={mensaje} />
    </>
  );
}

export default PedidoConfirmado;
