import Image from 'next/image'
import { getScopedI18n } from '@/locales/server'
import { WhatsAppCta } from '../_shared/whatsapp-cta'

export default async function Hero() {
  const t = await getScopedI18n('home.hero')
  const tMenu = await getScopedI18n('menu')

  return (
    <section className="relative overflow-hidden bg-[#dbdbdb] dark:bg-[#141414] w-full">
      <Image
        src="/images/02-imagen-2.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        priority
        className="object-cover pointer-events-none select-none opacity-70 dark:opacity-30"
      />
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-28 relative z-10 flex flex-col items-center text-center">
        <h1 className="reveal load-now text-5xl md:text-7xl font-thin leading-[1.08] max-w-3xl text-brand dark:text-white">
          {t('titleTop')}
          <br />
          <span className="font-medium">{t('titleBottom')}</span>
        </h1>
        <p className="reveal load-now reveal-d1 mt-6 max-w-xl text-base md:text-lg text-ink/70 dark:text-white/60 leading-relaxed">
          {t('copy')}
        </p>
        <div className="reveal load-now reveal-d2 mt-10 flex flex-wrap gap-4 justify-center">
          <WhatsAppCta label={tMenu('talk')} variant="dark" />
          <a
            href="#servicios"
            className="border border-brand/30 dark:border-white/30 text-brand dark:text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand/5 dark:hover:bg-white/10 transition-colors"
          >
            {t('ctaServices')}
          </a>
        </div>
      </div>
    </section>
  )
}
