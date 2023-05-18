import prisma from '../../../../lib/prisma';
import initStripe from "stripe";
import { getToken } from 'next-auth/jwt';


const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

export default async function handle(req, res) {

  try {

    const { priceId } = req.query;

    const token = await getToken({ req });

    const user = await prisma.user.findUnique({
      where: {
        id: token.user.id,
      },
    });

    const lineItems = [
      {
        price: priceId,
        quantity: 1,
      },
    ];


    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "subscription",
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
      currency: 'usd',
      //payment_intent_data: {
      //  metadata: {
      //    userId: user.id,
      //  },
      //},

    });

    res.json({ id: session.id });
  } catch (err) {
    res.send(err);
  }
};











