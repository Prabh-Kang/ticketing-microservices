import request from "supertest";
import { app } from "../../app";

export const getCookie = async (email?: string, password?: string) => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: email || "test@test.com",
      password: password || "password",
    })
    .expect(201);

  return authResponse.get("Set-Cookie");
};
