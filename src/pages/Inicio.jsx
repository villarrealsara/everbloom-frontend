// Pantalla Inicio / Catálogo: lista los productos que vienen del back-end y permite buscar,
// editar, eliminar y ordenar. Usa useState (datos) y useEffect (cargar al iniciar).
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import BuscadorProductos from '../components/BuscadorProductos.jsx';
import TarjetaProducto from '../components/TarjetaProducto.jsx';
import PiePagina from '../components/PiePagina.jsx';
import Mensaje from '../components/Mensaje.jsx';
import usarClaseCuerpo from '../utils/usarClaseCuerpo.js';
import usarMensaje from '../utils/usarMensaje.js';
import { listarProductos, eliminarProducto } from '../services/productoService.js';
import { guardarProductoElegido } from '../services/pedidoService.js';
import { mensajeDeError } from '../services/api.js';

function Inicio() {
  usarClaseCuerpo('pg-inicio');
  const navigate = useNavigate();
  const location = useLocation();
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, mostrarMensaje] = usarMensaje();

  // useEffect: carga los productos cuando la pantalla aparece y cada vez que cambia la búsqueda.
  useEffect(() => {
    let vigente = true;
    setCargando(true);
    listarProductos(busqueda)
      .then((datos) => {
        if (vigente) { setProductos(datos); setError(''); }
      })
      .catch((e) => {
        if (vigente) setError(mensajeDeError(e));
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });
    return () => { vigente = false; };
  }, [busqueda]);

  // Si venimos del formulario de productos, muestra el mensaje de éxito que nos mandó.
  useEffect(() => {
    if (location.state && location.state.mensaje) {
      mostrarMensaje(location.state.mensaje, 'ok');
      navigate('/', { replace: true, state: null });
    }
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  function ordenar(producto) {
    guardarProductoElegido(producto);
    navigate('/realizar-pedido');
  }

  async function eliminar(producto) {
    if (!window.confirm(`¿Seguro que quieres eliminar "${producto.nombreProducto}"?`)) return;
    try {
      await eliminarProducto(producto.idProducto);
      setProductos(productos.filter((p) => p.idProducto !== producto.idProducto));
      mostrarMensaje('El producto se eliminó correctamente.', 'ok');
    } catch (e) {
      mostrarMensaje(mensajeDeError(e), 'error');
    }
  }

  return (
    <>
      <Navbar activo="inicio" />
      <Hero />
      <BuscadorProductos texto={busqueda} onCambio={setBusqueda} />
      <div className="products-grid" id="productsGrid">
        {cargando && <p className="sin-resultados">Cargando productos…</p>}
        {!cargando && error && <p className="sin-resultados" role="alert">{error}</p>}
        {!cargando && !error && productos.length === 0 && (
          <p className="sin-resultados">No encontramos flores con ese nombre.</p>
        )}
        {!cargando && !error && productos.map((producto) => (
          <TarjetaProducto
            key={producto.idProducto}
            producto={producto}
            onOrdenar={ordenar}
            onEliminar={eliminar}
          />
        ))}
      </div>
      <PiePagina />
      <Mensaje mensaje={mensaje} />
    </>
  );
}

export default Inicio;
