import Image from 'next/image'
import { getScopedI18n } from '@/locales/server'
import { DIFERENTES_IMAGES } from './data'

export default async function Diferentes() {
  const t = await getScopedI18n('home.diferentes')

  return (
    <section id="diferentes" className="max-w-7xl mx-auto px-6 py-24 w-full">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="text-center">
          <h2 className="reveal text-4xl md:text-5xl font-thin text-brand dark:text-white mb-6">
            {t('title')}
          </h2>
          <p className="reveal reveal-d1 text-ink/70 dark:text-white/60 leading-relaxed text-lg">
            {t('desc')}
          </p>
        </div>
        <div className="reveal reveal-d2 relative rounded-2xl aspect-square overflow-hidden diferentes-carousel">
          {DIFERENTES_IMAGES.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="carousel-img object-cover"
              style={{ animationDelay: img.delay }}
            />
          ))}
          <span className="absolute top-3 right-3 z-10 bg-black/30 backdrop-blur rounded-full px-3 py-1.5 text-xs font-medium text-white">
            {t('badge')}
          </span>
        </div>
      </div>
    </section>
  )
}
