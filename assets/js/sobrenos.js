export function sobrenosHtml(sobrenosobj) {

    const cont_sobre_nos = document.getElementById("container_sobre_nos");

    if (!cont_sobre_nos) {
        console.error("Elemento 'container_sobre_nos' não encontrado");
        return null;
    }

    if (!sobrenosobj) {
        console.error("Objeto sobrenosobj não fornecido");
        return null;
    }

    const titulo = document.createElement("h1");
    titulo.classList.add("titulo_sobre_nos");
    titulo.textContent = sobrenosobj.title || "À Rockfeller";

    const bar = document.createElement("div");
    bar.classList.add("bar_title_sn");
    
    const sub_title = document.createElement("h2");
    sub_title.classList.add("subtitulo_sobre_nos");
    sub_title.textContent = sobrenosobj.subtitle || "Sobre Nós"

    const cards_sn = document.createElement("div");
    cards_sn.classList.add("cards_sobre_nos");

    if (sobrenosobj.features && Array.isArray(sobrenosobj.features)) {
    sobrenosobj.features.forEach(sobre => {
      const card = document.createElement("div");
      card.classList.add("sn_card");
        
      const img_icon = document.createElement("img");
      img_icon.classList.add("sn_icon")
      img_icon.src = gerarImagem(sobre.icon.asset._ref) || "";
      img_icon.alt = sobre.title || "icone"

      card.appendChild(img_icon);

      cards_sn.appendChild(card);
    });

}
    
    cont_sobre_nos.appendChild(titulo);
    cont_sobre_nos.appendChild(bar);
    cont_sobre_nos.appendChild(sub_title);
    cont_sobre_nos.appendChild(cards_sn);
    

    return cont_sobre_nos;
    
}

function gerarImagem(img) {
  const id = img.replace(/^image-/, '').replace(/-(\w+)$/, '.$1');
  return `https://cdn.sanity.io/images/gx7uk6s7/production/${id}`;
}
