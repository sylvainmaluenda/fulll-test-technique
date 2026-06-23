import { Command } from "commander";
import { CreateFleetHandler } from "../src/App/Command/CreateFleet/CreateFleetHandler";
import { CreateFleetCommand } from "../src/App/Command/CreateFleet/CreateFleetCommand";
import { PostgresFleetRepository } from "../src/Infra/PostgresFleetRepository";
import { RegisterVehicleHandler } from "../src/App/Command/RegisterVehicle/RegisterVehicleHandler";
import { RegisterVehicleCommand } from "../src/App/Command/RegisterVehicle/RegisterVehicleCommand";
import { ParkVehicleHandler } from "../src/App/Command/ParkVehicle/ParkVehicleHandler";
import { ParkVehicleCommand } from "../src/App/Command/ParkVehicle/ParkVehicleCommand";
import { Location } from "../src/Domain/Fleet/Location";

const program = new Command();
const repository = new PostgresFleetRepository();

program.name("fleet").description("Vehicle fleet management");

program
  .command("create")
  .argument("<userId>")
  .action(async (userId: string) => {
    const handler = new CreateFleetHandler(repository);

    const fleet = await handler.execute(new CreateFleetCommand(Number(userId)));

    console.log(`Fleet created with Id: ${fleet.id}`);
  });

program
  .command("register-vehicle")
  .argument("<fleetId>")
  .argument("<vehiclePlateNumber>")
  .action(async (fleetId: string, plateNumber: string) => {
    const handler = new RegisterVehicleHandler(repository);

    await handler.execute(
      new RegisterVehicleCommand(Number(fleetId), plateNumber),
    );

    console.log(
      `Vehicle with plate number ${plateNumber} has been registered into fleet ${fleetId}`,
    );
  });

program
  .command("localize-vehicle")
  .argument("<fleetId>")
  .argument("<vehiclePlateNumber>")
  .argument("<lat>")
  .argument("<lng>")
  .argument("[alt]")
  .action(
    async (
      fleetId: string,
      plateNumber: string,
      lat: string,
      lng: string,
      alt?: string,
    ) => {
      const handler = new ParkVehicleHandler(repository);

      await handler.execute(
        new ParkVehicleCommand(
          Number(fleetId),
          plateNumber,
          new Location(Number(lat), Number(lng), alt ? Number(alt) : undefined),
        ),
      );

      console.log(
        `The localization of the vehicle ${plateNumber} has been updated`,
      );
    },
  );

program.parseAsync().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
