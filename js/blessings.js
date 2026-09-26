/**
 * ====================================================================
 * LIVE BLESSINGS WALL & DIGITAL GUESTBOOK (blessings.js)
 * ====================================================================
 * Manages guest wishes, persistent localStorage storage,
 * celebratory flower bursts, and JSON/text export for the couple.
 */

class BlessingsManager {
  constructor(initialBlessings = []) {
    this.storageKey = 'wedding_blessings_2026';
    this.initialBlessings = initialBlessings;
    this.selectedEmoji = '💐';
    this.container = document.getElementById('blessings-wall');
    this.form = document.getElementById('blessing-form');
    this.exportBtn = document.getElementById('btn-export-blessings');

    this.init();
  }

  init() {
    this.setupEmojiSelector();
    this.setupForm();
    this.setupExport();
    this.renderBlessings();
  }

  getBlessings() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing blessings from localStorage:", e);
      }
    }
    return [...this.initialBlessings];
  }

  saveBlessings(list) {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  setupEmojiSelector() {
    const emojiBtns = document.querySelectorAll('.emoji-btn');
    emojiBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        emojiBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedEmoji = btn.dataset.emoji || btn.textContent.trim();
      });
    });
  }

  setupForm() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('blessing-name');
      const relationInput = document.getElementById('blessing-relation');
      const msgInput = document.getElementById('blessing-message');

      const name = nameInput.value.trim();
      const relation = relationInput.value.trim() || 'Well-wisher';
      const blessing = msgInput.value.trim();

      if (!name || !blessing) {
        alert("Please enter your name and a heartfelt blessing message.");
        return;
      }

      const newEntry = {
        name,
        relation,
        blessing,
        avatarEmoji: this.selectedEmoji,
        date: "Just Now"
      };

      const list = this.getBlessings();
      list.unshift(newEntry);
      this.saveBlessings(list);

      // Reset form
      nameInput.value = '';
      msgInput.value = '';

      // Trigger celebratory burst
      this.triggerBurst();

      // Re-render
      this.renderBlessings();
    });
  }

  triggerBurst() {
    const burstContainer = document.createElement('div');
    burstContainer.style.position = 'fixed';
    burstContainer.style.top = '50%';
    burstContainer.style.left = '50%';
    burstContainer.style.width = '0';
    burstContainer.style.height = '0';
    burstContainer.style.pointerEvents = 'none';
    burstContainer.style.zIndex = '9999';
    document.body.appendChild(burstContainer);

    const icons = ['💐', '✨', '🪔', '💖', '🌸', '🥥'];
    for (let i = 0; i < 24; i++) {
      const el = document.createElement('div');
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
      el.style.position = 'absolute';
      el.style.fontSize = `${16 + Math.random() * 20}px`;
      el.style.userSelect = 'none';

      const angle = Math.random() * 2 * Math.PI;
      const distance = 80 + Math.random() * 180;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      el.animate([
        { transform: 'translate(0, 0) scale(0)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(1.4)`, opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 600,
        easing: 'cubic-bezier(0, 0.9, 0.57, 1)'
      });

      burstContainer.appendChild(el);
    }

    setTimeout(() => {
      if (document.body.contains(burstContainer)) {
        document.body.removeChild(burstContainer);
      }
    }, 1800);
  }

  renderBlessings() {
    if (!this.container) return;
    const list = this.getBlessings();
    this.container.innerHTML = '';

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'blessing-card';
      card.innerHTML = `
        <div class="blessing-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.4rem;">${item.avatarEmoji || '💐'}</span>
            <span class="blessing-author">${item.name}</span>
          </div>
          <span class="blessing-relation">${item.relation}</span>
        </div>
        <p class="blessing-body">${item.blessing}</p>
        <span style="display: block; text-align: right; font-size: 0.7rem; color: #a47e1b; margin-top: 0.5rem;">${item.date || ''}</span>
      `;
      this.container.appendChild(card);
    });
  }

  setupExport() {
    if (!this.exportBtn) return;
    this.exportBtn.addEventListener('click', () => {
      const list = this.getBlessings();
      const textContent = list.map((item, idx) => 
        `[#${idx + 1}] From: ${item.name} (${item.relation})\nMessage: ${item.blessing}\nDate: ${item.date}\n---\n`
      ).join('\n');

      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Wedding-Blessings-24Oct2026.txt';
      link.click();
    });
  }
}

window.BlessingsManager = BlessingsManager;
