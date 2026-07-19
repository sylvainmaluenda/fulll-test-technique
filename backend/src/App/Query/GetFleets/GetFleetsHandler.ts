import { FleetQueries } from "../../../Infra/FleetQueries";
import { GetFleetsQuery } from "./GetFleetsQuery";

export class GetFleetsHandler {
  constructor(private readonly fleetQueries: FleetQueries) {}

  async execute(command: GetFleetsQuery): Promise<number[]> {
    return await this.fleetQueries.findFleetsByUserId(command.userId);
  }
}
