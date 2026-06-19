import assert from "node:assert";
import { WorldPostgres } from "../../support/worldPostgres";
import { Given, When, Then } from "@cucumber/cucumber";
import { RegisterVehicleCommand } from "../../../src/App/Command/RegisterVehicle/RegisterVehicleCommand";
import { CreateFleetCommand } from "../../../src/App/Command/CreateFleet/CreateFleetCommand";

Given("my fleet", async function (this: WorldPostgres) {
  this.userId = 1;
  this.fleetId = await this.createFleetHandler.execute(
    new CreateFleetCommand(this.userId),
  );
});

Given("a vehicle", function (this: WorldPostgres) {
  this.plateNumber = "BG-007";
});

When(
  "I register this vehicle into my fleet",
  async function (this: WorldPostgres) {
    await this.registerVehicleHandler.execute(
      new RegisterVehicleCommand(this.fleetId, this.plateNumber),
    );
  },
);

Then(
  "this vehicle should be part of my vehicle fleet",
  async function (this: WorldPostgres) {
    const fleet = await this.repository.findById(this.fleetId);

    assert.ok(fleet);

    const hasVehicle = fleet.hasVehicle(this.plateNumber);

    assert.strictEqual(hasVehicle, true);
  },
);

Given(
  "I have registered this vehicle into my fleet",
  async function (this: WorldPostgres) {
    await this.registerVehicleHandler.execute(
      new RegisterVehicleCommand(this.fleetId, this.plateNumber),
    );
  },
);

When(
  "I try to register this vehicle into my fleet",
  async function (this: WorldPostgres) {
    try {
      await this.registerVehicleHandler.execute(
        new RegisterVehicleCommand(this.fleetId, this.plateNumber),
      );
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  },
);

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function (this: WorldPostgres) {
    assert.ok(this.error?.message);
  },
);

Given("the fleet of another user", async function (this: WorldPostgres) {
  this.userId = 2;
  this.otherFleetId = await this.createFleetHandler.execute(
    new CreateFleetCommand(this.userId),
  );
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function (this: WorldPostgres) {
    await this.registerVehicleHandler.execute(
      new RegisterVehicleCommand(this.otherFleetId, this.plateNumber),
    );
  },
);
