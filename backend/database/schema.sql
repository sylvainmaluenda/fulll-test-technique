DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS fleets;

CREATE TABLE fleets (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL
);

CREATE TABLE vehicles (
    vehicle_id BIGSERIAL NOT NULL,
    fleet_id BIGINT NOT NULL,
    plate_number VARCHAR(20) NOT NULL,

    PRIMARY KEY (fleet_id, vehicle_id),

    CONSTRAINT fk_fleet
        FOREIGN KEY (fleet_id)
        REFERENCES fleets(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_fleet_plate
        UNIQUE (fleet_id, plate_number)
);
