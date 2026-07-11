/**
 * Constantes compartidas del sitio (rediseño 2026).
 * Centraliza WhatsApp, links externos y redes para no repetirlos por componente.
 */

// WhatsApp de Tinta, con mensaje pre-cargado. Único texto para TODOS los botones
// de WhatsApp del sitio (header, hero, contacto, footer, botón flotante).
export const WHATSAPP_PHONE = '59892265737'
export const WHATSAPP_TEXT = '¡Hola! Vengo de la web de Tinta y quiero más información.'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_TEXT)}`

// Links externos
export const ACADEMY_URL = 'https://academy.tinta.wine/'
export const BLOG_URL = '/posts'
export const BEHANCE_URL = 'https://www.behance.net/tintawine'

// Contacto (footer)
export const CONTACT_EMAIL = 'hola@tinta.wine'
export const LOCATIONS = [
  { city: 'Montevideo, Uruguay', phone: '+598 92 265 737', wa: '59892265737' },
  { city: 'Santiago, Chile', phone: '+56 9 9359 1404', wa: '56993591404' },
]

// Redes sociales
export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/tinta.wine' },
  { label: 'Facebook', href: 'https://www.facebook.com/tintawineagencia' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/tintawine' },
  { label: 'TikTok', href: 'https://tiktok.com/@tinta.wine' },
]
