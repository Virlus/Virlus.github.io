const cover = document.querySelector('#cover-video');
const toggle = document.querySelector('#cover-toggle');
function syncCoverControl() {
  toggle.textContent = cover.paused ? 'Play video' : 'Pause video';
  toggle.setAttribute('aria-label', cover.paused ? 'Play cover video' : 'Pause cover video');
}
toggle.addEventListener('click', () => {
  if (cover.paused) cover.play().catch(syncCoverControl);
  else cover.pause();
});
cover.addEventListener('play', syncCoverControl);
cover.addEventListener('pause', syncCoverControl);

document.querySelectorAll('.qual-carousel').forEach(carousel => {
  const track = carousel.querySelector('.qual-track');
  const slides = [...track.querySelectorAll('.qual-slide')];
  const dots = [...carousel.querySelectorAll('.qual-dots button')];
  const prev = carousel.querySelector('.qual-prev');
  const next = carousel.querySelector('.qual-next');
  const count = carousel.querySelector('.qual-count');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const current = () => Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
  function sync() {
    const index = current();
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
  }
  function go(index) {
    track.scrollTo({left: Math.max(0, Math.min(slides.length - 1, index)) * track.clientWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  }
  prev.addEventListener('click', () => go(current() - 1));
  next.addEventListener('click', () => go(current() + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));
  track.addEventListener('scroll', sync, {passive: true});
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      go(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current() + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let drag = null;
  let suppressClick = false;
  track.addEventListener('click', event => { if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; } }, true);
  track.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button')) return;
    suppressClick = false;
    drag = {x: event.clientX, scroll: track.scrollLeft, index: current(), id: event.pointerId};
    track.classList.add('dragging');
    track.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  track.addEventListener('pointermove', event => {
    if (drag) track.scrollLeft = drag.scroll + drag.x - event.clientX;
  });
  function endDrag(event) {
    if (!drag) return;
    const delta = drag.x - event.clientX;
    suppressClick = Math.abs(delta) > 8;
    const index = Math.abs(delta) > 45 ? drag.index + Math.sign(delta) : drag.index;
    drag = null;
    track.classList.remove('dragging');
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    go(index);
  }
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', () => { drag = null; track.classList.remove('dragging'); go(current()); });
  new ResizeObserver(sync).observe(track);
  sync();
});

// Section navigation stays on the left; the mobile drawer closes after selection.
const contentsToggle = document.querySelector('.contents-toggle');
const sideNavigation = document.querySelector('.sidebar');
function closeContents() {
  sideNavigation.classList.remove('is-open');
  contentsToggle.setAttribute('aria-expanded', 'false');
}
contentsToggle.addEventListener('click', () => {
  const open = sideNavigation.classList.toggle('is-open');
  contentsToggle.setAttribute('aria-expanded', String(open));
});
const sectionLinks = [...sideNavigation.querySelectorAll('a[href^="#"]')];
sectionLinks.forEach(link => link.addEventListener('click', closeContents));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeContents(); });
document.addEventListener('click', event => {
  if (!sideNavigation.contains(event.target) && !contentsToggle.contains(event.target)) closeContents();
});
let navigationTick = false;
function updateCurrentSection() {
  const position = window.scrollY + 150;
  let active = sectionLinks[0];
  for (const link of sectionLinks) {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.getBoundingClientRect().top + window.scrollY <= position) active = link;
  }
  sectionLinks.forEach(link => {
    if (link === active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  navigationTick = false;
}
window.addEventListener('scroll', () => {
  if (!navigationTick) { navigationTick = true; requestAnimationFrame(updateCurrentSection); }
}, {passive: true});
updateCurrentSection();
