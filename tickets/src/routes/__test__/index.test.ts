import request from "supertest";
import { app } from "../../app";
import { getCookie } from "../../test/utils/auth-helper";

const createTicket = async () => {
  const cookie = getCookie();
  const payload = { title: "test", price: 10 };

  return await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send(payload);
};

it("should fetch the list of all the tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  const response = await request(app).get("/api/tickets").expect(200);
  expect(response.body.length).toEqual(3);
});
