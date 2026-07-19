export class GetLocationQuery {
  constructor(
    public readonly fleetId: number,
    public readonly plateNumber: string,
  ) {}
}
