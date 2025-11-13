export default {
  name: 'featureItem',
  title: 'Item de Diferencial',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Ícone',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'description',
      media: 'icon',
    },
  },
}
