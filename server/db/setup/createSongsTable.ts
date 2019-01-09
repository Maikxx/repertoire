export const createSongsTable = `
    CREATE TABLE IF NOT EXISTS public.songs
    (
        _id serial PRIMARY KEY,
        title character varying(150) COLLATE pg_catalog."default" NOT NULL,
        "composerShareId" integer REFERENCES "artistShare"(_id),
        "creatorIds" integer[] REFERENCES "artistShare"(_id),
        "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

    ALTER TABLE public.songs
        OWNER to admin;
`
