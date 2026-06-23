import { Vehicle } from "./Vehicle";

export class Fleet {
  private readonly vehicles = new Map<string, Vehicle>();

  constructor(
    public readonly id: number,
    public readonly userId: number,
  ) {}

  registerVehicle(vehicle: Vehicle): void {
    if (this.hasVehicle(vehicle.plateNumber)) {
      throw new Error(
        "This vehicle has already been registered into your fleet",
      );
    }

    this.vehicles.set(vehicle.plateNumber, vehicle);
  }

  hasVehicle(plateNumber: string): boolean {
    return this.vehicles.has(plateNumber);
  }

  getVehicles(): Vehicle[] {
    return [...this.vehicles.values()];
  }

  findVehicle(plateNumber: string): Vehicle | undefined {
    return this.vehicles.get(plateNumber);
  }
}
