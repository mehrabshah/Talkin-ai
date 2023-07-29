import prisma from "../../lib/prisma";



export default async function handler(req, res) {

  const {
    query: { userId },
  } = req;
  const result = await prisma.user.findUnique({
    where: {
      userId,
    },
  });
  res.json(result);
}

