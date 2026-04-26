// slideshow (only runs on pages that have slides)
let cur = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function goSlide(n) {
  if (!slides.length) return;
  slides[cur].classList.remove('active');
  dots[cur].classList.remove('active');
  cur = (n + slides.length) % slides.length;
  slides[cur].classList.add('active');
  dots[cur].classList.add('active');
}

if (slides.length) {
  setInterval(() => goSlide(cur + 1), 5000);
}

// search
function doSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (q) alert('Searching for: "' + q + '"');
}
document.getElementById('searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});