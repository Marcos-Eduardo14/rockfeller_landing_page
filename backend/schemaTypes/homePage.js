export default {
  name: 'homePage',
  title: 'Página Inicial',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Página',
      type: 'string',
      initialValue: 'Rockefeller - Aprenda inglês de verdade',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descrição da Página (SEO)',
      type: 'text',
      rows: 3,
      description: 'Descrição que aparece nos resultados de busca',
    },
    {
      name: 'header',
      title: 'Configurações do Cabeçalho',
      type: 'reference',
      to: [{ type: 'header' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'heroSection',
      title: 'Seção Hero',
      type: 'reference',
      to: [{ type: 'heroSection' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'aboutSection',
      title: 'Seção Sobre',
      type: 'reference',
      to: [{ type: 'aboutSection' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'coursesSection',
      title: 'Seção de Cursos',
      type: 'reference',
      to: [{ type: 'coursesSection' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'contactSection',
      title: 'Seção de Contato',
      type: 'reference',
      to: [{ type: 'contactFormSection' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'testimonialsSection',
      title: 'Seção de Depoimentos',
      type: 'reference',
      to: [{ type: 'testimonialsSection' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'footer',
      title: 'Rodapé',
      type: 'reference',
      to: [{ type: 'footer' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'seo',
      title: 'Configurações de SEO',
      type: 'object',
      fields: [
        {
          name: 'keywords',
          title: 'Palavras-chave',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Palavras-chave separadas por vírgula',
        },
        {
          name: 'ogImage',
          title: 'Imagem para Redes Sociais',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Imagem que aparece quando a página é compartilhada',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Página Inicial',
        subtitle: 'Configuração completa da página inicial',
      }
    },
  },
}
