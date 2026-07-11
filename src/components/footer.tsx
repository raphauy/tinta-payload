import FooterClient from './footer-client'

export default function Footer() {
  const clientId = process.env.TINTA_CLIENT_ID

  return <FooterClient clientId={clientId} />
}
