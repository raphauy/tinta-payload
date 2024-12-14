import { getScopedI18n } from '@/locales/server'
import ClientsWrapper from './clients-wrapper'
import Hero from './hero'
import Services from './services'
import PageClient from '@/app/(frontend)/[locale]/posts/page.client'

export default async function LanguagePage() {
  const tLastSection = await getScopedI18n('landing.lastSection')

  return (
    <div className="flex flex-col items-center">
      <PageClient />

      <Hero />

      <div className="w-full max-w-[1000px] mx-auto">
        <Services />

        <section className="w-full py-6 md:py-12 text-gray-800 dark:text-white mt-10">
          <h2 className="text-4xl font-semibold text-center text-tinta-verde mb-8 dark:text-white">
            {tLastSection('title')}
          </h2>
          <p className="container text-center text-lg mb-8">{tLastSection('description')}</p>
        </section>

        <ClientsWrapper />
      </div>
    </div>
  )
}
