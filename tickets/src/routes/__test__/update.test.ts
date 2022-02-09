import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { getCookie } from "../../test/utils/auth-helper";

it("should return 404 if ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const payload = { title: "test", price: 10 };
  const cookie = getCookie();

  return request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send(payload)
    .expect(404);
});

it("should return 401 if user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const payload = { title: "test", price: 10 };

  return request(app).put(`/api/tickets/${id}`).send(payload).expect(401);
});

it("should return 401 if user does not own the ticket", async () => {
  const cookie1 = getCookie();
  const cookie2 = getCookie();

  const response = await request(app)
    .post("/api/tickets")
    .send({ title: "test", price: 30 })
    .set("Cookie", cookie1);

  return request(app)
    .put(`/api/tickets/${response.body.id}`)
    .send({ title: "new title", price: 10 })
    .set("Cookie", cookie2)
    .expect(401);
});
it("should return 400 if user add an invalid price or title", async () => {
  const cookie = getCookie();

  const response = await request(app)
    .post("/api/tickets")
    .send({ title: "test", price: 30 })
    .set("Cookie", cookie);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ price: 30 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "new title", price: -30 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "new title" })
    .expect(400);
});
it("should updates the ticket successfully if valid inputs are provided", async () => {
  const cookie = getCookie();
  const updatedTicketInfo = { title: "new title", price: 20 };

  const {
    body: { id },
  } = await request(app)
    .post("/api/tickets")
    .send({ title: "test", price: 30 })
    .set("Cookie", cookie);

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send(updatedTicketInfo)
    .expect(200);

  const response = await request(app).get(`/api/tickets/${id}`).expect(200);

  expect(response.body.title).toEqual(updatedTicketInfo.title);
  expect(response.body.price).toEqual(updatedTicketInfo.price);
});
