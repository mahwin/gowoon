import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const bookmarkInfo = await prisma.bookmark.findUnique({
      where: { id: Number(id) },
    });

    if (!bookmarkInfo) {
      res.status(404).json({ message: "Bookmark not found" });
      return;
    }
    if (bookmarkInfo) {
      res.status(200).json(bookmarkInfo);
      return;
    }
  }
}
