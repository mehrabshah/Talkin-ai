import prisma from "../../lib/prisma";



export default async function handler(req, res) {

  const {
    query: { email },
  } = req;
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  res.json(result);
}

