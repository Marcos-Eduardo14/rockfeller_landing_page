export { formularioHtml };

function formularioHtml(formularioobj) {
  // Segurança: caso não haja dados
  if (!formularioobj) return document.createTextNode("Nenhum formulário encontrado.");

  // Criar container principal
  const containerFormulario = document.createElement("section");
  containerFormulario.classList.add("container_formulario");
  containerFormulario.id = "Matricule-se";

  // Barra decorativa superior
  const barraTop = document.createElement("div");
  barraTop.classList.add("barra_decorativa");

  // Botão "Seja um Rocker!"
  const botaoRocker = document.createElement("button");
  botaoRocker.classList.add("botao_seja_rocker");
  botaoRocker.textContent = "Seja um Rocker!";

  // Barra decorativa inferior do botão
  const barraBottom = document.createElement("div");
  barraBottom.classList.add("barra_decorativa");

  // Título
  const titulo = document.createElement("h1");
  titulo.classList.add("titulo_formulario");
  titulo.textContent = formularioobj.title || "Matricule-se";

  // Container do formulário (fundo amarelo)
  const formContainer = document.createElement("div");
  formContainer.classList.add("form_container");

  // Subtítulo (texto descritivo)
  const subtitulo = document.createElement("p");
  subtitulo.classList.add("subtitulo_formulario");
  subtitulo.innerHTML = formatarSubtitulo(formularioobj.subtitle || "");

  // Criar o formulário
  const form = document.createElement("form");
  form.classList.add("formulario");
  form.id = "formulario_matricula";

  // Adicionar campo Nome (sempre presente)
  const campoNome = criarCampo({
    label: "Nome",
    type: "text",
    required: true
  });
  form.appendChild(campoNome);

  // Adicionar campos dinâmicos do JSON
  if (formularioobj.formFields && Array.isArray(formularioobj.formFields)) {
    formularioobj.formFields.forEach(field => {
      const campo = criarCampo(field);
      form.appendChild(campo);
    });
  }

  // Botão de enviar
  const botaoEnviar = document.createElement("button");
  botaoEnviar.type = "submit";
  botaoEnviar.classList.add("botao_enviar");
  botaoEnviar.textContent = formularioobj.submitButtonText || "Enviar";

  // Container de mensagens (sucesso/erro)
  const mensagemContainer = document.createElement("div");
  mensagemContainer.classList.add("mensagem_container");
  mensagemContainer.style.display = "none";

  // Adicionar evento de submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(form, mensagemContainer, formularioobj);
  });

  // Montar o formulário
  form.appendChild(botaoEnviar);
  formContainer.appendChild(subtitulo);
  formContainer.appendChild(form);
  formContainer.appendChild(mensagemContainer);

  // Barras decorativas finais
  const barraFinal1 = document.createElement("div");
  barraFinal1.classList.add("barra_decorativa");
  const barraFinal2 = document.createElement("div");
  barraFinal2.classList.add("barra_decorativa");

  // Montar tudo
  containerFormulario.appendChild(barraTop);
  containerFormulario.appendChild(botaoRocker);
  containerFormulario.appendChild(barraBottom);
  containerFormulario.appendChild(titulo);
  containerFormulario.appendChild(formContainer);
  containerFormulario.appendChild(barraFinal1);
  containerFormulario.appendChild(barraFinal2);

  return containerFormulario;
}

function criarCampo(field) {
  const campoContainer = document.createElement("div");
  campoContainer.classList.add("campo_container");

  const label = document.createElement("label");
  label.classList.add("campo_label");
  label.textContent = field.label;
  if (field.required) {
    label.innerHTML += ' <span class="campo_obrigatorio">*</span>';
  }

  let input;

  if (field.type === "select") {
    // Criar select
    input = document.createElement("select");
    input.classList.add("campo_input", "campo_select");
    
    // Opção padrão
    const optionDefault = document.createElement("option");
    optionDefault.value = "";
    optionDefault.textContent = "Selecione...";
    input.appendChild(optionDefault);

    // Adicionar opções
    if (field.options && Array.isArray(field.options)) {
      field.options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        input.appendChild(opt);
      });
    }
  } else {
    // Criar input normal
    input = document.createElement("input");
    input.classList.add("campo_input");
    input.type = field.type || "text";
    input.placeholder = "";
  }

  input.name = field.label.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
  input.required = field.required || false;

  campoContainer.appendChild(label);
  campoContainer.appendChild(input);

  return campoContainer;
}

function formatarSubtitulo(texto) {
  // Adiciona negrito nas partes específicas
  return texto
    .replace("formulário de matrícula", "<strong>formulário de matrícula</strong>")
    .replace("suas informações estão seguras", "<strong>suas informações estão seguras</strong>");
}

function handleFormSubmit(form, mensagemContainer, formularioobj) {
  // Coletar dados do formulário
  const formData = new FormData(form);
  const dados = Object.fromEntries(formData);

  console.log("Dados do formulário:", dados);

  // Simular envio (aqui você pode adicionar lógica real de envio)
  mensagemContainer.style.display = "block";
  mensagemContainer.classList.remove("mensagem_erro");
  mensagemContainer.classList.add("mensagem_sucesso");
  mensagemContainer.textContent = formularioobj.successMessage || "Mensagem enviada com sucesso!";

  // Limpar formulário após 2 segundos
  setTimeout(() => {
    form.reset();
    mensagemContainer.style.display = "none";
  }, 3000);
}