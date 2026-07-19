import { Location } from "../Domain/Fleet/Location";

export interface FleetQueries {
  findFleetsByUserId(userId: number): Promise<number[]>;
  findVehiclesByFleetId(fleetId: number): Promise<string[]>;
  findVehicleLocation(
    fleetId: number,
    plateNumber: string,
  ): Promise<Location | undefined>;
}
