function gerarImagem(img) {
  const id = img.replace(/^image-/, '').replace(/-(\w+)$/, '.$1');
  return `https://cdn.sanity.io/images/gx7uk6s7/production/${id}`;
}

export function footerHtml(footerData) {
  if (!footerData) {
    return document.createElement("footer");
  }

  const footer = document.createElement("footer");
  footer.style.width = "100%";

  // Container principal com fundo azul escuro
  const mainContainer = document.createElement("div");
  mainContainer.style.cssText = `
    background-color: #0a2540;
    color: #ffffff;
    padding: 60px 40px 40px;
    position: relative;
    user-select: none;
  `;

  // Linha amarela no topo
  const yellowLine = document.createElement("div");
  yellowLine.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #f1b706;
  `;
  mainContainer.appendChild(yellowLine);

  // Container do conteúdo principal
  const contentContainer = document.createElement("div");
  contentContainer.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    max-width: 1200px;
    margin: 0 auto;
  `;

  // Logo à esquerda
  const logoContainer = document.createElement("div");
  logoContainer.userSelect = 'none'
  logoContainer.style.cssText = `
    flex: 0 0 auto;
    min-width: 200px;
  `;

  if (footerData.logo && footerData.logo.asset) {
    const logoImg = document.createElement("img");
    logoImg.src = gerarImagem(footerData.logo.asset._ref);
    logoImg.alt = "Rockefeller Language Center";
    logoImg.style.cssText = `
      max-width: 250px;
      height: auto;
      filter: brightness(0) invert(1);
    `;
    logoContainer.appendChild(logoImg);
  }

  // Container das colunas
  const columnsContainer = document.createElement("div");
  columnsContainer.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    flex: 1;
  `;

  // Renderizar colunas de navegação
  if (footerData.navColumns && Array.isArray(footerData.navColumns)) {
    footerData.navColumns.forEach((column, index) => {
      const columnDiv = document.createElement("div");
      columnDiv.style.cssText = `
        flex: 0 0 auto;
        min-width: 150px;
      `;

      // Título da coluna
      const columnTitle = document.createElement("h3");
      columnTitle.textContent = column.title || "";
      columnTitle.style.cssText = `
        font-size: 18px;
        font-weight: bold;
        margin: 0 0 20px 0;
        color: #ffffff;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
      columnDiv.appendChild(columnTitle);

      // Lista de links
      const linksList = document.createElement("ul");
      linksList.style.cssText = `
        list-style: none;
        padding: 0;
        margin: 0;
      `;

      if (column.links && Array.isArray(column.links)) {
        column.links.forEach((link) => {
          const listItem = document.createElement("li");
          listItem.style.cssText = `
            margin-bottom: 12px;
          `;

          const linkElement = document.createElement("a");
          linkElement.textContent = link.title || "";
          linkElement.href = link.anchor || link.link || "#";
          linkElement.style.cssText = `
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s;
            display: block;
          `;

          // Se for a coluna "Fale Conosco", adicionar ícones
          if (column.title === "Fale Conosco") {
            const iconWrapper = document.createElement("div");
            iconWrapper.style.cssText = `
              display: flex;
              align-items: center;
              gap: 8px;
            `;

            // Determinar ícone baseado no conteúdo
            let iconPath = "";
            const linkText = link.title || "";
            
            if (linkText.includes("@") || linkText.includes("gmail") || linkText.includes("email")) {
              // Ícone de email
              iconPath = "assets/images/Email.svg";
            } else if (linkText.includes("(") && linkText.includes(")")) {
              // Ícone de telefone
              iconPath = "assets/images/Phone.svg";
            } else if (linkText.includes("R.") || linkText.includes("Centro") || linkText.includes("Toledo") || linkText.includes("PR")) {
              // Ícone de localização
              iconPath = "assets/images/Location.svg";
            }

            if (iconPath) {
              const iconImg = document.createElement("img");
              iconImg.userSelect = 'none'
              iconImg.src = iconPath;
              iconImg.alt = "";
              iconImg.style.cssText = `
                width: 28px;
                height: 28px;
                flex-shrink: 0;
                object-fit: contain;
              `;
              iconWrapper.appendChild(iconImg);
              iconWrapper.appendChild(linkElement);
              listItem.appendChild(iconWrapper);
            } else {
              listItem.appendChild(linkElement);
            }
          } else {
            listItem.appendChild(linkElement);
          }

          // Hover effect
          linkElement.addEventListener("mouseenter", () => {
            linkElement.style.color = "#f1b706";
          });
          linkElement.addEventListener("mouseleave", () => {
            linkElement.style.color = "#ffffff";
          });

          linksList.appendChild(listItem);
        });
      }

      columnDiv.appendChild(linksList);

      // Adicionar ícones de redes sociais após os telefones na coluna "Fale Conosco"
      if (column.title === "Fale Conosco" && footerData.socialMediaLinks && Array.isArray(footerData.socialMediaLinks)) {
        const socialContainer = document.createElement("div");
        socialContainer.style.cssText = `
          display: flex;
          gap: 20px;
          margin-top: 20px;
        `;

        // Mapeamento de plataformas para arquivos SVG locais
        const socialIconMap = {
          instagram: "assets/images/Instagram.svg",
          youtube: "assets/images/YouTube.svg",
          tiktok: "assets/images/TikTok.svg",
          linkedin: "assets/images/LinkedIn.svg"
        };

        footerData.socialMediaLinks.forEach((socialLink) => {
          const socialIconLink = document.createElement("a");
          socialIconLink.href = socialLink.url || "#";
          socialIconLink.target = "_blank";
          socialIconLink.rel = "noopener noreferrer";
          socialIconLink.style.cssText = `
            display: inline-block;
            width: 50px;
            height: 50px;
            transition: opacity 0.3s;
          `;

          // Usar ícone SVG local se disponível, senão usar do Sanity
          const platform = (socialLink.platform || "").toLowerCase();
          const localIconPath = socialIconMap[platform];

          if (localIconPath) {
            const socialIconImg = document.createElement("img");
            socialIconImg.src = localIconPath;
            socialIconImg.alt = socialLink.platform || "Social Media";
            socialIconImg.style.cssText = `
              width: 100%;
              height: 100%;
            `;
            socialIconLink.appendChild(socialIconImg);
          } else if (socialLink.icon && socialLink.icon.asset) {
            // Fallback para ícone do Sanity se não houver SVG local
            const socialIconImg = document.createElement("img");
            socialIconImg.src = gerarImagem(socialLink.icon.asset._ref);
            socialIconImg.alt = socialLink.platform || "Social Media";
            socialIconImg.style.cssText = `
              width: 100%;
              height: 100%;
              filter: brightness(0) invert(1);
            `;
            socialIconLink.appendChild(socialIconImg);
          }

          socialIconLink.addEventListener("mouseenter", () => {
            socialIconLink.style.opacity = "0.7";
          });
          socialIconLink.addEventListener("mouseleave", () => {
            socialIconLink.style.opacity = "1";
          });

          socialContainer.appendChild(socialIconLink);
        });

        columnDiv.appendChild(socialContainer);
      }

      columnsContainer.appendChild(columnDiv);
    });
  }

  contentContainer.appendChild(logoContainer);
  contentContainer.appendChild(columnsContainer);
  mainContainer.appendChild(contentContainer);

  // Rodapé com copyright (fundo azul brilhante)
  const copyrightContainer = document.createElement("div");
  copyrightContainer.style.cssText = `
    background-color: #0066cc;
    color: #ffffff;
    text-align: center;
    padding: 20px;
    user-select: none;
  `;

  const copyrightText = document.createElement("p");
  copyrightText.textContent = footerData.copyrightText || `© ${new Date().getFullYear()} Rockefeller Franchising`;
  copyrightText.style.cssText = `
    margin: 0;
    font-size: 14px;
  `;
  copyrightContainer.appendChild(copyrightText);

  footer.appendChild(mainContainer);
  footer.appendChild(copyrightContainer);

  return footer;
}
