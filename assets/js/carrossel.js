export function carrosselHero() {
    // 1. SELEÇÃO E VALIDAÇÃO INICIAL
    let divPrincipal = document.getElementById("container_sessao_hero");

    let CarrosselVisualContainer = divPrincipal.querySelector("div");

    if (!CarrosselVisualContainer) {
        console.error("Div que contem as imagens não criada, erro!");
        return;
    }

    // 2. ESTADO INICIAL
    let imagemAtual = 0; /* guarda qual imagem está ativa no momento. */
    let intervaloID;

    // 3. INJEÇÃO DE CONTROLES (botões e dots)
    CarrosselVisualContainer.innerHTML += `
    <button class="carousel-prev">&#10094;</button>
    <button class="carousel-next">&#10095;</button>
    <div class="carousel-dots"></div>
    `;
    
    // 4. SELEÇÃO DE ELEMENTOS DEPENDENTES (APÓS INJEÇÃO)
    // ESTA É A ORDEM CORRETA QUE RESOLVE O PROBLEMA:
    let imagens = CarrosselVisualContainer.querySelectorAll("img"); // Seleciona as imagens
    let totalImg = imagens.length; // Agora totalImg tem o valor correto!

    // selção dos elementos html criados
    let prevBtn = CarrosselVisualContainer.querySelector(".carousel-prev");
    let nextBtn = CarrosselVisualContainer.querySelector(".carousel-next");
    let dotsContainer = CarrosselVisualContainer.querySelector(".carousel-dots");


    // 5. DECLARAÇÃO DE FUNÇÕES

    // Função para criar e renderizar os Dots
    function renderDots(){
        dotsContainer.innerHTML = ''; //limpa todo o conteudo
        for (let i = 0; i < totalImg; i++) {
            const dot = document.createElement("button");
            dot.classList.add("carousel-dot");
            dot.dataset.index = i;
            dot.addEventListener('click', () =>{
                goToSlide(i);
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Função para mostrar a imagem atual
    function MostraImg(index) {
        imagens.forEach((img, i) => {
            const isActive = i === index;
            img.classList.toggle("active", isActive); /* adiciona a classe se a condição for verdadeira e remove se for falsa. */
            /* Adiciona a tag active na imagem que for do mesmo indice I que o (index) */
        });
        // Atualiza os dots
        CarrosselVisualContainer.querySelectorAll('.carousel-dot').forEach((dot, i)=>{
            const isActive = i === index;
            dot.classList.toggle('active', isActive);
        })
    }
    
    // Função principal de navegação
    function goToSlide(index){
        if (index < 0){
            imagemAtual = totalImg - 1;
        }else if(index >= totalImg){
            imagemAtual = 0;
        }else{
            imagemAtual = index;
        }
        MostraImg(imagemAtual);
    }

    //Função para passar para a proxa img
    function proximaImg() {
        goToSlide(imagemAtual + 1);
    }

    // LÓGICA DE AUTOPLAY (Com funções auxiliares)
    function startAutoplay() {
        clearInterval(intervaloID);
        intervaloID = setInterval(proximaImg, 2500);
    }

    function resetAutoplay() {
        clearInterval(intervaloID);
        startAutoplay();
    }

    // 6. LISTENERS DE EVENTOS

    // Botões de navegação
    prevBtn.addEventListener('click',() =>{
        goToSlide(imagemAtual - 1);
        resetAutoplay();
    })

    nextBtn.addEventListener('click', () =>{
        goToSlide(imagemAtual + 1);
        resetAutoplay();
    })

    // Pausa e reinício (utilizando o container visual)
    CarrosselVisualContainer.addEventListener("mouseenter", () => clearInterval(intervaloID));
    CarrosselVisualContainer.addEventListener("mouseleave", () => resetAutoplay());

    // 7. INICIALIZAÇÃO
    renderDots();
    MostraImg(imagemAtual);
    startAutoplay();
}