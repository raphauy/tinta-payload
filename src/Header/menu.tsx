'use client'

import PublicMenu from '@/app/(frontend)/[locale]/public-menu'
import { I18nProviderClient, useCurrentLocale } from '@/locales/client'

export default function Menu() {
  const locale = useCurrentLocale()

  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between">
      <I18nProviderClient locale={locale}>
        <PublicMenu />
      </I18nProviderClient>
    </div>
  )
}
