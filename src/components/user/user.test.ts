import { beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../../app";
import { db_connection } from "../../utils/dbConnection";
import { logger } from "../../utils/logger";

describe("User Routes", () => {
  beforeAll(async () => {
    db_connection.then(() => {
      logger.info("DB connected successfully");
    });
  });

  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const res = await request(app).get("/api/users");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const newUser = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const res = await request(app).post("/api/users").send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe(newUser.name);
      expect(res.body.email).toBe(newUser.email);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return a specific user", async () => {
      // First, create a user
      const newUser = {
        name: "Get Test User",
        email: "gettest@example.com",
        password: "password123",
      };
      const createRes = await request(app).post("/api/users").send(newUser);
      const userId = createRes.body.id;

      // Now, fetch the user
      const res = await request(app).get(`/api/users/${userId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", userId);
      expect(res.body.name).toBe(newUser.name);
      expect(res.body.email).toBe(newUser.email);
    });

    it("should return 404 for non-existent user", async () => {
      const res = await request(app).get("/api/users/nonexistentid");
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update an existing user", async () => {
      // First, create a user
      const newUser = {
        name: "Update Test User",
        email: "updatetest@example.com",
        password: "password123",
      };
      const createRes = await request(app).post("/api/users").send(newUser);
      const userId = createRes.body.id;

      // Now, update the user
      const updatedUser = {
        name: "Updated User",
        email: "updated@example.com",
      };
      const res = await request(app)
        .put(`/api/users/${userId}`)
        .send(updatedUser);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", userId);
      expect(res.body.name).toBe(updatedUser.name);
      expect(res.body.email).toBe(updatedUser.email);
    });

    it("should return 404 for updating non-existent user", async () => {
      const res = await request(app)
        .put("/api/users/nonexistentid")
        .send({ name: "Test" });
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete an existing user", async () => {
      // First, create a user
      const newUser = {
        name: "Delete Test User",
        email: "deletetest@example.com",
        password: "password123",
      };
      const createRes = await request(app).post("/api/users").send(newUser);
      const userId = createRes.body.id;

      // Now, delete the user
      const res = await request(app).delete(`/api/users/${userId}`);
      expect(res.status).toBe(204);

      // Verify the user is deleted
      const getRes = await request(app).get(`/api/users/${userId}`);
      expect(getRes.status).toBe(404);
    });

    it("should return 404 for deleting non-existent user", async () => {
      const res = await request(app).delete("/api/users/nonexistentid");
      expect(res.status).toBe(404);
    });
  });
});
