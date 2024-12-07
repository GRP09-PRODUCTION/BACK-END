import request from "supertest";
import app from "../../app"; // Adjust this import based on your app structure
import { db_connection } from "../../utils/dbConnection";
import { logger } from "../../utils/logger";

describe("Race Routes", () => {
  beforeAll(async () => {
    db_connection.then(() => {
      logger.info("DB connected successfully");
    });
  });

  describe("GET /races", () => {
    it("should return all races", async () => {
      const res = await request(app).get("/races");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe("POST /races", () => {
    it("should create a new race", async () => {
      const newRace = { name: "Test Race", date: "2023-04-01" };
      const res = await request(app).post("/races").send(newRace);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe(newRace.name);
    });
  });

  describe("GET /api/race/:id", () => {
    it("should return a specific race by id", async () => {
      // First, create a race to test with
      const newRace = { name: "Test Race", date: "2023-04-01" };
      const createRes = await request(app).post("/api/race").send(newRace);

      const raceId = createRes.body.id;

      // Now test the GET /:id endpoint
      const res = await request(app).get(`/api/race/${raceId}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", raceId);
      expect(res.body).toHaveProperty("name", newRace.name);
      expect(res.body).toHaveProperty("date", newRace.date);
    });

    it("should return 404 for non-existent race id", async () => {
      const nonExistentId = "999999";
      const res = await request(app).get(`/api/race/${nonExistentId}`);

      expect(res.status).toBe(404);
    });
  });
});
