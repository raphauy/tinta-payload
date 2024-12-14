import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Tinta Wine',
  title: 'Tinta - Educación y Marketing del vino',
  description: 'Sitio web de Tinta, una agencia de marketing especializada en el sector del vino.',
  images: [
    {
      url: `${getServerSideURL()}/Tinta_Logotipo_Fondo-transparente.png`,
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
