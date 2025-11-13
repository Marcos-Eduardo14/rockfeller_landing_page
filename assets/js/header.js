// ...existing code...
export function headerHtml(headerobj) {
    if (!headerobj) return document.createTextNode("Nenhum header encontrado.");

    const header = document.createElement("header");
    header.className = "header";

    // Left / Center / Right containers
    const left = document.createElement("div");
    left.className = "header__left";

    const center = document.createElement("div");
    center.className = "header__center";

    const right = document.createElement("div");
    right.className = "header__right";
    


    // Logo (center)
    const logoLink = document.createElement("a");
    logoLink.href = (headerobj.logoLink || "/");
    const logo = document.createElement("img");
    logo.className = "rockfeller-logo";
    logo.loading = "lazy";
    logo.decoding = "async";
    logo.alt = headerobj.logoAlt || headerobj.actionButton?.text || "Rockfeller";
    if (headerobj.logo && headerobj.logo.asset && headerobj.logo.asset._ref) {
        logo.src = gerarImagem(headerobj.logo.asset._ref);
    } else if (typeof headerobj.logo === "string") {
        logo.src = headerobj.logo;
    }
    logoLink.appendChild(logo);
    center.appendChild(logoLink);

    // Nav items distribution: left / right
    const items = Array.isArray(headerobj.navItems) ? headerobj.navItems : (Array.isArray(headerobj.links) ? headerobj.links : []);
    const leftNav = document.createElement("nav");
    const leftUl = document.createElement("ul");
    const rightNav = document.createElement("nav");
    const rightUl = document.createElement("ul");

    // If items contain explicit position property, use it. Otherwise split by middle.
    const leftItems = items.filter(i => i && i.position === "left");
    const rightItems = items.filter(i => i && i.position === "right");
    const neutral = items.filter(i => i && !i.position);

    if (!leftItems.length && !rightItems.length && neutral.length) {
        const half = Math.ceil(neutral.length / 2);
        leftItems.push(...neutral.slice(0, half));
        rightItems.push(...neutral.slice(half));
    } else {
        leftItems.push(...neutral.filter((_, idx) => idx % 2 === 0));
        rightItems.push(...neutral.filter((_, idx) => idx % 2 === 1));
    }

    const makeLi = (item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.anchor || item.url || item.link || "#";
        a.textContent = item.title || item.text || item.label || "Link";
        li.appendChild(a);
        return li;
    };

    leftItems.forEach(it => leftUl.appendChild(makeLi(it)));
    rightItems.forEach(it => rightUl.appendChild(makeLi(it)));

    leftNav.appendChild(leftUl);
    rightNav.appendChild(rightUl);
    left.appendChild(leftNav);
    right.appendChild(rightNav);

    // Action button (on right)
    if (headerobj.actionButton && (headerobj.actionButton.link || headerobj.actionButton.text)) {
        const btn = document.createElement("a");
        btn.href = headerobj.actionButton.link || "#";
        btn.textContent = headerobj.actionButton.text || "Ação";
        // prefer style class from CMS, fallback to 'teste_ing'
        const styleClass = headerobj.actionButton.style || "teste_ing";
        btn.className = styleClass + " header__cta";
        right.appendChild(btn);
    }

    // Hamburger menu (on right)
    const hamburger = document.createElement("button");
    hamburger.className = "header__hamburger";
    hamburger.innerHTML = "☰";
    hamburger.setAttribute("aria-label", "menu");

    // Menu mobile - vai conter os links em telas pequenas
    const mobileMenu = document.createElement("nav");
    mobileMenu.className = "header__mobile-menu";

    // Copia todos os links (left + right) para o menu mobile
    leftItems.forEach(it => mobileMenu.appendChild(makeLi(it)));
    rightItems.forEach(it => mobileMenu.appendChild(makeLi(it)));

    // Adiciona o botão CTA também no menu mobile (se existir)
    if (headerobj.actionButton && (headerobj.actionButton.link || headerobj.actionButton.text)) {
        const btn = document.createElement("a");
        btn.href = headerobj.actionButton.link || "#";
        btn.textContent = headerobj.actionButton.text || "Ação";
        btn.className = "header__cta";
        mobileMenu.appendChild(btn);
    }

    // Event listener: clica no hamburguer e abre/fecha o menu
    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });

    // Adiciona o hamburguer no final do header__right
    right.appendChild(hamburger);

    header.appendChild(left);
    header.appendChild(center);
    header.appendChild(right);
    header.appendChild(mobileMenu);

    return header;
}

function gerarImagem(ref) {
    if (!ref) return "";
    const id = ref.replace(/^image-/, "").replace(/-(\w+)$/, ".$1");
    return `https://cdn.sanity.io/images/gx7uk6s7/production/${id}`;
}

