export default {
  name: 'navItem',
  title: 'Item de Navegação',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
}
