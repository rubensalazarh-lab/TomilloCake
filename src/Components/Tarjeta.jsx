import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import estilo from "./Tarjeta.module.css";

function Tarjeta() {
  const { id } = useParams();

  const {
    carrito,
    addToCart,
    restarCantidad
  } = useCart();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarProducto() {
      try {
        setCargando(true);
        setError(null);
        setProducto(null);

        const respuesta = await fetch("/Productos.json", {
          signal: controlador.signal
        });

        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el catálogo");
        }

        const productos = await respuesta.json();

        if (!Array.isArray(productos)) {
          throw new Error("El catálogo no es válido");
        }

        const encontrado = productos.find(
          (item) => String(item.id) === id
        );

        if (!encontrado) {
          throw new Error("Producto no encontrado");
        }

        setProducto(encontrado);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarProducto();

    return () => controlador.abort();
  }, [id]);

  // Buscar la cantidad real del producto en el carrito.
  const productoEnCarrito = carrito.find(
    (item) => String(item.id) === id
  );

  const cantidad = productoEnCarrito?.cantidad ?? 0;

  // El botón + agrega directamente una unidad.
  function aumentarCantidad() {
    if (!producto) {
      return;
    }

    addToCart(producto, 1);
  }

  // El botón - descuenta directamente una unidad.
  function disminuirCantidad() {
    if (!producto || cantidad === 0) {
      return;
    }

    restarCantidad(producto.id);
  }

  if (cargando) {
    return <p>Cargando detalle del producto...</p>;
  }

  if (error) {
    return (
      <section className={estilo["detalle-producto"]}>
        <p role="alert">{error}</p>

        <Link to="/productos">
          Volver a productos
        </Link>
      </section>
    );
  }

  if (!producto) {
    return <p>Producto no disponible.</p>;
  }

  return (
    <section className={estilo["detalle-producto"]}>
      <div className={estilo["detalle-contenido"]}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className={estilo["detalle-imagen"]}
        />

        <div className={estilo["detalle-informacion"]}>
          <h2>{producto.nombre}</h2>

          <p>{producto.descripcion}</p>

          <p className={estilo["detalle-precio"]}>
            {producto.precio != null
              ? `$${producto.precio}`
              : "Precio a consultar"}
          </p>

          <div className={estilo["selector-cantidad"]}>
            <button
              type="button"
              onClick={disminuirCantidad}
              disabled={cantidad === 0}
              aria-label="Quitar una unidad del carrito"
            >
              −
            </button>

            <span aria-live="polite">
              {cantidad}
            </span>

            <button
              type="button"
              onClick={aumentarCantidad}
              aria-label="Agregar una unidad al carrito"
            >
              +
            </button>
          </div>

          <p className={estilo["cantidad-descripcion"]}>
            Unidades en el carrito
          </p>

          <Link
            to="/productos"
            className={estilo["detalle-volver"]}
          >
            Volver a productos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Tarjeta;