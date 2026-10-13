import ListaProductos from "./ListaProductos";
import "./Productos.css";

function Productos() {
  return (
    <section className="productos-seccion" id="productos">
      <h2>Nuestros productos</h2>

      <p className="productos-introduccion">
        Descubrí nuestras tortas y budines artesanales.
      </p>

      <ListaProductos />
    </section>
  );
}

export default Productos;