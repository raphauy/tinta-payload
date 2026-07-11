'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Facebook, Instagram, Linkedin, Loader2, Mail, MapPin, Send } from 'lucide-react'

import { I18nProviderClient, useCurrentLocale, useScopedI18n } from '@/locales/client'
import { sendContact } from '@/services/planner-services'
import {
  ACADEMY_URL,
  BLOG_URL,
  CONTACT_EMAIL,
  LOCATIONS,
  SOCIALS,
  WHATSAPP_TEXT,
} from '@/utilities/site'

function SocialIcon({ label }: { label: string }) {
  if (label === 'Instagram') return <Instagram className="size-5" />
  if (label === 'Facebook') return <Facebook className="size-5" />
  if (label === 'LinkedIn') return <Linkedin className="size-5" />
  if (label === 'TikTok')
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    )
  return null
}

function FooterInner({ clientId }: { clientId?: string }) {
  const t = useScopedI18n('footer')
  const tMenu = useScopedI18n('menu')

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !clientId) return
    setLoading(true)
    setFeedback(null)
    try {
      const res = await sendContact(clientId, undefined, email)
      // Mostramos el resultado (éxito o error). Antes el mensaje de error de la
      // API se descartaba y el usuario quedaba sin ninguna indicación.
      setFeedback({ ok: res.ok, message: res.message })
      if (res.ok) setEmail('')
    } catch {
      setFeedback({ ok: false, message: t('newsletterError') })
    } finally {
      setLoading(false)
    }
  }

  const exploreLinks = [
    { label: tMenu('servicios'), href: '/#servicios', external: false },
    { label: tMenu('portafolio'), href: '/#portfolio', external: false },
    { label: tMenu('manifest'), href: '/manifesto', external: false },
    { label: tMenu('blog'), href: BLOG_URL, external: false },
    { label: tMenu('academy'), href: ACADEMY_URL, external: true },
  ]

  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top: info + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 items-stretch">
          {/* Info institucional */}
          <div>
            <Image
              src="/images/01-tinta.png"
              alt="Tinta"
              width={120}
              height={32}
              className="h-8 w-auto invert mb-4"
            />
            <p className="text-white/60 text-sm mb-3">{t('tagline')}</p>
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">{t('description')}</p>

            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail size={18} className="text-white/50" />
                <span>{CONTACT_EMAIL}</span>
              </a>
              {LOCATIONS.map((loc) => (
                <div key={loc.city} className="flex items-center gap-2 text-white/70">
                  <MapPin size={18} className="text-white/50 shrink-0" />
                  <span>
                    {loc.city} ·{' '}
                    <a
                      href={`https://wa.me/${loc.wa}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col h-full">
            <div className="bg-white/5 rounded-2xl p-8 lg:p-10 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-3">{t('newsletterTitle')}</h3>
              <p className="text-white/70 mb-6">{t('newsletterDesc')}</p>

              {feedback?.ok ? (
                <div className="text-white font-medium py-3">{t('subscribed')}</div>
              ) : (
                <>
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    required
                    disabled={loading}
                    className="flex-1 h-11 rounded-lg bg-white/10 border border-white/20 px-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-11 px-5 inline-flex items-center gap-2 rounded-lg bg-white text-brand-dark font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    <span className="hidden sm:inline">{t('subscribe')}</span>
                  </button>
                </form>
                {feedback && !feedback.ok && (
                  <p className="mt-3 text-sm text-red-300">
                    {feedback.message || t('newsletterError')}
                  </p>
                )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Middle: navegación + redes */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4">{t('exploreTitle')}</h4>
            <ul className="space-y-1.5 text-sm">
              {exploreLinks.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('followTitle')}</h4>
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/50 text-sm">
            © {year} Tinta. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function FooterClient({ clientId }: { clientId?: string }) {
  const locale = useCurrentLocale()
  return (
    <I18nProviderClient locale={locale}>
      <FooterInner clientId={clientId} />
    </I18nProviderClient>
  )
}
