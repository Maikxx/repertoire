export const createArtistShareTable = `
    CREATE TABLE IF NOT EXISTS public."artistShares"
    (
        _id serial PRIMARY KEY,
        name character varying(150) NOT NULL,
        share numeric NOT NULL,
        role character varying(25) NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
`
