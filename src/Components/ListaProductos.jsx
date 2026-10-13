import { useEffect, useState } from "react";
import Item from "./Item";

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarProductos() {
      try {
        const respuesta = await fetch("/Productos.json", {
          signal: controlador.signal
        });

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los productos");
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("El catálogo no tiene un formato válido");
        }

        setProductos(datos);
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

    cargarProductos();

    return () => controlador.abort();
  }, []);

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  return (
    <div className="lista-productos">
      {productos.map((producto) => (
        <Item
          key={producto.id}
          producto={producto}
        />
      ))}
    </div>
  );
}

export default ListaProductos;