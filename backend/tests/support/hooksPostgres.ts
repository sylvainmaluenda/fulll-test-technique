import { Before } from "@cucumber/cucumber";
import { pool } from "../../src/Infra/PostgresClient";

Before({ tags: "@critical" }, async () => {
  await pool.query(`
    TRUNCATE TABLE vehicles, fleets
    RESTART IDENTITY
    CASCADE
  `);
});
