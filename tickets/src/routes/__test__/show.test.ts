import request from "supertest";
import { app } from "../../app";
import { getCookie } from "../../test/utils/auth-helper";
import mongoose from "mongoose";

it("should return 404 if ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  return request(app).get(`/api/ticket/${id}`).send().expect(404);
});

it("should return 200 with ticket details if ticket is found", async () => {
  const cookie = getCookie();
  const payload = { title: "test", price: 10 };

  const response = await request(app)
    .post("/api/tickets")
    .send(payload)
    .set("Cookie", cookie)
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .expect(200);

  expect(ticketResponse.body.title).toEqual(payload.title);
  expect(ticketResponse.body.price).toEqual(payload.price);
});
