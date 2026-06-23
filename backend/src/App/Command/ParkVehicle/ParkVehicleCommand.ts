import { Location } from "../../../Domain/Fleet/Location";

export class ParkVehicleCommand {
  constructor(
    public readonly fleetId: number,
    public readonly plateNumber: string,
    public readonly location: Location,
  ) {}
}
