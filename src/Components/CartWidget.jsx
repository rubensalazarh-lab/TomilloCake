import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function CartWidget({ onClick }) {
  const { cantidadTotal } = useCart();

  return (
    <Link
      to="/carrito"
      className="cart-widget"
      aria-label={`Ver carrito. ${cantidadTotal} unidades`}
      title="Ver carrito"
      onClick={onClick}
    >
      <FaShoppingCart aria-hidden="true" />

      <span className="cart-contador">
        {cantidadTotal}
      </span>
    </Link>
  );
}

export default CartWidget;