import { getScopedI18n } from '@/locales/server'

export default async function Testimonials() {
  const t = await getScopedI18n('home.testimonials')

  const items = [
    { quote: t('carrau'), initials: 'PC', name: 'Pía Carrau', company: 'Cerro Chapeu' },
    { quote: t('cetto'), initials: 'LC', name: 'Luis Angelo Cetto', company: 'L.A Cetto' },
    { quote: t('pose'), initials: 'MP', name: 'Milena Pose', company: 'Jomi' },
  ]

  return (
    <section className="bg-gradient-to-b from-paper via-paper/60 to-white dark:from-[#141414] dark:via-[#141414] dark:to-[#141414] w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={item.name} className={`reveal ${i > 0 ? `reveal-d${i}` : ''}`}>
              <div className="bg-white dark:bg-[#1c1c1c] rounded-2xl rounded-bl-sm p-8 shadow-sm min-h-[200px] flex items-center justify-center text-center">
                <p className="text-ink/80 dark:text-white/70 leading-relaxed text-sm text-center">
                  {item.quote}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand dark:text-white">{item.name}</p>
                  <p className="text-xs text-ink/50 dark:text-white/40">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
