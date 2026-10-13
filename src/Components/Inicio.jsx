import { Link } from "react-router-dom";

function Inicio() {
  return (
    <section
      className="inicio"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "60px 20px",
        textAlign: "center"
      }}
    >
      <h2>Bienvenidos a Tomillo Cake</h2>

      <p>
        Elaboramos tortas y budines artesanales,
        preparados con dedicación para acompañar
        tus momentos especiales.
      </p>

      <p>
        Conocé nuestros productos y descubrí
        nuestras propuestas.
      </p>

      <Link to="/productos">
        Ver nuestros productos
      </Link>
    </section>
  );
}

export default Inicio;