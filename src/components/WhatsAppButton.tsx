'use client'

import React from 'react'
import Image from 'next/image'

export const WhatsAppButton = () => {
  const handleClick = () => {
    window.open(
      'https://wa.me/59892043904?text=¡Hola! Me gustaría recibir más información',
      '_blank',
    )
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
