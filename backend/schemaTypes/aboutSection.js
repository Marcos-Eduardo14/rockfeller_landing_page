export default {
  name: 'aboutSection',
  title: 'Seção Sobre (À Rockefeller)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'À Rockefeller',
      validation: Rule => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'O que nos torna diferentes?',
      validation: Rule => Rule.required(),
    },
    {
      name: 'features',
      title: 'Diferenciais',
      type: 'array',
      of: [{ type: 'featureItem' }],
      validation: Rule => Rule.required().min(4),
      description: 'Adicione pelo menos 4 diferenciais',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Seção Sobre',
        subtitle: 'Diferenciais da Rockefeller',
      }
    },
  },
}
