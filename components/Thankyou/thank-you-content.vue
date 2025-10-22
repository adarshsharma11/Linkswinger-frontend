<template>
  <canvas id="confetti"></canvas>
  <div class="thank-content">
  <div class="container">
    <main class="card" role="main" aria-labelledby="title">
      <div class="glow" aria-hidden="true"></div>
      <header class="thank-header">
        <div class="logo" aria-hidden="true">
          <!-- Place Linkswingers.webp next to this HTML or adjust the path -->
          <img src="public/images/thank-you/Linkswingers.webp" alt="LinkSwingers logo">
        </div>
      </header>
      <h1 id="title">You're on the <span class="accent">early-access list</span> 🎉</h1>

      <section class="logo-strip" aria-label="Featured logos">
        <img src="public/images/thank-you/18-plus-icon.png"     alt="18+ Icon"           width="100" height="100" loading="lazy" decoding="async">
        <img src="public/images/thank-you/admin-moderator.png"  alt="LS Admin"           width="100" height="100" loading="lazy" decoding="async">
        <img src="public/images/thank-you/location.png"         alt="Location"           width="100" height="100" loading="lazy" decoding="async">
        <img src="public/images/thank-you/video-roulette.png"   alt="Video Roulette"     width="100" height="100" loading="lazy" decoding="async">
        <img src="public/images/thank-you/ls-watermark-150.png" alt="LS Watermark"       width="100" height="100" loading="lazy" decoding="async">
        <img src="public/images/thank-you/elite.png"            alt="Membership Elite"   width="100" height="100" loading="lazy" decoding="async">
      </section>

      <p class="lead">
        Thanks for joining the LinkSwingers waitlist. We’ll email your invite the moment we open.
        To make sure you get it, please check Spam/Junk and add <b>no-reply@linkswingers.co.uk</b> to your contacts.
      </p>

      <section class="grid" aria-label="What happens next">
        <div class="tile">
          <b>1) Keep an eye on your inbox</b>
          <small>We’ll send a confirmation soon. If you can’t see it, look in Spam/Junk or “Promotions”.</small>
        </div>
        <div class="tile">
          <b>2) Secure your spot</b>
          <small>Your place in the queue is saved. When invites roll out, you’ll get first access.</small>
        </div>
        <div class="tile">
          <b>3) What you’ll get</b>
          <small>Meets near you, HD 1-on-1 calls, Video Roulette.</small>
        </div>
      
      <!-- LOGO STRIP: Replace src with your PNG paths (ideally in the same folder as this HTML).
           Example: <img src="E:\LS\LS-ASSETS\yourlogo.png"> will NOT work on other machines.
           Instead, copy your PNGs next to this HTML and use just the filenames, e.g. src="logo1.png". -->
</section>

      <div class="cta-row">
        <a class="btn" href="/"  aria-label="Back to home (disabled)">Back to Home</a>
      </div>

      <div class="footer-note">
        You can unsubscribe from any email in one click.
        <div class="footlinks">
          <nuxt-link to="/privacy">Privacy Policy</nuxt-link>
          <nuxt-link to="/terms">Terms of Use</nuxt-link>
          <nuxt-link to="/cookies">Cookie Policy</nuxt-link>
          <nuxt-link to="/safety">Safety Tips</nuxt-link>
          <nuxt-link to="/guidelines">Community Guidelines</nuxt-link>
        </div>
      </div>
    </main>
  </div>
</div>  
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const c = document.getElementById('confetti') as HTMLCanvasElement | null;
  if (!c) return; // ensure element exists

  const ctx = c.getContext('2d');
  if (!ctx) return;

  let w: number, h: number;
  let particles: any[] = [];
  let rockets: any[] = [];

  function resize() {
      w = (c as HTMLCanvasElement).width = window.innerWidth;
    h = (c as HTMLCanvasElement).height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COLORS = ['#ff3030', '#00a6ff', '#00ffa6', '#ffffff'];

  function spawnRocket() {
    const x = Math.random() * w * 0.7 + w * 0.15;
    const vy = -(7 + Math.random() * 3);
    rockets.push({
      x,
      y: h + 10,
      vx: (Math.random() - 0.5) * 1.2,
      vy,
      fuse: 40 + Math.random() * 20,
      color: COLORS[(Math.random() * COLORS.length) | 0],
    });
  }

  function explode(x: number, y: number, n = 140) {
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 6;
      const fade = 120 + Math.random() * 80;
      particles.push({
        x,
        y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        g: 0.06 + Math.random() * 0.08,
        life: fade,
        size: 1.8 + Math.random() * 3.0,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      });
    }
  }

  // Initial burst
  for (let i = 0; i < 4; i++) setTimeout(spawnRocket, i * 250);

  // Periodic rockets
  const interval = setInterval(() => {
    for (let i = 0; i < 3; i++) setTimeout(spawnRocket, i * 200);
  }, 1800);

  let raf: number;
  function tick() {
    ctx?.clearRect(0, 0, w, h);

    rockets = rockets.filter((r) => r.fuse > 0);
    rockets.forEach((r) => {
      r.fuse--;
      r.x += r.vx;
      r.y += r.vy;
      r.vy += 0.05;
      if (ctx) ctx.globalAlpha = 0.9;
      if (ctx) ctx.fillStyle = r.color;
      ctx?.fillRect(r.x - 1, r.y - 1, 2, 2);
      if (r.fuse <= 0 || r.vy > 0) {
        explode(r.x, r.y, 160);
      }
    });

    particles = particles.filter((p) => p.life > 0);
    particles.forEach((p) => {
      p.life--;
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      const alpha = Math.max(0, p.life / 180);
      if (ctx) ctx.globalAlpha = alpha;
      if (ctx) ctx.fillStyle = p.color;
      if (ctx) ctx.fillRect(p.x - 1, p.y - 1, p.size * 1.8, p.size);
    });

    if (ctx) ctx.globalAlpha = 1;
    raf = requestAnimationFrame(tick);
  }

  tick();

  // Stop animation after 9 seconds
  setTimeout(() => {
    cancelAnimationFrame(raf);
    clearInterval(interval);
    ctx.clearRect(0, 0, w, h);
  }, 9000);
});
</script>

