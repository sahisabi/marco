// js/left-performerDetail.js
export async function renderPerformerLeft(containerId, performerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<p>Loading performer details...</p>';

  try {
    // Load performer-specific JSON file
    const response = await fetch(`./data/performerDetails/${performerId}.json`);
    if (!response.ok) throw new Error('Failed to load performer details file');
    const performer = await response.json();

    if (!performer) {
      container.innerHTML = '<p>Performer not found.</p>';
      return;
    }

    // Calculate age from birthday
    let age = null;
    if (performer.birthday) {
      const birthDate = new Date(performer.birthday);
      if (!isNaN(birthDate)) {
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        age = Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    }

    // Build details HTML
    container.innerHTML = `
      <h2>${performer.stageName}</h2>
      ${performer.realName ? `<p><strong>Real Name:</strong> ${performer.realName}</p>` : ''}
      ${age !== null ? `<p><strong>Age:</strong> ${age} years</p>` : ''}
      <p><strong>Genres:</strong> ${(performer.genres || []).join(', ') || 'N/A'}</p>
      <p><strong>Body Type:</strong> ${performer.bodyType || 'N/A'}</p>
      <p><strong>Birthday:</strong> ${performer.birthday ? new Date(performer.birthday).toDateString() : 'N/A'}</p>
      <p><strong>Ethnicity:</strong> ${performer.ethnicity || 'N/A'}</p>
      <p><strong>Bust:</strong> ${performer.bust || 'N/A'} ${performer.cup || ''}</p>
      <p><strong>Waist:</strong> ${performer.waist || 'N/A'}</p>
      <p><strong>Hip:</strong> ${performer.hip || 'N/A'}</p>
      <p><strong>Height:</strong> ${performer.heightInCm ? performer.heightInCm + ' cm' : 'N/A'}</p>
      <p><strong>Weight:</strong> ${performer.weightInKg ? performer.weightInKg + ' kg' : 'N/A'}</p>
      <p><strong>Hair:</strong> ${(performer.hairLength || '') + ' ' + (performer.hairColor || '')}</p>
      <p><strong>Eyes:</strong> ${performer.eyeColor || 'N/A'}</p>
      <p><strong>Aliases:</strong> ${(performer.aliases || []).join(', ') || 'N/A'}</p>
      <p><strong>Type:</strong> ${performer.type || 'N/A'}</p>
    `;
  } catch (err) {
    container.innerHTML = `<p>Error loading performer details: ${err.message}</p>`;
  }
}
