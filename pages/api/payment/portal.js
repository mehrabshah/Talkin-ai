
import { getToken } from 'next-auth/jwt';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)




export default async function handle(req, res) {

  const token = await getToken({ req });

  const user = await prisma.user.findUnique({
    where: {
      id: token.user.id,
    },
  });

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: process.env.CLIENT_URL,
  })

  res.send({
    url: session.url,
  })

}
