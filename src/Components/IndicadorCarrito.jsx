import { FaShoppingCart } from "react-icons/fa";

function IndicadorCarrito({ cantidad = 0 }) {
  const tieneProductos = cantidad > 0;

  return (
    <span
      className={
        tieneProductos
          ? "indicador-carrito indicador-carrito-activo"
          : "indicador-carrito"
      }
      aria-label={
        tieneProductos
          ? `${cantidad} unidades en el carrito`
          : "Sin unidades en el carrito"
      }
    >
      <FaShoppingCart aria-hidden="true" />

      {tieneProductos && (
        <span>{cantidad}</span>
      )}
    </span>
  );
}

export default IndicadorCarrito;