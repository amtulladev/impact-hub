import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { userId } = req.query;

  try {
    const { db } = await connectToDatabase();

    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }

    const blogs = await db.collection("blogs").find({ userId }).toArray();

    return res.status(200).json({ message: "Data received", blogs });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
