export function nossoscursosHtml (nossoscursosobj) {
  // segurança: caso não haja dados
  if (!nossoscursosobj) return document.createTextNode("Nenhum curso encontrado.");

  const bar_init = document.createElement("div");
  bar_init.classList.add("bar");

  const container = document.getElementById("container_nossos_cursos");

  const title = document.createElement("h1");
  title.classList.add("title_cursos");
  title.textContent = nossoscursosobj.title || "Nossos Cursos";

  const subtitle = document.createElement("h2");
  subtitle.classList.add("subtitle_cursos");
  subtitle.textContent = nossoscursosobj.subtitle || "O curso ideal para você está aqui!";

  const cont_nossos_cursos = document.createElement("section");
  cont_nossos_cursos.classList.add("nossos-cursos");

  const cards = document.createElement("div");
  cards.classList.add("cards_cursos");

  if (nossoscursosobj.courseCategories && Array.isArray(nossoscursosobj.courseCategories)) {
    nossoscursosobj.courseCategories.forEach(curso => {
      const card = document.createElement("div");
      card.classList.add("curso_card");
      
      // imagem de fundo
      const img = gerarImagem(curso.backgroundImage.asset._ref) || "";
      card.style.backgroundImage = `url(${img})`;
      card.style.backgroundSize = "contain";
      card.style.backgroundPosition = "center";
      card.style.backgroundRepeat = "no-repeat";             

      // textos
      const titulo_card = document.createElement("h1");
      titulo_card.textContent = curso.categoryName;

      const destaque_card = document.createElement("h3");
      destaque_card.textContent = curso.mainDescription;

      const descricao_card = document.createElement("p");
      descricao_card.textContent = curso.detailedDescription;
      
      // container de textos
      const content = document.createElement("div");
      content.classList.add("curso_conteudo");

      content.appendChild(titulo_card);
      content.appendChild(destaque_card);
      content.appendChild(descricao_card);

      // junta tudo no card
      card.appendChild(content);
      cards.appendChild(card);
    });
  }

  cont_nossos_cursos.appendChild(cards);
  
  container.appendChild(bar_init);
  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(cont_nossos_cursos);

  return cont_nossos_cursos;
}

function gerarImagem(img) {
  const id = img.replace(/^image-/, '').replace(/-(\w+)$/, '.$1');
  return `https://cdn.sanity.io/images/gx7uk6s7/production/${id}`;
}