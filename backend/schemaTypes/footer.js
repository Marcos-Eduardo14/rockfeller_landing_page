export default {
  name: 'footer',
  title: 'Rodapé',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'navColumns',
      title: 'Colunas de Navegação',
      type: 'array',
      of: [{ type: 'footerNavColumn' }],
      validation: Rule => Rule.required(),
      description: 'Crie colunas para organizar os links do rodapé',
    },
    {
      name: 'contactInfo',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Endereço',
          type: 'text',
          rows: 2,
        },
        {
          name: 'phone',
          title: 'Telefone',
          type: 'string',
        },
        {
          name: 'email',
          title: 'E-mail',
          type: 'string',
        },
        {
          name: 'businessHours',
          title: 'Horário de Funcionamento',
          type: 'text',
          rows: 2,
        },
      ],
    },
    {
      name: 'socialMediaLinks',
      title: 'Links de Redes Sociais',
      type: 'array',
      of: [{ type: 'socialLink' }],
    },
    {
      name: 'copyrightText',
      title: 'Texto de Copyright',
      type: 'string',
      initialValue: '© 2024 Rockefeller. Todos os direitos reservados.',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Rodapé',
        subtitle: 'Configurações do rodapé da página',
      }
    },
  },
}
