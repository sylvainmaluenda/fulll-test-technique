import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Fleet } from "../../src/Domain/Fleet/Fleet";
import { Vehicle } from "../../src/Domain/Fleet/Vehicle";

export class WorldMemory extends World {
  fleet!: Fleet;
  otherFleet!: Fleet;
  vehicle!: Vehicle;
  error?: Error;
}

setWorldConstructor(WorldMemory);
