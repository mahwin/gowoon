import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { category, title, url, description } = JSON.parse(req.body);
    const categoryRecord = await prisma.category.findUnique({
      where: { name: category },
    });

    if (categoryRecord === null) {
      res.status(400).json({ message: "Category not found" });
      return;
    }

    try {
      await prisma.bookmark.create({
        data: { categoryId: categoryRecord.id, title, url, description },
      });
      res.status(201).json({ message: "success" });
    } catch (e) {
      res.status(401).json({ message: "url이 중복 됐습니다." });
      return;
    }
  }
}
