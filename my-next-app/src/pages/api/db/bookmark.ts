// db push할 목적으로 만든 api

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { categories } from "../../../constants/categories";

// list 데이터 만들기

const genRandomString = (len: number) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    for (let category of categories) {
      const categoryRecord = await prisma.category.findUnique({
        where: { name: category },
      });
      if (categoryRecord === null) return;

      await prisma.bookmark.create({
        data: {
          category: { connect: { id: categoryRecord.id } },
          title: genRandomString(5),
          url: `https://${genRandomString(5)}.com`.replace(" ", ""),
          description: genRandomString(20),
        },
      });
    }

    res.status(200).json({ message: "success" });
  }
}
