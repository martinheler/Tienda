import request from "supertest";
import { app } from "../src/server";
import { sequelize } from "../src/config/database";

let token: string;

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
});

describe("User API", () => {
  
  it("Should not allow registration with missing fields", async () => {
    const res = await request(app).post("/users/register").send({
      email: "new_user@example.com" // Missing password
    });
  
    console.log("Test response for missing fields:", res.body); // ✅ Log response
  
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("Email and password are required");
  });
  
  it("Should not allow duplicate email registration", async () => {
    const res = await request(app).post("/users/register").send({
      email: "test_user@example.com",
      password: "password123"
    });
  
    console.log("Test response for duplicate email:", res.body); // ✅ Log response
  
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("Email must be unique");
  });

  it("Should not allow login with incorrect password", async () => {
    const res = await request(app).post("/users/login").send({
      email: "test_user@example.com",
      password: "wrongpassword"
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Credenciales incorrectas");
  });

  it("Should deny access to protected routes without token", async () => {
    const res = await request(app).get("/orders");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Access denied. No token provided.");
  });

});

