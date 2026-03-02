// --- INTEGRATION TESTS ---
// These tests run against a real MySQL database — no mocks.
// Requires the DB to be running (docker compose up) before executing.
// Run with: npm run test:integration

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";

// Real models — no factory mocks. These talk to the actual database.
import sequelize from "../db/connection.js";
import Species from "../models/species.schema.js";
import Trait from "../models/trait.schema.js";

// Importing speciesTrait registers the belongsToMany associations on both models.
// Without this import, Species.findByPk({ include: Trait }) would fail.
import SpeciesTrait from "../models/speciesTrait.schema.js";

import router from "../routes/router.js";

const app = express();
app.use(express.json());
app.use("/", router);

// Hold references to the rows we create so tests and afterAll can use their IDs.
let testSpecies;
let testTrait;

// beforeAll runs once before any test in this file.
// We create one species and one trait, then link them through the junction table.
beforeAll(async () => {
  await sequelize.authenticate();

  testSpecies = await Species.create({
    name: "Integration Test Hedgehog",
    description: "Created by integration tests — safe to delete",
  });

  testTrait = await Trait.create({
    name: "Integration Test Quills",
    description: "Created by integration tests — safe to delete",
  });

  // Create the junction record that links the species and trait together.
  await SpeciesTrait.create({
    speciesId: testSpecies.id,
    traitId: testTrait.id,
  });
});

// afterAll runs once after every test has finished.
// Delete in reverse order: junction record first (foreign key dependency),
// then the species and trait rows. Finally close the DB connection so the
// process exits cleanly instead of hanging.
afterAll(async () => {
  await SpeciesTrait.destroy({
    where: { speciesId: testSpecies.id, traitId: testTrait.id },
  });
  await Species.destroy({ where: { id: testSpecies.id } });
  await Trait.destroy({ where: { id: testTrait.id } });
  await sequelize.close();
});

describe("Integration: API Routes", () => {

  // ─── GET /api/all ──────────────────────────────────────────────────────────

  it("GET /api/all returns 200 and includes the test species", async () => {
    // ACT
    const res = await request(app).get("/api/all");

    // ASSERT
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Find our row by ID — the DB may have other rows from seeding, don't assume position.
    const found = res.body.find((species) => species.id === testSpecies.id);
    expect(found).toBeDefined();
    expect(found.name).toBe("Integration Test Hedgehog");
  });

  // ─── GET /api/species/:id/traits ───────────────────────────────────────────

  it("GET /api/species/:id/traits returns 200 with the correct associated traits", async () => {
    // ACT — use the real ID assigned by the DB in beforeAll
    const res = await request(app).get(`/api/species/${testSpecies.id}/traits`);

    // ASSERT
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", testSpecies.id);
    expect(res.body).toHaveProperty("name", "Integration Test Hedgehog");
    expect(Array.isArray(res.body.traits)).toBe(true);
    // Confirm the trait we linked in beforeAll is present in the association.
    const found = res.body.traits.find((trait) => trait.id === testTrait.id);
    expect(found).toBeDefined();
  });

  // ─── GET /api/traits/:id/species ───────────────────────────────────────────

  it("GET /api/traits/:id/species returns 200 with the correct associated species", async () => {
    // ACT — use the real ID assigned by the DB in beforeAll
    const res = await request(app).get(`/api/traits/${testTrait.id}/species`);

    // ASSERT
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", testTrait.id);
    expect(res.body).toHaveProperty("name", "Integration Test Quills");
    expect(Array.isArray(res.body.species)).toBe(true);
    // Confirm the species we linked in beforeAll is present in the association.
    const found = res.body.species.find((species) => species.id === testSpecies.id);
    expect(found).toBeDefined();
  });

  // ─── GET /api/traits ───────────────────────────────────────────────────────

  it("GET /api/traits returns 200 and includes the test trait", async () => {
    // ACT
    const res = await request(app).get("/api/traits");

    // ASSERT
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Find our row by ID — don't assume it's the only trait in the DB.
    const found = res.body.find((trait) => trait.id === testTrait.id);
    expect(found).toBeDefined();
    expect(found.name).toBe("Integration Test Quills");
  });

  // ─── GET /api/name ─────────────────────────────────────────────────────────

  it("GET /api/name returns 200 with matching species when searched by name", async () => {
    // ACT — name is passed as a query parameter (?name=...)
    const res = await request(app).get("/api/name?name=Integration Test Hedgehog");

    // ASSERT
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // The WHERE clause filters to matching rows — find ours by ID to be safe.
    const found = res.body.find((species) => species.id === testSpecies.id);
    expect(found).toBeDefined();
    expect(found.name).toBe("Integration Test Hedgehog");
  });

});
