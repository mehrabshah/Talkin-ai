import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';



const processPayment = async (productId) => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  const { data } = await axios.get(`/api/payment/charge-card/${productId}`)
  await stripe.redirectToCheckout({ sessionId: data.id })
}



const processSubscription = async (priceId) => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  const { data } = await axios.get(`/api/payment/subscription/${priceId}`)
  console.log(data);
  await stripe.redirectToCheckout({ sessionId: data.id })
}




const loadPortal = async () => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  const { data } = await axios.get('/api/payment/portal')
  window.location.href = data.url
}



export { processPayment, processSubscription, loadPortal }
