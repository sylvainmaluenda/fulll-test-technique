import { FleetQueries } from "./FleetQueries";
import { pool } from "./PostgresClient";
import { Location } from "../Domain/Fleet/Location";

export class PostgresFleetQueries implements FleetQueries {
  async findFleetsByUserId(userId: number): Promise<number[]> {
    const fleetsResult = await pool.query(
      `
          SELECT id FROM fleets
          WHERE user_id = $1
          `,
      [Number(userId)],
    );
    return fleetsResult.rows.map((row) => row.id);
  }

  async findVehiclesByFleetId(fleetId: number): Promise<string[]> {
    const vehicles = await pool.query(
      `
      SELECT plate_number FROM vehicles
      WHERE fleet_id = $1
      `,
      [Number(fleetId)],
    );
    return vehicles.rows.map((row) => row.plate_number);
  }

  async findVehicleLocation(
    fleetId: number,
    plateNumber: string,
  ): Promise<Location | undefined> {
    const result = await pool.query(
      `
      SELECT latitude, longitude, altitude FROM vehicles
      WHERE fleet_id = $1
      AND plate_number = $2
      `,
      [Number(fleetId), plateNumber],
    );

    if (result.rows.length === 0) {
      return undefined;
    }

    const row = result.rows[0];

    if (row.latitude === null && row.longitude === null) {
      return undefined;
    }

    const location = new Location(
      Number(row.latitude),
      Number(row.longitude),
      row.altitude !== null ? Number(row.altitude) : undefined,
    );

    return location;
  }
}
