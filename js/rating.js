/**
 * rating.js
 * Creates a rating bar with label text.
 * - Shows "NA" with grey bar if rating is null/empty/invalid.
 * - Otherwise shows color-coded bar with x/10.
 */
export function createRatingBar(rating) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.gap = '6px';
  container.style.marginTop = '6px';

  const bar = document.createElement('div');
  bar.style.height = '8px';          // thinner bar
  bar.style.borderRadius = '6px';
  bar.style.flex = '1';              // fills available space

  const text = document.createElement('span');
  text.style.fontWeight = 'bold';
  text.style.fontSize = '12px';

  if (rating == null || rating === '' || isNaN(rating)) {
    // No rating → grey bar + NA
    bar.style.backgroundColor = '#ccc';
    text.textContent = 'NA';
  } else {
    let color = '#ccc';
    if (rating < 4) color = 'red';
    else if (rating < 6) color = 'orange';
    else if (rating < 8) color = 'yellow';
    else color = 'green';

    bar.style.backgroundColor = color;
    bar.style.width = `${(rating / 10) * 100}%`;
    text.textContent = `${rating}/10`;
  }

  container.appendChild(bar);
  container.appendChild(text);

  return container;
}
