/**
 * ARIELOVE KOLIBE: sav sadržaj sajta na jednom mestu.
 *
 * Kako se održava:
 *  - Tekst menjaš u objektu `text` (srpski, engleski, ruski su odvojeni).
 *  - Slike menjaš tako što u public/images/ ubaciš novu fotografiju sa ISTIM imenom
 *    (npr. hero.jpg). Sajt je sam optimizuje pri sledećem build-u. Opis slike (alt)
 *    za sva tri jezika je u objektu `images`.
 *  - Kontakt, linkovi, ocene i kućni red su u objektu `business`.
 *  - Sve što još nije potvrđeno je u objektu `todo`. Dok je vrednost `null`,
 *    to se NE prikazuje na sajtu. Kad je upišeš, pojavljuje se samo.
 *
 * Pravilo za tekst: bez dugačkih crtica (— i –). Koristi zarez, tačku ili dvotačku.
 */

export const LANGS = ['sr', 'en', 'ru'] as const;
export type Lang = (typeof LANGS)[number];
type L = Record<Lang, string>;

/* ------------------------------------------------------------------ */
/*  Jezici                                                             */
/* ------------------------------------------------------------------ */

export const languages: Record<
  Lang,
  { label: string; name: string; htmlLang: string; hreflang: string; ogLocale: string; path: string }
> = {
  sr: { label: 'SR', name: 'Srpski', htmlLang: 'sr-Latn', hreflang: 'sr', ogLocale: 'sr_RS', path: '' },
  en: { label: 'EN', name: 'English', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', path: 'en/' },
  ru: { label: 'RU', name: 'Русский', htmlLang: 'ru', hreflang: 'ru', ogLocale: 'ru_RU', path: 'ru/' },
};

/* ------------------------------------------------------------------ */
/*  Podaci o objektu                                                   */
/* ------------------------------------------------------------------ */

export const business = {
  name: 'Arielove kolibe',
  formerName: 'Tomine kolibe',
  host: 'Toma',
  hostLanguages: ['sr', 'ru'],

  phone: '+381604800324', // za tel: link
  phoneDisplay: '+381 60 480 0324', // kako se prikazuje
  whatsapp: '381604800324', // za wa.me link, bez + i razmaka

  address: {
    street: 'Mokra Gora bb',
    postalCode: '31243',
    locality: 'Mokra Gora',
    countryCode: 'RS',
    country: { sr: 'Srbija', en: 'Serbia', ru: 'Сербия' } as L,
  },
  geo: { lat: 43.7928255, lng: 19.5116343 },

  bookingUrl: 'https://www.booking.com/hotel/rs/tomine-kolibe.html',
  airbnbUrl: 'https://www.airbnb.com/rooms/838976064105266011',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=43.7928255%2C19.5116343',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=43.7928255,19.5116343&z=15&output=embed',

  checkIn: { from: '14:00', to: '23:00' },
  checkOut: { from: '09:00', to: '11:00' },

  ratings: {
    google: { value: 5.0, best: 5, count: 52 },
    booking: { value: 9.8, best: 10 },
    airbnb: { value: 4.91, best: 5, guestFavorite: true, superhost: true },
  },

  cabins: {
    small: { size: 44, guests: 4 },
    large: { size: 70, guests: 6 },
    totalGuests: 10,
  },

  /** Potpis izrade sajta u futeru (ss-credit v1). */
  credit: { url: 'https://stefanstevic.rs/' },
};

/* ------------------------------------------------------------------ */
/*  TODO: potvrditi sa domaćinom. Dok je null, ne prikazuje se.        */
/* ------------------------------------------------------------------ */

export const todo = {
  // TODO(domaćin): cene po noćenju. Primer: { small: 60, large: 90, currency: 'EUR' }
  //   Kad se upiše, na karticama koliba se pojavi "od 60 € po noći".
  prices: null as null | { small: number; large: number; currency: 'EUR' | 'RSD' },

  // TODO(domaćin): trenutni broj recenzija na Booking.com (menja se, proveri pre objave).
  //   Kad se upiše, pored ocene 9,8 piše i broj recenzija.
  bookingReviewCount: null as null | number,

  // TODO(domaćin): Instagram profil, npr. 'https://www.instagram.com/arielovekolibe/'.
  //   Kad se upiše, link se pojavi u futeru.
  instagram: null as null | string,

  // TODO(domaćin): godina od kada kolibe primaju goste. Kad se upiše, pojavi se u sekciji o domaćinu.
  foundedYear: null as null | number,

  // TODO(domaćin): tačne udaljenosti (minuti, kilometri) do Šargan osmice, Drvengrada, Tare, Zlatibora.
  //   Namerno se ne prikazuju dok ih domaćin ne potvrdi. Za Šargan osmicu piše samo "kratka šetnja".
  distances: null,

  // TODO(Stefan): sopstveni domen. Upiši ga u public/CNAME (vidi README.md).
};

/* ------------------------------------------------------------------ */
/*  Slike (fajlovi su u public/images/, izvori u public/images/IZVORI.md) */
/* ------------------------------------------------------------------ */

export type SiteImage = {
  /** ime fajla u public/images/ */
  file: string;
  alt: L;
  /** kadriranje kad se slika seče (CSS object-position) */
  position?: string;
};

export const images = {
  hero: {
    file: 'hero.jpg',
    position: '50% 60%',
    alt: {
      sr: 'Drvene kolibe među drvećem, obasjane popodnevnim suncem',
      en: 'Wooden cabins among the trees in the afternoon sun',
      ru: 'Деревянные домики среди деревьев в лучах дневного солнца',
    },
  },
  welcome: {
    file: 'dobrodoslica.jpg',
    position: '50% 55%',
    alt: {
      sr: 'Bokal domaće rakije i čašica na drvenom stolu u dvorištu, pored šljiva',
      en: 'A carafe of homemade rakija and a small glass on a wooden garden table, next to plums',
      ru: 'Графин домашней ракии и рюмка на деревянном столе во дворе, рядом сливы',
    },
  },
  coffee: {
    file: 'kafa.jpg',
    position: '50% 60%',
    alt: {
      sr: 'Šolja vruće kafe na drvenom stolu',
      en: 'A cup of hot coffee on a wooden table',
      ru: 'Чашка горячего кофе на деревянном столе',
    },
  },
  cabinSmall: {
    file: 'koliba-mala.jpg',
    position: '50% 55%',
    alt: {
      sr: 'Brvnara sa kosim krovom u zelenilu',
      en: 'A log cabin with a pitched roof surrounded by greenery',
      ru: 'Бревенчатый домик с двускатной крышей среди зелени',
    },
  },
  cabinLarge: {
    file: 'koliba-velika.jpg',
    position: '50% 45%',
    alt: {
      sr: 'Drvena kuća sa spoljnim stepeništem među drvećem',
      en: 'A wooden house with an outdoor staircase among the trees',
      ru: 'Деревянный дом с наружной лестницей среди деревьев',
    },
  },
  sargan: {
    file: 'sargan-osmica.jpg',
    position: '50% 50%',
    alt: {
      sr: 'Parna lokomotiva sa vagonima vozi kroz zelene planine',
      en: 'A steam locomotive pulling carriages through green mountains',
      ru: 'Паровоз с вагонами едет среди зелёных гор',
    },
  },
  drvengrad: {
    file: 'drvengrad.jpg',
    position: '50% 50%',
    alt: {
      sr: 'Drvene kuće sa krovovima od šindre u Drvengradu na Mećavniku',
      en: 'Wooden houses with shingle roofs in Drvengrad on Mećavnik hill',
      ru: 'Деревянные дома с крышами из дранки в Дрвенграде на холме Мечавник',
    },
  },
  tara: {
    file: 'tara.jpg',
    position: '50% 40%',
    alt: {
      sr: 'Šuma na Tari obavijena maglom',
      en: 'Forest on Tara mountain wrapped in mist',
      ru: 'Лес на горе Тара в тумане',
    },
  },
  final: {
    file: 'zavrsni.jpg',
    position: '50% 55%',
    alt: {
      sr: 'Sunce se probija kroz visoke borove iznad drvene kolibe',
      en: 'Sunlight breaking through tall pines above a wooden cabin',
      ru: 'Солнце пробивается сквозь высокие сосны над деревянным домиком',
    },
  },
  gallery: [
    {
      file: 'galerija-01.jpg',
      alt: {
        sr: 'Drvena kuća na livadi ispod zelenih planina',
        en: 'A wooden house in a meadow below green mountains',
        ru: 'Деревянный дом на лугу у подножия зелёных гор',
      },
    },
    {
      file: 'galerija-02.jpg',
      alt: {
        sr: 'Dnevna soba sa drvenim zidovima, kaučem i stolićem',
        en: 'Living room with wooden walls, a sofa and a coffee table',
        ru: 'Гостиная с деревянными стенами, диваном и столиком',
      },
    },
    {
      file: 'galerija-03.jpg',
      alt: {
        sr: 'Natkrivena drvena terasa sa stolom i stolicama, pogled na šumu',
        en: 'Covered wooden terrace with a table and chairs, looking out to the forest',
        ru: 'Крытая деревянная терраса со столом и стульями, вид на лес',
      },
    },
    {
      file: 'galerija-04.jpg',
      alt: {
        sr: 'Spavaća soba sa drvenim plafonom i bračnim krevetom',
        en: 'Bedroom with a wooden ceiling and a double bed',
        ru: 'Спальня с деревянным потолком и двуспальной кроватью',
      },
    },
    {
      file: 'galerija-05.jpg',
      alt: {
        sr: 'Drveni sto sa klupama u hladu drveća',
        en: 'A wooden table with benches in the shade of the trees',
        ru: 'Деревянный стол со скамейками в тени деревьев',
      },
    },
    {
      file: 'galerija-06.jpg',
      alt: {
        sr: 'Svetla spavaća soba sa drvenim zidovima i izlazom na terasu',
        en: 'Bright bedroom with wooden walls and a door to the terrace',
        ru: 'Светлая спальня с деревянными стенами и выходом на террасу',
      },
    },
    {
      file: 'galerija-07.jpg',
      alt: {
        sr: 'Stara brvnara okružena zelenilom',
        en: 'An old log cabin surrounded by greenery',
        ru: 'Старый бревенчатый домик в зелени',
      },
    },
    {
      file: 'galerija-08.jpg',
      alt: {
        sr: 'Drveni trpezarijski sto u rustičnoj sobi',
        en: 'A wooden dining table in a rustic room',
        ru: 'Деревянный обеденный стол в комнате в деревенском стиле',
      },
    },
    {
      file: 'galerija-09.jpg',
      alt: {
        sr: 'Prozor sa drvenim okvirom i ovčija koža na klupi',
        en: 'A wood framed window and a sheepskin on the bench',
        ru: 'Окно в деревянной раме и овчина на скамье',
      },
    },
    {
      file: 'galerija-10.jpg',
      alt: {
        sr: 'Pogled sa vidikovca na planinske vence pod oblacima',
        en: 'View from a lookout over mountain ridges under the clouds',
        ru: 'Вид со смотровой площадки на горные хребты под облаками',
      },
    },
  ],
} satisfies Record<string, SiteImage | SiteImage[]>;

/* ------------------------------------------------------------------ */
/*  Recenzije: prave, sa Google-a. Ostaju na originalnom jeziku.       */
/* ------------------------------------------------------------------ */

export const reviews = [
  {
    text: 'Izuzetno mesto za pravi odmor. Domaćin za svaku pohvalu. Objekti čisti i uredni. U frižideru piće dobrodošlice (sok, pivo, čak i domaća rakija). Sve preporuke!',
    author: 'Saša R.',
    lang: 'sr-Latn',
    source: 'Google',
    rating: 5,
  },
  {
    text: 'Sve super. Higijena na nivou. Domaćin dočekao sa kafom i domaćom rakijom. Mir, tišina... Uživanje.',
    author: 'Danijela A.',
    lang: 'sr-Latn',
    source: 'Google',
    rating: 5,
  },
  {
    text: 'Great place to stay, the host is wonderful and makes you feel very welcome in this small town.',
    author: 'Nick',
    lang: 'en',
    source: 'Google',
    rating: 5,
  },
  {
    text: 'Excellent accommodation, polite and friendly owners. Great location. Peaceful and lovely!',
    author: 'Darko S.',
    lang: 'en',
    source: 'Google',
    rating: 5,
  },
  {
    text: 'Domaćin je pre svega sjajan čovek i gospodin. Brvnare se nalaze u blizini svih atrakcija koje treba posetiti.',
    author: 'Zvonimir B.',
    lang: 'sr-Latn',
    source: 'Google',
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Tekst sajta po jeziku                                              */
/* ------------------------------------------------------------------ */

export type IconName =
  | 'air-vent'
  | 'wifi'
  | 'cooking-pot'
  | 'flame'
  | 'armchair'
  | 'car'
  | 'languages'
  | 'star'
  | 'wine'
  | 'log-in'
  | 'log-out'
  | 'baby'
  | 'paw-print'
  | 'cigarette-off'
  | 'map-pin'
  | 'trees'
  | 'train-front'
  | 'sparkles'
  | 'hand-heart';

const sr = {
  meta: {
    title: 'Arielove kolibe | Drvene kolibe u centru Mokre Gore',
    description:
      'Dve drvene kolibe u centru Mokre Gore, na kratku šetnju od Šargan osmice. Do 10 gostiju, dvorište sa roštiljem, besplatan parking i domaćin koji vas dočeka kafom i domaćom rakijom.',
    ogAlt: 'Arielove kolibe, drvene kolibe u Mokroj Gori',
  },
  ui: {
    skip: 'Preskoči na sadržaj',
    menu: 'Meni',
    closeMenu: 'Zatvori meni',
    language: 'Jezik',
    newTab: 'otvara se u novom prozoru',
    home: 'Arielove kolibe, početna',
    backToTop: 'Na vrh',
  },
  nav: { cabins: 'Kolibe', gallery: 'Galerija', reviews: 'Utisci', region: 'Mokra Gora', location: 'Lokacija' },
  cta: {
    call: 'Pozovite',
    whatsapp: 'WhatsApp',
    whatsappLong: 'Pišite na WhatsApp',
    booking: 'Rezervišite na Booking-u',
    bookingShort: 'Booking',
    airbnb: 'ili preko Airbnb-a',
    orCall: 'ili pozovite',
    whatsappMessage: 'Dobar dan, zanima me smeštaj u Arielovim kolibama. Da li imate slobodno za datume: ',
  },
  ratings: {
    label: 'Ocene gostiju',
    google: 'Google',
    googleNote: '52 recenzije',
    booking: 'Booking.com',
    bookingReviews: 'recenzija',
    airbnb: 'Airbnb',
    guestFavorite: 'Guest favorite',
    outOf: 'od',
  },
  hero: {
    place: 'Mokra Gora, Srbija',
    title: 'Kolibe u srcu Mokre Gore',
    lead: 'Dve drvene kolibe u zelenilu, na kratku šetnju od Šargan osmice. Mir, tišina i domaćin koji vas dočeka kafom i domaćom rakijom.',
  },
  welcome: {
    label: 'Dobrodošlica',
    title: 'Dobrodošlica kod Tome',
    quote: 'Prvo kafa i domaća rakija, pa onda priča o tome šta da obiđete.',
    body: [
      'Arielove kolibe, do nedavno poznate kao Tomine kolibe, drži Toma. Kad stignete, dočeka vas kafom i čašicom domaće rakije, a u frižideru vas čeka piće dobrodošlice.',
      'U recenzijama gosti najviše hvale upravo domaćina. Toma će vam rado pomoći savetom kako da isplanirate dane u Mokroj Gori i okolini.',
    ],
    facts: [
      { icon: 'languages', text: 'Govori srpski i ruski' },
      { icon: 'star', text: 'Superhost na Airbnb-u' },
      { icon: 'wine', text: 'Piće dobrodošlice u frižideru' },
    ] as { icon: IconName; text: string }[],
    since: 'Prima goste od',
    signature: 'Toma, domaćin',
  },
  cabins: {
    label: 'Kolibe',
    title: 'Dve kolibe, svaka sa svojim ulazom i dvorištem',
    intro:
      'Manja je za par ili porodicu do četiri člana, veća prima šest gostiju. Obe imaju terasu, balkon i dvorište sa roštiljem.',
    sizeLabel: 'Površina',
    guestsLabel: 'Gosti',
    bedsLabel: 'Raspored kreveta',
    priceFrom: 'od',
    perNight: 'po noći',
    upTo: 'do',
    items: {
      small: {
        name: 'Manja koliba',
        guests: 'do 4 gosta',
        beds: ['Spavaća soba sa bračnim i jednim singl krevetom', 'Kauč na razvlačenje u dnevnoj sobi'],
      },
      large: {
        name: 'Veća koliba',
        guests: 'do 6 gostiju',
        beds: [
          'Dve spavaće sobe sa bračnim krevetom',
          'Spavaća soba sa dva singl kreveta',
          'Kauč na razvlačenje u dnevnoj sobi',
        ],
      },
    },
    highlights: [
      { icon: 'air-vent', label: 'Klima' },
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'cooking-pot', label: 'Čajna kuhinja' },
      { icon: 'flame', label: 'Roštilj' },
      { icon: 'armchair', label: 'Terasa i balkon' },
      { icon: 'car', label: 'Parking' },
    ] as { icon: IconName; label: string }[],
    everyTitle: 'U svakoj kolibi',
    every: [
      { title: 'Prostor', items: ['Poseban ulaz', 'Terasa i balkon', 'Dvorište sa mestom za obedovanje napolju i roštiljem'] },
      { title: 'Kuhinja', items: ['Čajna kuhinja sa ringlom', 'Frižider', 'Posuđe'] },
      { title: 'Kupatilo', items: ['Tuš', 'Fen', 'Peškiri i kozmetika'] },
      {
        title: 'Udobnost',
        items: ['Klima', 'Besplatan WiFi', 'TV sa satelitskim kanalima', 'Zvučna izolacija', 'Besplatan privatni parking'],
      },
    ],
    together: 'Obe kolibe zajedno primaju do 10 gostiju, pa su zgodne i za dve porodice koje putuju zajedno.',
  },
  why: {
    label: 'Zašto baš ovde',
    title: 'Sve je blizu, a opet je mirno',
    items: [
      {
        icon: 'trees',
        title: 'Centar Mokre Gore, a opet mir',
        text: 'Kolibe su u samom centru mesta, blizu glavnog puta, a okolo su zelenilo, mir i tišina.',
      },
      {
        icon: 'train-front',
        title: 'Šargan osmica na kratku šetnju',
        text: 'Do stanice čuvene uskotračne pruge stižete peške, a Drvengrad je na brdu iznad.',
      },
      {
        icon: 'sparkles',
        title: 'Čisto i uredno',
        text: 'Gosti to stalno ponavljaju u recenzijama: higijena je na nivou i sve je spremno kad stignete.',
      },
      {
        icon: 'hand-heart',
        title: 'Domaćin koji pomaže savetima',
        text: 'Toma će vam rado reći šta da obiđete i kako da isplanirate dan. Govori i ruski.',
      },
    ] as { icon: IconName; title: string; text: string }[],
  },
  gallery: {
    label: 'Galerija',
    title: 'Kolibe, dvorište i okolina',
    open: 'Uvećaj fotografiju',
    dialog: 'Galerija fotografija',
    close: 'Zatvori galeriju',
    prev: 'Prethodna fotografija',
    next: 'Sledeća fotografija',
    of: 'od',
  },
  reviews: {
    label: 'Utisci',
    title: 'Šta kažu gosti',
    summary: 'Ocena 5,0 na Google-u, iz 52 recenzije.',
    note: '',
    stars: '5 od 5 zvezdica',
    on: 'na',
    carousel: 'Utisci gostiju',
    prev: 'Prethodni utisak',
    next: 'Sledeći utisak',
  },
  region: {
    label: 'Okolina',
    title: 'Mokra Gora i okolina',
    intro:
      'Mokra Gora leži u zelenoj dolini između Tare i Zlatibora. Odavde se lako stiže do svega zbog čega ljudi dolaze u ovaj kraj.',
    items: {
      sargan: {
        title: 'Šargan osmica',
        note: 'Kratka šetnja od koliba',
        text: 'Muzejska uskotračna pruga koja se kroz tunele i preko mostova penje uz planinu i pri tom iscrtava osmicu. Vožnja starim vozom je doživljaj i za decu i za odrasle.',
      },
      drvengrad: {
        title: 'Drvengrad (Mećavnik)',
        note: 'Na brdu iznad Mokre Gore',
        text: 'Drveno selo koje je Emir Kusturica podigao na brdu Mećavnik. Sa njegovih staza pogled puca na celu dolinu.',
      },
      tara: {
        title: 'Tara i Zlatibor',
        note: 'U blizini',
        text: 'Nacionalni park Tara, sa šumama, vidikovcima i jezerima, i Zlatibor, sa pašnjacima i planinskim selima, idealni su za celodnevne izlete.',
      },
    },
  },
  info: {
    label: 'Informacije',
    title: 'Korisne informacije',
    items: [
      { icon: 'log-in', title: 'Prijava', text: 'od 14:00 do 23:00' },
      { icon: 'log-out', title: 'Odjava', text: 'od 09:00 do 11:00' },
      { icon: 'baby', title: 'Deca', text: 'Deca su dobrodošla. Nemamo dečji krevetac ni pomoćni ležaj.' },
      { icon: 'paw-print', title: 'Kućni ljubimci', text: 'Nažalost, kućni ljubimci nisu dozvoljeni.' },
      { icon: 'cigarette-off', title: 'Pušenje', text: 'Objekat je nepušački.' },
      { icon: 'car', title: 'Parking', text: 'Besplatan privatni parking za goste.' },
    ] as { icon: IconName; title: string; text: string }[],
  },
  location: {
    label: 'Lokacija',
    title: 'Kako da nas nađete',
    text: 'Kolibe su u centru Mokre Gore, blizu glavnog puta. Do stanice Šargan osmice je kratka šetnja, a Drvengrad je na brdu iznad.',
    address: 'Adresa',
    coords: 'Koordinate',
    phone: 'Telefon i WhatsApp',
    openMaps: 'Otvori u Google mapama',
    showMap: 'Prikaži mapu',
    mapNote: 'Mapa se učitava sa Google-a tek kad kliknete.',
    mapTitle: 'Google mapa: Arielove kolibe, Mokra Gora',
  },
  final: {
    title: 'Toma vas čeka sa kafom.',
    text: 'Pozovite, pišite na WhatsApp ili rezervišite direktno preko Booking-a.',
  },
  footer: {
    former: 'ranije Tomine kolibe',
    contact: 'Kontakt',
    book: 'Rezervacije',
    follow: 'Instagram',
    rights: 'Sva prava zadržana.',
    credit: 'Izrada sajta:',
    creditName: 'Stefan Stević',
  },
};

export type Dict = typeof sr;

const en: Dict = {
  meta: {
    title: 'Arielove kolibe | Wooden cabins in the centre of Mokra Gora, Serbia',
    description:
      'Two wooden cabins in the centre of Mokra Gora, a short walk from the Šargan Eight railway. Up to 10 guests, a yard with a barbecue, free parking and a host who welcomes you with coffee and homemade rakija.',
    ogAlt: 'Arielove kolibe, wooden cabins in Mokra Gora',
  },
  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    closeMenu: 'Close menu',
    language: 'Language',
    newTab: 'opens in a new tab',
    home: 'Arielove kolibe, home',
    backToTop: 'Back to top',
  },
  nav: { cabins: 'Cabins', gallery: 'Gallery', reviews: 'Reviews', region: 'Mokra Gora', location: 'Location' },
  cta: {
    call: 'Call us',
    whatsapp: 'WhatsApp',
    whatsappLong: 'Message us on WhatsApp',
    booking: 'Book on Booking.com',
    bookingShort: 'Booking',
    airbnb: 'or via Airbnb',
    orCall: 'or call',
    whatsappMessage:
      "Hello, I'm interested in staying at Arielove kolibe. Do you have availability for these dates: ",
  },
  ratings: {
    label: 'Guest ratings',
    google: 'Google',
    googleNote: '52 reviews',
    booking: 'Booking.com',
    bookingReviews: 'reviews',
    airbnb: 'Airbnb',
    guestFavorite: 'Guest favorite',
    outOf: 'out of',
  },
  hero: {
    place: 'Mokra Gora, Serbia',
    title: 'Cabins in the heart of Mokra Gora',
    lead: 'Two wooden cabins surrounded by greenery, a short walk from the Šargan Eight railway. Peace and quiet, and a host who greets you with coffee and homemade rakija.',
  },
  welcome: {
    label: 'Welcome',
    title: 'A welcome from Toma',
    quote: 'Coffee and homemade rakija first, then a chat about what to see.',
    body: [
      'Arielove kolibe, until recently known as Tomine kolibe, are run by Toma. When you arrive, he greets you with coffee and a glass of homemade rakija, and there are welcome drinks waiting in the fridge.',
      'In their reviews, guests praise the host more than anything else. Toma is always glad to help you plan your days in Mokra Gora and the area around it.',
    ],
    facts: [
      { icon: 'languages', text: 'Speaks Serbian and Russian' },
      { icon: 'star', text: 'Airbnb Superhost' },
      { icon: 'wine', text: 'Welcome drinks in the fridge' },
    ],
    since: 'Hosting guests since',
    signature: 'Toma, your host',
  },
  cabins: {
    label: 'Cabins',
    title: 'Two cabins, each with its own entrance and yard',
    intro:
      'The smaller one suits a couple or a family of up to four, the larger one sleeps six. Both have a terrace, a balcony and a yard with a barbecue.',
    sizeLabel: 'Size',
    guestsLabel: 'Guests',
    bedsLabel: 'Sleeping arrangements',
    priceFrom: 'from',
    perNight: 'per night',
    upTo: 'up to',
    items: {
      small: {
        name: 'Small cabin',
        guests: 'up to 4 guests',
        beds: ['Bedroom with a double and a single bed', 'Sofa bed in the living room'],
      },
      large: {
        name: 'Large cabin',
        guests: 'up to 6 guests',
        beds: ['Two bedrooms with a double bed', 'Bedroom with two single beds', 'Sofa bed in the living room'],
      },
    },
    highlights: [
      { icon: 'air-vent', label: 'Air conditioning' },
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'cooking-pot', label: 'Kitchenette' },
      { icon: 'flame', label: 'Barbecue' },
      { icon: 'armchair', label: 'Terrace and balcony' },
      { icon: 'car', label: 'Parking' },
    ],
    everyTitle: 'In each cabin',
    every: [
      { title: 'Space', items: ['Private entrance', 'Terrace and balcony', 'Yard with an outdoor dining area and barbecue'] },
      { title: 'Kitchen', items: ['Kitchenette with a hob', 'Fridge', 'Dishes and cookware'] },
      { title: 'Bathroom', items: ['Shower', 'Hairdryer', 'Towels and toiletries'] },
      {
        title: 'Comfort',
        items: ['Air conditioning', 'Free WiFi', 'Satellite TV', 'Soundproofing', 'Free private parking'],
      },
    ],
    together: 'Together, the two cabins sleep up to 10 guests, which works well for two families travelling together.',
  },
  why: {
    label: 'Why stay here',
    title: 'Close to everything, and still quiet',
    items: [
      {
        icon: 'trees',
        title: 'Central, yet peaceful',
        text: 'The cabins are right in the centre of Mokra Gora, near the main road, surrounded by greenery, peace and quiet.',
      },
      {
        icon: 'train-front',
        title: 'A short walk to the Šargan Eight',
        text: 'You can walk to the station of the famous narrow gauge railway, and Drvengrad sits on the hill above.',
      },
      {
        icon: 'sparkles',
        title: 'Clean and tidy',
        text: 'Guests mention it again and again in their reviews: everything is spotless and ready when you arrive.',
      },
      {
        icon: 'hand-heart',
        title: 'A host with good advice',
        text: 'Toma is happy to tell you what to see and how to plan your day. He speaks Serbian and Russian.',
      },
    ],
  },
  gallery: {
    label: 'Gallery',
    title: 'The cabins, the yard and the area around',
    open: 'Enlarge photo',
    dialog: 'Photo gallery',
    close: 'Close gallery',
    prev: 'Previous photo',
    next: 'Next photo',
    of: 'of',
  },
  reviews: {
    label: 'Reviews',
    title: 'What guests say',
    summary: 'Rated 5.0 on Google from 52 reviews.',
    note: 'Reviews are shown in their original language.',
    stars: '5 out of 5 stars',
    on: 'on',
    carousel: 'Guest reviews',
    prev: 'Previous review',
    next: 'Next review',
  },
  region: {
    label: 'The area',
    title: 'Mokra Gora and around',
    intro:
      'Mokra Gora lies in a green valley between Tara and Zlatibor, an easy base for everything this part of Serbia is known for.',
    items: {
      sargan: {
        title: 'Šargan Eight',
        note: 'A short walk from the cabins',
        text: 'A heritage narrow gauge railway that climbs the mountain through tunnels and over bridges, tracing a figure eight along the way. Kids and grown ups both love the ride on the old train.',
      },
      drvengrad: {
        title: 'Drvengrad (Mećavnik)',
        note: 'On the hill above Mokra Gora',
        text: 'The wooden village Emir Kusturica built on Mećavnik hill. From its lanes you can see across the whole valley.',
      },
      tara: {
        title: 'Tara and Zlatibor',
        note: 'Nearby',
        text: 'Tara National Park, with its forests, viewpoints and lakes, and Zlatibor, with its meadows and mountain villages, are perfect for day trips.',
      },
    },
  },
  info: {
    label: 'Before you arrive',
    title: 'Good to know',
    items: [
      { icon: 'log-in', title: 'Check in', text: 'from 14:00 to 23:00' },
      { icon: 'log-out', title: 'Check out', text: 'from 09:00 to 11:00' },
      { icon: 'baby', title: 'Children', text: 'Children are welcome. There is no cot or extra bed.' },
      { icon: 'paw-print', title: 'Pets', text: 'Sorry, pets are not allowed.' },
      { icon: 'cigarette-off', title: 'Smoking', text: 'The property is non-smoking.' },
      { icon: 'car', title: 'Parking', text: 'Free private parking for guests.' },
    ],
  },
  location: {
    label: 'Location',
    title: 'How to find us',
    text: 'The cabins are in the centre of Mokra Gora, near the main road. The Šargan Eight station is a short walk away, and Drvengrad is on the hill above.',
    address: 'Address',
    coords: 'Coordinates',
    phone: 'Phone and WhatsApp',
    openMaps: 'Open in Google Maps',
    showMap: 'Show map',
    mapNote: 'The map loads from Google only after you click.',
    mapTitle: 'Google map: Arielove kolibe, Mokra Gora',
  },
  final: {
    title: 'Toma is waiting with coffee.',
    text: 'Give us a call, send a WhatsApp message, or book directly on Booking.com.',
  },
  footer: {
    former: 'formerly Tomine kolibe',
    contact: 'Contact',
    book: 'Bookings',
    follow: 'Instagram',
    rights: 'All rights reserved.',
    credit: 'Website by',
    creditName: 'Stefan Stević',
  },
};

const ru: Dict = {
  meta: {
    title: 'Arielove kolibe | Деревянные домики в центре Мокра-Горы, Сербия',
    description:
      'Два деревянных домика в центре Мокра-Горы, недалеко пешком от «Шарганской восьмёрки». До 10 гостей, двор с грилем, бесплатная парковка и хозяин, который встречает кофе и домашней ракией.',
    ogAlt: 'Arielove kolibe, деревянные домики в Мокра-Горе',
  },
  ui: {
    skip: 'Перейти к содержанию',
    menu: 'Меню',
    closeMenu: 'Закрыть меню',
    language: 'Язык',
    newTab: 'откроется в новой вкладке',
    home: 'Arielove kolibe, главная',
    backToTop: 'Наверх',
  },
  nav: { cabins: 'Домики', gallery: 'Галерея', reviews: 'Отзывы', region: 'Мокра-Гора', location: 'Как добраться' },
  cta: {
    call: 'Позвонить',
    whatsapp: 'WhatsApp',
    whatsappLong: 'Написать в WhatsApp',
    booking: 'Забронировать на Booking.com',
    bookingShort: 'Booking',
    airbnb: 'или через Airbnb',
    orCall: 'или позвоните',
    whatsappMessage:
      'Здравствуйте! Меня интересует проживание в Arielove kolibe. Есть ли у вас свободные места на даты: ',
  },
  ratings: {
    label: 'Оценки гостей',
    google: 'Google',
    googleNote: '52 отзыва',
    booking: 'Booking.com',
    bookingReviews: 'отзывов',
    airbnb: 'Airbnb',
    guestFavorite: 'Guest favorite',
    outOf: 'из',
  },
  hero: {
    place: 'Мокра-Гора, Сербия',
    title: 'Домики в самом сердце Мокра-Горы',
    lead: 'Два деревянных домика среди зелени, совсем недалеко пешком от «Шарганской восьмёрки». Тишина, покой и хозяин, который встречает гостей кофе и домашней ракией.',
  },
  welcome: {
    label: 'Гостеприимство',
    title: 'В гостях у Томы',
    quote: 'Сначала кофе и домашняя ракия, а потом разговор о том, что посмотреть.',
    body: [
      'Arielove kolibe, до недавнего времени Tomine kolibe, принадлежат Томе. Когда вы приезжаете, он встречает вас кофе и рюмкой домашней ракии, а в холодильнике уже ждут приветственные напитки.',
      'В отзывах гости больше всего хвалят именно хозяина. Тома с радостью подскажет, как спланировать дни в Мокра-Горе и окрестностях, и говорит по-русски.',
    ],
    facts: [
      { icon: 'languages', text: 'Говорит по-сербски и по-русски' },
      { icon: 'star', text: 'Суперхозяин на Airbnb' },
      { icon: 'wine', text: 'Приветственные напитки в холодильнике' },
    ],
    since: 'Принимает гостей с',
    signature: 'Тома, хозяин',
  },
  cabins: {
    label: 'Домики',
    title: 'Два домика, у каждого свой вход и двор',
    intro:
      'Маленький подойдёт паре или семье до четырёх человек, большой рассчитан на шестерых. В обоих есть терраса, балкон и двор с грилем.',
    sizeLabel: 'Площадь',
    guestsLabel: 'Гости',
    bedsLabel: 'Спальные места',
    priceFrom: 'от',
    perNight: 'за ночь',
    upTo: 'до',
    items: {
      small: {
        name: 'Маленький домик',
        guests: 'до 4 гостей',
        beds: ['Спальня с двуспальной и односпальной кроватью', 'Раскладной диван в гостиной'],
      },
      large: {
        name: 'Большой домик',
        guests: 'до 6 гостей',
        beds: [
          'Две спальни с двуспальными кроватями',
          'Спальня с двумя односпальными кроватями',
          'Раскладной диван в гостиной',
        ],
      },
    },
    highlights: [
      { icon: 'air-vent', label: 'Кондиционер' },
      { icon: 'wifi', label: 'Wi-Fi' },
      { icon: 'cooking-pot', label: 'Мини-кухня' },
      { icon: 'flame', label: 'Гриль' },
      { icon: 'armchair', label: 'Терраса и балкон' },
      { icon: 'car', label: 'Парковка' },
    ],
    everyTitle: 'В каждом домике',
    every: [
      { title: 'Пространство', items: ['Отдельный вход', 'Терраса и балкон', 'Двор с обеденной зоной на улице и грилем'] },
      { title: 'Кухня', items: ['Мини-кухня с плитой', 'Холодильник', 'Посуда'] },
      { title: 'Ванная', items: ['Душ', 'Фен', 'Полотенца и туалетные принадлежности'] },
      {
        title: 'Комфорт',
        items: ['Кондиционер', 'Бесплатный Wi-Fi', 'Спутниковое ТВ', 'Звукоизоляция', 'Бесплатная частная парковка'],
      },
    ],
    together:
      'Вместе оба домика вмещают до 10 гостей, поэтому они удобны и для двух семей, которые путешествуют вместе.',
  },
  why: {
    label: 'Почему здесь',
    title: 'Всё рядом, и при этом тихо',
    items: [
      {
        icon: 'trees',
        title: 'Центр посёлка, и при этом покой',
        text: 'Домики стоят в самом центре Мокра-Горы, недалеко от главной дороги, а вокруг зелень, тишина и покой.',
      },
      {
        icon: 'train-front',
        title: '«Шарганская восьмёрка» рядом',
        text: 'До станции знаменитой узкоколейки можно дойти пешком, а Дрвенград стоит на холме прямо над посёлком.',
      },
      {
        icon: 'sparkles',
        title: 'Чисто и аккуратно',
        text: 'Гости постоянно отмечают это в отзывах: всё убрано и готово к вашему приезду.',
      },
      {
        icon: 'hand-heart',
        title: 'Хозяин поможет советом',
        text: 'Тома с радостью подскажет, что посмотреть и как спланировать день. И он говорит по-русски.',
      },
    ],
  },
  gallery: {
    label: 'Галерея',
    title: 'Домики, двор и окрестности',
    open: 'Увеличить фото',
    dialog: 'Фотогалерея',
    close: 'Закрыть галерею',
    prev: 'Предыдущее фото',
    next: 'Следующее фото',
    of: 'из',
  },
  reviews: {
    label: 'Отзывы',
    title: 'Что говорят гости',
    summary: 'Оценка 5,0 в Google по 52 отзывам.',
    note: 'Отзывы приведены на языке оригинала.',
    stars: '5 из 5 звёзд',
    on: 'в',
    carousel: 'Отзывы гостей',
    prev: 'Предыдущий отзыв',
    next: 'Следующий отзыв',
  },
  region: {
    label: 'Окрестности',
    title: 'Мокра-Гора и окрестности',
    intro:
      'Мокра-Гора лежит в зелёной долине между Тарой и Златибором. Отсюда легко добраться до всего, ради чего едут в эти края.',
    items: {
      sargan: {
        title: 'Шарганская восьмёрка',
        note: 'Недалеко пешком от домиков',
        text: 'Музейная узкоколейная железная дорога, которая через тоннели и по мостам поднимается в гору, описывая восьмёрку. Поездка на старом поезде нравится и детям, и взрослым.',
      },
      drvengrad: {
        title: 'Дрвенград (Мечавник)',
        note: 'На холме над Мокра-Горой',
        text: 'Деревянная деревня, которую Эмир Кустурица построил на холме Мечавник. С её улочек открывается вид на всю долину.',
      },
      tara: {
        title: 'Тара и Златибор',
        note: 'Поблизости',
        text: 'Национальный парк Тара с лесами, смотровыми площадками и озёрами и Златибор с пастбищами и горными деревнями отлично подходят для поездок на целый день.',
      },
    },
  },
  info: {
    label: 'Полезно знать',
    title: 'Полезная информация',
    items: [
      { icon: 'log-in', title: 'Заезд', text: 'с 14:00 до 23:00' },
      { icon: 'log-out', title: 'Выезд', text: 'с 09:00 до 11:00' },
      { icon: 'baby', title: 'Дети', text: 'Дети приветствуются. Детской кроватки и дополнительного спального места нет.' },
      { icon: 'paw-print', title: 'Животные', text: 'К сожалению, размещение с домашними животными невозможно.' },
      { icon: 'cigarette-off', title: 'Курение', text: 'Курение на территории запрещено.' },
      { icon: 'car', title: 'Парковка', text: 'Бесплатная частная парковка для гостей.' },
    ],
  },
  location: {
    label: 'Как добраться',
    title: 'Как нас найти',
    text: 'Домики находятся в центре Мокра-Горы, недалеко от главной дороги. До станции «Шарганской восьмёрки» можно дойти пешком, а Дрвенград стоит на холме над посёлком.',
    address: 'Адрес',
    coords: 'Координаты',
    phone: 'Телефон и WhatsApp',
    openMaps: 'Открыть в Google Картах',
    showMap: 'Показать карту',
    mapNote: 'Карта загрузится с Google только после нажатия.',
    mapTitle: 'Google Карта: Arielove kolibe, Мокра-Гора',
  },
  final: {
    title: 'Тома ждёт вас с кофе.',
    text: 'Позвоните, напишите в WhatsApp или забронируйте напрямую на Booking.com.',
  },
  footer: {
    former: 'ранее Tomine kolibe',
    contact: 'Контакты',
    book: 'Бронирование',
    follow: 'Instagram',
    rights: 'Все права защищены.',
    credit: 'Разработка сайта:',
    creditName: 'Стефан Стевич',
  },
};

export const text: Record<Lang, Dict> = { sr, en, ru };
