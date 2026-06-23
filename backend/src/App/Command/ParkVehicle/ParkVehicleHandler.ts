import { FleetRepository } from "../../../Infra/FleetRepository";
import { ParkVehicleCommand } from "./ParkVehicleCommand";

export class ParkVehicleHandler {
  constructor(private readonly fleetRepository: FleetRepository) {}

  async execute(command: ParkVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepository.findById(command.fleetId);

    if (!fleet) {
      throw new Error("Fleet not found");
    }

    const vehicle = fleet.findVehicle(command.plateNumber);

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    vehicle.park(command.location);

    await this.fleetRepository.update(fleet);
  }
}
