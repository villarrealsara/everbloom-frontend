// Funciones para validar los campos de los formularios. Devuelven el texto del error, o '' si está bien.

export function validarObligatorio(valor, nombre) {
  return String(valor).trim() === '' ? `Escribe ${nombre}.` : '';
}

export function validarCorreo(valor) {
  if (String(valor).trim() === '') return 'Escribe tu correo electrónico.';
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim())
    ? ''
    : 'Escribe un correo válido, por ejemplo correo@ejemplo.com.';
}

export function validarTelefono(valor, obligatorio = true) {
  const texto = String(valor).trim();
  if (texto === '') return obligatorio ? 'Escribe tu número de teléfono.' : '';
  return /^[0-9+\s-]{7,15}$/.test(texto) ? '' : 'El teléfono debe tener entre 7 y 15 números.';
}

export function validarClave(valor) {
  if (valor === '') return 'Escribe tu contraseña.';
  return valor.length >= 6 ? '' : 'Debe tener mínimo 6 caracteres.';
}

export function validarIgual(valor, otro) {
  return valor === otro ? '' : 'Las contraseñas no coinciden.';
}

/** Da formato de pesos colombianos. Ejemplo: 45000 -> $ 45.000 */
export function formatearPrecio(valor) {
  return `$ ${Number(valor).toLocaleString('es-CO')}`;
}
