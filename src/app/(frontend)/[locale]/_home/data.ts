/**
 * Datos estructurales de la home (rediseño 2026). Los textos traducibles viven en
 * los locales (namespace `home`); acá van solo imágenes, banderas y links.
 */

export type CarouselImage = { src: string; alt: string; delay: string }

// Carrusel de la sección Academy (crossfade, 3 fotos)
export const ACADEMY_IMAGES: CarouselImage[] = [
  {
    src: '/images/11-copas-de-vino-en-una-cata-de-tinta-academy.jpg',
    alt: 'Copas de vino en una cata de Tinta Academy',
    delay: '0s',
  },
  {
    src: '/images/12-copas-de-vino-tinto-y-rosado-sobre-material-de-tinta-academy-con-sello-wset.jpg',
    alt: 'Copas de vino tinto y rosado sobre material de Tinta Academy con sello WSET',
    delay: '-4s',
  },
  {
    src: '/images/13-clase-de-tinta-academy-con-alumnos-y-proyeccion-de-la-cualificacion-wset-nivel-1.jpg',
    alt: 'Clase de Tinta Academy con alumnos y proyección de la cualificación WSET Nivel 1',
    delay: '-8s',
  },
]

// Carrusel de la sección Diferentes (crossfade, 5 fotos)
export const DIFERENTES_IMAGES: CarouselImage[] = [
  {
    src: '/images/20-filas-de-vinedo-con-montanas-aridas-de-fondo.jpg',
    alt: 'Filas de viñedo con montañas áridas de fondo',
    delay: '0s',
  },
  {
    src: '/images/21-manos-exprimiendo-racimos-de-uva-tinta-durante-la-vendimia.jpg',
    alt: 'Manos exprimiendo racimos de uva tinta durante la vendimia',
    delay: '-4s',
  },
  {
    src: '/images/22-cosecha-de-uvas-tintas-en-cajon-de-plastico-entre-las-vides.jpg',
    alt: 'Cosecha de uvas tintas en cajón de plástico entre las vides',
    delay: '-8s',
  },
  {
    src: '/images/23-detalle-de-hojas-de-vid-iluminadas-por-el-sol.jpg',
    alt: 'Detalle de hojas de vid iluminadas por el sol',
    delay: '-12s',
  },
  {
    src: '/images/24-sirviendo-una-copa-de-sauvignon-blanc-traversa-en-el-vinedo.jpg',
    alt: 'Sirviendo una copa de Sauvignon Blanc Traversa en el viñedo',
    delay: '-16s',
  },
]

// Logos del marquee de clientes (se duplican en el render para el loop continuo)
export const CLIENT_LOGOS: { src: string; alt: string }[] = [
  { src: '/images/25-bdc.png', alt: 'BdC' },
  { src: '/images/26-bdm.png', alt: 'BdM' },
  { src: '/images/27-bizarra.png', alt: 'Bizarra' },
  { src: '/images/28-cmo.png', alt: 'CMO' },
  { src: '/images/29-casa-michelle.png', alt: 'Casa Michelle' },
  { src: '/images/30-casa-padic.png', alt: 'Casa Padic' },
  { src: '/images/31-cerro-chapeu.png', alt: 'Cerro Chapeu' },
  { src: '/images/32-deicas.png', alt: 'Deicas' },
  { src: '/images/33-el-capricho.png', alt: 'El Capricho' },
  { src: '/images/34-entramado-montevideo.png', alt: 'Entramado Montevideo' },
  { src: '/images/35-jomi.png', alt: 'Jomi' },
  { src: '/images/36-la-travesia.png', alt: 'La Travesía' },
  { src: '/images/37-barsol.png', alt: 'BarSol' },
  { src: '/images/38-marichal.png', alt: 'Marichal' },
  { src: '/images/39-masintin.png', alt: 'Masintin' },
  { src: '/images/40-nakkal.png', alt: 'Nakkal' },
  { src: '/images/41-narbona.png', alt: 'Narbona' },
  { src: '/images/42-pisano.png', alt: 'Pisano' },
  { src: '/images/43-primavento.png', alt: 'Primavento' },
  { src: '/images/44-sdelsol.png', alt: 'SdelSol' },
  { src: '/images/45-spinoglio.png', alt: 'Spinoglio' },
  { src: '/images/46-familia-traversa.png', alt: 'Familia Traversa' },
  { src: '/images/47-vinos-del-mundo.png', alt: 'Vinos del Mundo' },
  { src: '/images/48-wou.png', alt: 'WoU' },
]
