import { Location } from "./Location";

export class Vehicle {
  private location?: Location;
  constructor(public readonly plateNumber: string) {}

  static rehydrate(plateNumber: string, location?: Location): Vehicle {
    const vehicle = new Vehicle(plateNumber);

    vehicle.location = location;

    return vehicle;
  }

  park(location: Location): void {
    const currentLocation = this.getLocation();

    if (currentLocation && currentLocation.equals(location)) {
      throw new Error("Your vehicle is already parked at this location");
    }

    this.location = location;
  }

  getLocation(): Location | undefined {
    return this.location;
  }
}
