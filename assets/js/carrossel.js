export function carrosselHero() {
    let divPrincipal = document.getElementById("container_sessao_hero");
    let imagens = divPrincipal.querySelectorAll("img");

    let imagemAtual = 0; /* guarda qual imagem está ativa no momento. */



  // Função para mostrar a imagem atual
  function MostraImg(index) {
    imagens.forEach((img, i) => {
      img.classList.toggle("active", i === index); /* adiciona a classe se a condição for verdadeira e remove se for falsa. */
      /* Adiciona a tag active na imagem que for do mesmo indice I que o (index) */
    });
  }
    

  //Função para passar para a proxa img
  function proximaImg() {
  imagemAtual = (imagemAtual + 1) % imagens.length; /* arante que quando chegar na última imagem, ele volta para a primeira */
  MostraImg(imagemAtual);
  }



    MostraImg(imagemAtual); //inicia o carrossel
    let intervaloID =  setInterval(proximaImg, 3000); // intervadoID guarda o intervalo para pausar se preciso---- setInterval chama a função troca de img a cada 3 segundos

    divPrincipal.addEventListener("mouseenter", () => clearInterval(intervaloID)); //limpa a função (para o loop) quando o mouse entrar, pausa o carrossel
    divPrincipal.addEventListener("mouseleave", () => { //Inicia o carrossel novamente
    clearInterval(intervaloID); // garante que o antigo intervalo acabou
    intervaloID = setInterval(proximaImg, 3000);
});


}