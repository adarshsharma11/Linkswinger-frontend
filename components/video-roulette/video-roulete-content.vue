<template>
  <section class="video-roulete-page text-white min-vh-100 py-4">
    <div class="vd-roulete-header">
      <div class="vd-logo">
        <img src="/images/logo/landing-logo.gif" alt="LinkSwingers logo">
      </div>
      <div class="vd-brand">LinkSwingers</div>
    </div>
  <div class="container-fluid py-4">
    <section class="video-stage" aria-label="Video stage">
      <div class="video-card">
        <span class="corner-tag">You</span>
        <div class="placeholder" style="background: repeating-conic-gradient(rgb(10, 10, 10) 0%, rgb(10, 10, 10) 25%, rgb(16, 16, 23) 0%, rgb(16, 16, 23) 50%) 50% center / 20px 20px; display: grid; place-items: center; color: rgb(154, 163, 175);"><p style="padding:16px; text-align:center;">Camera unavailable. Allow access to preview yourself here.</p></div>
      </div>

      <div class="video-card">
        <span class="corner-tag">Partner</span>
        <div class="placeholder" style="display:grid;place-items:center;color:#9aa3af;">
          <div style="text-align:center;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"></circle>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" stroke-width="1.5"></path>
            </svg>
            <p style="margin-top:8px;">Waiting for next match…</p>
          </div>
        </div>
      </div>
    </section>

    <section class="vd-roulete-controls" aria-label="Controls">
      <div class="filters">
        <div>
          <label for="gender">Gender filter</label><br>
          <select id="gender" name="gender">
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="ts">Trans</option>
            <option value="couple">Couple</option>
          </select>
        </div>
        <div>
          <label for="radius">Location radius: <span id="radiusVal">81</span> km</label><br>
          <input id="radius" type="range" min="5" max="500" value="50">
        </div>
      </div>

      <div class="actions">
        <button class="btn" id="prevBtn" title="Skip backward">⟵ Back</button>
        <button class="btn" id="nextBtn" title="Skip forward">Next ⟶</button>
        <button class="btn btn-danger" id="reportBtn" title="Report current partner">⚠ Report</button>
      </div>

      <div class="hint">Demo mockup • Buttons are non-functional (no backend). Local camera preview on the left.</div>
    </section>

    <section class="ads-section" aria-label="Demo ads">
      <div class="ad-box">Ad Space 1</div>
      <div class="ad-box">Ad Space 2</div>
      <div class="ad-box">Ad Space 3</div>
      <div class="ad-box">Ad Space 4</div>
    </section>

    <!-- Scrollable content with demo ad squares -->
    <section class="ads" aria-label="Sponsored">
      <h2>Sponsored</h2>
      <div class="ad-grid">
        <div class="ad-card">AD</div>
        <div class="ad-card">AD</div>
        <div class="ad-card">AD</div>
        <div class="ad-card">AD</div>
        <div class="ad-card">AD</div>
        <div class="ad-card">AD</div>
        <div class="ad-card">AD</div>
        <div class="ad-card">AD</div>
      </div>
    </section>
  </div>
</section>  
</template>
