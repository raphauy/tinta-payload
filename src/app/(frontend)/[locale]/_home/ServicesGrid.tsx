import Image from 'next/image'
import { getScopedI18n } from '@/locales/server'

export default async function ServicesGrid() {
  const t = await getScopedI18n('home.services')

  const cards = [
    { icon: '/images/03-branding.png', iconClass: 'w-9 h-9', title: t('brandingTitle'), desc: t('brandingDesc') },
    { icon: '/images/04-performance.png', iconClass: 'w-7 h-7', title: t('performanceTitle'), desc: t('performanceDesc') },
    { icon: '/images/05-tecnologia.png', iconClass: 'w-7 h-7', title: t('tecnologiaTitle'), desc: t('tecnologiaDesc') },
    { icon: '/images/06-experiencias.png', iconClass: 'w-9 h-9', title: t('experienciasTitle'), desc: t('experienciasDesc') },
    { icon: '/images/07-editorial.png', iconClass: 'w-7 h-7 -translate-y-1', title: t('editorialTitle'), desc: t('editorialDesc') },
    { icon: '/images/08-pr.png', iconClass: 'w-7 h-7', title: t('prTitle'), desc: t('prDesc') },
  ]

  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6 py-24 w-full scroll-mt-20">
      <div className="max-w-2xl mx-auto mb-14 text-center">
        <h2 className="reveal text-4xl md:text-5xl font-thin text-brand dark:text-white mb-4">
          {t('sectionTitle')}
        </h2>
        <p className="reveal reveal-d1 text-ink/70 dark:text-white/60 leading-relaxed">
          {t('sectionDesc')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={`reveal ${i > 0 ? `reveal-d${i}` : ''} border border-brand/15 dark:border-white/10 rounded-2xl p-8 hover:border-brand/40 dark:hover:border-white/30 transition-colors`}
          >
            <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-600 flex items-center justify-center text-brand mb-6">
              <Image
                src={card.icon}
                alt={card.title}
                width={36}
                height={36}
                className={`${card.iconClass} object-contain`}
              />
            </div>
            <h3 className="text-lg font-normal text-brand dark:text-white mb-2">{card.title}</h3>
            <p className="text-sm text-ink/70 dark:text-white/50 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
