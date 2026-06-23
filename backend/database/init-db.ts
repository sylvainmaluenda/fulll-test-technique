import { pool } from "../src/Infra/PostgresClient";
import { readFile } from "node:fs/promises";

export const initDb = async (): Promise<void> => {
  console.log("Initializing database...");

  const schemas = await readFile("./database/schemas.sql", "utf8");

  await pool.query(schemas);

  console.log("Database successfully initialized");
};

if (require.main === module) {
  initDb()
    .catch(console.error)
    .finally(async () => {
      await pool.end();
    });
}
