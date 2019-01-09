import { Client } from 'pg'
require('dotenv').load()

export const database = new Client({
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
    password: process.env.PG_PASSWORD,
})

export const connectToDatabase = async (): Promise<void> => {
    await database.connect()
    await database.query(
        `CREATE TABLE IF NOT EXISTS public.users
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

        ALTER TABLE public.users
            OWNER to admin;

        CREATE TABLE IF NOT EXISTS public.songs
        (
            _id serial PRIMARY KEY,
            title character varying(150) COLLATE pg_catalog."default" NOT NULL,
            composer character varying(150) NOT NULL,
            "composerShare" numeric NOT NULL,
            "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;

        ALTER TABLE public.songs
            OWNER to admin;

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

        ALTER TABLE public.countries
            OWNER to admin;
        `
    )
}
