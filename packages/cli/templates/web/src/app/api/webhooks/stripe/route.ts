import Stripe from 'stripe'

const stripeSecretKey = process.env['STRIPE_SECRET_KEY']
const stripeWebhookSecret = process.env['STRIPE_WEBHOOK_SECRET']

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null

export async function POST(request: Request) {
  if (!stripe || !stripeWebhookSecret) {
    return new Response('Stripe is not configured.', { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return new Response('Missing stripe-signature header.', { status: 400 })
  }

  const payload = await request.text()

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, stripeWebhookSecret)

    switch (event.type) {
      case 'checkout.session.completed':
      case 'invoice.paid':
        // Handle Stripe side effects here.
        break
      default:
        break
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid Stripe webhook payload.'
    return new Response(message, { status: 400 })
  }
}
