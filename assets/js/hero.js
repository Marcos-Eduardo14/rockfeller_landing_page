export function heroHtml(hero) {
    const tagimg = document.createElement("img");

    tagimg.src = gerarImagem(hero.mainImage.asset._ref)||"";

    return tagimg;  

    function gerarImagem(img) {
    const id = img.replace(/^image-/, '').replace(/-(\w+)$/, '.$1');
    return `https://cdn.sanity.io/images/gx7uk6s7/production/${id}`;
    }
}