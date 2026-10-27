// Componente EncabezadoPedido: franja de arriba de las pantallas con formulario (pedido y producto).
// Props: titulo, texto
function EncabezadoPedido({ titulo, texto }) {
  return (
    <div className="order-header">
      <div className="brand">
        EverBloom <small style={{ fontSize: '.65em', fontWeight: 300, letterSpacing: '.15em' }}>FLORES ETERNAS</small>
      </div>
      <h1>{titulo} 🌸</h1>
      <p>{texto}</p>
    </div>
  );
}

export default EncabezadoPedido;
