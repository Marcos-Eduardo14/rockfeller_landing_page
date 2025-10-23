export default {
  name: 'courseCategory',
  title: 'Categoria de Curso',
  type: 'object',
  fields: [
    {
      name: 'categoryName',
      title: 'Nome da Categoria',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainDescription',
      title: 'Descrição Principal',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required(),
    },
    {
      name: 'detailedDescription',
      title: 'Descrição Detalhada',
      type: 'text',
      rows: 3,
    },
    {
      name: 'backgroundImage',
      title: 'Imagem de Fundo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'categoryName',
      subtitle: 'mainDescription',
      media: 'backgroundImage',
    },
  },
}
