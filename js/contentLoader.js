// js/contentLoader.js
/**
 * Dynamically loads a content module into a container.
 * Supports 'grid' and 'performerDetails' modules.
 * 
 * @param {string} moduleName - Name of the module ('grid' or 'performerDetails')
 * @param {string} containerId - ID of the container element
 * @param {object} options - Additional options:
 *   - grid: jsonPath, columns, imageBasePath, placeholderImage
 *   - performerDetails: performerId
 */
export async function loadModule(moduleName, containerId = 'content-container', options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<p>Loading content...</p>';

  try {
    switch (moduleName) {
      case 'grid':
        const gridModule = await import('./grid.js');
        await gridModule.generateGridFromJSON(
          containerId,
          options.jsonPath || './data/performers.json',
          options.columns || 4,
          options.imageBasePath || './data/images',
          options.placeholderImage || './data/images/placeholder.jpg'
        );
        break;

      case 'performerDetails':
        const { renderPerformerLeft } = await import('./left-performerDetail.js');
        const { renderPerformerRight } = await import('./right-performerDetail.js');
        const performerId = options.performerId;
        if (!performerId) {
          container.innerHTML = '<p>No performer selected.</p>';
          return;
        }
        // Wrap left + right inside the container
        container.innerHTML = `
          <div class="performer-layout">
            <div class="performer-left" id="performer-left"><p>Loading left...</p></div>
            <div class="performer-right" id="performer-right"><p>Loading right...</p></div>
          </div>
        `;
        renderPerformerLeft('performer-left', performerId);
        renderPerformerRight('performer-right', performerId);
        break;

      default:
        container.innerHTML = `<p>Module "${moduleName}" not found.</p>`;
    }
  } catch (err) {
    container.innerHTML = `<p>Error loading module "${moduleName}": ${err.message}</p>`;
    console.error(err);
  }
}
