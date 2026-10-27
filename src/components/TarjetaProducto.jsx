// Componente TarjetaProducto: muestra un producto del catálogo con sus botones.
// Props: producto, onOrdenar(producto), onEliminar(producto)
import { Link } from 'react-router-dom';
import imagen1 from '../assets/img/producto1.jpg';
import imagen2 from '../assets/img/producto2.jpg';
import imagen3 from '../assets/img/producto3.jpg';
import { formatearPrecio } from '../utils/validaciones.js';

const IMAGENES = [imagen1, imagen2, imagen3];

function TarjetaProducto({ producto, onOrdenar, onEliminar }) {
  const imagen = IMAGENES[producto.idProducto % IMAGENES.length];
  return (
    <div className="product-card" data-name={producto.nombreProducto.toLowerCase()}>
      <img src={imagen} alt={producto.nombreProducto} />
      <div className="product-info">
        <div className="product-meta">
          <span className="product-name">{producto.nombreProducto}</span>
          <span className="product-price">{formatearPrecio(producto.precio)}</span>
        </div>
        <span className={`product-extra${producto.estadoProducto ? '' : ' inactivo'}`}>
          {producto.nombreCategoria} · N.° {producto.idProducto} · {producto.estadoProducto ? 'Activo' : 'Inactivo'}
        </span>
        <div className="product-actions">
          <Link className="tag-detail" to={`/productos/${producto.idProducto}/editar`}>Editar</Link>
          <button type="button" className="btn btn-primary" onClick={() => onOrdenar(producto)}>Ordenar</button>
          <button type="button" className="btn btn-outline" onClick={() => onEliminar(producto)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;
