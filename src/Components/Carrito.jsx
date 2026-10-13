import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Item from "./Item";
import "./Productos.css";

function Carrito() {
  const { carrito, cantidadTotal, totalPrecio } = useCart();

  const todosTienenPrecio = carrito.every(
    (producto) =>
      producto.precio !== null &&
      producto.precio !== undefined &&
      producto.precio !== "" &&
      Number.isFinite(Number(producto.precio))
  );

  const formatoPrecio = (valor) =>
    valor.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS"
    });

  return (
    <section className="productos-seccion">
      <h2>Carrito de compras</h2>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío.</p>

          <Link to="/productos" className="carrito-enlace">
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <p className="productos-introduccion">
            Revisá los productos que seleccionaste.
          </p>

          <div className="lista-productos">
            {carrito.map((producto) => (
              <Item
                key={producto.id}
                producto={producto}
                modo="carrito"
              />
            ))}
          </div>

          <div className="carrito-resumen">
            <h3>Resumen del carrito</h3>

            <p>
              Total de unidades:{" "}
              <strong>{cantidadTotal}</strong>
            </p>

            <p>
              Total:{" "}
              <strong>
                {todosTienenPrecio
                  ? formatoPrecio(totalPrecio)
                  : "A consultar"}
              </strong>
            </p>

            {!todosTienenPrecio && (
              <p className="carrito-aviso">
                Hay productos sin precio definido.
                El total se mostrará cuando todos
                tengan un precio asignado.
              </p>
            )}

            <Link to="/productos" className="carrito-enlace">
              Seguir viendo productos
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;