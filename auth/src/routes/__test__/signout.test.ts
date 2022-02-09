import request from "supertest";
import { app } from "../../app";

it("return an empty object with no cookie", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const res = await request(app).post("/api/users/signout").expect(200);

  expect(res.get("Set-Cookie")).toEqual([
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
  ]);
});
