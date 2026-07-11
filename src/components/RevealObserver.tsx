'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Rediseño 2026 (handoff Ari).
 * Reproduce el patrón de animaciones "reveal" del handoff sin obligar a que cada
 * sección sea client component:
 *  - Elementos con `.reveal` reciben `.in-view` cuando entran al viewport.
 *  - Elementos con `.load-now` (hero) se activan apenas monta la página.
 *
 * Además re-escanea ante cualquier cambio del DOM (MutationObserver). Esto es
 * necesario porque el cambio de idioma (`changeLocale`) hace un router.refresh()
 * — navegación soft, sin cambiar el pathname — que re-renderiza el server
 * component y, al reconciliar, resetea las clases quitando el `.in-view` que
 * agregamos por JS. Sin este re-escaneo, tras cambiar de idioma todo el
 * contenido queda en `opacity:0` hasta un refresh manual.
 */
export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    const scan = () => {
      document.querySelectorAll<HTMLElement>('.load-now').forEach((el) => el.classList.add('in-view'))
      document.querySelectorAll<HTMLElement>('.reveal:not(.in-view)').forEach((el) => {
        // Lo que ya fue alcanzado (en el viewport o por encima) se revela de
        // inmediato — evita el flash a opacity:0 cuando React resetea las clases
        // tras un cambio de idioma. Lo que está más abajo se anima al scrollear.
        if (reduce || el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('in-view')
        } else {
          io.observe(el)
        }
      })
    }

    scan()

    // Solo childList/characterData/subtree (NO attributes) para no entrar en
    // loop con nuestro propio classList.add. El cambio de idioma muta el texto
    // (characterData/childList) y dispara este re-escaneo.
    const mo = new MutationObserver(() => scan())
    mo.observe(document.body, { childList: true, subtree: true, characterData: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
