import AgencyServices from './agency-services'
import PageClient from '@/app/(frontend)/[locale]/posts/page.client'

export default async function AgencyPage() {
  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <PageClient />
      <AgencyServices />
    </div>
  )
}
