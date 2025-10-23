export function nossoscursosHtml (nossoscursosobj) {

      // segurança: caso não haja dados
  if (!nossoscursosobj) return document.createTextNode("Nenhum curso encontrado.");

    const cont_nossos_cursos = document.createElement("section");
    cont_nossos_cursos.classList.add("nossos-cursos");

    const title = document.createElement("h1");
    title.classList.add("title_cursos");
    title.textContent = nossoscursosobj.title || "Nossos Cursos";

    const subtitle = document.createElement("h2");
    subtitle.classList.add("subtitle_cursos");
    subtitle.textContent = nossoscursosobj.subtitle || "O curso ideal para você está aqui!";

    const cards = document.createElement("div");
    cards.classList.add("cards_cursos");

    if (nossoscursosobj.courseCategories && Array.isArray(nossoscursosobj.courseCategories)) {
      nossoscursosobj.courseCategories.forEach(curso => {
      const card = document.createElement("div");
      card.classList.add("curso_card");
      
      const img = document.createElement("img");
      img.src = gerarImagem(curso.backgroundImage.asset._ref) || "";
      img.alt = curso.reference || "Curso";

      const titulo_card = document.createElement("h1");
      titulo_card.textContent = curso.categoryName;

      const destaque_card = document.createElement("h3")
      destaque_card.textContent = curso.mainDescription;

      const descricao_card = document.createElement("p");
      descricao_card.textContent = curso.detailedDescription;

      // monta o card
      card.appendChild(img);
      card.appendChild(titulo_card);
      card.appendChild(destaque_card);
      card.appendChild(descricao_card);

      // adiciona o card ao container
      cards.appendChild(card);
    });
      
    }
    console.log(cards)
    
    cont_nossos_cursos.appendChild(title);
    cont_nossos_cursos.appendChild(subtitle);
    cont_nossos_cursos.appendChild(cards);

    console.log(cont_nossos_cursos);
    return cont_nossos_cursos;
}

function gerarImagem(img) {
  const id = img.replace(/^image-/, '').replace(/-(\w+)$/, '.$1');
  return `https://cdn.sanity.io/images/gx7uk6s7/production/${id}`;
}

/* const section = document.createElement("section");
  section.classList.add("nossos-cursos");

  // título
  const title = document.createElement("h2");
  title.classList.add("titulo-cursos");
  title.textContent = nossoscursosObj.titulo || "Nossos Cursos";

  // descrição
  const desc = document.createElement("p");
  desc.classList.add("descricao-cursos");
  desc.textContent = nossoscursosObj.descricao || "";

  // container de cards
  const cursosContainer = document.createElement("div");
  cursosContainer.classList.add("cursos-container");

  // percorre o array de cursos e cria os cards
  if (nossoscursosObj.cursos && Array.isArray(nossoscursosObj.cursos)) {
    nossoscursosObj.cursos.forEach(curso => {
      const card = document.createElement("div");
      card.classList.add("curso-card");

      const img = document.createElement("img");
      img.src = curso.imagem?.url || "";
      img.alt = curso.nome || "Curso";

      const nome = document.createElement("h3");
      nome.textContent = curso.nome;

      const descricao = document.createElement("p");
      descricao.textContent = curso.descricao;

      // monta o card
      card.appendChild(img);
      card.appendChild(nome);
      card.appendChild(descricao);

      // adiciona o card ao container
      cursosContainer.appendChild(card);
    });
  }

  // adiciona tudo à section
  section.appendChild(title);
  section.appendChild(desc);
  section.appendChild(cursosContainer);

  // retorna o elemento completo
  return section;
  */ 