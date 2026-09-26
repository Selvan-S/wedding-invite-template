/**
 * ====================================================================
 * 3D HOLOGRAPHIC CARD TILT & SHEEN
 * ====================================================================
 * Creates an opulent 3D physical tilt effect tracking the guest's cursor
 */

function initCardTilt() {
  const card = document.querySelector('.invite-tilt-card');
  const shine = document.querySelector('.invite-tilt-shine');
  if (!card) return;

  const maxTilt = 12; // Max degrees of rotation

  function handleMove(e) {
    const rect = card.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (!clientX || !clientY) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (shine) {
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.6) 0%, rgba(212,175,55,0.2) 40%, transparent 80%)`;
      shine.style.opacity = '1';
    }
  }

  function handleLeave() {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (shine) {
      shine.style.opacity = '0';
    }
  }

  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', handleLeave);
  card.addEventListener('touchmove', handleMove, { passive: true });
  card.addEventListener('touchend', handleLeave);
}

window.initCardTilt = initCardTilt;
