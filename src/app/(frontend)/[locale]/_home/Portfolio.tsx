import Image from 'next/image'
import { getScopedI18n } from '@/locales/server'
import { BEHANCE_URL } from '@/utilities/site'

export default async function Portfolio() {
  const t = await getScopedI18n('home.portfolio')

  const cases = [
    {
      name: 'Cerro Chapeu',
      subtitle: t('cerroChapeu'),
      image: '/images/14-cerro-chapeu.jpg',
      flag: '🇺🇾',
      country: 'Uruguay',
      href: 'https://www.behance.net/gallery/226044087/Cerro-Chapeu-Creacion-de-Contenido-Mensual',
    },
    {
      name: 'L.A. Cetto',
      subtitle: t('cetto'),
      image: '/images/15-l-a-cetto.jpg',
      flag: '🇲🇽',
      country: 'México',
      href: 'https://www.behance.net/gallery/225970155/LA-Cetto-Estrategia-de-Marca-Contenido-Mensual',
    },
    {
      name: 'Familia Traversa',
      subtitle: t('traversa'),
      image: '/images/16-familia-traversa.jpg',
      flag: '🇺🇾',
      country: 'Uruguay',
      href: 'https://www.behance.net/gallery/225782577/Familia-Traversa-Creacion-de-Contenido-Mensual',
    },
    {
      name: 'Primavento',
      subtitle: t('primavento'),
      image: '/images/17-primavento.jpg',
      flag: '🇨🇱',
      country: 'Chile',
      href: 'https://www.behance.net/gallery/243116085/Primavento-Estrategia-Creacion-de-Contenido-Web',
    },
    {
      name: 'Casa Padic',
      subtitle: t('casaPadic'),
      image: '/images/18-casa-padic.jpg',
      flag: '🇨🇱',
      country: 'Chile',
      href: 'https://www.behance.net/gallery/233749525/Casa-Padic-Estrategia-Creacion-de-Contenido',
    },
    {
      name: 'Entramado Montevideo',
      subtitle: t('entramado'),
      image: '/images/19-entramado-montevideo.jpg',
      flag: '🇺🇾',
      country: 'Uruguay',
      href: 'https://www.behance.net/gallery/235830381/Entramado-Montevideo-Estrategia-de-Marca',
    },
  ]

  return (
    <section id="portfolio" className="bg-brand text-white w-full scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto mb-14 text-center">
          <h2 className="reveal text-4xl md:text-5xl font-thin">{t('title')}</h2>
          <p className="reveal reveal-d1 mt-4 text-white/70 leading-relaxed">{t('desc')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener"
              className={`reveal ${i > 0 ? `reveal-d${i}` : ''} group relative block bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors`}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/30 backdrop-blur flex items-center justify-center text-sm"
                  title={c.country}
                >
                  {c.flag}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                  <p className="text-lg font-normal text-white leading-tight">{c.name}</p>
                  <p className="text-[10px] uppercase tracking-wide text-white/60 font-medium mt-0.5">
                    {c.subtitle}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={BEHANCE_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          >
            {t('more')}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
