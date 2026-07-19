import { FleetQueries } from "../../../Infra/FleetQueries";
import { GetVehiclesQuery } from "./GetVehiclesQuery";

export class GetVehiclesHandler {
  constructor(private readonly fleetQueries: FleetQueries) {}

  async execute(command: GetVehiclesQuery): Promise<string[]> {
    return await this.fleetQueries.findVehiclesByFleetId(command.fleetId);
  }
}
