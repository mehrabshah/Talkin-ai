import prisma from "../../lib/prisma";


export default async function handler(req, res) {

  const {
    query: { email },
  } = req;
  const result = await prisma.creation.findMany({
    where: {
      user: { email: email },
    },
  });
  res.json(result);
}
