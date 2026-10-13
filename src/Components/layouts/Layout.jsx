import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

import Inicio from "../Inicio";
import Productos from "../Productos";
import Tarjeta from "../Tarjeta";
import Carrito from "../Carrito";

function Layout() {
  return (
    <>
      <Header />

      <Nav />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Inicio />}
          />

          <Route
            path="/productos"
            element={<Productos />}
          />

          <Route
            path="/producto/:id"
            element={<Tarjeta />}
          />

          <Route
            path="/carrito"
            element={<Carrito />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default Layout;