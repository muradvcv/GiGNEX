import { postPayment } from '@/lib/actions/payment'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    metadata,
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  console.log(metadata,'metaaaaaaaaaa');
  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    // api call kore data send
    await postPayment({...metadata,session_id})
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }
}