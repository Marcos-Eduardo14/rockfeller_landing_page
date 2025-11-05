/**
 * Configurações da aplicação
 * Este arquivo carrega as variáveis de ambiente de forma segura
 */

// Para desenvolvimento local, as variáveis são carregadas do .env
// Para produção, configure as variáveis no seu serviço de hospedagem

const CONFIG = {
  EMAILJS: {
    SERVICE_ID: 'service_agwt22s',
    TEMPLATE_ID: 'template_rockfeller',
    PUBLIC_KEY: 'IEGVkxarhDLCRnVHJ' // Adicione sua Public Key do EmailJS aqui
  }
};

export default CONFIG;

