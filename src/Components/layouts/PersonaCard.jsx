function PersonaCard({ nombre, cargo, descripcion, inicial }) {
  return (
    <article className="persona-card">

      <div
        className="persona-avatar"
        aria-hidden="true"
      >
        {inicial}
      </div>

      <h3>{nombre}</h3>

      <p className="persona-cargo">
        {cargo}
      </p>

      <p className="persona-descripcion">
        {descripcion}
      </p>

    </article>
  );
}

export default PersonaCard;