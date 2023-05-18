import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { cld_video_url, cld_video_id, cld_video_duration } = req.body;

  const session = await getSession({ req });
  const result = await prisma.creation.create({
    data: {
      video_url: cld_video_url,
      video_id: cld_video_id,
      video_duration: cld_video_duration,
      user: { connect: { id: session?.user?.id } },
    },
  });
  res.json(result);
}




