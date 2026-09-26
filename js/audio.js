/**
 * ====================================================================
 * ROYAL AMBIENT AUDIO CONTROLLER (audio.js)
 * ====================================================================
 * Manages wedding soundtrack playback, floating disc rotation,
 * and equalizer animation.
 */

class RoyalAudioManager {
  constructor(audioSrc) {
    this.audioSrc = audioSrc;
    this.audio = new Audio(audioSrc);
    this.audio.loop = true;
    this.isPlaying = false;
    this.disc = document.getElementById('audio-disc');
    this.playerBtn = document.getElementById('royal-audio-player');
    this.statusText = document.getElementById('audio-status');

    this.initEvents();
  }

  initEvents() {
    if (this.playerBtn) {
      this.playerBtn.addEventListener('click', () => this.togglePlay());
    }

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      if (this.disc) this.disc.classList.add('spinning');
      if (this.statusText) this.statusText.textContent = 'Playing auspicious music';
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      if (this.disc) this.disc.classList.remove('spinning');
      if (this.statusText) this.statusText.textContent = 'Music paused';
    });
  }

  play() {
    this.audio.play().then(() => {
      this.isPlaying = true;
      if (this.disc) this.disc.classList.add('spinning');
      if (this.statusText) this.statusText.textContent = 'Playing auspicious music';
    }).catch(err => {
      console.warn("Audio autoplay blocked by browser policy:", err);
    });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    if (this.disc) this.disc.classList.remove('spinning');
    if (this.statusText) this.statusText.textContent = 'Music paused';
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
}

window.RoyalAudioManager = RoyalAudioManager;
