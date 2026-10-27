// Componente CampoFormulario: etiqueta + campo (input, textarea o select) + texto de error.
// Props: id, etiqueta, tipo, valor, onCambio, onSalir, error, placeholder, children (opciones del select)
function CampoFormulario({ id, etiqueta, tipo = 'text', valor, onCambio, onSalir, error, placeholder, children, ...resto }) {
  const propiedades = {
    id,
    value: valor,
    onChange: onCambio,
    onBlur: onSalir,
    placeholder,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
    ...resto,
  };
  let campo;
  if (tipo === 'textarea') {
    campo = <textarea {...propiedades} />;
  } else if (tipo === 'select') {
    campo = <select {...propiedades}>{children}</select>;
  } else {
    campo = <input type={tipo} {...propiedades} />;
  }
  return (
    <div className="form-group">
      <label htmlFor={id}>{etiqueta}</label>
      {campo}
      {error && <small id={`${id}-error`} className="field-error">{error}</small>}
    </div>
  );
}

export default CampoFormulario;
