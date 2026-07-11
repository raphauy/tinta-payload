import { WhatsAppCta } from './whatsapp-cta'

type Props = {
  title: string
  desc: string
  ctaLabel: string
  id?: string
}

/**
 * Cierre con CTA a WhatsApp: una card oscura flotante sobre el fondo de la
 * página, con aire arriba y abajo para separarla del footer (también oscuro).
 * Reusada por la home (Contacto) y el Manifiesto (CTA final).
 */
export function CtaBanner({ title, desc, ctaLabel, id = 'contacto' }: Props) {
  return (
    <section id={id} className="w-full bg-white dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="bg-brand text-white rounded-3xl px-6 py-20 md:py-24 text-center">
          <h2 className="reveal text-4xl md:text-6xl font-thin mb-6">{title}</h2>
          <p className="reveal reveal-d1 text-white/70 text-lg mb-10 max-w-xl mx-auto">{desc}</p>
          <WhatsAppCta label={ctaLabel} variant="light" size="lg" className="reveal reveal-d2" />
        </div>
      </div>
    </section>
  )
}
