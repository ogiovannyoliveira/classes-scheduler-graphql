--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Debian 13.3-1.pgdg100+1)
-- Dumped by pg_dump version 13.3 (Debian 13.3-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_table_access_method = heap;

--
-- Name: teachers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teachers (
  id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
  name varchar NOT NULL,
  email varchar NOT NULL,
  password varchar(60) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone
);

--
-- Name: levels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.levels (
  id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
  ordering int NOT NULL,
  name varchar NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone
);

--
-- Name: classes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.classes (
  id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
  minimum_level_id uuid NOT NULL,
  teacher_id uuid NOT NULL,
  title varchar NOT NULL,
  description varchar,
  link varchar NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone,
  CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES public.teachers (id),
  CONSTRAINT fk_minimum_level FOREIGN KEY (minimum_level_id) REFERENCES public.levels (id)
);

--
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
  id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
  level_id uuid NOT NULL,
  name varchar NOT NULL,
  email varchar NOT NULL,
  phone varchar NOT NULL,
  password varchar(60) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone,
  CONSTRAINT fk_level FOREIGN KEY (level_id) REFERENCES public.levels (id)
);

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
  id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
  class_id uuid NOT NULL,
  responsible_id uuid NOT NULL,
  starts_at timestamp with time zone NOT NULL,
  finishes_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone,
  CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES public.classes (id),
  CONSTRAINT fk_class FOREIGN KEY (responsible_id) REFERENCES public.teachers (id)
);

--
-- Name: schedules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedules (
  id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
  class_id uuid NOT NULL,
  appointment_id uuid NOT NULL,
  student_id uuid NOT NULL,
  attended boolean,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone,
  CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES public.classes (id),
  CONSTRAINT fk_appointment FOREIGN KEY (appointment_id) REFERENCES public.appointments (id),
  CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES public.students (id)
);
