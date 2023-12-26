import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const blogIdParam = req.query.blogId;

  const blogId = Array.isArray(blogIdParam) ? blogIdParam[0] : blogIdParam;

  try {
    const { db } = await connectToDatabase();

    if (!blogId) {
      return res.status(400).json({ error: "Missing blogId parameter" });
    }

    const blogs = await db
      .collection("blogs")
      .findOne({ _id: new ObjectId(blogId) });

    return res.status(200).json({ message: "Data received", blogs });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
