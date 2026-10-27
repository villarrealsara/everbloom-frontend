// Servicio de productos: las 5 operaciones del CRUD contra el back-end (axios).
import api from './api.js';

/** LEER: lista de productos (con texto de búsqueda opcional). */
export async function listarProductos(busqueda = '') {
  const respuesta = await api.get('/productos', { params: busqueda ? { busqueda } : {} });
  return respuesta.data;
}

/** LEER: un producto por su id. */
export async function obtenerProducto(id) {
  const respuesta = await api.get(`/productos/${id}`);
  return respuesta.data;
}

/** CREAR: guarda un producto nuevo. */
export async function crearProducto(producto) {
  const respuesta = await api.post('/productos', producto);
  return respuesta.data;
}

/** ACTUALIZAR: guarda los cambios de un producto. */
export async function actualizarProducto(id, producto) {
  const respuesta = await api.put(`/productos/${id}`, producto);
  return respuesta.data;
}

/** ELIMINAR: borra un producto. */
export async function eliminarProducto(id) {
  await api.delete(`/productos/${id}`);
}
