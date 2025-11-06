import { carregardados, filtrarsecao } from "./fetch.js";
import { nossoscursosHtml } from "./nossoscursos.js"
import { headerHtml } from "./header.js";
//import { footerHtml } from "./footer.js";
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

document.getElementById("container_sessao_hero").appendChild(herohtml);
document.getElementById("container_nossos_cursos").appendChild(nossoscursoshtml);
//document.getElementById("container_footer").appendChild(footerhtml);


let formulariohtml = formularioHtml(secoes.formulario);
//let footerhtml = footerHtml(secoes.footer);


// --- Bloco de Teste para Duplicar Cards (NOVO) ---
// 1. Pega os dados originais
let dadosComentarios = secoes.coments;

// 2. Para não alterar o objeto original, criamos uma cópia
// (JSON.parse(JSON.stringify(...)) é um truque para copiar 100%)
let dadosCopia = JSON.parse(JSON.stringify(dadosComentarios)); 
    
// 3. Duplica os depoimentos dentro da cópia
// (Agora o array 'testimonials' terá 6 itens em vez de 3)
// (Verifique se 'testimonials' existe antes de duplicar)
if (dadosCopia && dadosCopia.testimonials) {
    dadosCopia.testimonials = [
        ...dadosCopia.testimonials, 
        ...dadosCopia.testimonials
    ];
}
// --- Fim do Bloco de Teste ---


// 4. Passamos a cópia (com 6 cards) para sua função
let comentarioshtml = comentariosHtml(dadosCopia); 


// --- 2. ADICIONAR TODOS OS COMPONENTES NA PÁGINA ---
// (Certifique-se que você tem o <div id="container_header"></div> no seu html)
// document.getElementById("container_header").appendChild(headerhtml);

document.getElementById("container_sessao_hero").appendChild(herohtml);
carrosselHero(); // Chama a lógica do carrossel do hero

// (Certifique-se que você tem o <div id="container_sobrenos"></div> no seu html)
// document.getElementById("container_sobrenos").appendChild(sobrenoshtml);

document.getElementById("container_nossos_cursos").appendChild(nossoscursoshtml);
document.getElementById("container_formulario").appendChild(formulariohtml);

document.getElementById("container_comentarios").appendChild(comentarioshtml);

// (Comentado para evitar o erro de 'appendChild' que vimos)
// document.getElementById("container_footer").appendChild(footerhtml);

console.log(nossoscursoshtml);
