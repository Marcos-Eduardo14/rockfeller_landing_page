export { formularioHtml };
import CONFIG from './config.js';

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

  // Título
  const titulo = document.createElement("h1");
  titulo.classList.add("titulo_formulario");
  titulo.textContent = formularioobj.title || "Matricule-se";

  const bar_title= document.createElement("div");
  bar_title.classList.add("bar_title");

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
  containerFormulario.appendChild(titulo);
  containerFormulario.appendChild(bar_title);
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

  // Aplicar máscara se necessário
  aplicarMascara(input, field);

  campoContainer.appendChild(label);
  campoContainer.appendChild(input);

  return campoContainer;
}

function aplicarMascara(input, field) {
  // Detectar tipo de máscara baseado no label ou tipo
  const label = field.label.toLowerCase();
  
  if (label.includes("telefone") || label.includes("celular") || label.includes("whatsapp")) {
    input.addEventListener("input", mascaraTelefone);
    input.maxLength = 15;
  } else if (label.includes("cpf")) {
    input.addEventListener("input", mascaraCPF);
    input.maxLength = 14;
  } else if (label.includes("cep")) {
    input.addEventListener("input", mascaraCEP);
    input.maxLength = 9;
  } else if (field.type === "date" || label.includes("data") || label.includes("nascimento")) {
    if (field.type !== "date") {
      input.addEventListener("input", mascaraData);
      input.maxLength = 10;
      input.placeholder = "dd/mm/aaaa";
    }
  } else if (label.includes("rg")) {
    input.addEventListener("input", mascaraRG);
    input.maxLength = 12;
  }
}

function mascaraTelefone(e) {
  let valor = e.target.value.replace(/\D/g, "");
  
  if (valor.length <= 10) {
    // Telefone fixo: (99) 9999-9999
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    // Celular: (99) 99999-9999
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  }
  
  e.target.value = valor;
}

function mascaraCPF(e) {
  let valor = e.target.value.replace(/\D/g, "");
  
  // 999.999.999-99
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  
  e.target.value = valor;
}

function mascaraCEP(e) {
  let valor = e.target.value.replace(/\D/g, "");
  
  // 99999-999
  valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  
  e.target.value = valor;
}

function mascaraData(e) {
  let valor = e.target.value.replace(/\D/g, "");
  
  // dd/mm/aaaa
  valor = valor.replace(/(\d{2})(\d)/, "$1/$2");
  valor = valor.replace(/(\d{2})(\d)/, "$1/$2");
  
  e.target.value = valor;
}

function mascaraRG(e) {
  let valor = e.target.value.replace(/\D/g, "");
  
  // 99.999.999-9
  valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1})$/, "$1-$2");
  
  e.target.value = valor;
}

function formatarSubtitulo(texto) {
  // Adiciona negrito nas partes específicas
  return texto
    .replace("formulário de matrícula", "<strong>formulário de matrícula</strong>")
    .replace("suas informações estão seguras", "<strong>suas informações estão seguras</strong>");
}

async function handleFormSubmit(form, mensagemContainer, formularioobj) {
  // Coletar dados do formulário
  const formData = new FormData(form);
  const dados = Object.fromEntries(formData);

  console.log("Dados do formulário:", dados);

  // Mostrar estado de carregamento
  mensagemContainer.style.display = "block";
  mensagemContainer.classList.remove("mensagem_erro", "mensagem_sucesso");
  mensagemContainer.textContent = "Enviando...";

  try {
    // Inicializar EmailJS se ainda não foi inicializado
    if (typeof emailjs !== 'undefined' && CONFIG.EMAILJS.PUBLIC_KEY) {
      emailjs.init(CONFIG.EMAILJS.PUBLIC_KEY);
    } else {
      throw new Error("EmailJS não configurado. Por favor, adicione sua PUBLIC_KEY no arquivo config.js");
    }

    // Preparar template params com design do app
    const templateParams = {
      to_name: "Equipe Rockfeller",
      from_name: dados.nome || "Não informado",
      reply_to: dados.email || "email@nao-informado.com",
      telefone: dados.telefone || dados.celular || dados.whatsapp || "Não informado",
      cpf: dados.cpf || "",
      data_nascimento: dados.data_nascimento || dados.data_de_nascimento || "",
      curso_interesse: dados.curso || dados.curso_de_interesse || "",
      mensagem: dados.mensagem || "",
      // Campos adicionais que podem estar no formulário
      campos_extras: JSON.stringify(dados, null, 2)
    };

    // Enviar email usando EmailJS
    const response = await emailjs.send(
      CONFIG.EMAILJS.SERVICE_ID,
      CONFIG.EMAILJS.TEMPLATE_ID,
      templateParams
    );

    console.log("Email enviado com sucesso!", response);

    // Mostrar mensagem de sucesso
    mensagemContainer.classList.remove("mensagem_erro");
    mensagemContainer.classList.add("mensagem_sucesso");
    mensagemContainer.textContent = formularioobj.successMessage || "Mensagem enviada com sucesso! Em breve entraremos em contato.";

    // Limpar formulário após 3 segundos
    setTimeout(() => {
      form.reset();
      mensagemContainer.style.display = "none";
    }, 3000);

  } catch (error) {
    console.error("Erro ao enviar email:", error);

    // Mostrar mensagem de erro
    mensagemContainer.classList.remove("mensagem_sucesso");
    mensagemContainer.classList.add("mensagem_erro");
    
    let mensagemErro = "Erro ao enviar. Por favor, tente novamente.";
    
    if (error.message && error.message.includes("PUBLIC_KEY")) {
      mensagemErro = "Serviço de email não configurado. Entre em contato pelo telefone.";
    }
    
    mensagemContainer.textContent = mensagemErro;

    // Esconder mensagem de erro após 5 segundos
    setTimeout(() => {
      mensagemContainer.style.display = "none";
    }, 5000);
  }
}