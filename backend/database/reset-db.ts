import { pool } from "../src/Infra/PostgresClient";
import { readFile } from "node:fs/promises";

export const resetDb = async (): Promise<void> => {
  console.log("Resetting database...");

  await pool.query(`
    DROP TABLE IF EXISTS vehicles CASCADE;
    DROP TABLE IF EXISTS fleets CASCADE;
  `);

  const schemas = await readFile("./database/schemas.sql", "utf8");

  await pool.query(schemas);

  console.log("Database successfully reset");
};

if (require.main === module) {
  resetDb()
    .catch(console.error)
    .finally(async () => {
      await pool.end();
    });
}
