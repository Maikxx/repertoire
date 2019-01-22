export const createCountriesTable = `
    CREATE TABLE IF NOT EXISTS public.countries
    (
        _id serial PRIMARY KEY,
        name character varying(300) COLLATE pg_catalog."default" NOT NULL,
        code character varying(10) NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
`
