import { Location } from "./Location";

export class Vehicle {
  private location?: Location;
  constructor(public readonly plateNumber: string) {}

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
