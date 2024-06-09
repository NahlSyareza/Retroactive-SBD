--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.2

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
-- Name: jenis; Type: TYPE; Schema: public; Owner: retroactive_owner
--

CREATE TYPE public.jenis AS ENUM (
    'Kaset',
    'Vinyl',
    'CD'
);


ALTER TYPE public.jenis OWNER TO retroactive_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: retroactive_owner
--

CREATE TABLE public.cart (
    nama_user text,
    nama_album text,
    jumlah integer
);


ALTER TABLE public.cart OWNER TO retroactive_owner;

--
-- Name: toko_info; Type: TABLE; Schema: public; Owner: retroactive_owner
--

CREATE TABLE public.toko_info (
    nama_toko text,
    email_toko text NOT NULL,
    password_toko text,
    saldo_toko double precision
);


ALTER TABLE public.toko_info OWNER TO retroactive_owner;

--
-- Name: toko_inventory; Type: TABLE; Schema: public; Owner: retroactive_owner
--

CREATE TABLE public.toko_inventory (
    nama_toko text,
    nama_album text,
    nama_artis text,
    jenis_media public.jenis,
    harga_media double precision,
    jumlah integer,
    id integer NOT NULL,
    gambar_media text
);


ALTER TABLE public.toko_inventory OWNER TO retroactive_owner;

--
-- Name: toko_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: retroactive_owner
--

CREATE SEQUENCE public.toko_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.toko_inventory_id_seq OWNER TO retroactive_owner;

--
-- Name: toko_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: retroactive_owner
--

ALTER SEQUENCE public.toko_inventory_id_seq OWNED BY public.toko_inventory.id;


--
-- Name: user_info; Type: TABLE; Schema: public; Owner: retroactive_owner
--

CREATE TABLE public.user_info (
    nama_user text,
    email_user text NOT NULL,
    password_user text,
    saldo_user double precision
);


ALTER TABLE public.user_info OWNER TO retroactive_owner;

--
-- Name: user_inventory; Type: TABLE; Schema: public; Owner: retroactive_owner
--

CREATE TABLE public.user_inventory (
    nama_user text,
    nama_album text,
    nama_artis text,
    jenis_media text,
    jumlah integer,
    gambar_media text
);


ALTER TABLE public.user_inventory OWNER TO retroactive_owner;

--
-- Name: toko_inventory id; Type: DEFAULT; Schema: public; Owner: retroactive_owner
--

ALTER TABLE ONLY public.toko_inventory ALTER COLUMN id SET DEFAULT nextval('public.toko_inventory_id_seq'::regclass);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: retroactive_owner
--

COPY public.cart (nama_user, nama_album, jumlah) FROM stdin;
lalala	18 Love Ballads	1
lalala	Sore Tugu Pancoran	1
mfauzan	Sore Tugu Pancoran	1
mfauzan	Abbey Road	1
Chamber	Blaze of Glory	1
Chamber	Sore Tugu Pancoran	1
\.


--
-- Data for Name: toko_info; Type: TABLE DATA; Schema: public; Owner: retroactive_owner
--

COPY public.toko_info (nama_toko, email_toko, password_toko, saldo_toko) FROM stdin;
Retroactive	retroactive@gmail.com	collectorz	0
\.


--
-- Data for Name: toko_inventory; Type: TABLE DATA; Schema: public; Owner: retroactive_owner
--

COPY public.toko_inventory (nama_toko, nama_album, nama_artis, jenis_media, harga_media, jumlah, id, gambar_media) FROM stdin;
Retroactive	Blaze of Glory	Jon Bon Jovi	Kaset	50000	35	10	https://clzmusic.r.sizr.io/cloud/covers/lg/f2/origin:jpg/f2_8525312_0_BonJoviBlazeOfGlory.webp
Retroactive	18 Love Ballads	Michael Learns To Rock	Kaset	120000	39	19	https://clzmusic.r.sizr.io/cloud/covers/lg/b0/origin:jpg/b0_13047078_0_MichaelLearnsToRock18LoveBalla.webp
Retroactive	Sore Tugu Pancoran	Iwan Fals	Kaset	100000	46	18	https://clzmusic.r.sizr.io/cloud/covers/lg/a5/origin:jpg/a5_12915689_0_IwanFalsSoreTuguPancoran.webp
Retroactive	Abbey Road	The Beatles	Vinyl	150000	16	14	https://clzmusic.r.sizr.io/discogs/lg/52/origin:jpg/52_6209154_0_AbbeyRoad.webp
Retroactive	Bon Jovi	Bon Jovi	CD	500000	50	16	https://clzmusic.r.sizr.io/cloud/covers/lg/44/origin:jpg/44_7071217_0_BonJoviBonJovi.webp
Retroactive	Crush	Bon Jovi	Kaset	100000	45	13	https://clzmusic.r.sizr.io/cloud/covers/lg/06/origin:jpg/06_8631129_0_BonJoviCrush.webp
Retroactive	Greatest Hits	The Police	CD	65000	15	22	https://clzmusic.r.sizr.io/core/covers/lg/a6/origin:jpg/a6_3429815_0_GreatestHits.webp
Retroactive	Whenever You Need Somebody	Rick Astley	Kaset	35000	40	29	https://clzmusic.r.sizr.io/cloud/covers/lg/82/origin:jpg/82_13102462_0_RickAstleyWheneverYouNeedSomeb.webp
Retroactive	Cerita Cinta: 25 Tahun Kahitna	Kahitna	CD	30000	15	27	https://clzmusic.r.sizr.io/cloud/covers/lg/df/origin:jpg/df_11723515_0_KahitnaCeritaCinta25TahunKahit.webp
Retroactive	Jumpa Pertama	Chrisye	Kaset	70000	18	23	https://clzmusic.r.sizr.io/cloud/covers/lg/2a/origin:jpg/2a_13100748_0_ChrisyeJumpaPertama.webp
Retroactive	Chrisye	Chrisye	Kaset	35000	16	24	https://clzmusic.r.sizr.io/cloud/covers/lg/eb/origin:jpg/eb_11572104_0_ChrisyeChrisye.webp
Retroactive	Favourite Worst Nightmare	Arctic Monkeys	CD	125000	10	31	https://clzmusic.r.sizr.io/core/covers/lg/e3/origin:jpg/e3_2445494_0_FavouriteWorstNightmare.webp
Retroactive	The Dark Side of the Moon	Pink Floyd	Kaset	100000	20	33	https://clzmusic.r.sizr.io/cloud/covers/lg/c5/origin:jpg/c5_12281989_0_PinkFloydTheDarkSideOfTheMoon.webp
Retroactive	Album Emas Didi Kempot	Didi Kempot	Kaset	70000	20	34	https://clzmusic.r.sizr.io/cloud/covers/lg/14/origin:jpg/14_8643487_0_DidiKempotAlbumEmasDidiKempot.webp
Retroactive	For Unlawful Carnal Knowledge	Van Halen	Kaset	85000	40	35	https://clzmusic.r.sizr.io/cloud/covers/lg/06/origin:jpg/06_11775317_0_VanHalenForUnlawfulCarnalKnowl.webp
Retroactive	Bleach	Nirvana	Kaset	45000	20	36	https://clzmusic.r.sizr.io/cloud/covers/lg/47/origin:jpg/47_12699238_0_NirvanaBleach.webp
Retroactive	Be Here Now	Oasis	Kaset	100000	25	37	https://clzmusic.r.sizr.io/cloud/covers/lg/a8/origin:jpg/a8_7780743_0_OasisBeHereNow.webp
Retroactive	Ghost In The Machine	The Police	Vinyl	450000	5	38	https://clzmusic.r.sizr.io/discogs/lg/c6/origin:jpeg/c6_2206323_0_ThePoliceGhostInTheMachine.webp
Retroactive	Thriller	Michael Jackson	Vinyl	780000	3	39	https://clzmusic.r.sizr.io/discogs/lg/1d/origin:jpeg/1d_1581451_0_MichaelJacksonThriller.webp
Retroactive	Whenever You Need Somebody	Rick Astley	Vinyl	780000	10	40	https://clzmusic.r.sizr.io/discogs/lg/11/origin:jpeg/11_651103_0_RickAstleyWheneverYouNeedSomeb.webp
Retroactive	Encore	Lionel Richie	Kaset	15000	59	21	https://clzmusic.r.sizr.io/cloud/covers/lg/54/origin:jpg/54_13104416_0_LionelRichieEncore.webp
Retroactive	The Final	Wham!	Kaset	20000	25	26	https://clzmusic.r.sizr.io/cloud/covers/lg/05/origin:jpg/05_12338641_0_WhamTheFinal.webp
Retroactive	(What's The Story) Morning Glory	Oasis	Kaset	150000	49	30	https://clzmusic.r.sizr.io/cloud/covers/lg/14/origin:jpg/14_7964905_0_OasisWhatsTheStoryMorningGlory.webp
Retroactive	Whatever People Say I Am, That's What I'm Not	Arctic Monkeys	Kaset	170000	20	32	https://clzmusic.r.sizr.io/cloud/covers/lg/89/origin:jpg/89_12586603_0_ArcticMonkeysWhateverPeopleSay.webp
Retroactive	Flesh & Blood	Poison	Kaset	35000	44	25	https://clzmusic.r.sizr.io/cloud/covers/lg/55/origin:jpg/55_11668736_0_PoisonFleshBlood.webp
Retroactive	Tangan-Tangan Setan	Nicky Astria	Kaset	65000	39	28	https://clzmusic.r.sizr.io/cloud/covers/lg/ff/origin:jpg/ff_11699612_0_NickyAstriaTanganTanganSetan.webp
Retroactive	Slippery When Wet	Bon Jovi	CD	80000	50	11	https://clzmusic.r.sizr.io/discogs/lg/0d/origin:jpeg/0d_697895_0_BonJoviSlipperyWhenWet.webp
Retroactive	The Days	Bon Jovi	Kaset	30000	50	12	https://clzmusic.r.sizr.io/cloud/covers/lg/3e/origin:jpg/3e_7195665_0_TheseDays_.webp
Retroactive	Adrenalize	Def Leppard	CD	75000	50	1	https://clzmusic.r.sizr.io/cloud/covers/lg/b4/origin:jpg/b4_7077776_0_DefLeppardAdrenalize.webp
Retroactive	The Very Best Of	Black Sabbath	Kaset	10000	10	41	https://clzmusic.r.sizr.io/cloud/covers/lg/86/origin:jpg/86_13122229_0_BlackSabbaththeVeryBestof.webp
Retroactive	Fly on the Wall	AC/DC	Kaset	20000	50	42	https://clzmusic.r.sizr.io/cloud/covers/lg/ba/origin:jpg/ba_13054558_0_.webp
Retroactive	Album Emas Iwan Fals	Iwan Fals	Kaset	35000	44	17	https://clzmusic.r.sizr.io/cloud/covers/lg/d6/origin:jpg/d6_12936187_0_IwanFalsAlbumEmasIwanFals.webp
Retroactive	The Best of Chrisye Vol. 2	Chrisye	CD	150000	4	20	https://clzmusic.r.sizr.io/cloud/covers/lg/3a/origin:jpg/3a_12650181_0_ChrisyeTheBestOfChrisyeVol2.webp
Retroactive	Back In Black	AC/DC	Kaset	25000	11	43	https://clzmusic.r.sizr.io/discogs/lg/31/origin:jpg/31_3946895_0_BackInBlack.webp
\.


--
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: retroactive_owner
--

COPY public.user_info (nama_user, email_user, password_user, saldo_user) FROM stdin;
bintangshn	bintang@gmail.com	$2b$10$s60oEZNBK77a/Bif6fncnu8LNPKEVcqcN47owukdpLuUBCGTCZ4lC	0
lalala	lalala@ui.ac.id	$2b$10$MaadRCixIdKE1kJIISpkruWiRwDOomWBH8BPO4RNO2hJjg6I9jCui	0
Chamber	chamber@gmail.com	$2b$10$ORbB.i9PnIvvrA3GM6uKXui9irlEVp6yVVOAEfQ.9O7W0nmZ2lfTm	500
mfauzan	mfauzan@test.com	$2b$10$5thnT6TEFJtW6pw6jKhUh.x..ots8438WiIAlVTDN9AMG0C1W6k32	1000000
\.


--
-- Data for Name: user_inventory; Type: TABLE DATA; Schema: public; Owner: retroactive_owner
--

COPY public.user_inventory (nama_user, nama_album, nama_artis, jenis_media, jumlah, gambar_media) FROM stdin;
Chamber	Sore Tugu Pancoran	Iwan Fals	Kaset	1	https://clzmusic.r.sizr.io/cloud/covers/lg/a5/origin:jpg/a5_12915689_0_IwanFalsSoreTuguPancoran.webp
Chamber	Abbey Road	The Beatles	Vinyl	1	https://clzmusic.r.sizr.io/discogs/lg/52/origin:jpg/52_6209154_0_AbbeyRoad.webp
lalala	Bon Jovi	Bon Jovi	CD	0	https://clzmusic.r.sizr.io/cloud/covers/lg/44/origin:jpg/44_7071217_0_BonJoviBonJovi.webp
\.


--
-- Name: toko_inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: retroactive_owner
--

SELECT pg_catalog.setval('public.toko_inventory_id_seq', 43, true);


--
-- Name: toko_info toko_info_nama_toko_key; Type: CONSTRAINT; Schema: public; Owner: retroactive_owner
--

ALTER TABLE ONLY public.toko_info
    ADD CONSTRAINT toko_info_nama_toko_key UNIQUE (nama_toko);


--
-- Name: toko_info toko_info_pkey; Type: CONSTRAINT; Schema: public; Owner: retroactive_owner
--

ALTER TABLE ONLY public.toko_info
    ADD CONSTRAINT toko_info_pkey PRIMARY KEY (email_toko);


--
-- Name: toko_inventory toko_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: retroactive_owner
--

ALTER TABLE ONLY public.toko_inventory
    ADD CONSTRAINT toko_inventory_pkey PRIMARY KEY (id);


--
-- Name: user_info user_info_nama_user_key; Type: CONSTRAINT; Schema: public; Owner: retroactive_owner
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_nama_user_key UNIQUE (nama_user);


--
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: retroactive_owner
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (email_user);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

