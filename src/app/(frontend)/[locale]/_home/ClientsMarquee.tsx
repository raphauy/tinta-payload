import Image from 'next/image'
import { CLIENT_LOGOS } from './data'

function LogoSet({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center gap-16 pr-16" aria-hidden={ariaHidden || undefined}>
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={logo.src}
          className="h-16 w-36 flex items-center justify-center flex-shrink-0"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={144}
            height={64}
            className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
  )
}

export default function ClientsMarquee() {
  return (
    <section id="clientes" className="bg-brand-dark py-10 overflow-hidden reveal w-full">
      <div className="relative w-full">
        <div className="flex w-max marquee-track">
          <LogoSet />
          {/* copia idéntica para el loop continuo sin corte */}
          <LogoSet ariaHidden />
        </div>
      </div>
    </section>
  )
}
