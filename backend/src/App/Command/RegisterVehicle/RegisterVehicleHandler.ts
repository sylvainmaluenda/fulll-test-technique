import { Vehicle } from "../../../Domain/Fleet/Vehicle";
import { FleetRepository } from "../../../Infra/FleetRepository";
import { RegisterVehicleCommand } from "./RegisterVehicleCommand";

export class RegisterVehicleHandler {
  constructor(private readonly fleetRepository: FleetRepository) {}

  async execute(command: RegisterVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepository.findById(command.fleetId);

    if (!fleet) {
      throw new Error("Fleet not found");
    }

    const vehicle = new Vehicle(command.plateNumber);

    fleet.registerVehicle(vehicle);

    await this.fleetRepository.save(fleet);
  }
}
