// Componente Hero: imagen grande con la frase principal del catálogo.
import imagenHero from '../assets/img/menu-principal-catalogo.jpg';

function Hero() {
  return (
    <div className="hero">
      <img src={imagenHero} alt="Flores Eternas EverBloom" />
      <div className="hero-text">
        <p>Flores Eternas de Satín — Belleza que dura para siempre.</p>
      </div>
    </div>
  );
}

export default Hero;
