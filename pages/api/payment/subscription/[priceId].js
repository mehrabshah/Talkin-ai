import prisma from '../../../../lib/prisma';
import initStripe from "stripe";
import { auth } from "@clerk/nextjs";



const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

export default async function handle(req, res) {


  try {

    const { userId, getToken } = auth();
    
    console.log(userId);

    const token = await getToken({ req });

    const { priceId } = req.query;

    
    const subUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    const lineItems = [
      {
        price: priceId,
        quantity: 1,
      },
    ];


    const session = await stripe.checkout.sessions.create({
      customer: subUser.stripeCustomerId,
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











