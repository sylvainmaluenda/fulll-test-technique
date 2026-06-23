import { Before } from "@cucumber/cucumber";
import { setupDb } from "../../database/setup-db";

Before({ tags: "@critical" }, async () => {
  await setupDb();
});
