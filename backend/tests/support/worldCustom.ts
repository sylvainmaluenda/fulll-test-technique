import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";

import { PostgresFleetRepository } from "../../src/Infra/PostgresFleetRepository";
import { RegisterVehicleHandler } from "../../src/App/Command/RegisterVehicle/RegisterVehicleHandler";
import { CreateFleetHandler } from "../../src/App/Command/CreateFleet/CreateFleetHandler";
import { InMemoryFleetRepository } from "../../src/Infra/InMemoryFleetRepository";
import { FleetRepository } from "../../src/Infra/FleetRepository";
import { Fleet } from "../../src/Domain/Fleet/Fleet";
import { Vehicle } from "../../src/Domain/Fleet/Vehicle";
import { Location } from "../../src/Domain/Fleet/Location";
import { ParkVehicleHandler } from "../../src/App/Command/ParkVehicle/ParkVehicleHandler";
import { ParkVehicleCommand } from "../../src/App/Command/ParkVehicle/ParkVehicleCommand";
import { RegisterVehicleCommand } from "../../src/App/Command/RegisterVehicle/RegisterVehicleCommand";
import { CreateFleetCommand } from "../../src/App/Command/CreateFleet/CreateFleetCommand";

export class WorldCustom extends World {
  userId!: number;
  fleet!: Fleet;
  vehicle!: Vehicle;
  location!: Location;
  otherFleet!: Fleet;
  error?: Error;

  repository: FleetRepository;
  registerVehicleHandler: RegisterVehicleHandler;
  createFleetHandler: CreateFleetHandler;
  parkVehicleHandler: ParkVehicleHandler;

  constructor(options: IWorldOptions) {
    super(options);

    if (options.parameters.infrastructure === "postgres") {
      this.repository = new PostgresFleetRepository();
    } else {
      this.repository = new InMemoryFleetRepository();
    }

    this.registerVehicleHandler = new RegisterVehicleHandler(this.repository);

    this.createFleetHandler = new CreateFleetHandler(this.repository);

    this.parkVehicleHandler = new ParkVehicleHandler(this.repository);
  }

  async createFleet(userId: number): Promise<void> {
    this.fleet = await this.createFleetHandler.execute(
      new CreateFleetCommand(userId),
    );
  }

  async registerVehicle(fleet: Fleet = this.fleet): Promise<void> {
    this.vehicle = await this.registerVehicleHandler.execute(
      new RegisterVehicleCommand(fleet.id, this.vehicle.plateNumber),
    );
  }

  async parkVehicle(): Promise<void> {
    await this.parkVehicleHandler.execute(
      new ParkVehicleCommand(
        this.fleet.id,
        this.vehicle.plateNumber,
        this.location,
      ),
    );
  }
}

setWorldConstructor(WorldCustom);
