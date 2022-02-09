import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { getCookie } from "../../test/utils/auth-helper";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).toEqual(401);
});

it("returns a status code other than 401 if the user is signed in", async () => {
  const cookie = getCookie();

  const response = await request(app)
    .post("/api/tickets")
    .send({})
    .set("Cookie", cookie);
  expect(response.status).not.toEqual(401);
});

it("returns error if invalid title is provided", async () => {
  const cookie = getCookie();

  await request(app)
    .post("/api/tickets")
    .send({ title: "", price: 10 })
    .set("Cookie", cookie)
    .expect(400);

  return await request(app)
    .post("/api/tickets")
    .send({ price: 10 })
    .set("Cookie", cookie)
    .expect(400);
});

it("returns error is invalid price is provided", async () => {
  const cookie = getCookie();

  await request(app)
    .post("/api/tickets")
    .send({ title: "test", price: -10 })
    .set("Cookie", cookie)
    .expect(400);

  return await request(app)
    .post("/api/tickets")
    .send({ title: "test" })
    .set("Cookie", cookie)
    .expect(400);
});

it("creates ticket successfully when inputs are valid", async () => {
  const cookie = getCookie();

  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const payload = { title: "test", price: 20 };

  await request(app)
    .post("/api/tickets")
    .send(payload)
    .set("Cookie", cookie)
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(payload.title);
  expect(tickets[0].price).toEqual(payload.price);
});
