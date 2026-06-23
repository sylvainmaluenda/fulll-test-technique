CREATE TABLE fleets (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL
);

CREATE TABLE vehicles (
    vehicle_id BIGSERIAL NOT NULL,
    fleet_id BIGINT NOT NULL,
    plate_number VARCHAR(20) NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    altitude DOUBLE PRECISION,

    PRIMARY KEY (fleet_id, vehicle_id),

    CONSTRAINT fk_fleet
        FOREIGN KEY (fleet_id)
        REFERENCES fleets(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_fleet_plate
        UNIQUE (fleet_id, plate_number)
);
