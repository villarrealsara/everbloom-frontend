// Pantalla Producto (nuevo / editar): formulario conectado al back-end para el CRUD.
// Si la dirección trae un :id (/productos/5/editar) carga el producto y actualiza (PUT);
// si no, crea uno nuevo (POST). Hooks: useState, useEffect, useParams y useNavigate.
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EncabezadoPedido from '../components/EncabezadoPedido.jsx';
import CampoFormulario from '../components/CampoFormulario.jsx';
import Mensaje from '../components/Mensaje.jsx';
import usarClaseCuerpo from '../utils/usarClaseCuerpo.js';
import usarMensaje from '../utils/usarMensaje.js';
import { formatearPrecio } from '../utils/validaciones.js';
import { listarCategorias } from '../services/categoriaService.js';
import { obtenerProducto, crearProducto, actualizarProducto } from '../services/productoService.js';
import { mensajeDeError } from '../services/api.js';

const VACIO = { nombreProducto: '', idCategoria: '', precio: '', descripcion: '', estadoProducto: true };

function ProductoFormulario() {
  usarClaseCuerpo('pg-pedido');
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const [datos, setDatos] = useState(VACIO);
  const [categorias, setCategorias] = useState([]);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [mensaje, mostrarMensaje] = usarMensaje();

  // Al iniciar: trae las categorías y, si se está editando, los datos del producto.
  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch((e) => mostrarMensaje(mensajeDeError(e), 'error'));
    if (editando) {
      obtenerProducto(id)
        .then((p) => setDatos({
          nombreProducto: p.nombreProducto,
          idCategoria: String(p.idCategoria),
          precio: String(p.precio),
          descripcion: p.descripcion || '',
          estadoProducto: p.estadoProducto,
        }))
        .catch((e) => {
          mostrarMensaje(mensajeDeError(e), 'error');
          setTimeout(() => navigate('/'), 1500);
        });
    } else {
      setDatos(VACIO);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  function validar() {
    const nuevos = {
      nombreProducto: datos.nombreProducto.trim() === '' ? 'Escribe el nombre del producto.' : '',
      idCategoria: datos.idCategoria === '' ? 'Elige una categoría.' : '',
      precio: datos.precio === '' || Number(datos.precio) < 0 ? 'Escribe un precio mayor o igual a cero.' : '',
    };
    setErrores(nuevos);
    return Object.values(nuevos).every((x) => x === '');
  }

  async function enviar(e) {
    e.preventDefault();
    if (!validar()) {
      mostrarMensaje('Revisa los campos marcados en rojo.', 'error');
      return;
    }
    const producto = {
      nombreProducto: datos.nombreProducto.trim(),
      idCategoria: Number(datos.idCategoria),
      precio: Number(datos.precio),
      descripcion: datos.descripcion.trim(),
      estadoProducto: datos.estadoProducto,
    };
    setGuardando(true);
    try {
      if (editando) {
        await actualizarProducto(id, producto);
      } else {
        await crearProducto(producto);
      }
      navigate('/', { state: { mensaje: editando ? 'Los cambios se guardaron correctamente.' : 'El producto se guardó correctamente.' } });
    } catch (error) {
      mostrarMensaje(mensajeDeError(error), 'error');
      setGuardando(false);
    }
  }

  const categoria = categorias.find((c) => String(c.idCategoria) === datos.idCategoria);
  const precioResumen = datos.precio === '' || Number.isNaN(Number(datos.precio))
    ? 'Por definir'
    : formatearPrecio(datos.precio);

  return (
    <>
      <EncabezadoPedido
        titulo={editando ? 'Editar producto' : 'Nuevo producto'}
        texto="Completa los datos a continuación para guardar el producto en el catálogo de EverBloom."
      />
      <div className="order-body">
        <div className="order-summary">
          <h2>Resumen del producto.</h2>
          <div className="summary-item">
            <p>🌷 {datos.nombreProducto || 'Producto nuevo'}</p>
            <span className="link">Categoría: {categoria ? categoria.nombreCategoria : 'Por elegir'}</span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-item">
            <p>Precio:</p>
            <span className="link"><strong>{precioResumen}</strong></span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-item">
            <p>Campos obligatorios:</p>
            <span className="link">Nombre, categoría y precio</span>
          </div>
        </div>
        <div className="order-form-box">
          <form noValidate onSubmit={enviar}>
            <CampoFormulario id="nombreProducto" etiqueta="Nombre del producto *" maxLength={150}
              placeholder="Nombre del producto" valor={datos.nombreProducto}
              onCambio={cambiar('nombreProducto')} error={errores.nombreProducto} />
            <CampoFormulario id="idCategoria" tipo="select" etiqueta="Categoría *"
              valor={datos.idCategoria} onCambio={cambiar('idCategoria')} error={errores.idCategoria}>
              <option value="">Elige una categoría</option>
              {categorias.map((c) => (
                <option key={c.idCategoria} value={c.idCategoria}>{c.nombreCategoria}</option>
              ))}
            </CampoFormulario>
            <CampoFormulario id="precio" tipo="number" etiqueta="Precio (en pesos) *" min="0" step="0.01"
              placeholder="Ej: 45000" valor={datos.precio}
              onCambio={cambiar('precio')} error={errores.precio} />
            <CampoFormulario id="descripcion" tipo="textarea" etiqueta="Descripción" rows={3}
              placeholder="Descripción del producto" valor={datos.descripcion}
              onCambio={cambiar('descripcion')} />
            {editando && (
              <div className="form-group casilla">
                <input
                  type="checkbox"
                  id="estadoProducto"
                  checked={datos.estadoProducto}
                  onChange={(e) => setDatos({ ...datos, estadoProducto: e.target.checked })}
                />
                <label htmlFor="estadoProducto">Producto activo</label>
              </div>
            )}
            <div className="order-actions">
              <Link className="btn btn-outline" to="/">Cancelar</Link>
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? 'Guardando…' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="btn-back">
        <Link className="btn btn-outline" to="/">Atrás</Link>
      </div>
      <div className="order-footer">
        2024 - Everbloom © — Política de Privacidad · Términos y Condiciones
      </div>
      <Mensaje mensaje={mensaje} />
    </>
  );
}

export default ProductoFormulario;
