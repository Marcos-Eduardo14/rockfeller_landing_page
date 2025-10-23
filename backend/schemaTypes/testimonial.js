export default {
  name: 'testimonial',
  title: 'Depoimento',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: 'Texto do Depoimento',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    },
    {
      name: 'authorName',
      title: 'Nome do Autor',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Avaliação (estrelas)',
      type: 'number',
      options: {
        list: [
          { title: '1 estrela', value: 1 },
          { title: '2 estrelas', value: 2 },
          { title: '3 estrelas', value: 3 },
          { title: '4 estrelas', value: 4 },
          { title: '5 estrelas', value: 5 },
        ],
      },
      validation: Rule => Rule.min(1).max(5),
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'quote',
      media: 'authorImage',
    },
  },
}
