export const createPerformanceRightsOrganizationsTable = `
    CREATE TABLE IF NOT EXISTS public."performanceRightsOrganizations"
    (
        _id serial PRIMARY KEY,
        name character varying(150) UNIQUE COLLATE pg_catalog."default" NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

    ALTER TABLE public."performanceRightsOrganizations"
        OWNER to admin;
`
