export default {
  name: 'socialLink',
  title: 'Link de Rede Social',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Plataforma',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'TikTok', value: 'tiktok' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL da Rede Social',
      type: 'url',
      validation: Rule => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Ícone Customizado',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Deixe vazio para usar ícone padrão da plataforma',
    },
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
    },
  },
}
