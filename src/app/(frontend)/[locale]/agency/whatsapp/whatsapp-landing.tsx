import { Card, CardContent } from '@/components/ui/card'
import { getScopedI18n } from '@/locales/server'
import { CheckCircle, Database, MessageSquare, Users } from 'lucide-react'
import Image from 'next/image'
import { WhatsAppButton } from './whatsapp-button'

export default async function WhatsAppLanding() {
  const t = await getScopedI18n('agency.whatsappLanding')

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {t('hero.title')}
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">{t('hero.description')}</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <WhatsAppButton
                  message={t('finalCTA.buttonWhatsappText')}
                  phoneNumber={t('finalCTA.buttonWhatsappPhoneNumber')}
                  className="flex gap-3"
                >
                  {t('finalCTA.buttonText')}
                  <Image
                    src="/whatsapp.webp"
                    alt="WhatsApp"
                    width={30}
                    height={30}
                    priority={false}
                  />
                </WhatsAppButton>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[450px] w-[350px] overflow-hidden rounded-xl">
                <Image
                  src="/demo-whatsapp.jpeg"
                  alt="WhatsApp Automation"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Automate Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('whyAutomate.title')}
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('whyAutomate.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Objectives Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('twoObjectives.title')}
              </h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 mt-8">
            <Card className="border-2 border-teal-200">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{t('twoObjectives.objective1.title')}</h3>
                  </div>
                  <p className="text-gray-500">{t('twoObjectives.objective1.description')}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-teal-200">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center">
                      <Database className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{t('twoObjectives.objective2.title')}</h3>
                  </div>
                  <p className="text-gray-500">{t('twoObjectives.objective2.description')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who is Using Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('whoIsUsing.title')}
              </h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card className="border-2 border-teal-100">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div>
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <p className="text-muted-foreground">{t('whoIsUsing.businesses.business1')}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-teal-100">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div>
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <p className="text-muted-foreground">{t('whoIsUsing.businesses.business2')}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-teal-100">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div>
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <p className="text-muted-foreground">{t('whoIsUsing.businesses.business3')}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-teal-100">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div>
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <p className="text-muted-foreground">{t('whoIsUsing.businesses.business4')}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-teal-100">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div>
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <p className="text-muted-foreground">{t('whoIsUsing.businesses.business5')}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-teal-100">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div>
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <p className="text-muted-foreground">{t('whoIsUsing.businesses.business6')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Includes Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('serviceIncludes.title')}
              </h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-8 mt-8">
            <div className="flex items-start space-x-4">
              <div>
                <CheckCircle className="h-6 w-6 text-teal-600 mt-0.5" />
              </div>
              <p className="text-gray-700">{t('serviceIncludes.features.feature1')}</p>
            </div>
            <div className="flex items-start space-x-4">
              <div>
                <CheckCircle className="h-6 w-6 text-teal-600 mt-0.5" />
              </div>
              <p className="text-gray-700">{t('serviceIncludes.features.feature2')}</p>
            </div>
            <div className="flex items-start space-x-4">
              <div>
                <CheckCircle className="h-6 w-6 text-teal-600 mt-0.5" />
              </div>
              <p className="text-gray-700">{t('serviceIncludes.features.feature3')}</p>
            </div>
            <div className="flex items-start space-x-4">
              <div>
                <CheckCircle className="h-6 w-6 text-teal-600 mt-0.5" />
              </div>
              <p className="text-gray-700">{t('serviceIncludes.features.feature4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('finalCTA.title')}
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('finalCTA.description')}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <WhatsAppButton
                message={t('finalCTA.buttonWhatsappText')}
                phoneNumber={t('finalCTA.buttonWhatsappPhoneNumber')}
                className="flex gap-3"
              >
                {t('finalCTA.buttonText')}
                <Image
                  src="/whatsapp.webp"
                  alt="WhatsApp"
                  width={30}
                  height={30}
                  priority={false}
                />
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
