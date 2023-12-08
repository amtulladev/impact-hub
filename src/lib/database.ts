import { MongoClient, Db } from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI || "YOUR_MONGODB_CONNECTION_STRING";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}
let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db();
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default connectToDatabase;
