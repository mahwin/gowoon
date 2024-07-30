import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.bookmark.delete({ where: { id: 2 } });
  console.log(await prisma.bookmark.findMany());
}
