import { Fleet } from "../Domain/Fleet/Fleet";
import { FleetRepository } from "./FleetRepository";

export class InMemoryFleetRepository implements FleetRepository {
  private readonly fleets = new Map<number, Fleet>();
  private nextId = 1;

  async findById(id: number): Promise<Fleet | undefined> {
    return this.fleets.get(id);
  }

  async create(userId: number): Promise<Fleet> {
    const id = this.nextId++;
    const fleet = new Fleet(id, userId);

    this.fleets.set(id, fleet);

    return fleet;
  }

  async update(fleet: Fleet): Promise<void> {
    if (fleet.id === undefined) {
      throw new Error("Cannot save fleet without id");
    }

    if (!this.fleets.has(fleet.id)) {
      throw new Error(`Fleet ${fleet.id} does not exist`);
    }

    this.fleets.set(fleet.id, fleet);
  }
}
