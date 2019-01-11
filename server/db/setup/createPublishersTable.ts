export const createPublishersTable = `
    CREATE TABLE IF NOT EXISTS public.publishers
    (
        _id serial PRIMARY KEY,
        name character varying(300) UNIQUE COLLATE pg_catalog."default" NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

    ALTER TABLE public.publishers
        OWNER to admin;
`
