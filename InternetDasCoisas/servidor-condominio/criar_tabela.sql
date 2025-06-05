CREATE TABLE IF NOT EXISTS public.acessos
(
    id integer NOT NULL DEFAULT nextval('acessos_id_seq'::regclass),
    uid character varying(20) COLLATE pg_catalog."default",
    senha character varying(10) COLLATE pg_catalog."default",
    resultado character varying(10) COLLATE pg_catalog."default",
    data timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    tipo character varying(20) COLLATE pg_catalog."default",
    mensagem character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT acessos_pkey PRIMARY KEY (id)
)