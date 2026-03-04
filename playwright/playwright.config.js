import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: process.env.BASE_URL || "http://frontend:5173",
    headless: true,
    trace: "retain-on-failure",
  },
});
