export const createArtistShareTable = `
    CREATE TABLE IF NOT EXISTS public."artistShare"
    (
        _id serial PRIMARY KEY,
        name character varying(150) NOT NULL,
        share numeric NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

    ALTER TABLE public."artistShare"
        OWNER to admin;
`
