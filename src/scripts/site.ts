/* Sve interakcije sajta. Bez biblioteka, bez kolačića, bez praćenja. */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ---------------- Header: providan preko heroja, pozadina posle skrola ---------------- */

const header = $('#site-header');
const hero = $('#top');
const stickyBar = $('[data-sticky-bar]');

function onScroll() {
  const y = window.scrollY;
  if (header) header.dataset.state = y > 24 ? 'scrolled' : 'top';
}
requestAnimationFrame(onScroll);
window.addEventListener('scroll', onScroll, { passive: true });

/* Ono što nije potrebno za prvi prikaz pokreće se kad je pregledač slobodan */
const whenIdle = (cb: () => void) =>
  'requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 300);

/* Lepljiva donja traka na telefonu: pojavi se kada hero izađe iz ekrana */
if (hero && stickyBar) {
  new IntersectionObserver(
    ([entry]) => {
      const show = !entry.isIntersecting;
      stickyBar.classList.toggle('is-visible', show);
      stickyBar.inert = !show;
    },
    { rootMargin: '-35% 0px 0px 0px' },
  ).observe(hero);
}

/* ---------------- Meni na telefonu ---------------- */

const menuBtn = $<HTMLButtonElement>('[data-menu-toggle]');
const menu = $('#mobile-menu');

function setMenu(open: boolean, focusBack = true) {
  if (!menuBtn || !menu || !header) return;
  menuBtn.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
  header.dataset.menu = open ? 'open' : '';
  document.documentElement.style.overflow = open ? 'hidden' : '';
  const label = menuBtn.querySelector<HTMLElement>('.sr-only');
  if (label) label.textContent = (open ? label.dataset.labelClose : label.dataset.labelOpen) ?? '';
  if (open) menu.querySelector<HTMLElement>('a')?.focus();
  else if (focusBack) menuBtn.focus();
}

menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
$$('[data-menu-link]').forEach((a) => a.addEventListener('click', () => setMenu(false, false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') setMenu(false);
});
window.matchMedia('(min-width: 1280px)').addEventListener('change', (e) => {
  if (e.matches) setMenu(false, false);
});

/* ---------------- Pojavljivanje pri skrolu ---------------- */

whenIdle(() => {
const revealed = $$('[data-reveal]');
if (reduceMotion.matches || !('IntersectionObserver' in window)) {
  revealed.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealed.forEach((el) => io.observe(el));
}
});

/* ---------------- Blagi parallax u heroju ---------------- */

const parallax = $('[data-parallax]');
if (parallax && !reduceMotion.matches) {
  let ticking = false;
  const update = () => {
    const y = Math.min(window.scrollY, window.innerHeight);
    parallax.style.transform = `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
}

/* ---------------- Galerija: lightbox ---------------- */

whenIdle(() => {
const lightbox = $<HTMLDialogElement>('[data-lightbox]');
const thumbs = $$<HTMLButtonElement>('[data-gallery] button[data-index]');

if (lightbox && thumbs.length) {
  const img = $<HTMLImageElement>('[data-lightbox-img]', lightbox)!;
  const caption = $('[data-lightbox-caption]', lightbox)!;
  const counter = $('[data-lightbox-counter]', lightbox)!;
  const stage = $('[data-lightbox-stage]', lightbox)!;
  const of = lightbox.dataset.of ?? '/';
  let index = 0;
  let opener: HTMLElement | null = null;

  const show = (i: number) => {
    index = (i + thumbs.length) % thumbs.length;
    const t = thumbs[index];
    img.classList.add('is-loading');
    img.onload = () => img.classList.remove('is-loading');
    img.width = Number(t.dataset.w);
    img.height = Number(t.dataset.h);
    img.src = t.dataset.full ?? '';
    img.alt = t.dataset.alt ?? '';
    caption.textContent = t.dataset.alt ?? '';
    counter.textContent = `${index + 1} ${of} ${thumbs.length}`;
    // unapred učitaj susednu fotografiju
    const next = thumbs[(index + 1) % thumbs.length];
    if (next.dataset.full) new Image().src = next.dataset.full;
  };

  thumbs.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      opener = btn;
      show(i);
      lightbox.showModal();
      document.documentElement.style.overflow = 'hidden';
    }),
  );

  $('[data-lightbox-prev]', lightbox)?.addEventListener('click', () => show(index - 1));
  $('[data-lightbox-next]', lightbox)?.addEventListener('click', () => show(index + 1));
  $('[data-lightbox-close]', lightbox)?.addEventListener('click', () => lightbox.close());

  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      show(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      show(index + 1);
    }
  });
  lightbox.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    opener?.focus();
  });
  // klik van fotografije zatvara
  stage.addEventListener('click', (e) => {
    if (e.target === stage) lightbox.close();
  });

  // prevlačenje na telefonu
  let startX = 0;
  let startY = 0;
  let dragging = false;
  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  stage.addEventListener('pointermove', (e) => {
    if (!dragging || reduceMotion.matches) return;
    img.style.transform = `translateX(${(e.clientX - startX) * 0.6}px)`;
  });
  const end = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    img.style.transform = '';
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
}

});

/* ---------------- Utisci: karusel na telefonu ---------------- */

whenIdle(() => {

const track = $('[data-carousel]');
if (track) {
  const cards = Array.from(track.children) as HTMLElement[];
  const prev = $<HTMLButtonElement>('[data-carousel-prev]');
  const next = $<HTMLButtonElement>('[data-carousel-next]');
  const current = $('[data-carousel-current]');

  const isCarousel = () => track.scrollWidth > track.clientWidth + 4;
  const activeIndex = () => {
    const left = track.getBoundingClientRect().left;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.getBoundingClientRect().left - left - parseFloat(getComputedStyle(track).paddingLeft));
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  };
  const sync = () => {
    const carousel = isCarousel();
    // fokus na traku ima smisla samo kada se ona stvarno skroluje
    if (carousel) track.setAttribute('tabindex', '0');
    else track.removeAttribute('tabindex');
    const i = activeIndex();
    if (current) current.textContent = String(i + 1);
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === cards.length - 1;
  };
  const go = (dir: number) => {
    const i = Math.max(0, Math.min(cards.length - 1, activeIndex() + dir));
    track.scrollTo({
      left: cards[i].offsetLeft - cards[0].offsetLeft,
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
    });
  };
  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));
  let raf = 0;
  track.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    },
    { passive: true },
  );
  // merenje tek kada se utisci približe ekranu, da ne usporava učitavanje
  new IntersectionObserver(
    ([entry], obs) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      window.addEventListener('resize', sync);
      sync();
    },
    { rootMargin: '400px 0px' },
  ).observe(track);
}
});

/* ---------------- Mapa: učitava se sa Google-a tek na klik ---------------- */

const map = $('[data-map]');
map?.querySelector('[data-map-load]')?.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.src = map.dataset.src ?? '';
  frame.title = map.dataset.title ?? '';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.allowFullscreen = true;
  map.append(frame);
  map.querySelector<HTMLElement>('.map__card')?.remove();
  frame.focus();
});
