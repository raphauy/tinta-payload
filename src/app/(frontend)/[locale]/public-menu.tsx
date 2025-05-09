'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import { useScopedI18n } from '@/locales/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface PublicMenuProps {
  onClose?: () => void
}

export default function PublicMenu({ onClose }: PublicMenuProps) {
  const path = usePathname()
  const t = useScopedI18n('menu')

  const handleClick = () => {
    if (onClose) {
      onClose()
    }
  }

  const data = [
    // {
    //   href: '/about',
    //   text: t('about'),
    //   disabled: true,
    // },
    {
      href: `/agency`,
      text: t('agency'),
      disabled: false,
    },
    {
      href: `https://academy.tinta.wine`,
      text: t('academy'),
      disabled: false,
      target: '_blank',
    },
    {
      href: `/manifesto`,
      text: t('manifest'),
      disabled: false,
    },
    {
      href: `/posts`,
      text: t('blog'),
      disabled: false,
    },
  ]

  return (
    <nav>
      <ul className="flex items-center">
        {data.map((item, index) => {
          return (
            <li key={index} className={cn('border-b-primary', path === item.href && 'border-b-2')}>
              <Link
                href={item.disabled ? '#' : item.href}
                onClick={handleClick}
                target={item.target ?? '_self'}
              >
                <Button
                  variant="ghost"
                  className="text-base text-foreground hover:text-foreground hover:bg-transparent focus:text-foreground"
                  disabled={item.disabled}
                >
                  {item.text}
                </Button>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
