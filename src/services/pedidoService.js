// Servicio del pedido. Por ahora el pedido se guarda en el navegador (localStorage),
// igual que en el prototipo, porque el módulo de pedidos del back-end todavía no se ha construido.
const CLAVE = 'eb_pedido';

export function guardarProductoElegido(producto) {
  guardar({ ...leerPedido(), producto: producto.nombreProducto, precio: producto.precio });
}

export function guardarPedido(datosCliente) {
  const numero = 'EVB-' + Math.floor(10000 + Math.random() * 90000);
  guardar({ ...leerPedido(), ...datosCliente, numero });
}

export function leerPedido() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || {};
  } catch {
    return {};
  }
}

function guardar(datos) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(datos));
  } catch {
    /* si el navegador no deja guardar, la app sigue funcionando */
  }
}
