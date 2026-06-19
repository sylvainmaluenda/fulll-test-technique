import { Fleet } from "../Domain/Fleet/Fleet";

export interface FleetRepository {
  findById(id: number): Promise<Fleet | undefined>;
  create(fleet: Fleet): Promise<Fleet>;
  save(fleet: Fleet): Promise<void>;
}
