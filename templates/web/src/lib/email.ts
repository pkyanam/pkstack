import { Resend } from 'resend'

function getResendClient() {
  const apiKey = process.env['RESEND_API_KEY']
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set. Update .env.local before sending email.')
  }

  return new Resend(apiKey)
}

export interface SendTransactionalEmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendTransactionalEmail({
  to,
  subject,
  html,
  from = process.env['RESEND_FROM_EMAIL'] ?? 'noreply@example.com',
}: SendTransactionalEmailOptions) {
  const resend = getResendClient()

  return resend.emails.send({
    from,
    to,
    subject,
    html,
  })
}
