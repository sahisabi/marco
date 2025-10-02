// right-performerDetail.js
import { createCollage } from './main.js';

export async function renderPerformerRight(containerId, performerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<p>Loading performer collage...</p>';

  try {
    // We just need the collage; load performer JSON to check existence
    const response = await fetch(`./data/performerDetails/${performerId}.json`);
    if (!response.ok) throw new Error('Failed to load performer details');
    await response.json(); // content not needed here, just confirms file exists

    container.innerHTML = ''; // clear loading
    createCollage(container, performerId);

  } catch (err) {
    container.innerHTML = `<p>Error loading performer collage: ${err.message}</p>`;
  }
}
