import { Vehicle } from "./Vehicle";

export class Fleet {
  private readonly vehicles = new Set<Vehicle>();

  constructor(
    public readonly userId: number,
    public readonly id?: number,
    public readonly plateNumber?: string,
  ) {}

  registerVehicle(vehicle: Vehicle): void {
    if (this.hasVehicle(vehicle.plateNumber)) {
      throw new Error("Vehicle already registered");
    }

    this.vehicles.add(vehicle);
  }

  hasVehicle(plateNumber: string): boolean {
    return [...this.vehicles].some(
      (vehicle) => vehicle.plateNumber === plateNumber,
    );
  }

  getVehicles(): Vehicle[] {
    return [...this.vehicles];
  }
}
