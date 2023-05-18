import prisma from "../../lib/prisma";



export default async function handler(req, res) {


  const email = req.query.email;
  const currentPeriodStart = req.query.currentPeriodStart;

  const result = await prisma.creation.aggregate({
    _sum: {
      video_duration: true,
    },
    where: {
      createdAt: {
        gte: currentPeriodStart,
      },
      user: {
        email: email,
      },
    },
  });

  res.json(result);

} 
