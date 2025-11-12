export {carregardados, filtrarsecao}
async function carregardados(){
    const URL = "https://gx7uk6s7.api.sanity.io/v2025-10-15/data/query/production?query=*%0A%0A&perspective=published";
    const request = await fetch(URL);
    const dados = await request.json();

    return dados;
}



function filtrarsecao(dadosbrutos){
   let secoes = {
    header : null,
    hero : null,
    secaosobre : null,
    nossoscursos : null,
    formulario : null,
    coments : null,
    footer : null
   } 
   
    dadosbrutos.result.forEach(secao => {
        if(secao._type === "header"){
            secoes.header = secao;
        }
        else if(secao._type === "aboutSection") {
            secoes.secaosobre = secao;
        }
        else if(secao._type === "footer") {
            secoes.footer = secao;
        }
        else if(secao._type === "coursesSection") {
            secoes.nossoscursos = secao;
        }
        else if(secao._type === "contactFormSection") {
            secoes.formulario = secao;
        }
        else if(secao._type === "testimonialsSection") {
            secoes.coments = secao;
        }
        else if(secao._type === "heroSection") {
            secoes.hero = secao;
        }
    });
        return secoes;
};