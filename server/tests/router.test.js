// --- IMPORTS ---
// describe: groups related tests | it: defines one test | expect: makes assertions
// vi: mocking utility | beforeEach: runs before every test
import { describe, it, expect, vi, beforeEach } from "vitest";

// supertest fires real HTTP requests at an Express app without starting a server
import request from "supertest";

// --- MOCKS ---
// vi.mock() replaces these modules with fakes before any test runs.
// Using factory functions (second argument) means the real files never execute —
// no DB connection is attempted and tests run instantly with no infrastructure.

vi.mock("../db/connection.js", () => ({ default: {} }));

// Each model mock exposes only the methods the router calls.
// vi.fn() creates a fake function whose return value we control per test.
vi.mock("../models/species.schema.js", () => ({
  default: { findAll: vi.fn(), findByPk: vi.fn() },
}));

vi.mock("../models/trait.schema.js", () => ({
  default: { findAll: vi.fn(), findByPk: vi.fn() },
}));

// vi.mock() is hoisted above imports, so these give us the mocked versions.
import Species from "../models/species.schema.js";
import Trait from "../models/trait.schema.js";

// Minimal Express app — no CORS, no DB sync, no listen. Supertest handles the rest.
import express from "express";
import router from "../routes/router.js";

const app = express();
app.use(express.json());
app.use("/", router);

// --- TEST SUITE ---
describe("API Routes", () => {

  // Reset all mock state before each test so they don't bleed into each other.
  beforeEach(() => { vi.clearAllMocks(); });

  // ─── GET /api/all ──────────────────────────────────────────────────────────

  it("GET /api/all returns 200 and an array of species", async () => {
    // ARRANGE — mockResolvedValue simulates a successful DB call
    const mockSpecies = [{ id: 1, name: "Hedgehog" }, { id: 2, name: "Fox" }];
    Species.findAll.mockResolvedValue(mockSpecies);

    // ACT
    const res = await request(app).get("/api/all");

    // ASSERT
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // body should be an array, not an object
    expect(res.body).toEqual(mockSpecies);
  });

  it("GET /api/all returns 500 when the database fails", async () => {
    // ARRANGE — mockRejectedValue simulates a DB crash; the catch block sends 500
    Species.findAll.mockRejectedValue(new Error("DB error"));

    // ACT
    const res = await request(app).get("/api/all");

    // ASSERT
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  // ─── GET /api/species/:id/traits ───────────────────────────────────────────

  it("GET /api/species/:id/traits returns 200 with species and traits", async () => {
    // ARRANGE — findByPk returns one object; traits array mirrors an eager-loaded association
    const mockSpecies = {
      id: 1,
      name: "Hedgehog",
      traits: [{ id: 1, name: "Quills" }, { id: 2, name: "Small Ears" }],
    };
    Species.findByPk.mockResolvedValue(mockSpecies);

    // ACT
    const res = await request(app).get("/api/species/1/traits");

    // ASSERT
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Hedgehog");
    expect(Array.isArray(res.body.traits)).toBe(true);
  });

  it("GET /api/species/:id/traits returns 404 when species is not found", async () => {
    // ARRANGE — null means the DB ran fine but found no matching row
    // The route checks: if (!species) → 404. This is not a crash, just a missing record.
    Species.findByPk.mockResolvedValue(null);

    // ACT
    const res = await request(app).get("/api/species/9999/traits");

    // ASSERT
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /api/species/:id/traits returns 500 when the database fails", async () => {
    // ARRANGE — the DB threw (crash), not null (missing). The catch block sends 500.
    Species.findByPk.mockRejectedValue(new Error("DB error"));

    // ACT
    const res = await request(app).get("/api/species/1/traits");

    // ASSERT
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  // ─── GET /api/traits ───────────────────────────────────────────────────────

  it("GET /api/traits returns 200 and an array of traits", async () => {
    // ARRANGE
    const mockTraits = [{ id: 1, name: "Quills" }, { id: 2, name: "Fur" }];
    Trait.findAll.mockResolvedValue(mockTraits);

    // ACT
    const res = await request(app).get("/api/traits");

    // ASSERT
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(mockTraits);
  });

  it("GET /api/traits returns 500 when the database fails", async () => {
    // ARRANGE
    Trait.findAll.mockRejectedValue(new Error("DB error"));

    // ACT
    const res = await request(app).get("/api/traits");

    // ASSERT
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  // ─── GET /api/traits/:id/species ───────────────────────────────────────────

  it("GET /api/traits/:id/species returns 200 with trait and species", async () => {
    // ARRANGE — mirror of species/:id/traits but inverted: find which species share a trait
    const mockTrait = {
      id: 1,
      name: "Quills",
      species: [{ id: 1, name: "Hedgehog" }, { id: 3, name: "Echidna" }],
    };
    Trait.findByPk.mockResolvedValue(mockTrait);

    // ACT
    const res = await request(app).get("/api/traits/1/species");

    // ASSERT
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Quills");
    expect(Array.isArray(res.body.species)).toBe(true);
  });

  it("GET /api/traits/:id/species returns 404 when trait is not found", async () => {
    // ARRANGE — null = DB found no row; route sends 404
    Trait.findByPk.mockResolvedValue(null);

    // ACT
    const res = await request(app).get("/api/traits/9999/species");

    // ASSERT
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /api/traits/:id/species returns 500 when the database fails", async () => {
    // ARRANGE — DB threw; catch block sends 500
    Trait.findByPk.mockRejectedValue(new Error("DB error"));

    // ACT
    const res = await request(app).get("/api/traits/1/species");

    // ASSERT
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  // ─── GET /api/name ─────────────────────────────────────────────────────────

  it("GET /api/name returns 200 with matching species when name is found", async () => {
    // ARRANGE — findAll always returns an array (not a single object)
    const mockSpecies = [{ id: 1, name: "Hedgehog" }];
    Species.findAll.mockResolvedValue(mockSpecies);

    // ACT — name is passed as a query parameter (?name=...)
    const res = await request(app).get("/api/name?name=Hedgehog");

    // ASSERT — check the first item in the returned array
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id", 1);
    expect(res.body[0]).toHaveProperty("name", "Hedgehog");
  });

  it("GET /api/name returns 500 when the database fails", async () => {
    // ARRANGE
    Species.findAll.mockRejectedValue(new Error("DB error"));

    // ACT
    const res = await request(app).get("/api/name?name=Hedgehog");

    // ASSERT
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /api/name returns 200 with empty array when no match is found", async () => {
    // ARRANGE — no match returns [] with 200, not a 404.
    // "No results" is a valid successful query, not an error.
    Species.findAll.mockResolvedValue([]);

    // ACT
    const res = await request(app).get("/api/name?name=Dog");

    // ASSERT
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
