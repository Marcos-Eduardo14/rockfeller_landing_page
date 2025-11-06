
document.addEventListener("DOMContentLoaded", function() {
  const footer = document.createElement("footer");

  footer.innerHTML = `
    <div style="
      background-color: #111;
      color: #f1f1f1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 10px;
      font-family: 'Arial', sans-serif;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
    ">
      <div style="margin-bottom: 8px; font-size: 15px; font-weight: bold;">
        Rockfeller — Plataforma de Inglês
      </div>

      <div style="margin-bottom: 10px;">
        <a href="#" style="color: #f1f1f1; text-decoration: none; margin: 0 12px; transition: color 0.3s;">Sobre</a>
        <a href="#" style="color: #f1f1f1; text-decoration: none; margin: 0 12px; transition: color 0.3s;">Cursos</a>
        <a href="#" style="color: #f1f1f1; text-decoration: none; margin: 0 12px; transition: color 0.3s;">Contato</a>
      </div>

      <p style="font-size: 12px; margin: 0; opacity: 0.8;">
        &copy; ${new Date().getFullYear()} Rockfeller. Todos os direitos reservados.
      </p>
    </div>
  `;

  document.body.appendChild(footer);

 
  const links = footer.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("mouseover", () => link.style.color = "#00bfff");
    link.addEventListener("mouseout", () => link.style.color = "#f1f1f1");
  });
});
