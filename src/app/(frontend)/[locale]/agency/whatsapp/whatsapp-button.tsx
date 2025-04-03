'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'

interface WhatsAppButtonProps {
  phoneNumber: string
  message: string
  children: React.ReactNode
  className?: string
}

export function WhatsAppButton({ phoneNumber, message, children, className }: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  return (
    <Button onClick={handleClick} className={`bg-green-500 hover:bg-green-600 ${className}`}>
      {children}
    </Button>
  )
}
