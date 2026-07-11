'use client'

import { cn } from '@/utilities/cn'
import { useChangeLocale, useCurrentLocale } from '@/locales/client'

export default function LanguageToggle() {
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <button
        type="button"
        onClick={() => changeLocale('es')}
        className={cn(
          'transition-colors',
          currentLocale === 'es'
            ? 'font-medium text-brand dark:text-white'
            : 'text-ink/40 dark:text-white/40 hover:text-brand dark:hover:text-white',
        )}
      >
        ES
      </button>
      <span className="text-ink/20 dark:text-white/20">|</span>
      <button
        type="button"
        onClick={() => changeLocale('en')}
        className={cn(
          'transition-colors',
          currentLocale === 'en'
            ? 'font-medium text-brand dark:text-white'
            : 'text-ink/40 dark:text-white/40 hover:text-brand dark:hover:text-white',
        )}
      >
        EN
      </button>
    </div>
  )
}
