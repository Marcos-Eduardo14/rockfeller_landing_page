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
    console.log(secoes);

    let headerhtml = headerHtml(secoes.header);

    let herohtml = heroHtml(secoes.hero);


    let sobrenoshtml = sobrenosHtml(secoes.secaosobre);

    let nossoscursoshtml = nossoscursosHtml(secoes.nossoscursos);

    document.getElementById("container_sessao_hero").appendChild(herohtml);
    carrosselHero();
    document.getElementById("container_nossos_cursos").appendChild(nossoscursoshtml);

    let formulariohtml = formularioHtml(secoes.formulario);
    document.getElementById("container_formulario").appendChild(formulariohtml);

    let comentarioshtml = comentariosHtml(secoes.coments);

    let footerhtml = footerHtml(secoes.footer);

    console.log(nossoscursoshtml)
