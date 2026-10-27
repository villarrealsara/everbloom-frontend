// Configuración de axios: todas las peticiones al back-end salen de aquí.
import axios from 'axios';

// En desarrollo, Vite manda "/api" al servidor de Express (ver vite.config.js).
// Si el back-end está en otra dirección se puede cambiar con VITE_API_URL.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Saca el mensaje de error que manda el back-end (o uno por defecto si no hay conexión).
 */
export function mensajeDeError(error) {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  }
  return 'No se pudo conectar con el servidor. Revisa que el back-end esté encendido.';
}

export default api;
