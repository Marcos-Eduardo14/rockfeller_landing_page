export default {
  name: 'button',
  title: 'Botão',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Texto do Botão',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link do Botão',
      type: 'url',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'link',
    },
  },
}
