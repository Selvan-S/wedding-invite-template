/**
 * ====================================================================
 * INTERACTIVE FALLING BLOSSOM & ROSE PETAL CANVAS
 * ====================================================================
 * Realistic floating rose and jasmine petals with interactive mouse/touch drift
 */

class PetalShower {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.maxPetals = 35;
    this.mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    this.lastMouse = { x: 0, y: 0 };
    this.active = true;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });

    this.initPetals();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  onMouseMove(e) {
    this.mouse.vx = (e.clientX - this.lastMouse.x) * 0.1;
    this.mouse.vy = (e.clientY - this.lastMouse.y) * 0.1;
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.lastMouse.x = e.clientX;
    this.lastMouse.y = e.clientY;
  }

  onTouchMove(e) {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      this.mouse.x = t.clientX;
      this.mouse.y = t.clientY;
    }
  }

  createPetal(startY = null) {
    const isRose = Math.random() > 0.35;
    return {
      x: Math.random() * this.width,
      y: startY !== null ? startY : -20 - Math.random() * 50,
      size: 10 + Math.random() * 14,
      speedY: 0.8 + Math.random() * 1.6,
      speedX: -0.5 + Math.random() * 1.0,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      oscillationSpeed: 0.02 + Math.random() * 0.03,
      oscillationDistance: 1 + Math.random() * 2,
      time: Math.random() * 100,
      isRose: isRose,
      // Rose petal crimson/pink or Jasmine white/ivory
      color: isRose 
        ? (Math.random() > 0.5 ? 'rgba(198, 40, 60, ' : 'rgba(160, 20, 35, ')
        : (Math.random() > 0.5 ? 'rgba(255, 250, 240, ' : 'rgba(250, 235, 215, '),
      opacity: 0.7 + Math.random() * 0.25
    };
  }

  initPetals() {
    this.petals = [];
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(Math.random() * this.height));
    }
  }

  drawPetal(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);

    ctx.beginPath();
    if (p.isRose) {
      // Elegant organic curved rose petal
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size * 0.6, -p.size * 0.8, -p.size * 0.8, p.size * 0.4, 0, p.size);
      ctx.bezierCurveTo(p.size * 0.8, p.size * 0.4, p.size * 0.6, -p.size * 0.8, 0, 0);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.shadowColor = 'rgba(150, 20, 30, 0.2)';
      ctx.shadowBlur = 4;
    } else {
      // Jasmine / Marigold golden blossom petal
      ctx.ellipse(0, 0, p.size * 0.4, p.size * 0.8, 0, 0, 2 * Math.PI);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.2)';
      ctx.shadowBlur = 3;
    }
    ctx.fill();
    ctx.restore();
  }

  animate() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.time += p.oscillationSpeed;
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.time) * p.oscillationDistance;
      p.rotation += p.rotationSpeed;

      // Mouse interactive breeze drift
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x += (dx / dist) * force * 5;
        p.y += (dy / dist) * force * 3;
        p.rotation += force * 8;
      }

      // Recycle petals
      if (p.y > this.height + 30 || p.x < -40 || p.x > this.width + 40) {
        this.petals[i] = this.createPetal();
      }

      this.drawPetal(p);
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.PetalShower = PetalShower;
