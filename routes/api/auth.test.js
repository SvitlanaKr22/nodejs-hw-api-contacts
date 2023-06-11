const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const { DB_HOST_TEST } = process.env;

describe("test signup user", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(3000);
    await mongoose.connect(DB_HOST_TEST);

    const registerData = {
      email: "abc@gmail.com",
      password: "111111",
    };
    await request(app).post("/api/users/register").send(registerData);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test("test login", async () => {
    const loginData = {
      email: "abc@gmail.com",
      password: "111111",
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy();
    expect(body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
