export function sobrenosHtml(sobrenosobj) {

    if (!sobrenosobj) return document.createTextNode("Nenhum card encontrado.");

    const container_sobre_nos = document.getElementById("container_sobre_nos");

    const titulo = document.createElement("h1");
    titulo.classList.add("titulo_sobre");
    titulo.textContent = sobrenosobj.title || "À Rockfeller";

    const bar = document.createElement("div");
    bar.classList.add("bar");

    container_sobre_nos.appendChild(titulo);
    container_sobre_nos.appendChild(bar);
}