// App.jsx es el equivalente al App.js de la guía (Vite exige la extensión .jsx para archivos con JSX).
// Aquí se define UNA RUTA POR CADA PANTALLA de la aplicación con React Router.
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio.jsx';
import Login from './pages/Login.jsx';
import CrearCuenta from './pages/CrearCuenta.jsx';
import RecuperarContrasena from './pages/RecuperarContrasena.jsx';
import RealizarPedido from './pages/RealizarPedido.jsx';
import PedidoConfirmado from './pages/PedidoConfirmado.jsx';
import ProductoFormulario from './pages/ProductoFormulario.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/crear-cuenta" element={<CrearCuenta />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/realizar-pedido" element={<RealizarPedido />} />
      <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
      <Route path="/productos/nuevo" element={<ProductoFormulario />} />
      <Route path="/productos/:id/editar" element={<ProductoFormulario />} />
      {/* Cualquier otra dirección muestra la pantalla 404 */}
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  );
}

export default App;
