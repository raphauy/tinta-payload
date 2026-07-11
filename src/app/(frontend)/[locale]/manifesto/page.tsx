import Image from 'next/image'
import { getScopedI18n } from '@/locales/server'
import PageClient from '@/app/(frontend)/[locale]/posts/page.client'
import { CtaBanner } from '../_shared/cta-banner'

export default async function ManifestPage() {
  const t = await getScopedI18n('manifest')
  const tMenu = await getScopedI18n('menu')

  const principles = [
    { title: t('enfoqueTitle'), desc: t('enfoqueDescription') },
    { title: t('prioridadTitle'), desc: t('prioridadDescription') },
    { title: t('solucionesTitle'), desc: t('solucionesDescription') },
    { title: t('simplificacionTitle'), desc: t('simplificacionDescription') },
    { title: t('relacionesTitle'), desc: t('relacionesDescription') },
    { title: t('confianzaTitle'), desc: t('confianzaDescription') },
    { title: t('potenciarTitle'), desc: t('potenciarDescription') },
    { title: t('eficienciaTitle'), desc: t('eficienciaDescription') },
    { title: t('agilidadTitle'), desc: t('agilidadDescription') },
    { title: t('sostenibilidadTitle'), desc: t('sostenibilidadDescription') },
  ]

  return (
    <div className="flex flex-col items-center w-full">
      <PageClient />

      {/* Hero */}
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
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="reveal load-now text-sm tracking-widest uppercase text-ink/50 dark:text-white/40 mb-4">
            {t('heroEyebrow')}
          </p>
          <h1 className="reveal load-now reveal-d1 text-5xl md:text-6xl font-thin leading-[1.08] text-brand dark:text-white">
            <span className="font-semibold">{t('heroTitleStrong')}</span> {t('heroTitleRest')}
          </h1>
          <p className="reveal load-now reveal-d2 mt-6 max-w-xl mx-auto text-base md:text-lg text-ink/70 dark:text-white/60 leading-relaxed">
            {t('heroCopy')}
          </p>
        </div>
      </section>

      {/* Grilla de 10 principios */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-24 w-full">
        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((p, i) => {
            const d = i % 6
            return (
              <div
                key={p.title}
                className={`reveal ${d > 0 ? `reveal-d${d}` : ''} border border-brand/15 dark:border-white/10 rounded-2xl p-8 hover:border-brand/40 dark:hover:border-white/30 transition-colors`}
              >
                <span className="text-sm font-medium text-ink/40 dark:text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-normal text-brand dark:text-white mt-2 mb-3">{p.title}</h3>
                <p className="text-sm text-ink/70 dark:text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <CtaBanner title={t('ctaTitle')} desc={t('ctaDesc')} ctaLabel={tMenu('talk')} />
    </div>
  )
}
