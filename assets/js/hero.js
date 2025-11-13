export function heroHtml(hero) {
    const divIMG = document.createElement("div");

    hero.mainImage.forEach( mainImage => {
        let img = document.createElement("img");
        img.src = gerarImagem(mainImage.asset._ref);
        divIMG.appendChild(img);
    });

    return divIMG;  

   
}


function gerarImagem(img) {
    const id = img.replace(/^image-/, '').replace(/-(\w+)$/, '.$1');
    return `https://cdn.sanity.io/images/gx7uk6s7/production/${id}`;
}