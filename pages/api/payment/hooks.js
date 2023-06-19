// pages/api/stripe-hooks

import initStripe from "stripe";
import { buffer } from "micro";
import prisma from "../../../lib/prisma";
import Cors from 'micro-cors';


const stripe = initStripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});


export const config = { api: { bodyParser: false } };


const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const webhookHandler = async (req, res) => {

  if (req.method === 'POST') {
    const reqBuffer = await buffer(req);
    const signature = req.headers["stripe-signature"];
    const signingSecret = process.env.STRIPE_SIGNING_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(reqBuffer.toString(), signature, signingSecret);
    } catch (err) {
      console.log(err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    //const { metadata } = event.data.object;
    const stripeCustomerId = event.data.object.customer;

    switch (event.type) {
      case "charge.succeeded":
        const { metadata } = event.data.object;
        if (metadata?.userId && metadata?.productId) {
          const user = await prisma.user.update({
            where: {
              id: parseInt(metadata.userId),
            },

            data: {
              hadTrial: true,
              onTrial: true,
              trialStartAt: new Date(),
              products: {
                connect: {
                  priceId: metadata.productId,
                },
              },
            },
          });

          const result = await prisma.purchase.create({
            data: {
              priceId: metadata.productId,
              userId: parseInt(metadata.userId),
            },
          });

        }
        break;


      case "customer.subscription.updated":
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
              products: {
                connect: {
                  priceId: priceId,
                },
              },
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
  }
  else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
};

export default cors(webhookHandler);





