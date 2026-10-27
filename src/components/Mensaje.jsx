// Componente Mensaje: aviso flotante (toast) de éxito, error o información.
// Props: mensaje -> objeto { texto, tipo } o null si no hay nada que mostrar.
function Mensaje({ mensaje }) {
  if (!mensaje) return null;
  return (
    <div className="toast-area" role="status" aria-live="polite">
      <div className={`toast toast-${mensaje.tipo}`}>{mensaje.texto}</div>
    </div>
  );
}

export default Mensaje;
