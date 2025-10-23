export default {
  name: 'heroSection',
  title: 'Seção Hero (Principal)',
  type: 'document',
  fields: [
    {
      name: 'mainImage',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Seção principal',
        subtitle: 'Carrosel da página',
      }
    },
  },
}
