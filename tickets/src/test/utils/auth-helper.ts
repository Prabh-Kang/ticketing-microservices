import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const getCookie = () => {
  // Build a JWT payload { id, email }
  const id = new mongoose.Types.ObjectId().toHexString();
  const payload = {
    id,
    email: "test@test.com",
  };
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build the session object
  const session = { jwt: token };
  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it in base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string that the cookie with encoded data
  return [`session=${base64}`];
};
