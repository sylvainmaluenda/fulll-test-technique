import { pool } from "../src/Infra/PostgresClient";
import { initDb } from "./init-db";
import { clearDb } from "./clear-db";

const schemaExists = async (): Promise<boolean> => {
  const result = await pool.query(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'fleets'
    );
  `);

  return result.rows[0].exists;
};

export const setupDb = async (): Promise<void> => {
  console.log("Preparing database...");

  if (!(await schemaExists())) {
    console.log("Schema does not exist, initializing...");
    await initDb();
    return;
  }

  console.log("Schema exists, clearing data...");
  await clearDb();

  console.log("Database ready");
};
