CREATE TABLE "products" (
    "id" bigserial PRIMARY KEY,
    "name" varchar NOT NULL,
    "description" varchar NOT NULL,
    "price" bigint NOT NULL,
    "stock" bigint,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz NOT NULL DEFAULT (now())
);

 
CREATE INDEX ON "products" ("name")