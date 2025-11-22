import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

afterEach(async () => {
  const db = mongoose.connection.db;
  if (!db) return;
  const collections = await db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
