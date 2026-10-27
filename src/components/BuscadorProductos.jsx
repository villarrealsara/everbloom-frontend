// Componente BuscadorProductos: caja de texto para buscar flores por nombre.
// Props: texto (lo que se ha escrito), onCambio (función que se ejecuta al escribir)
function BuscadorProductos({ texto, onCambio }) {
  return (
    <div className="catalog-toolbar">
      <div className="catalog-search">
        🔍
        <input
          type="text"
          id="buscador"
          placeholder="Buscar flores eternas…"
          aria-label="Buscar flores eternas"
          value={texto}
          onChange={(e) => onCambio(e.target.value)}
        />
        <div className="catalog-filters">
          <span>Filtrar por color</span>
          <span>|</span>
          <span>Precio ▼</span>
        </div>
      </div>
      <span className="catalog-link">Catálogo de productos</span>
    </div>
  );
}

export default BuscadorProductos;
