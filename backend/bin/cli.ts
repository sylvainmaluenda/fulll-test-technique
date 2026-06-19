import { Command } from "commander";
import { CreateFleetHandler } from "../src/App/Command/CreateFleet/CreateFleetHandler";
import { CreateFleetCommand } from "../src/App/Command/CreateFleet/CreateFleetCommand";
import { PostgresFleetRepository } from "../src/Infra/PostgresFleetRepository";
import { RegisterVehicleHandler } from "../src/App/Command/RegisterVehicle/RegisterVehicleHandler";
import { RegisterVehicleCommand } from "../src/App/Command/RegisterVehicle/RegisterVehicleCommand";
const program = new Command();
const repository = new PostgresFleetRepository();

program.name("fleet").description("Vehicle fleet management");

program
  .command("create")
  .argument("<userId>")
  .action(async (userId: string) => {
    const handler = new CreateFleetHandler(repository);

    const fleetId = await handler.execute(
      new CreateFleetCommand(Number(userId)),
    );

    console.log(`Fleet created with Id: ${fleetId}`);
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

program.parseAsync().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
