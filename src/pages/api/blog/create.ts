import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { title, description, userId } = req.body;

  try {
    const { db } = await connectToDatabase();
    const blog = await db.collection("blogs").findOne({ title });

    if (blog) {
      return res.status(401).json({ error: "Title already exists" });
    }

    await db.collection("blogs").insertOne({
      userId,
      title,
      description,
      createdAt: new Date(),
    });

    return res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
