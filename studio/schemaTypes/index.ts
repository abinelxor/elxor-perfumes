import {imageWithAlt} from './objects/imageWithAlt'
import {seo} from './objects/seo'
import {faqItem} from './objects/faqItem'
import {product} from './documents/product'
import {page} from './documents/page'
import {siteSettings} from './documents/siteSettings'

export const schemaTypes = [
  // documents
  siteSettings,
  product,
  page,
  // reusable objects
  seo,
  imageWithAlt,
  faqItem,
]
