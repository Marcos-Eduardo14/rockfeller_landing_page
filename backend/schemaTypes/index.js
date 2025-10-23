// Tipos de objeto reutilizáveis
import button from './button'
import navItem from './navItem'
import socialLink from './socialLink'
import infoBlock from './infoBlock'
import featureItem from './featureItem'
import courseCategory from './courseCategory'
import testimonial from './testimonial'
import footerNavColumn from './footerNavColumn'
import formField from './formField'

// Seções da página
import header from './header'
import heroSection from './heroSection'
import aboutSection from './aboutSection'
import coursesSection from './coursesSection'
import contactFormSection from './contactFormSection'
import testimonialsSection from './testimonialsSection'
import footer from './footer'

// Página completa
import homePage from './homePage'

export const schemaTypes = [
  // Documentos principais (aparecem no menu do Sanity Studio)
  homePage,
  header,
  heroSection,
  aboutSection,
  coursesSection,
  contactFormSection,
  testimonialsSection,
  footer,

  // Tipos de objeto (componentes reutilizáveis)
  button,
  navItem,
  socialLink,
  infoBlock,
  featureItem,
  courseCategory,
  testimonial,
  footerNavColumn,
  formField,
]
