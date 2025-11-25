<template>
  <div class="lsv-page">
    <div class="lsv-wrap">
      <!-- Top bar -->
      <div class="lsv-top-bar">
        <div class="lsv-top-left">
          <button class="lsv-top-btn"><span class="icon">←</span> Back</button>
          <button class="lsv-top-btn"><span class="icon">🏠</span> Home</button>
        </div>
        <div class="lsv-brand">
          <div class="lsv-logo">LS</div>
          <div>
            <div>LinkSwingers</div>
            <div class="lsv-brand-sub">MY VERIFICATIONS</div>
          </div>
        </div>
      </div>

      <!-- Main Card -->
      <div class="lsv-card">
        <div class="lsv-card-inner">
          <!-- Header -->
          <div class="lsv-header">
            <div class="lsv-title">
              <h1>
                My verifications
                <span class="lsv-pill">MEET CONFIRMATION</span>
              </h1>
              <p>
                This page shows all Meet verifications other members left for you.
                For each one you control how it appears on your profile:
                <strong>Public</strong>, <strong>Friends only</strong> or <strong>Private</strong>.
              </p>
            </div>

            <div class="lsv-profile-mini">
              <div class="lsv-profile-top">
                <div class="lsv-avatar lsv-avatar--md">U2</div>
                <div>
                  <div><strong>User 2</strong> · Birmingham</div>
                  <div class="lsv-you">YOU</div>
                </div>
              </div>

              <div class="lsv-badges">
                <div class="lsv-badge"><span class="lsv-dot"></span> Photo verified</div>
                <div class="lsv-badge">Meet history · 4</div>
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="lsv-filters">
            <div class="lsv-filter-left">
              <span class="lsv-tag lsv-tag--accent">Received (3)</span>
              <span class="lsv-tag">Given (1)</span>
            </div>
            <div class="lsv-filter-right lsv-hint">
              Tip: “Private” still shows “Verified by man / woman / couple / TS” without revealing who.
            </div>
          </div>

          <!-- List -->
          <div class="lsv-list">
            <!-- ITEM 1 -->
            <article class="lsv-item">
              <div class="lsv-avatar lsv-avatar--lg">U1</div>

              <div class="lsv-item-body">
                <div class="lsv-meta"><strong>User 1</strong> · Couple M/F · 2 days ago · Meet</div>
                <div class="lsv-text">“Met at a club event in Birmingham. 100% real couple, respectful and fun.”</div>
                <div class="lsv-tags">
                  <span class="lsv-chip">Verified by Couple M/F</span>
                  <span class="lsv-chip lsv-pill-public">Visible: Public</span>
                </div>
              </div>

              <div class="lsv-visibility">
                <div class="lsv-vis-label">Visibility on your profile</div>
                <select class="lsv-select">
                  <option selected>Public</option>
                  <option>Friends only</option>
                  <option>Private</option>
                </select>
                <button class="lsv-btn-outline">VERIFY USER 1 BACK</button>
              </div>
            </article>

            <!-- ITEM 2 -->
            <article class="lsv-item">
              <div class="lsv-avatar lsv-avatar--lg">A</div>

              <div class="lsv-item-body">
                <div class="lsv-meta"><strong>Alice_88</strong> · Woman · 5 days ago · Meet</div>
                <div class="lsv-text">“Coffee meet went great. On time and exactly as in photos.”</div>
                <div class="lsv-tags">
                  <span class="lsv-chip">Verified by Woman</span>
                  <span class="lsv-chip lsv-pill-friends">Visible: Friends only</span>
                </div>
              </div>

              <div class="lsv-visibility">
                <div class="lsv-vis-label">Visibility on your profile</div>
                <select class="lsv-select">
                  <option>Public</option>
                  <option selected>Friends only</option>
                  <option>Private</option>
                </select>
                <button class="lsv-btn-outline">VERIFY ALICE BACK</button>
              </div>
            </article>

            <!-- ITEM 3 -->
            <article class="lsv-item">
              <div class="lsv-avatar lsv-avatar--lg">TS</div>

              <div class="lsv-item-body">
                <div class="lsv-meta"><strong>TS_RealDeal</strong> · TS · 1 week ago · Meet</div>
                <div class="lsv-text">“Chilled hotel meet, felt safe and comfortable the whole time.”</div>
                <div class="lsv-tags">
                  <span class="lsv-chip">Verified by TS</span>
                  <span class="lsv-chip lsv-pill-private">Visible: Private</span>
                </div>
              </div>

              <div class="lsv-visibility">
                <div class="lsv-vis-label">Visibility on your profile</div>
                <select class="lsv-select">
                  <option>Public</option>
                  <option>Friends only</option>
                  <option selected>Private</option>
                </select>
                <div class="lsv-vis-note">
                  Profile will only show: <strong>“Verified by TS”</strong> – it will not show this user’s name or text.
                </div>
              </div>
            </article>
          </div>

          <!-- Footer -->
          <div class="lsv-footer">
            <div class="lsv-hint">
              When you verify someone back, they will see it on their “My verifications” page.
            </div>
            <button class="lsv-save">SAVE VISIBILITY SETTINGS</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
