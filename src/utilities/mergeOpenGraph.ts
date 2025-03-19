import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Tinta Wine',
  title: 'Tinta - Embajadores de la Cultura del Vino',
  description:
    'Impulsamos el mundo del vino con marketing, comunicación y educación certificada, compartiendo conocimiento para conectar y crecer.',
  images: [
    {
      url: `${getServerSideURL()}/Tinta_Open_Graph.jpg`,
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
