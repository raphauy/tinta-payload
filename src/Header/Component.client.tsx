'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { SearchIcon } from 'lucide-react'
import { ThemeToggle } from '@/components/shadcn/theme-toggle'
import LanguageToggle from './locale-toggle'
import Menu from './menu'
import MobileMenu from './MobileMenu'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = () => {
  const [theme, setTheme] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      <header className="relative z-20 bg-background">
        <div className="container py-8 flex justify-between items-center">
          {/* Mobile Header */}
          <div className="flex sm:hidden items-center w-full justify-between">
            <button
              className="text-primary p-2"
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            </Link>

            <div className="flex items-center">
              <LanguageToggle />
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden sm:flex w-full justify-between items-center">
            <Link href="/">
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            </Link>
            <Menu />
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <ThemeToggle />
              <Link href="/search">
                <span className="sr-only">Search</span>
                <SearchIcon className="w-5 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
