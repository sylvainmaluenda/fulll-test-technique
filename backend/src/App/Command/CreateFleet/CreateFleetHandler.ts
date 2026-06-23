import { Fleet } from "../../../Domain/Fleet/Fleet";
import { FleetRepository } from "../../../Infra/FleetRepository";
import { CreateFleetCommand } from "./CreateFleetCommand";

export class CreateFleetHandler {
  constructor(private readonly fleetRepository: FleetRepository) {}

  async execute(command: CreateFleetCommand): Promise<Fleet> {
    return await this.fleetRepository.create(command.userId);
  }
}
