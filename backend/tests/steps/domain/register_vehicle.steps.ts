import assert from "node:assert";
import { WorldMemory } from "../../support/worldMemory";
import { Given, When, Then } from "@cucumber/cucumber";
import { Fleet } from "../../../src/Domain/Fleet/Fleet";
import { Vehicle } from "../../../src/Domain/Fleet/Vehicle";

Given("my fleet", function (this: WorldMemory) {
  this.fleet = new Fleet(1, 1);
});

Given("a vehicle", function (this: WorldMemory) {
  this.vehicle = new Vehicle("BG-007");
});

When("I register this vehicle into my fleet", function (this: WorldMemory) {
  this.fleet.registerVehicle(this.vehicle);
});

Then(
  "this vehicle should be part of my vehicle fleet",
  function (this: WorldMemory) {
    const hasVehicle = this.fleet.hasVehicle(this.vehicle.plateNumber);
    assert.strictEqual(hasVehicle, true);
  },
);

Given(
  "I have registered this vehicle into my fleet",
  function (this: WorldMemory) {
    this.fleet.registerVehicle(this.vehicle);
  },
);

When(
  "I try to register this vehicle into my fleet",
  async function (this: WorldMemory) {
    try {
      this.fleet.registerVehicle(this.vehicle);
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  },
);

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function (this: WorldMemory) {
    assert.ok(this.error?.message);
  },
);

Given("the fleet of another user", function (this: WorldMemory) {
  this.otherFleet = new Fleet(2, 2);
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function (this: WorldMemory) {
    this.otherFleet.registerVehicle(this.vehicle);
  },
);
