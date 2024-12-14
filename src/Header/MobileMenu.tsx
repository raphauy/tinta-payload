'use client'

import React from 'react'
import { ThemeToggle } from '@/components/shadcn/theme-toggle'
import { SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import Menu from './menu'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background z-50">
      <div className="container py-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 text-primary">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-8 mt-8">
          <Menu onClose={onClose} />

          <div className="flex flex-col items-center space-y-4">
            <ThemeToggle />
            <Link
              href="/search"
              onClick={onClose}
              className="flex items-center space-x-2 text-primary"
            >
              <SearchIcon className="w-5" />
              <span>Buscar</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
