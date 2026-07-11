import { getScopedI18n } from '@/locales/server'

export default async function Stats() {
  const t = await getScopedI18n('home.stats')

  const items = [
    { value: '+50', label: t('marcas'), delay: '' },
    { value: '+15', label: t('anios'), delay: 'reveal-d1' },
    { value: 'WSET', label: t('wset'), delay: 'reveal-d2' },
    { value: '100%', label: t('equipo'), delay: 'reveal-d3' },
  ]

  return (
    <section className="bg-brand text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 text-center">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`reveal ${item.delay} px-6 ${i < 3 ? 'md:border-r md:border-white/20' : ''}`}
            >
              <p className="text-5xl md:text-6xl font-thin">{item.value}</p>
              <p className="mt-3 text-xs tracking-wide uppercase text-white/60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
