const request = require("supertest");
const app = require("../app"); 
const mongoose = require("mongoose");
const Book = require("../models/Book");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  });
  await Book.deleteMany({}); // Clean up test database before running tests
  await User.deleteMany({});

  // Create an admin user for authentication
  const adminUser = new User({
    name: "Admin User",
    email: "admin@example.com",
    phoneNumber: "1234567890",
    password: "Admin@1234",
    isAdmin: true,
    isApproved: true,
  });
  await adminUser.save();

  const payload = { user: { id: adminUser.id, isAdmin: true } };
  adminToken = jwt.sign(payload, config.secret, { expiresIn: "1h" });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Books API", () => {
  let bookId;

  test("should add a new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("x-auth-token", adminToken)
      .send({
        title: "Test Book",
        author: "Test Author",
        publicationDate: "2022-01-01",
        description: "Test Description",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
    bookId = res.body._id;
  });

  test("should get all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("should get a book by ID", async () => {
    const res = await request(app).get(`/api/books/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", bookId);
  });

  test("should update a book", async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .set("x-auth-token", adminToken)
      .send({ title: "Updated Test Book" });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Test Book");
  });

  test("should return 404 for non-existent book", async () => {
    const res = await request(app).get("/api/books/605c72a5b5d5cd7f8d9f4c77");
    expect(res.statusCode).toBe(404);
  });
});
