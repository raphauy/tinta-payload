import { getScopedI18n } from '@/locales/server'
import PageClient from '@/app/(frontend)/[locale]/posts/page.client'
export default async function AboutPage() {
  const t = await getScopedI18n('about')

  return (
    <div>
      <PageClient />
      <div>{t('title')}</div>
    </div>
  )
}
