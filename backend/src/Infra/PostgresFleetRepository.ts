import { FleetRepository } from "./FleetRepository";
import { Fleet } from "../Domain/Fleet/Fleet";
import { Vehicle } from "../Domain/Fleet/Vehicle";
import { Location } from "../Domain/Fleet/Location";
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

    const fleet = new Fleet(Number(fleetRow.id), Number(fleetRow.user_id));

    const vehiclesResult = await pool.query(
      `
      SELECT plate_number, latitude, longitude, altitude
      FROM vehicles
      WHERE fleet_id = $1
      `,
      [id],
    );

    for (const row of vehiclesResult.rows) {
      const vehicle = new Vehicle(row.plate_number);

      if (row.latitude !== null && row.longitude !== null) {
        vehicle.park(
          new Location(
            Number(row.latitude),
            Number(row.longitude),
            row.altitude !== null ? Number(row.altitude) : undefined,
          ),
        );
      }

      fleet.registerVehicle(vehicle);
    }

    return fleet;
  }

  async create(userId: number): Promise<Fleet> {
    const result = await pool.query(
      `
    INSERT INTO fleets(user_id)
    VALUES($1)
    RETURNING id
    `,
      [userId],
    );

    return new Fleet(userId, Number(result.rows[0].id));
  }

  async update(fleet: Fleet): Promise<void> {
    if (fleet.id === undefined) {
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
        const location = vehicle.getLocation();

        await client.query(
          `
        INSERT INTO vehicles(
          fleet_id,
          plate_number,
          latitude,
          longitude,
          altitude
        )
        VALUES($1, $2, $3, $4, $5)
        `,
          [
            fleet.id,
            vehicle.plateNumber,
            location?.lat ?? null,
            location?.lng ?? null,
            location?.alt ?? null,
          ],
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
