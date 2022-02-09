import request from "supertest";
import { app } from "../../app";
import { getCookie } from "../../test/utils/auth-helper";

it("return a response with cookie with valid credentials", async () => {
  const cookie = await getCookie();

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(res.body.currentUser.email).toBe("test@test.com");
});

it("returns currentUser: null if cookie is not provided or is expired", async () => {
  const res = await request(app).get("/api/users/currentuser").expect(200);

  expect(res.body.currentUser).toBe(null);
});
