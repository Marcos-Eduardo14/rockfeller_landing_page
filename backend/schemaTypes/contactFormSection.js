export default {
  name: 'contactFormSection',
  title: 'Seção de Contato',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'Fale Conosco',
      validation: Rule => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Preencha o formulário e entraremos em contato!',
      validation: Rule => Rule.required(),
    },
    {
      name: 'formFields',
      title: 'Campos do Formulário',
      type: 'array',
      of: [{ type: 'formField' }],
      validation: Rule => Rule.required(),
      description: 'Configure os campos do formulário de contato',
    },
    {
      name: 'submitButtonText',
      title: 'Texto do Botão de Envio',
      type: 'string',
      initialValue: 'Enviar',
      validation: Rule => Rule.required(),
    },
    {
      name: 'successMessage',
      title: 'Mensagem de Sucesso',
      type: 'text',
      rows: 2,
      initialValue: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    },
    {
      name: 'errorMessage',
      title: 'Mensagem de Erro',
      type: 'text',
      rows: 2,
      initialValue: 'Ocorreu um erro ao enviar a mensagem. Tente novamente.',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Seção de Contato',
        subtitle: 'Formulário de contato e informações',
      }
    },
  },
}
