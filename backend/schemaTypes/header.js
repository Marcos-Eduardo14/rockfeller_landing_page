export default {
  name: 'header',
  title: 'Cabeçalho',
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
      name: 'navItems',
      title: 'Itens de Navegação',
      type: 'array',
      of: [{ type: 'navItem' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'actionButton',
      title: 'Botão de Ação Principal',
      type: 'button',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Cabeçalho',
        subtitle: 'Configurações do header da página',
      }
    },
  },
}
