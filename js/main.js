// main.js: central repo for shared functions
import { createCollage } from './collage.js';
import { createRatingBar } from './rating.js';
import { generateGridFromJSON } from './grid.js';

export { createCollage, createRatingBar, generateGridFromJSON };

export async function loadHTML(url, elementId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load ' + url);
    document.getElementById(elementId).innerHTML = await response.text();
  } catch (err) {
    document.getElementById(elementId).innerHTML = `<p>Error loading ${url}: ${err}</p>`;
  }
}

export async function initPage(pageType, options = {}) {
  await loadHTML('banner.html', 'banner');
  await loadHTML('left-menu.html', 'left-menu');
  await loadHTML('right-menu.html', 'right-menu');

  const contentContainer = document.getElementById('content-container');
  if (!contentContainer) return;

  switch (pageType) {
    case 'home':
      contentContainer.innerHTML = options.htmlContent || '<p>Welcome!</p>';
      break;

    case 'grid':
      {
        const { jsonPath, columns, imageBasePath, placeholderImage } = options;
        await generateGridFromJSON(
          'content-container',
          jsonPath,
          columns,
          imageBasePath,
          placeholderImage
        );
      }
      break;

    case 'performer':
      {
        const { performerId } = options;
        const leftModule = await import('./left-performerDetail.js');
        const rightModule = await import('./right-performerDetail.js');
        await leftModule.renderPerformerLeft('performer-left', performerId);
        await rightModule.renderPerformerRight('performer-right', performerId);
      }
      break;

    default:
      contentContainer.innerHTML = '<p>Page type not recognized.</p>';
      break;
  }
}
