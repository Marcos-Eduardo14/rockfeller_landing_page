export default {
  name: 'testimonialsSection',
  title: 'Seção de Depoimentos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'O que nossos Rockers dizem sobre nós',
      validation: Rule => Rule.required(),
    },
    {
      name: 'testimonials',
      title: 'Depoimentos',
      type: 'array',
      of: [{ type: 'testimonial' }],
      validation: Rule => Rule.required().min(3),
      description: 'Adicione pelo menos 3 depoimentos',
    },
    {
      name: 'showRatings',
      title: 'Mostrar Avaliações (estrelas)',
      type: 'boolean',
      initialValue: true,
      description: 'Exibir ou não as estrelas de avaliação nos depoimentos',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Seção de Depoimentos',
        subtitle: 'Depoimentos dos alunos',
      }
    },
  },
}
