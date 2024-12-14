import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'

const I18Middleware = createI18nMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  urlMappingStrategy: 'rewrite',
})

export function middleware(request: NextRequest) {
  return I18Middleware(request)
}

export const config = {
  matcher: [
    // Excluye /admin y todo lo que venga después de /admin
    '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt|admin/.*|admin$).*)',
  ],
}
