import { describe, it, expect, vi, beforeEach } from "vitest";
/* describe groups tests, it is a single test, expect makes assertions, vi is Vitest's mocking utility, and beforeEach runs setup code before each test */

import request from "supertest";
/* request wraps your Express app and lets you fire HTTP calls at it without a real network.*/

vi.mock("../models/species.schema.js");
vi.mock("../models/trait.schema.js");
/* vi.mock() intercepts the imports and replaces them with empty fakes. No database connection is ever attempted. Tests run instantly with zero infrastructure.*/

/* Build a minimal test app */
import express from "express";
import router from "../routes/router.js";

const app = express();
app.use(express.json());
app.use("/", router);

/*outer describe block to wrap our backend API route tests*/
describe("API Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // tests go here
});
vi.clearAllMocks();
