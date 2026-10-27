// Componente PiePagina: línea final con los derechos y los enlaces legales.
// Props: clase -> 'footer' (catálogo) u 'order-footer' (pantallas de pedido)
function PiePagina({ clase = 'footer' }) {
  const Etiqueta = clase === 'footer' ? 'footer' : 'div';
  return (
    <Etiqueta className={clase}>
      2024 - Everbloom © — Política de Privacidad · Términos y Condiciones
    </Etiqueta>
  );
}

export default PiePagina;
