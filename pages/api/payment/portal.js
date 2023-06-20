

import initStripe from "stripe";

import { getToken } from 'next-auth/jwt';

//import { getToken } from 'next-auth/jwt';

import prisma from "../../../lib/prisma";


const stripe = initStripe(process.env.STRIPE_SECRET_KEY);



export default async function handle(req, res) {



  const token = await getToken({ req });

  //const productId = 'price_1Mw7T1Dfv2951nlDXi5SR4Fe';


  const user = await prisma.user.findUnique({
    where: {
      id: token.user.id,
    },
  });




  const stripe_session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: process.env.CLIENT_URL,
  })

  res.send({
    url: stripe_session.url,
  })

}
