# Arielove kolibe

Sajt vizit karta za **Arielove kolibe** (ranije Tomine kolibe), dve drvene kolibe u centru Mokre Gore.
Statičan sajt na tri jezika: srpski (`/`), engleski (`/en/`) i ruski (`/ru/`).

Tehnika: [Astro](https://astro.build) + TypeScript + Tailwind CSS. Bez servera, bez kolačića, bez praćenja.
Hosting: GitHub Pages, objava preko GitHub Actions na svaki push na `main`.

## Održavanje

Gotovo sve se menja u **jednom fajlu: [`src/content.ts`](src/content.ts)**.

| Šta menjaš | Gde |
|---|---|
| Tekst na srpskom, engleskom, ruskom | `text.sr`, `text.en`, `text.ru` |
| Telefon, adresa, Booking i Airbnb linkovi, ocene, prijava i odjava | `business` |
| Opisi slika (alt) na tri jezika | `images` |
| Recenzije gostiju | `reviews` |
| Cene, Instagram, broj recenzija na Booking-u, godina | `todo` (dok je `null`, ne prikazuje se) |

**Slike:** fotografije su u [`public/images/`](public/images/). Za zamenu samo ubaci novu fotografiju **sa istim imenom**
(npr. `hero.jpg`), a sajt je pri build-u sam pretvori u AVIF i WebP odgovarajućih veličina.
Spisak izvora trenutnih (privremenih) fotografija je u [`public/images/IZVORI.md`](public/images/IZVORI.md).

Pravilo za tekst: bez dugačkih crtica (— i –).

## Lokalno pokretanje

Potreban je Node.js 22.23 ili noviji.

```bash
npm install
npm run dev       # razvoj na http://localhost:4321
npm run build     # statičan sajt u dist/
npm run preview   # pregled build-a
```

## Objava na GitHub Pages

1. Na GitHub-u otvori repozitorijum, pa **Settings, Pages**.
2. Pod **Build and deployment, Source** izaberi **GitHub Actions**.
3. Svaki push na granu `main` pokreće [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (zvanična Astro akcija).
   Napredak se vidi u kartici **Actions**, a sajt je na `https://<korisnik>.github.io/<repo>/`.

Adresa i osnovna putanja (`site` i `base` u [`astro.config.mjs`](astro.config.mjs)) podešavaju se same u workflow-u:
bez domena sajt radi na `https://<korisnik>.github.io/<repo>/`, a sa domenom na korenu domena.

## Povezivanje sopstvenog domena

1. U [`public/CNAME`](public/CNAME) obriši TODO red i upiši samo domen, npr. `arielovekolibe.rs` (bez `https://`).
2. Kod registra domena podesi DNS:
   - za koren domena (`arielovekolibe.rs`): četiri **A** zapisa na `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (i po želji **AAAA** na `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`);
   - za `www.arielovekolibe.rs`: **CNAME** zapis na `<korisnik>.github.io`.
3. Na GitHub-u, **Settings, Pages, Custom domain**: upiši isti domen, sačuvaj, pa kad se DNS proveri uključi **Enforce HTTPS**.
4. Pushuj promenu na `main`. Workflow vidi domen u `public/CNAME` i pravi sajt za koren domena (canonical, sitemap, hreflang i OG slike dobijaju novu adresu).

## Šta je gde

```
src/content.ts          sav sadržaj (tekst, linkovi, slike, TODO)
src/components/          sekcije stranice (Hero, Welcome, Cabins, Gallery, Reviews...)
src/layouts/Base.astro   <head>: SEO, Open Graph, hreflang, JSON-LD (LodgingBusiness)
src/scripts/site.ts      interakcije: meni, lightbox, karusel, lepljiva traka, mapa na klik
src/styles/global.css    boje, fontovi, dugmad
src/pages/               /, /en/, /ru/, 404, robots.txt, sitemap.xml
public/images/           fotografije (menjaju se zamenom fajla)
public/og/               Open Graph slike po jeziku (1200 × 630)
```

Google mapa se učitava tek kada posetilac klikne na "Prikaži mapu", zato sajt ne postavlja kolačiće.
