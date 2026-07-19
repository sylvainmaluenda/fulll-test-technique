import { FleetQueries } from "../../../Infra/FleetQueries";
import { GetLocationQuery } from "./GetLocationQuery";
import { Location } from "../../../Domain/Fleet/Location";
export class GetLocationHandler {
  constructor(private readonly fleetQueries: FleetQueries) {}

  async execute(command: GetLocationQuery): Promise<Location | undefined> {
    return await this.fleetQueries.findVehicleLocation(
      command.fleetId,
      command.plateNumber,
    );
  }
}
