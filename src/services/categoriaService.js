// Servicio de categorías: llena la lista desplegable del formulario de productos.
import api from './api.js';

export async function listarCategorias() {
  const respuesta = await api.get('/categorias');
  return respuesta.data;
}
