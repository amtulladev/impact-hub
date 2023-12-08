import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/database";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const { db } = await connectToDatabase();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { insertedId } = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return res
      .status(201)
      .json({ message: "User created successfully", insertedId });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
