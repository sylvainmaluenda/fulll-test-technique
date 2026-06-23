import { Fleet } from "../Domain/Fleet/Fleet";

export interface FleetRepository {
  findById(id: number): Promise<Fleet | undefined>;
  create(userId: Number): Promise<Fleet>;
  update(fleet: Fleet): Promise<void>;
}
