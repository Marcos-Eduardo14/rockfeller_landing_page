export default {
  name: 'infoBlock',
  title: 'Bloco de Informação',
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
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link (opcional)',
      type: 'url',
      description: 'Link para "Saiba mais" ou similar',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'icon',
    },
  },
}
