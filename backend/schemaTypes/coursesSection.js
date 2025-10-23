export default {
  name: 'coursesSection',
  title: 'Seção de Cursos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'Nossos Cursos',
      validation: Rule => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Encontre o curso ideal para você!',
      validation: Rule => Rule.required(),
    },
    {
      name: 'courseCategories',
      title: 'Categorias de Cursos',
      type: 'array',
      of: [{ type: 'courseCategory' }],
      validation: Rule => Rule.required().min(3),
      description: 'Adicione pelo menos 3 categorias (Kids, Teens, Adults)',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Seção de Cursos',
        subtitle: 'Categorias de cursos oferecidos',
      }
    },
  },
}
