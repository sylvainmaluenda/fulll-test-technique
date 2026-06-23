import { pool } from "../src/Infra/PostgresClient";

export const clearDb = async (): Promise<void> => {
  await pool.query(`
    TRUNCATE TABLE vehicles, fleets
    RESTART IDENTITY
    CASCADE;
  `);
};
