// pages/api/stripe-hooks

import initStripe from "stripe";
import { buffer } from "micro";
import prisma from "../../../lib/prisma";


const stripe = initStripe(process.env.STRIPE_SECRET_KEY);


export const config = { api: { bodyParser: false } };

export default async (req, res) => {
  const reqBuffer = await buffer(req);
  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer.toString(), signature, webhookSecret);
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  //const { metadata } = event.data.object;
  const stripeCustomerId = event.data.object.customer;

  switch (event.type) {

    case "customer.subscription.created":
      const subscription = event.data.object;
      const priceId = subscription.items.data[0].price.id;
      if (stripeCustomerId) {
        await prisma.user.update({
          where: {
            stripeCustomerId,
          },
          data: {
            hadTrial: true,
            isSubscribed: true,
            productSubscribed: priceId,
            currentPeriodStart: new Date(),
          },
        });

        await prisma.purchase.create({
          data: {
            priceId: priceId,
            stripeCustomerId: stripeCustomerId,
          },
        });
      }
      break;


    case 'customer.subscription.deleted':
      await prisma.user.update({
        where: {
          stripeCustomerId,
        },
        data: {
          isSubscribed: false,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send({ received: true });
};





