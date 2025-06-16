import type { Metadata } from 'next'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { cn } from 'src/utilities/cn'

import { AdminBar } from '@/components/AdminBar'
//import { Footer } from '@/Footer/Component'
import Footer from '@/components/footer'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { draftMode } from 'next/headers'
import { WhatsAppButton } from '@/components/WhatsAppButton'

import './globals.css'
import Script from 'next/script'
import Image from 'next/image'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P7QTN3PW');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7QTN3PW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </Providers>

        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '534601292921561');
              fbq('track', 'PageView');
            `}
        </Script>
        <noscript>
          <Image
            unoptimized
            width={1}
            height={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=534601292921561&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Tinta - Embajadores de la Cultura del Vino',
  description:
    'Impulsamos el mundo del vino con marketing, comunicación y educación certificada, compartiendo conocimiento para conectar y crecer.',
  //<meta property="twitter:image" content="Twitter link preview image URL">
  twitter: {
    card: 'summary',
    site: '@tinta_wine',
  },
  openGraph: {
    url: 'https://tinta.wine',
    title: 'Tinta - Embajadores de la Cultura del Vino',
    description:
      'Impulsamos el mundo del vino con marketing, comunicación y educación certificada, compartiendo conocimiento para conectar y crecer.',
    authors: ['Tinta Wine'],
    images: [
      {
        url: 'https://tinta.wine/Tinta_Open_Graph.jpg',
        width: 800,
        height: 600,
        alt: 'Tinta Wine Logo',
      },
    ],
  },
}
