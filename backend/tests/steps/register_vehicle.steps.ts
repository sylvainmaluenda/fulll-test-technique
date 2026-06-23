import assert from "node:assert";
import { WorldCustom } from "../support/worldCustom";
import { Given, When, Then } from "@cucumber/cucumber";
import { RegisterVehicleCommand } from "../../src/App/Command/RegisterVehicle/RegisterVehicleCommand";
import { CreateFleetCommand } from "../../src/App/Command/CreateFleet/CreateFleetCommand";
import { Vehicle } from "../../src/Domain/Fleet/Vehicle";

Given("my fleet", async function (this: WorldCustom) {
  this.userId = 1;
  await this.createFleet(this.userId);
});

Given("a vehicle", function (this: WorldCustom) {
  this.vehicle = new Vehicle("BG-007");
});

When(
  "I register this vehicle into my fleet",
  async function (this: WorldCustom) {
    await this.registerVehicle();
  },
);

Then(
  "this vehicle should be part of my vehicle fleet",
  async function (this: WorldCustom) {
    const fleet = await this.repository.findById(this.fleet.id);

    assert.ok(fleet);
    assert.ok(fleet.hasVehicle(this.vehicle.plateNumber));
  },
);

Given(
  "I have registered this vehicle into my fleet",
  async function (this: WorldCustom) {
    await this.registerVehicle();
  },
);

When(
  "I try to register this vehicle into my fleet",
  async function (this: WorldCustom) {
    try {
      await this.registerVehicleHandler.execute(
        new RegisterVehicleCommand(this.fleet.id, this.vehicle.plateNumber),
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
  function (this: WorldCustom) {
    assert.strictEqual(
      this.error?.message,
      "This vehicle has already been registered into your fleet",
    );
  },
);

Given("the fleet of another user", async function (this: WorldCustom) {
  this.userId = 2;
  this.otherFleet = await this.createFleetHandler.execute(
    new CreateFleetCommand(this.userId),
  );
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function (this: WorldCustom) {
    await this.registerVehicle(this.otherFleet);
  },
);
