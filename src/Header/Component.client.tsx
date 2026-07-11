'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { SearchIcon } from 'lucide-react'

import type { Header } from '@/payload-types'

import { I18nProviderClient, useCurrentLocale, useScopedI18n } from '@/locales/client'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/cn'
import { ACADEMY_URL, BLOG_URL, WHATSAPP_URL } from '@/utilities/site'
import LanguageToggle from './locale-toggle'

interface HeaderClientProps {
  data: Header
}

// SVG de WhatsApp (mismo trazo que el handoff de Ari)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 11.5c0 4.14-4.03 7.5-9 7.5-1.06 0-2.08-.15-3-.43L3 20l1.36-4.09A7.28 7.28 0 0 1 3 11.5C3 7.36 7.03 4 12 4s9 3.36 9 7.5z" />
  </svg>
)

function ThemeToggleButton() {
  const { setTheme, theme } = useTheme()
  return (
    <button
      type="button"
      aria-label="Cambiar tema"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full text-ink/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 hover:text-brand dark:hover:text-white transition-colors"
    >
      {/* sol (modo claro) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 dark:hidden"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* luna (modo oscuro) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 hidden dark:block"
        aria-hidden="true"
      >
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />
      </svg>
    </button>
  )
}

function HeaderInner() {
  const t = useScopedI18n('menu')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isManifesto = pathname?.endsWith('/manifesto') ?? false

  const navLinks: {
    label: string
    href: string
    external?: boolean
    active?: boolean
  }[] = [
    { label: t('servicios'), href: '/#servicios' },
    { label: t('academy'), href: ACADEMY_URL, external: true },
    { label: t('portafolio'), href: '/#portfolio' },
    { label: t('manifest'), href: '/manifesto', active: isManifesto },
    { label: t('blog'), href: BLOG_URL },
  ]

  const linkClass = (active?: boolean) =>
    cn(
      'transition-colors',
      active
        ? 'text-brand dark:text-white font-medium'
        : 'text-ink dark:text-white/70 hover:text-brand dark:hover:text-white',
    )

  const renderNavLink = (
    item: (typeof navLinks)[number],
    extra?: string,
    onClick?: () => void,
  ) =>
    item.external ? (
      <a
        key={item.label}
        href={item.href}
        target="_blank"
        rel="noopener"
        onClick={onClick}
        className={cn(linkClass(item.active), extra)}
      >
        {item.label}
      </a>
    ) : (
      <Link
        key={item.label}
        href={item.href}
        onClick={onClick}
        className={cn(linkClass(item.active), extra)}
      >
        {item.label}
      </Link>
    )

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#141414]/90 backdrop-blur border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 relative flex items-center justify-between">
        {/* Hamburguesa (solo mobile) */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full text-ink/70 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        {/* Logo — centrado absoluto en mobile, estático en desktop */}
        <Link href="/" aria-label="Tinta">
          <Image
            src="/images/01-tinta.png"
            alt="Tinta"
            width={110}
            height={32}
            priority
            className="h-6 md:h-7 w-auto dark:invert absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:left-auto md:top-auto md:translate-x-0 md:translate-y-0"
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((item) => renderNavLink(item))}
        </nav>

        {/* Cluster derecho */}
        <div className="flex items-center gap-4 md:gap-5">
          <LanguageToggle />
          <ThemeToggleButton />
          <Link
            href="/search"
            aria-label="Buscar"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full text-ink/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 hover:text-brand dark:hover:text-white transition-colors"
          >
            <SearchIcon className="w-4 h-4" />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium bg-brand text-white px-4 py-2 rounded-full hover:bg-brand-dark dark:bg-white dark:text-brand-dark dark:hover:bg-white/90 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {t('talk')}
          </a>
        </div>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden border-t border-black/5 dark:border-white/10 bg-white/95 dark:bg-[#141414]/95 backdrop-blur">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 text-sm">
            {navLinks.map((item) =>
              renderNavLink(item, undefined, () => setOpen(false)),
            )}
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-ink dark:text-white/70 hover:text-brand dark:hover:text-white transition-colors"
            >
              <SearchIcon className="w-4 h-4" />
              {t('search')}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium bg-brand text-white px-4 py-2.5 rounded-full hover:bg-brand-dark dark:bg-white dark:text-brand-dark dark:hover:bg-white/90 transition-colors mt-1"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {t('talk')}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export const HeaderClient: React.FC<HeaderClientProps> = () => {
  const locale = useCurrentLocale()
  return (
    <I18nProviderClient locale={locale}>
      <HeaderInner />
    </I18nProviderClient>
  )
}
