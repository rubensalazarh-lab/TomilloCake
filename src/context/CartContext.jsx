import {
  createContext,
  useContext,
  useState
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  function addToCart(producto, cantidad = 1) {
    if (!producto || !Number.isInteger(cantidad) || cantidad <= 0) {
      return;
    }

    setCarrito((carritoAnterior) => {
      const productoExistente = carritoAnterior.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return carritoAnterior.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + cantidad
              }
            : item
        );
      }

      return [
        ...carritoAnterior,
        { ...producto, cantidad }
      ];
    });
  }

  function sumarCantidad(id) {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }

  function restarCantidad(id) {
    setCarrito((carritoAnterior) =>
      carritoAnterior
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: item.cantidad - 1
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function eliminarProducto(id) {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter(
        (item) => item.id !== id
      )
    );
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const totalPrecio = carrito.reduce(
    (total, item) =>
      total + (Number(item.precio) || 0) * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        addToCart,
        sumarCantidad,
        restarCantidad,
        eliminarProducto,
        vaciarCarrito,
        cantidadTotal,
        totalPrecio
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return contexto;
}