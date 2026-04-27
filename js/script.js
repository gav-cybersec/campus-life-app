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
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!q) return;

  // Events page: filter event rows
  const eventRows = document.querySelectorAll('.event-row');
  if (eventRows.length) {
    // Show all tabs' events by temporarily filtering across all periods
    const allEvents = typeof events !== 'undefined' ? events : [];
    const matched = allEvents.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.cat.toLowerCase().includes(q) ||
      e.place.toLowerCase().includes(q)
    );
    const list = document.getElementById('eventsList');
    if (list) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      if (matched.length === 0) {
        list.innerHTML = '<p class="empty">No results for "' + q + '".</p>';
      } else {
        list.innerHTML = matched.map(e => `
          <div class="event-row">
            <div class="event-meta">
              <div class="event-month">${e.month}</div>
              <div class="event-day">${e.day}</div>
              <div class="event-time">${e.time}</div>
            </div>
            <div class="event-info">
              <span class="tag">${e.cat}</span>
              <strong>${e.title}</strong>
              <div class="event-place">📍 ${e.place}</div>
            </div>
          </div>
        `).join('');
      }
    }
    return;
  }

  // Dining page: filter menu items
  const menuCards = document.querySelectorAll('.menu-card');
  if (menuCards.length) {
    menuCards.forEach(card => {
      const items = card.querySelectorAll('.menu-list li');
      let anyVisible = false;
      items.forEach(li => {
        const match = li.textContent.toLowerCase().includes(q);
        li.style.display = match ? '' : 'none';
        if (match) anyVisible = true;
      });
      card.style.display = anyVisible ? '' : 'none';
    });
    return;
  }

  // Map page: filter location cards
  const locationCards = document.querySelectorAll('.location-card');
  if (locationCards.length) {
    locationCards.forEach(card => {
      const match = card.textContent.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
    });
    return;
  }

  // Home page: navigate to events with query
  window.location.href = 'events.html';
}

document.getElementById('searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});