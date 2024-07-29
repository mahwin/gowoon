import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { sliceArray } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { size = 10, currentPage = 1 } = req.query;

    const skip = (Number(currentPage) - 1) * Number(size);
    const take = Number(size);

    const bookmarks = await prisma.bookmark.findMany();

    res.status(200).json({
      bookmarks: sliceArray(bookmarks, skip, skip + take),
      lastPage: Math.ceil(bookmarks.length / Number(size)),
    });
  }
}
