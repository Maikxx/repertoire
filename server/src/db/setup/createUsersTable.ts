export const createUsersTable = `
    CREATE TABLE IF NOT EXISTS public.users
    (
        _id serial PRIMARY KEY,
        name character varying(150) COLLATE pg_catalog."default" NOT NULL,
        email text NOT NULL UNIQUE,
        password text NOT NULL,
        "profileImage" text,
        "isAdmin" boolean DEFAULT false,
        "isArtist" boolean DEFAULT false,
        "isPublisher" boolean DEFAULT false,
        "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
`
