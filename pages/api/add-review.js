import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { productName, planName, productReview } = req.body;

  const session = await getSession({ req });
  const result = await prisma.review.create({
    data: {
      productName: productName,
      planName: planName,
      productReview: productReview,
      user: { connect: { id: session?.user?.id } },
    },
  });
  res.json(result);
}




