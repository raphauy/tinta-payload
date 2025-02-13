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
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>

        <Script id="chatwoot" strategy="afterInteractive">
          {`
              window.chatwootSettings = {"position":"right","type":"standard","launcherTitle":"Chatea con nosotros"};
              (function(d,t) {
                var BASE_URL="https://agentes.agency-planner.com";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.defer = true;
                g.async = true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: 'muk8sLWJ1mSrhoEWS8iy4nPW',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
            `}
        </Script>

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
  title: 'Tinta - Educación y Marketing del vino',
  description: 'Sitio web de Tinta, una agencia de marketing especializada en el sector del vino',
  //<meta property="twitter:image" content="Twitter link preview image URL">
  twitter: {
    card: 'summary',
    site: '@tinta_wine',
  },
  openGraph: {
    url: 'https://tinta.wine',
    title: 'Tinta - Educación y Marketing del vino',
    description: 'Sitio web de Tinta, una agencia de marketing especializada en el sector del vino',
    images: [
      {
        url: 'https://tinta.wine/Tinta_Logotipo_Fondo-transparente.png',
        width: 800,
        height: 600,
        alt: 'Tinta Wine Logo',
      },
    ],
  },
}
