/* =================================================== */
/* --- Componente de Comentários (VERSÃO FINAL 3.0) --- */
/* assets/js/comentarios.js
/* =================================================== */

/**
 * Constrói e RETORNA a seção de depoimentos.
 *
 * @param {object} comentariosObj - O objeto com todos os dados da seção (vem do secoes.coments)
 */
export function comentariosHtml(comentariosObj) {
  
  if (!comentariosObj || !comentariosObj.testimonials) { 
    console.warn("Dados de comentários inválidos ou ausentes (não encontrou 'testimonials'). Não foi possível renderizar a seção.");
    return document.createElement("div"); 
  }

  // --- 2. Criação dos Elementos Principais ---
  const section = document.createElement("section");
  section.classList.add("testimonials-section");

  const divContainer = document.createElement("div");
  divContainer.classList.add("container");

  const title = document.createElement("h2");
  title.classList.add("testimonials-title");
  title.textContent = comentariosObj.title || "O que nossos Rockers dizem sobre nós";

  const wrapper = document.createElement("div");
  wrapper.classList.add("testimonials-wrapper");

  // --- 3. Botão Esquerdo (com SVG) ---
  const btnLeft = document.createElement("button");
  btnLeft.classList.add("nav-arrow", "nav-arrow-left");
  btnLeft.setAttribute("aria-label", "Anterior");
  btnLeft.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // --- 4. Viewport e Container dos Cards ---
  const viewport = document.createElement("div");
  viewport.classList.add("testimonials-viewport");

  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("testimonials-container");

  // --- 5. Loop para criar os Cards dinamicamente ---
  comentariosObj.testimonials.forEach(depoimento => { 
    
    const card = document.createElement("div");
    card.classList.add("testimonial-card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("testimonial-card__content");

    const author = document.createElement("h3");
    author.classList.add("testimonial-author");
    author.textContent = depoimento.authorName; 

    const text = document.createElement("p");
    text.classList.add("testimonial-text");
    text.textContent = `"${depoimento.quote}"`;

    const stars = document.createElement("div");
    stars.classList.add("testimonial-stars");
    stars.innerHTML = `
      <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
    `;

    cardContent.appendChild(author);
    cardContent.appendChild(text);
    cardContent.appendChild(stars);
    card.appendChild(cardContent);
    cardsContainer.appendChild(card);
  });

  viewport.appendChild(cardsContainer);

  // --- 6. Botão Direito (com SVG) ---
  const btnRight = document.createElement("button");
  btnRight.classList.add("nav-arrow", "nav-arrow-right");
  btnRight.setAttribute("aria-label", "Próximo");
  btnRight.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // --- 7. Paginação (Dots) ---
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("testimonials-dots");

  comentariosObj.testimonials.forEach((_, index) => { 
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) {
      dot.classList.add("active");
    }
    dot.setAttribute("data-index", index); 
    dotsContainer.appendChild(dot);
  });
  
  // --- 8. Fundo Decorativo ---
  const circles = document.createElement("div");
  circles.classList.add("decorative-circles");

  // --- 9. Montagem Final (appendChild) ---
  wrapper.appendChild(btnLeft);
  wrapper.appendChild(viewport);
  wrapper.appendChild(btnRight);

  divContainer.appendChild(title);
  divContainer.appendChild(wrapper);
  divContainer.appendChild(dotsContainer); 

  section.appendChild(divContainer);
  section.appendChild(circles);

  // ===============================================
  // --- 10. LÓGICA DO CARROSSEL ---
  // ===============================================
  
  const allDots = dotsContainer.querySelectorAll(".dot");
  const allCards = cardsContainer.querySelectorAll(".testimonial-card");
  const totalSlides = allCards.length;
  let currentIndex = 0;

  // Função que calcula quantos cards estão visíveis
  function getVisibleCards() {
    if (window.innerWidth <= 768) return 1; 
    if (window.innerWidth <= 1024) return 2;
    return 3; 
  }

  // Função que move o carrossel
  function moveToSlide(index) {
    const card = allCards[0];
    if (!card) return; 

    requestAnimationFrame(() => {
        const cardWidth = card.offsetWidth;
        const gap = parseInt(getComputedStyle(cardsContainer).gap) || 30;
        const moveAmount = (cardWidth + gap) * index;
        
        cardsContainer.style.transform = `translateX(-${moveAmount}px)`;

        allDots.forEach(dot => dot.classList.remove("active"));
        const activeDot = dotsContainer.querySelector(`.dot[data-index="${index}"]`);
        if (activeDot) {
          activeDot.classList.add("active");
        }

        currentIndex = index;
    });
  }

  // *** NOVA FUNÇÃO AQUI ***
  // Função para esconder bolinhas desnecessárias
  function updateDotsVisibility() {
    const visibleCards = getVisibleCards();
    const maxValidIndex = totalSlides - visibleCards;

    allDots.forEach((dot, index) => {
      if (index > maxValidIndex) {
        dot.style.display = 'none'; // Esconde a bolinha
      } else {
        dot.style.display = 'inline-block'; // Mostra a bolinha
      }
    });
  }

  // "Ouvir" clique na seta Direita
  btnRight.addEventListener("click", () => {
    let nextIndex = currentIndex + 1;
    let visibleCards = getVisibleCards();
    
    // O índice máximo válido é (total - visíveis)
    const maxValidIndex = totalSlides - visibleCards;

    if (nextIndex > maxValidIndex) {
      nextIndex = 0; // Volta ao início
    }
    moveToSlide(nextIndex);
  });

  // "Ouvir" clique na seta Esquerda
  btnLeft.addEventListener("click", () => {
    let prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      let visibleCards = getVisibleCards();
      prevIndex = totalSlides - visibleCards; // Vai para o último slide válido
    }
    moveToSlide(prevIndex);
  });

  // "Ouvir" clique nas bolinhas (Dots)
  allDots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      // A lógica de "clicabilidade" agora está coberta
      // pela função de visibilidade
      moveToSlide(index);
    });
  });
  
  // --- 11. CHAMADAS INICIAIS E RESIZE ---
  
  // Esconde as bolinhas extras assim que a página carrega
  updateDotsVisibility(); 
  
  // Adiciona um "ouvinte" para re-calcular se a janela mudar de tamanho
  window.addEventListener('resize', updateDotsVisibility);

  // --- 12. RETORNA a seção completa ---
  return section;
}

