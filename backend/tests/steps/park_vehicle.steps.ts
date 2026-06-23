import assert from "node:assert";
import { Given, Then, When } from "@cucumber/cucumber";
import { Location } from "../../src/Domain/Fleet/Location";
import { WorldCustom } from "../support/worldCustom";
import { ParkVehicleCommand } from "../../src/App/Command/ParkVehicle/ParkVehicleCommand";

Given("a location", function (this: WorldCustom) {
  this.location = new Location(50, 50);
});

When("I park my vehicle at this location", async function () {
  await this.parkVehicle();
});

Then(
  "the known location of my vehicle should verify this location",
  async function () {
    const fleet = await this.repository.findById(this.fleet.id);

    assert.ok(fleet);

    const vehicle = fleet.findVehicle(this.vehicle.plateNumber);

    assert.ok(vehicle);
    assert.ok(vehicle.getLocation().equals(this.location));
  },
);

Given("my vehicle has been parked into this location", async function () {
  await this.parkVehicle();
});

When("I try to park my vehicle at this location", async function () {
  try {
    await this.parkVehicle();
  } catch (error) {
    if (error instanceof Error) {
      this.error = error;
    }
  }
});

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    assert.strictEqual(
      this.error?.message,
      "Your vehicle is already parked at this location",
    );
  },
);
