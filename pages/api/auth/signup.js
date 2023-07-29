import prisma from "../../../lib/prisma";
//import { hash } from "bcrypt";

import { getAuth, clerkClient } from "@clerk/nextjs/server";

import initStripe from 'stripe';

import { getClerkUserPrimaryEmail } from "../../../lib/auth/Clerk";

const stripe = initStripe(process.env.STRIPE_SECRET_KEY);



const handler = async (req, res) => {
  

  const {
    query: { userId },
  } = req;
  
  console.log(userId);
  
  
  
 
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
 
  const userEmail = await getClerkUserPrimaryEmail(userId);
  
  console.log(userEmail);
  
  const currentUser = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });


  
  if (currentUser == null) {
  
  
  // create new stripe customer
  const customer = await stripe.customers.create({
    email: userEmail,
  });
  const newUser = await prisma.user.create({
        data: {
          userId: userId,
          email: userEmail,
          stripeCustomerId: customer.id,
        },
      });
  
    }
    }

export default handler;

