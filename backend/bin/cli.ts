import { Command } from "commander";
import { CreateFleetHandler } from "../src/App/Command/CreateFleet/CreateFleetHandler";
import { CreateFleetCommand } from "../src/App/Command/CreateFleet/CreateFleetCommand";
import { PostgresFleetRepository } from "../src/Infra/PostgresFleetRepository";
import { RegisterVehicleHandler } from "../src/App/Command/RegisterVehicle/RegisterVehicleHandler";
import { RegisterVehicleCommand } from "../src/App/Command/RegisterVehicle/RegisterVehicleCommand";
import { ParkVehicleHandler } from "../src/App/Command/ParkVehicle/ParkVehicleHandler";
import { ParkVehicleCommand } from "../src/App/Command/ParkVehicle/ParkVehicleCommand";
import { Location } from "../src/Domain/Fleet/Location";
import { GetFleetsHandler } from "../src/App/Query/GetFleets/GetFleetsHandler";
import { GetFleetsQuery } from "../src/App/Query/GetFleets/GetFleetsQuery";
import { PostgresFleetQueries } from "../src/Infra/PostgresFleetQueries";
import { GetVehiclesHandler } from "../src/App/Query/GetVehicles/GetVehiclesHandler";
import { GetVehiclesQuery } from "../src/App/Query/GetVehicles/GetVehiclesQuery";
import { GetLocationHandler } from "../src/App/Query/GetLocation/GetLocationHandler";
import { GetLocationQuery } from "../src/App/Query/GetLocation/GetLocationQuery";

const program = new Command();
const repository = new PostgresFleetRepository();
const queries = new PostgresFleetQueries();

program.name("fleet").description("Vehicle fleet management");

// COMMANDS
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

// QUERIES
program
  .command("get-fleets")
  .argument("<userId>")
  .action(async (userId: string) => {
    const handler = new GetFleetsHandler(queries);
    const fleetIds = await handler.execute(new GetFleetsQuery(Number(userId)));

    if (fleetIds.length === 0) {
      console.log("No fleet found for this user");
    } else {
      console.log(
        `You have ${fleetIds.length} fleet(s) with id(s): ${fleetIds.join(", ")}`,
      );
    }
  });

program
  .command("get-vehicles")
  .argument("<fleetId>")
  .action(async (fleetId: string) => {
    const handler = new GetVehiclesHandler(queries);

    const plateNumbers = await handler.execute(
      new GetVehiclesQuery(Number(fleetId)),
    );

    if (plateNumbers.length === 0) {
      console.log("No vehicle found for this fleet");
    } else {
      console.log(
        `This fleet contains ${plateNumbers.length} vehicle(s) : ${plateNumbers.join(", ")}`,
      );
    }
  });

program
  .command("get-location")
  .argument("fleetId")
  .argument("<vehiclePlateNumber>")
  .action(async (fleetId: string, plateNumber: string) => {
    const handler = new GetLocationHandler(queries);
    const location = await handler.execute(
      new GetLocationQuery(Number(fleetId), plateNumber),
    );

    if (location === undefined) {
      console.log("This vehicle doesn't exists");
    } else {
      const latitude = location.lat;
      const longitude = location.lng;
      const altitude = location.alt;

      console.log(
        `This vehicle is located at: ${latitude} - ${longitude} - ${altitude}`,
      );
    }
  });

program.parseAsync().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
