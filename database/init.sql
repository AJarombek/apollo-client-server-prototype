-- Initialization SQL commands when the PostgreSQL database first boots up.  All these statements
-- are executed in the default 'postgres' database.
-- Author: Andrew Jarombek
-- Date: 5/20/2020

CREATE USER apollo WITH ENCRYPTED PASSWORD 'apollo';
GRANT ALL PRIVILEGES ON DATABASE postgres TO apollo;

-- Create a schema named 'shop' in the 'postgres' database.
CREATE SCHEMA shop;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA shop TO apollo;

SET search_path TO shop, public;

DROP TABLE IF EXISTS flower;
DROP TABLE IF EXISTS plant_type;

CREATE TABLE plant_type (
    type VARCHAR(20) NOT NULL PRIMARY KEY
);

CREATE TABLE flower (
    id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    in_stock BOOLEAN,
    on_sale BOOLEAN,
    count INTEGER,
    price FLOAT,
    sale_price FLOAT,
    description VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT flower_type_fkey FOREIGN KEY (type)
        REFERENCES plant_type (type) MATCH FULL
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO plant_type (type) VALUES ('annual');
INSERT INTO plant_type (type) VALUES ('perennial');
INSERT INTO plant_type (type) VALUES ('shrub');

INSERT INTO flower (
    id, name, image, type, in_stock, on_sale, count, price, sale_price, description
) VALUES (
    1, 'Azalea', 'azalea.jpg', 'shrub', true, false, 5, 19.99, 14.99, 'Pink flowering shrub.'
);

INSERT INTO flower (
    id, name, image, type, in_stock, on_sale, count, price, sale_price, description
) VALUES (
    2, 'Baby Primrose', 'baby-primrose.jpg', 'perennial', true, true, 5, 7.99, 5.99,
    'Small yellow flowering perennial.'
);

INSERT INTO flower (
    id, name, image, type, in_stock, on_sale, count, price, sale_price, description
) VALUES (
    3, 'Geranium', 'geranium.jpg', 'annual', true, false, 5, 5.99, 4.99,
    'Potted annual Geranium, good for decks and patios.'
);

INSERT INTO flower (
    id, name, image, type, in_stock, on_sale, count, price, sale_price, description
) VALUES (
    4, 'Heart Flower', 'heart-flower.jpg', 'perennial', true, false, 5, 12.31, 2.26,
    'Beautiful pink heart flowers.'
);

INSERT INTO flower (
    id, name, image, type, in_stock, on_sale, count, price, sale_price, description
) VALUES (
    5, 'Lilac', 'lilac.jpg', 'perennial', true, false, 5, 29.99, 24.99,
    'Purple flowers perfect for bouquets.'
);

INSERT INTO flower (
    id, name, image, type, in_stock, on_sale, count, price, sale_price, description
) VALUES (
    6, 'Periwinkle', 'periwinkle.jpg', 'perennial', true, true, 5, 5.99, 4.49,
    'Small multi-shaded pink flower.'
);

INSERT INTO flower (
    id, name, image, type, in_stock, on_sale, count, price, sale_price, description
) VALUES (
    7, 'Pulmonaria', 'pulmonaria.jpg', 'perennial', true, true, 5, 9.99, 7.49,
    'Small flowers which transition from pink to purple as they bloom.  One of my favorites.'
);

INSERT INTO flower (
    id, name, image, type, in_stock, on_sale, count, price, sale_price, description
) VALUES (
    8, 'Sage', 'sage.jpg', 'perennial', true, false, 5, 8.99, 5.99,
    'Purple sage.  Great garden plant.'
);

INSERT INTO flower (
    id, name, image, type, in_stock, on_sale, count, price, sale_price, description
) VALUES (
    9, 'Narrowleaf Zinnia', 'zinnia.jpg', 'perennial', true, true, 5, 12.99, 9.99,
    'Orange flowering plant.'
);

