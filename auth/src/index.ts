import mongoose from "mongoose";
import { app } from "./app";

const initiateDb = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be provided");
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Mongo URI must be defined");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection is ready");
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log("Auth Service is listening on port 3000.");
});

initiateDb();
