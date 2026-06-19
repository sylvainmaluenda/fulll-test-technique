import { setWorldConstructor, World } from "@cucumber/cucumber";

import { PostgresFleetRepository } from "../../src/Infra/PostgresFleetRepository";
import { RegisterVehicleHandler } from "../../src/App/Command/RegisterVehicle/RegisterVehicleHandler";
import { CreateFleetHandler } from "../../src/App/Command/CreateFleet/CreateFleetHandler";

export class WorldPostgres extends World {
  userId!: number;
  fleetId!: number;
  otherFleetId!: number;
  plateNumber!: string;
  error?: Error;

  repository = new PostgresFleetRepository();
  registerVehicleHandler = new RegisterVehicleHandler(this.repository);
  createFleetHandler = new CreateFleetHandler(this.repository);
}

setWorldConstructor(WorldPostgres);
