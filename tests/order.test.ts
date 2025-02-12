import request from "supertest";
import { app } from "../src/server";
import { sequelize } from "../src/config/database";

let token: string;
let user_id: number;

beforeAll(async () => {
  await sequelize.sync({ force: true }); // ✅ Reset database before tests

  // ✅ Register a test user
  const resUser = await request(app).post("/users/register").send({
    email: "test_user@example.com",
    password: "password123"
  });

  expect(resUser.statusCode).toBe(201);

  // ✅ Login the test user
  const resLogin = await request(app).post("/users/login").send({
    email: "test_user@example.com",
    password: "password123"
  });

  expect(resLogin.statusCode).toBe(200);
  token = resLogin.body.token;
  user_id = resLogin.body.user_id;
});

describe("Order API", () => {

  it("Should not allow creating an order with a non-existent user", async () => {
    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id: 9999, total: 100.00 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("Should not allow creating an order with invalid total value", async () => {
    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id, total: -50 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid user_id or total. Must be a positive number.");
  });

  it("Should retrieve all orders for a user", async () => {
    await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id, total: 150.00 });

    const res = await request(app)
      .get(`/orders/${user_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

});
