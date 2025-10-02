/**
 * grid.js
 * Fetches performer data from performers.json
 * and generates a square grid inside the specified container.
 */
import { createRatingBar } from './rating.js';

export async function generateGridFromJSON(
  containerId,
  jsonPath = './data/performers.json', // switched to lightweight file
  columns = 4,
  imageBasePath = './data/images',
  placeholderImage = './data/images/placeholder.jpg'
) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clear previous content
  container.innerHTML = '';

  // Grid CSS
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  container.style.gap = '20px';

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error('Failed to load JSON file');

    const performers = await response.json();

    performers.forEach((performer) => {
      // Card container
      const div = document.createElement('div');
      div.style.textAlign = 'center';
      div.style.border = '1px solid #ccc';
      div.style.padding = '10px';
      div.style.borderRadius = '8px';
      div.style.backgroundColor = '#fff';
      div.style.cursor = 'pointer';
      div.style.userSelect = 'none';

      // Click navigates to performer.html with ID
      div.addEventListener('click', () => {
        window.location.href = `performer.html?id=${performer.id}`;
      });

      // Performer image
      const img = document.createElement('img');
      const imgPath = `${imageBasePath}/${performer.id}/main.jpg`;
      img.src = imgPath;
      img.alt = performer.stageName;
      img.style.width = '100%';
      img.style.aspectRatio = '1 / 1'; // square
      img.style.objectFit = 'cover';
      img.style.borderRadius = '6px';
      img.onerror = () => {
        img.src = placeholderImage;
      };

      // Stage name
      const nameP = document.createElement('p');
      nameP.textContent = performer.stageName;
      nameP.style.margin = '5px 0 2px 0';
      nameP.style.fontWeight = 'bold';

      // BestFitFor
      const bestFitP = document.createElement('p');
      bestFitP.textContent = performer.bestFitFor || '';
      bestFitP.style.margin = '0';
      bestFitP.style.fontSize = '14px';
      bestFitP.style.color = '#555';

      div.appendChild(img);
      div.appendChild(nameP);
      div.appendChild(bestFitP);

      // Rating bar
      div.appendChild(createRatingBar(performer.rating));
      
      container.appendChild(div);
    });

  } catch (err) {
    container.innerHTML = `<p>Error loading performers: ${err}</p>`;
  }
}

// Auto-initialize grid if container exists
document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('performer-grid');
  if (gridContainer) {
    generateGridFromJSON(
      'performer-grid',
      './data/performers.json', // switched to lightweight file
      5,
      './data/images',
      './data/images/placeholder.jpg'
    );
  }
});
