'use client'

import PublicMenu from '@/app/(frontend)/[locale]/public-menu'
import { I18nProviderClient, useCurrentLocale } from '@/locales/client'

interface MenuProps {
  onClose?: () => void
}

export default function Menu({ onClose }: MenuProps) {
  const locale = useCurrentLocale()

  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between">
      <I18nProviderClient locale={locale}>
        <PublicMenu onClose={onClose} />
      </I18nProviderClient>
    </div>
  )
}
