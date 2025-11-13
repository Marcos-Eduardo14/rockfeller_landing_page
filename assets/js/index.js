import { carregardados, filtrarsecao } from "./fetch.js";
import { nossoscursosHtml } from "./nossoscursos.js"
import { headerHtml } from "./header.js";
import { footerHtml } from "./footer.js";
import { sobrenosHtml } from "./sobrenos.js";
import { heroHtml } from "./hero.js";
import { formularioHtml } from "./formulario.js";
import { comentariosHtml } from "./comentarios.js";

const dadosbrutos = await carregardados();
console.log(dadosbrutos);
let secoes = filtrarsecao(dadosbrutos);
console.log(secoes);

let headerhtml = headerHtml(secoes.header);
let herohtml = heroHtml(secoes.hero);
let sobrenoshtml = sobrenosHtml(secoes.secaosobre);
let nossoscursoshtml = nossoscursosHtml(secoes.nossoscursos);
let formulariohtml = formularioHtml(secoes.formulario);
let comentarioshtml = comentariosHtml(secoes.coments);

// Adiciona os elementos ao documento
document.body.innerHTML = `
    ${headerhtml}
    ${herohtml}
    ${sobrenoshtml}
    ${nossoscursoshtml}
    ${formulariohtml}
    ${comentarioshtml}
`;
let footerhtml = footerHtml(secoes.footer);


document.body.appendChild(headerhtml);