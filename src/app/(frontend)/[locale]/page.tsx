import { getScopedI18n } from '@/locales/server'
import PageClient from '@/app/(frontend)/[locale]/posts/page.client'
import Hero from './_home/Hero'
import Stats from './_home/Stats'
import ServicesGrid from './_home/ServicesGrid'
import AcademySection from './_home/AcademySection'
import Portfolio from './_home/Portfolio'
import Diferentes from './_home/Diferentes'
import ClientsMarquee from './_home/ClientsMarquee'
import Testimonials from './_home/Testimonials'
import { CtaBanner } from './_shared/cta-banner'

export default async function LanguagePage() {
  const tc = await getScopedI18n('home.contacto')
  const tMenu = await getScopedI18n('menu')

  return (
    <div className="flex flex-col items-center w-full">
      <PageClient />

      <Hero />
      <Stats />
      <ServicesGrid />
      <AcademySection />
      <Portfolio />
      <Diferentes />
      <ClientsMarquee />
      <Testimonials />
      <CtaBanner title={tc('title')} desc={tc('desc')} ctaLabel={tMenu('talk')} />
    </div>
  )
}
