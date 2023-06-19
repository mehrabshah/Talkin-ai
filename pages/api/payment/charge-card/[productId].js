import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';
import initStripe from "stripe";
import { getToken } from 'next-auth/jwt';

const stripe = initStripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

export default async function handle(req, res) {
  try {
    const { productId } = req.query;


    const token = await getToken({ req });

    //const productId = 'price_1Mw7T1Dfv2951nlDXi5SR4Fe';


    const user = await prisma.user.findUnique({
      where: {
        id: token.user.id,
      },
    });


    const lineItems = [
      {

        price: productId,
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
      payment_intent_data: {
        metadata: {
          userId: user.id,
          productId,
        },
      },

    });

    res.json({ id: session.id });
  } catch (err) {
    res.send(err);
  }
};











