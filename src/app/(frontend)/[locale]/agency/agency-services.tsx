import { getScopedI18n } from '@/locales/server'
import ServicesClient from '../services-client'

type AgencyServiceText = {
  title:
    | 'services.strategy.Title'
    | 'services.content.Title'
    | 'services.advertising.Title'
    | 'services.customDesign.Title'
    | 'services.tintaStrategy.Title'
    | 'services.whatsapp.Title'
  description:
    | 'services.strategy.description'
    | 'services.content.description'
    | 'services.advertising.description'
    | 'services.customDesign.description'
    | 'services.tintaStrategy.description'
    | 'services.whatsapp.description'
  icon: string
  link?: string
}

const data: AgencyServiceText[] = [
  {
    title: 'services.tintaStrategy.Title',
    description: 'services.tintaStrategy.description',
    icon: 'Target',
  },
  {
    title: 'services.strategy.Title',
    description: 'services.strategy.description',
    icon: 'ThumbsUp',
  },
  {
    title: 'services.content.Title',
    description: 'services.content.description',
    icon: 'Clapperboard',
  },
  {
    title: 'services.advertising.Title',
    description: 'services.advertising.description',
    icon: 'Megaphone',
  },
  {
    title: 'services.customDesign.Title',
    description: 'services.customDesign.description',
    icon: 'Palette',
  },
  {
    title: 'services.whatsapp.Title',
    description: 'services.whatsapp.description',
    icon: 'MessageSquare',
    link: '/agency/whatsapp',
  },
]
export default async function AgencyServices() {
  const t = await getScopedI18n('agency')
  const title = t('services.sectionTitle')
  const description = t('services.sectionDescription')

  const dataWithText = data.map((item) => {
    return {
      ...item,
      title: t(item.title),
      description: t(item.description),
    }
  })

  return (
    <ServicesClient title={title} description={description} data={dataWithText} spanFirst={false} />
  )
}
