import { carregardados, filtrarsecao } from "./fetch.js";
import { nossoscursosHtml } from "./nossoscursos.js"
import { headerHtml } from "./header.js";
import { footerHtml } from "./footer.js";
import { sobrenosHtml } from "./sobrenos.js";
import { heroHtml } from "./hero.js";
import { carrosselHero } from "./carrossel.js"
import { formularioHtml } from "./formulario.js";
import { comentariosHtml } from "./comentarios.js";

const dadosbrutos = await carregardados();
console.log(dadosbrutos);
let secoes = filtrarsecao(dadosbrutos);
console.log("Dados carregados:", secoes); // Mudei para ser mais fácil de achar

// --- 1. CRIAR TODOS OS COMPONENTES ---
let headerhtml = headerHtml(secoes.header);
let herohtml = heroHtml(secoes.hero);
let sobrenoshtml = sobrenosHtml(secoes.secaosobre);
let nossoscursoshtml = nossoscursosHtml(secoes.nossoscursos);
let formulariohtml = formularioHtml(secoes.formulario);
let footerhtml = footerHtml(secoes.footer);

let dadosComentarios = secoes.coments;

let dadosCopia = JSON.parse(JSON.stringify(dadosComentarios)); 
    
if (dadosCopia && dadosCopia.testimonials) {
    dadosCopia.testimonials = [
        ...dadosCopia.testimonials, 
        ...dadosCopia.testimonials
    ];
}

let comentarioshtml = comentariosHtml(dadosCopia); 

document.getElementById("container_sessao_hero").appendChild(herohtml);
carrosselHero();
document.getElementById("container_nossos_cursos").appendChild(nossoscursoshtml);
document.getElementById("container_formulario").appendChild(formulariohtml);
document.getElementById("container_comentarios").appendChild(comentarioshtml);