export default {
  name: 'footerNavColumn',
  title: 'Coluna de Navegação do Rodapé',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Título da Coluna',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'navItem' }],
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'links.length',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: `${subtitle} link(s)`,
      }
    },
  },
}
