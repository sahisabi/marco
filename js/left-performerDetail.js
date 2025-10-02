export async function renderPerformerLeft(containerId, performerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<p>Loading performer details...</p>';

  try {
    const response = await fetch(`./data/performerDetails/${performerId}.json`);
    if (!response.ok) throw new Error('Failed to load performer details file');
    const performer = await response.json();

    if (!performer || !performer.stageName) {
      container.innerHTML = '<p>❌ Performer not found (missing stageName).</p>';
      return;
    }

    const safe = (val) => val || "N/A";
    const calcAge = (birthday) => {
      if (!birthday) return "N/A";
      const dob = new Date(birthday);
      if (isNaN(dob)) return "N/A";
      const diff = Date.now() - dob.getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    };
    const age = calcAge(performer.birthday);

    container.innerHTML = `
      <!-- Header Box -->
      <div class="performer-header">
        <!-- Left 70% -->
        <div class="header-left">
          <h2>${performer.stageName || "N/A"}</h2>
          <div class="aliases">
            <div class="alias-grid">
              ${(performer.aliases && performer.aliases.length > 0
                ? performer.aliases.map(a => `<span>${a}</span>`).join("")
                : "<span>N/A</span>")}
            </div>
          </div>
        </div>

        <!-- Right 30% -->
        <div class="header-right">
          <p><strong>Age:</strong> ${age !== "N/A" ? age : "-"}</p>
          <p><strong>Type:</strong> ${safe(performer.type)}</p>
          <p><strong>Best Fit For:</strong> ${safe(performer.bestFitFor)}</p>
          <div class="rating-wrapper">
            <div class="rating-bar">
              <div class="rating-fill" style="width:${(performer.rating || 0) * 10}%"></div>
            </div>
            <span id="rating-text">(${safe(performer.rating) || 0}/10)</span>
          </div>
        </div>
      </div>

      <!-- Tabbed Box -->
      <div class="performer-tabs-box">
        <div class="tabs">
          <button class="tab-button active" data-tab="details">Performer Detail</button>
          <button class="tab-button" data-tab="trivia">Performer Trivia</button>
        </div>

        <div class="tab-content active" id="details">
          <p><strong>Birthday:</strong> ${performer.birthday ? new Date(performer.birthday).toDateString() : "N/A"}</p>
          <p><strong>Ethnicity:</strong> ${safe(performer.ethnicity)}</p>
          <p><strong>Body Type:</strong> ${safe(performer.bodyType)}</p>
          <p><strong>Height:</strong> ${performer.heightInCm ? performer.heightInCm + " cm" : "N/A"}</p>
          <p><strong>Weight:</strong> ${performer.weightInKg ? performer.weightInKg + " kg" : "N/A"}</p>
          <p><strong>Measurements:</strong> ${safe(performer.bust)}-${safe(performer.waist)}-${safe(performer.hip)} ${safe(performer.cup)}</p>
          <p><strong>Hair:</strong> ${[performer.hairLength, performer.hairColor].filter(Boolean).join(" ") || "N/A"}</p>
          <p><strong>Eyes:</strong> ${safe(performer.eyeColor)}</p>
        </div>

        <div class="tab-content" id="trivia">
          <p><strong>Real Name:</strong> ${safe(performer.realName)}</p>
          <p><strong>Genres:</strong> ${performer.genres?.join(", ") || "N/A"}</p>
          <p><strong>Aliases:</strong> ${performer.aliases?.join(", ") || "N/A"}</p>
        </div>
      </div>
    `;

    // Tab switching logic
    const buttons = container.querySelectorAll(".tab-button");
    const contents = container.querySelectorAll(".tab-content");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        container.querySelector(`#${btn.dataset.tab}`).classList.add("active");
      });
    });

  } catch (err) {
    container.innerHTML = `<p>⚠ Error loading performer details: ${err.message}</p>`;
  }
}
