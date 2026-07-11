import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest, NextResponse } from 'next/server'

const I18Middleware = createI18nMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  urlMappingStrategy: 'rewrite',
})

// Rutas eliminadas en el rediseño 2026. Se resuelven acá y NO como page.tsx con
// redirect()/permanentRedirect(): esas páginas redirect-only, dentro del segmento
// dinámico [locale], rompían `next build` en la fase "Collecting page data"
// (PageNotFoundError). Al redirigir a rutas del mismo origen se preserva la cookie
// de locale de next-international, así que no se pierde el idioma.
const REDIRECTS: Record<string, { to: string; permanent: boolean }> = {
  '/about': { to: '/', permanent: true }, // eliminada
  '/agency': { to: '/#servicios', permanent: true }, // contenido ahora en la home
  '/academy': { to: 'https://academy.tinta.wine/', permanent: false }, // vive en su propio sitio
}

export function middleware(request: NextRequest) {
  const rule = REDIRECTS[request.nextUrl.pathname]
  if (rule) {
    const target = rule.to.startsWith('http') ? rule.to : new URL(rule.to, request.url)
    return NextResponse.redirect(target, rule.permanent ? 308 : 307)
  }

  return I18Middleware(request)
}

export const config = {
  matcher: [
    // Excluye /admin y todo lo que venga después de /admin
    '/((?!api|static|.*\\..*|_next|favicon.ico|favicon.svg|robots.txt|admin/.*|admin$).*)',
  ],
}
