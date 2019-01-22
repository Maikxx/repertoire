export const createSongsTable = `
    CREATE TABLE IF NOT EXISTS public.songs
    (
        _id serial PRIMARY KEY,
        title character varying(150) COLLATE pg_catalog."default" NOT NULL,
        "composerShare" integer REFERENCES "artistShares"(_id),
        "creatorShares" integer[],
        country integer REFERENCES countries(_id),
        "performanceRightsOrganization" integer REFERENCES "performanceRightsOrganizations"(_id),
        publishers integer[],
        accepted boolean NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
`
