import { cn } from '@/utilities/cn'
import { WHATSAPP_URL } from '@/utilities/site'

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 11.5c0 4.14-4.03 7.5-9 7.5-1.06 0-2.08-.15-3-.43L3 20l1.36-4.09A7.28 7.28 0 0 1 3 11.5C3 7.36 7.03 4 12 4s9 3.36 9 7.5z" />
  </svg>
)

type Props = {
  label: string
  variant?: 'dark' | 'light'
  size?: 'md' | 'lg'
  className?: string
}

/**
 * Botón CTA de WhatsApp (link externo con mensaje pre-cargado).
 * variant "dark": pill charcoal sobre fondo claro (se invierte en dark mode).
 * variant "light": pill blanco sobre fondo oscuro (secciones charcoal).
 */
export function WhatsAppCta({ label, variant = 'dark', size = 'md', className }: Props) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener"
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-medium transition-colors',
        size === 'lg' ? 'px-8 py-4' : 'px-6 py-3 text-sm',
        variant === 'dark'
          ? 'bg-brand text-white hover:bg-brand-dark dark:bg-white dark:text-brand-dark dark:hover:bg-white/90'
          : 'bg-white text-brand hover:bg-white/90',
        className,
      )}
    >
      <WhatsAppIcon className="w-4 h-4" />
      {label}
    </a>
  )
}
