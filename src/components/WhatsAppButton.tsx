'use client'

import React from 'react'
import Image from 'next/image'
import { WHATSAPP_URL } from '@/utilities/site'

export const WhatsAppButton = () => {
  const handleClick = () => {
    window.open(WHATSAPP_URL, '_blank')
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 cursor-pointer hover:scale-110 transition-transform"
      onClick={handleClick}
    >
      <Image src="/whatsapp.webp" alt="WhatsApp" width={60} height={60} priority={false} />
    </div>
  )
}
