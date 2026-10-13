import PersonaCard from "./PersonaCard";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Footer.css";

function Footer() {
  const tarjetas = [
    {
      nombre: "TOMAS MATERAN",
      cargo: "Responsable de Tomillo Cake",
      descripcion:
        "Emprendedor a cargo de Tomillo Cake.",
      inicial: "TM"
    },
    {
      nombre: "Producción artesanal",
      cargo: "Área del emprendimiento",
      descripcion:
        "Elaboración de tortas y budines artesanales.",
      inicial: "PA"
    },
    {
      nombre: "Atención de pedidos",
      cargo: "Área del emprendimiento",
      descripcion:
        "Comunicación y gestión de pedidos online.",
      inicial: "AP"
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-contenido">

        {/* INFORMACION DE LA EMPRESA */}
        <section className="footer-empresa">
          <h2>Tomillo Cake</h2>

          <p>
            Tortas y budines artesanales,
            elaborados con dedicación.
          </p>

          <p>
            Realizamos pedidos exclusivamente online.
          </p>
        </section>

        {/* TARJETAS DEL EMPRENDIMIENTO */}
        <section className="footer-equipo">
          <h2>Conoce nuestro emprendimiento</h2>

          <div className="footer-tarjetas">
            {tarjetas.map((persona) => (
              <PersonaCard
                key={persona.nombre}
                nombre={persona.nombre}
                cargo={persona.cargo}
                descripcion={persona.descripcion}
                inicial={persona.inicial}
              />
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <section className="footer-contacto">
          <fieldset className="contacto-contenedor">

            <legend className="contacto-titulo">
              Contacto
            </legend>

            <div className="contacto-iconos">

              {/* WHATSAPP */}
              <a
                href="https://wa.me/541137968884"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                title="WhatsApp"
                className="contacto-icono whatsapp"
              >
                <FaWhatsapp />
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/tomillo_cake/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Instagram"
                title="Instagram"
                className="contacto-icono instagram"
              >
                <FaInstagram />
              </a>

              {/* CORREO ELECTRONICO */}
              <a
                href="mailto:tomillo.cake@gmail.com"
                aria-label="Enviar correo electrónico"
                title="Correo electrónico"
                className="contacto-icono email"
              >
                <MdEmail />
              </a>

            </div>
          </fieldset>
        </section>

      </div>

      {/* DERECHOS DE AUTOR */}
      <div className="footer-inferior">
        <p>
          © {new Date().getFullYear()} Tomillo Cake.
          Todos los derechos reservados.
        </p>
      </div>

    </footer>
  );
}

export default Footer;