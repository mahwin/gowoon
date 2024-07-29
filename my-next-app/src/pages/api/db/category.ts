// db push할 목적으로 만든 api

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { categories } from "../../../constants/categories";

// 카테고리 푸쉬
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    for (let category of categories) {
      const categoryRecord = await prisma.category.findUnique({
        where: { name: category },
      });

      if (categoryRecord !== null) return;

      await prisma.category.create({
        data: { name: category },
      });
    }

    res.status(200).json({ message: "success" });
  }
}
