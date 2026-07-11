import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

/**
 * Script inline crudo en el <head> que setea `data-theme` en el <html> ANTES del
 * primer paint (patrón next-themes). Debe ser un <script> normal (no next/script):
 * `next/script strategy="beforeInteractive"` en el App Router no garantiza
 * ejecución antes del paint, lo que dejaba la página en blanco hasta que el tema
 * se resolvía por JS (con el guard `html{opacity:0}`).
 */
export const InitTheme: React.FC = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    function getImplicitPreference() {
      var mql = window.matchMedia('(prefers-color-scheme: dark)')
      if (typeof mql.matches === 'boolean') {
        return mql.matches ? 'dark' : 'light'
      }
      return null
    }

    function themeIsValid(theme) {
      return theme === 'light' || theme === 'dark'
    }

    var themeToSet = '${defaultTheme}'
    try {
      var preference = window.localStorage.getItem('${themeLocalStorageKey}')
      if (themeIsValid(preference)) {
        themeToSet = preference
      } else {
        var implicitPreference = getImplicitPreference()
        if (implicitPreference) {
          themeToSet = implicitPreference
        }
      }
    } catch (e) {}

    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
      }}
      id="theme-script"
    />
  )
}
