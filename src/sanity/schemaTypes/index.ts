import {imageWithAlt} from './objects/imageWithAlt'
import {seo} from './objects/seo'
import {faqItem} from './objects/faqItem'
import {product} from './documents/product'
import {page} from './documents/page'
import {siteSettings} from './documents/siteSettings'
import {codeSnippet} from './documents/codeSnippet'
import {homePage} from './documents/homePage'
import {heroChapter, sectionHeader, splitSection, valueItem} from './objects/homeBlocks'

export const schemaTypes = [
  // documents
  siteSettings,
  homePage,
  product,
  page,
  codeSnippet,
  // reusable objects
  seo,
  imageWithAlt,
  faqItem,
  sectionHeader,
  splitSection,
  heroChapter,
  valueItem,
]
