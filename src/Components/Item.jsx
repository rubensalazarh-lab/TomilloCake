import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import IndicadorCarrito from "./IndicadorCarrito";

function Item({ producto, modo = "catalogo" }) {
  const {
    carrito,
    sumarCantidad,
    restarCantidad
  } = useCart();

  const productoEnCarrito = carrito.find(
    (item) => item.id === producto.id
  );

  const cantidad = productoEnCarrito?.cantidad ?? 0;
  const esCarrito = modo === "carrito";

  const tienePrecio =
    producto.precio !== null &&
    producto.precio !== undefined &&
    producto.precio !== "" &&
    Number.isFinite(Number(producto.precio));

  const precio = tienePrecio
    ? Number(producto.precio)
    : null;

  const formatoPrecio = (valor) =>
    valor.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS"
    });

  return (
    <article className="producto-item">
      <Link
        to={`/producto/${producto.id}`}
        aria-label={`Ver detalle de ${producto.nombre}`}
        className="producto-enlace"
      >
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="producto-imagen"
        />

        <h3>{producto.nombre}</h3>
      </Link>

      <p className="producto-precio">
        {precio !== null
          ? formatoPrecio(precio)
          : "Precio a consultar"}
      </p>

      <div className="producto-indicador">
        <IndicadorCarrito cantidad={cantidad} />
      </div>

      {esCarrito && (
        <div className="producto-controles">
          <div className="producto-selector">
            <button
              type="button"
              onClick={() => restarCantidad(producto.id)}
              disabled={cantidad === 0}
              aria-label={`Restar una unidad de ${producto.nombre}`}
            >
              −
            </button>

            <span aria-live="polite">
              {cantidad}
            </span>

            <button
              type="button"
              onClick={() => sumarCantidad(producto.id)}
              aria-label={`Sumar una unidad de ${producto.nombre}`}
            >
              +
            </button>
          </div>

          <p className="producto-subtotal">
            Subtotal:{" "}
            {precio !== null
              ? formatoPrecio(precio * cantidad)
              : "A consultar"}
          </p>
        </div>
      )}
    </article>
  );
}

export default Item;