import { pool } from "../src/Infra/PostgresClient";

async function testDb() {
  try {
    await pool.query("SELECT 1");
    console.log("Successfully connected to PostgreSQL");
  } finally {
    await pool.end();
  }
}

testDb().catch(console.error);
