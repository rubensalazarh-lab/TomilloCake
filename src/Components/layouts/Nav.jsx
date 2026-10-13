import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import CartWidget from "../CartWidget";
import "./Nav.css";

function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function cambiarMenu() {
    setMenuAbierto((anterior) => !anterior);
  }

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <nav
      className="navbar"
      aria-label="Navegación principal"
    >
      <div className="navbar-superior">
        <button
          type="button"
          className="menu-boton"
          onClick={cambiarMenu}
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          aria-label={
            menuAbierto
              ? "Cerrar menú"
              : "Abrir menú"
          }
        >
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>

        <CartWidget onClick={cerrarMenu} />
      </div>

      {menuAbierto && (
        <div
          id="menu-principal"
          className="menu-desplegable"
        >
          <Link
            to="/"
            onClick={cerrarMenu}
          >
            Inicio
          </Link>

          <Link
            to="/productos"
            onClick={cerrarMenu}
          >
            Productos
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;