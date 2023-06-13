import prisma from "../../../lib/prisma";
//import { hash } from "bcrypt";


import initStripe from 'stripe';

import bcrypt from "bcryptjs";

const stripe = initStripe(process.env.STRIPE_SECRET_KEY);



const handler = async (req, res) => {
  try {
    // check if user already exists
    const { fullname, email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.json({ data: null, error: 'User already exists' });
    } else {

      // create new stripe customer
      const customer = await stripe.customers.create({
        email,
      });
      // create new user

      const user = await prisma.user.create({
        data: {
          email,
          password: await bcrypt.hash(password, 10),
          fullname,
          stripeCustomerId: customer.id,
        },
      });
      return res.json({ data: 'Registration', error: null });
    }
  } catch (error) {
    res.status(500).json({ data: null, error: 'something went wrong' });
  }
};

export default handler;

