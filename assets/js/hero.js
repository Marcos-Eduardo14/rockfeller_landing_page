export function heroHtml(hero) {
    const secaohero = document.createElement("section");
    const tagimg = document.createElement("img");

    tagimg.src = gerarImagem(hero.mainImage.asset._ref)||"";

    secaohero.appendChild(tagimg);
    
    return secaohero;  

    function gerarImagem(img) {
    const id = img.replace(/^image-/, '').replace(/-(\w+)$/, '.$1');
    return `https://cdn.sanity.io/images/gx7uk6s7/production/${id}`;
    }
}