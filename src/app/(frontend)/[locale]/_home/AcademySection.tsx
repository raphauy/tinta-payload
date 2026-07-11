import Image from 'next/image'
import { getScopedI18n } from '@/locales/server'
import { ACADEMY_URL } from '@/utilities/site'
import { ACADEMY_IMAGES } from './data'

export default async function AcademySection() {
  const t = await getScopedI18n('home.academy')

  return (
    <section id="academy" className="bg-[#cfcfcf] dark:bg-[#1c1c1c] w-full scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <Image
              src="/images/09-tinta-academy.png"
              alt="Tinta Academy"
              width={140}
              height={28}
              className="reveal h-7 w-auto mb-6 mx-auto md:mx-0 dark:invert"
            />
            <h2 className="reveal reveal-d1 text-4xl md:text-5xl font-thin text-brand dark:text-white mb-6">
              {t('title')}
            </h2>
            <p className="reveal reveal-d2 text-ink/70 dark:text-white/60 leading-relaxed text-lg">
              {t('desc')}
            </p>
            <div className="reveal reveal-d3 mt-5 flex flex-col items-center md:items-start gap-8">
              <Image
                src="/images/10-wset-approved-programme-provider.png"
                alt="WSET Approved Programme Provider"
                width={160}
                height={64}
                className="h-16 w-auto drop-shadow-sm"
              />
              <a
                href={ACADEMY_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-dark dark:bg-white dark:text-brand-dark dark:hover:bg-white/90 transition-colors"
              >
                {t('cta')}
              </a>
            </div>
          </div>

          <div className="reveal reveal-d2 relative rounded-2xl aspect-square overflow-hidden academy-carousel">
            {ACADEMY_IMAGES.map((img) => (
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
          </div>
        </div>
      </div>
    </section>
  )
}
