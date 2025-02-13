import request from "supertest";
import { app } from "../src/server";
import { sequelize } from "../src/config/database";

let token: string;
let user_id: number;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const resUser = await request(app).post("/users/register").send({
    email: "test_user@example.com",
    password: "password123"
  });

  expect(resUser.statusCode).toBe(201);

  const resLogin = await request(app).post("/users/login").send({
    email: "test_user@example.com",
    password: "password123"
  });

  expect(resLogin.statusCode).toBe(200);
  token = resLogin.body.token;
  user_id = resLogin.body.user_id;

  const resProduct = await request(app).post("/products").set("Authorization", `Bearer ${token}`).send({
    name: "Test Product",
    stock: 10,
    price: 50.00
  });

  expect(resProduct.statusCode).toBe(201);
  const product_id = resProduct.body.product.id; // ✅ Get product ID

  await request(app).post("/orders").set("Authorization", `Bearer ${token}`).send({
    user_id,
    product_id,  // ✅ Ensure product_id is included
    total: 100.00
  });
});



describe("Reports API", () => {

  it("Should return daily sales data", async () => {
    const res = await request(app)
      .get("/reports/daily-sales")
      .set("Authorization", `Bearer ${token}`);
  
    console.log("Daily Sales Response:", res.body); // ✅ Log response
  
    expect(res.statusCode).toBe(200);
    expect(res.body.totalSales).toBeGreaterThan(0);
  });
  
  it("Should return the best-selling product", async () => {
    const res = await request(app)
      .get("/reports/best-selling-product")
      .set("Authorization", `Bearer ${token}`);
  
    console.log("Best-Selling Product Response:", res.body); // ✅ Log response
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("product");
  });
  
  it("Should return the top users with the most purchases", async () => {
    const res = await request(app)
      .get("/reports/top-users")
      .set("Authorization", `Bearer ${token}`);
  
    console.log("Top Users Response:", res.body); // ✅ Log response
  
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

});
