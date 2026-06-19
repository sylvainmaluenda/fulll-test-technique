import { FleetRepository } from "./FleetRepository";
import { Fleet } from "../Domain/Fleet/Fleet";
import { Vehicle } from "../Domain/Fleet/Vehicle";
import { pool } from "./PostgresClient";

export class PostgresFleetRepository implements FleetRepository {
  async findById(id: number): Promise<Fleet | undefined> {
    const fleetResult = await pool.query(
      `
      SELECT id, user_id
      FROM fleets
      WHERE id = $1
      `,
      [id],
    );

    if (fleetResult.rows.length === 0) {
      return undefined;
    }

    const fleetRow = fleetResult.rows[0];

    const fleet = new Fleet(Number(fleetRow.user_id), Number(fleetRow.id));

    const vehiclesResult = await pool.query(
      `
      SELECT plate_number
      FROM vehicles
      WHERE fleet_id = $1
      `,
      [id],
    );

    for (const row of vehiclesResult.rows) {
      fleet.registerVehicle(new Vehicle(row.plate_number));
    }

    return fleet;
  }

  async create(fleet: Fleet): Promise<Fleet> {
    const result = await pool.query(
      `
    INSERT INTO fleets(user_id)
    VALUES($1)
    RETURNING id
    `,
      [fleet.userId],
    );

    return new Fleet(fleet.userId, Number(result.rows[0].id));
  }

  async save(fleet: Fleet): Promise<void> {
    if (!fleet.id) {
      throw new Error("Cannot save fleet without id");
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      await client.query(
        `
      UPDATE fleets
      SET user_id = $2
      WHERE id = $1
      `,
        [fleet.id, fleet.userId],
      );

      await client.query(
        `
      DELETE FROM vehicles
      WHERE fleet_id = $1
      `,
        [fleet.id],
      );

      for (const vehicle of fleet.getVehicles()) {
        await client.query(
          `
        INSERT INTO vehicles(fleet_id, plate_number)
        VALUES($1, $2)
        `,
          [fleet.id, vehicle.plateNumber],
        );
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
