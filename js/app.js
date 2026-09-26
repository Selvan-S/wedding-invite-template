/**
 * ====================================================================
 * MAIN APPLICATION ORCHESTRATOR (app.js)
 * ====================================================================
 * Binds wedding-config.js to the DOM, handles the 3D Grand Reveal,
 * and initializes all interactive animations and features.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.WEDDING_CONFIG || {};

  // 1. Initialize Audio Manager
  const audioManager = new RoyalAudioManager(cfg.audio ? cfg.audio.src : 'assets/audio/wedding-melody.wav');

  // 2. Initialize Falling Petal Shower Canvas
  const petalShower = new PetalShower('petal-canvas');

  // 3. Initialize 3D Card Tilt
  if (window.initCardTilt) {
    window.initCardTilt();
  }

  // 4. Initialize Live Countdown & Calendar Sync
  if (window.initCountdown && cfg.dates) {
    window.initCountdown(cfg.dates.targetDate);
  }

  // 5. Initialize Blessings Wall
  if (window.BlessingsManager) {
    new BlessingsManager(cfg.initialBlessings || []);
  }

  // 6. Initialize WhatsApp RSVP
  if (window.initRSVP) {
    window.initRSVP(cfg.rsvp);
  }

  // 7. Dynamic Data Binding from wedding-config.js
  populateDynamicContent(cfg);

  // 8. 3D Royal Gate Unveiling Mechanics
  setupGateUnveiling(audioManager);
});

function populateDynamicContent(cfg) {
  // Bind Schedule Timeline
  const scheduleContainer = document.getElementById('schedule-timeline');
  if (scheduleContainer && cfg.schedule) {
    scheduleContainer.innerHTML = '';
    cfg.schedule.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="timeline-badge">${index + 1}</div>
        <div class="timeline-card">
          <span class="timeline-time">${item.time}</span>
          <h3 class="timeline-title">${item.title}</h3>
          <p class="timeline-subtitle">${item.subtitle || ''}</p>
          <p class="timeline-desc">${item.description}</p>
          <div class="timeline-attire">
            <span>✨ Attire:</span>
            <strong>${item.attire}</strong>
          </div>
        </div>
      `;
      scheduleContainer.appendChild(el);
    });
  }

  // Bind Dress Code Swatches
  const swatchesContainer = document.getElementById('dress-code-swatches');
  if (swatchesContainer && cfg.dressCodeGuide) {
    swatchesContainer.innerHTML = '';
    cfg.dressCodeGuide.forEach(swatch => {
      const el = document.createElement('div');
      el.className = 'swatch-item';
      el.innerHTML = `
        <div class="swatch-circle" style="background-color: ${swatch.hex};"></div>
        <span class="swatch-name">${swatch.name}</span>
      `;
      swatchesContainer.appendChild(el);
    });
  }

  // Bind Love Story Timeline
  const storyContainer = document.getElementById('story-timeline');
  if (storyContainer && cfg.story) {
    storyContainer.innerHTML = '';
    cfg.story.forEach((step, idx) => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="timeline-badge">♥</div>
        <div class="timeline-card">
          <span class="timeline-time">${step.year}</span>
          <h3 class="timeline-title">${step.title}</h3>
          <p class="timeline-desc">${step.description}</p>
        </div>
      `;
      storyContainer.appendChild(el);
    });
  }
}

function setupGateUnveiling(audioManager) {
  const overlay = document.getElementById('royal-gate-overlay');
  const sealBtn = document.getElementById('gate-seal-btn');
  const skipBtn = document.getElementById('gate-skip-btn');

  function openGate() {
    if (!overlay) return;
    overlay.classList.add('opening');
    
    // Play auspicious music upon the user's gesture
    if (audioManager) {
      audioManager.play();
    }

    setTimeout(() => {
      overlay.classList.add('unveiled');
    }, 1200);
  }

  if (sealBtn) {
    sealBtn.addEventListener('click', openGate);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', openGate);
  }
}
