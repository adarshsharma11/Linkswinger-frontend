<template>
  <section class="media-settings-page text-white min-vh-100 py-4">
    <div class="settings-header">
      <div class="container">
        <div class="stmedia-breadcrumbs">
          <span>Settings</span> &nbsp;/&nbsp; <strong>Media</strong>
        </div>
          <div class="st-page-header d-flex flex-wrap align-items-center justify-content-between">
            <div class="st-page-title-block">
              <div class="st-page-title">
                <span class="st-page-title-dot"></span>
                <span>Media settings</span>
              </div>
              <div class="st-page-subtitle">
                Manage visibility for all your photos and videos in one place.
              </div>
            </div>

            <!-- BIGGER LOGO BETWEEN TITLE AND NOTE -->
            <div class="st-logo-block">
              <img class="img-fluid st-logo-img" src="/images/logo/landing-logo.gif" alt="landing-logo.gif">
            </div>

            <div class="st-note-block">
              <strong>Note:</strong><br />
              Private media &amp; videos is visible only to you.
            </div>
          </div>
      </div>
    </div>

    <!-- Global filters / info -->
  <div class="st-filter-mm"> 
    <div class="container">
      <div class="st-filters d-flex flex-wrap">
        <select>
          <option>Show: All media</option>
          <option>Photos only</option>
          <option>Videos only</option>
          <option>Public only</option>
          <option>Friends only</option>
          <option>Private only</option>
        </select>
        <span>Example: 24 photos · 12 videos</span>
      </div>
    </div>
  </div>  

    <!-- PHOTOS SECTION -->
    <section class="st-section" id="photos-section">
      <div class="container">
        <div class="st-section-header">
          <div class="st-section-title">
            <span>Photos</span>
            <span class="st-section-title-pill">Profile &amp; gallery</span>
          </div>
          <div class="st-page-subtitle">Adjust visibility, comments or likes for photo media.</div>
        </div>
      <div class="st-section-divider"></div>

      <div class="st-media-wrapper">
        <div class="st-media-header">
          <div>
            <strong>Your photos</strong> &nbsp;·&nbsp; visibility + comments/likes controls per photo
          </div>
          <div>Changes are saved automatically</div>
        </div>

        <div class="st-media-grid">
          <!-- Photo – Public -->
          <article class="st-media-item">
            <div class="st-thumb-wrapper">
              <div class="st-thumb-placeholder">Photo</div>
              <div class="st-thumb-badge thumb-badge--photo">Public</div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">IMG_3421.jpg</span>
                <span class="st-media-length">Photo</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public" selected>Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private">Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <!-- Photo – Friends only -->
          <article class="st-media-item">
            <div class="st-thumb-wrapper">
              <div class="st-thumb-placeholder">Photo</div>
              <div class="st-thumb-badge st-thumb-badge--photo">Friends</div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">Couple_01.webp</span>
                <span class="st-media-length">Photo</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public">Public</option>
                  <option value="friends" selected>Friends only</option>
                  <option value="private">Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <!-- Photo – Private -->
          <article class="st-media-item">
            <div class="st-thumb-wrapper">
              <div class="st-thumb-placeholder">Photo</div>
              <div class="st-thumb-badge st-thumb-badge--photo">Private</div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">PrivateSelfie_03.jpg</span>
                <span class="st-media-length">Photo</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public">Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private" selected>Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option>On</option>
                    <option selected>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <!-- Extra photos to simulate more media -->
          <article class="st-media-item">
            <div class="st-thumb-wrapper">
              <div class="st-thumb-placeholder">Photo</div>
              <div class="st-thumb-badge st-thumb-badge--photo">Friends</div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">ClubFloor_02.jpg</span>
                <span class="st-media-length">Photo</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public">Public</option>
                  <option value="friends" selected>Friends only</option>
                  <option value="private">Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <article class="st-media-item">
            <div class="st-thumb-wrapper">
              <div class="st-thumb-placeholder">Photo</div>
              <div class="st-thumb-badge st-thumb-badge--photo">Public</div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">Profile_01.png</span>
                <span class="st-media-length">Photo</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public" selected>Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private">Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <article class="st-media-item">
            <div class="st-thumb-wrapper">
              <div class="st-thumb-placeholder">Photo</div>
              <div class="st-thumb-badge st-thumb-badge--photo">Private</div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">MirrorSelfie_07.jpg</span>
                <span class="st-media-length">Photo</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public">Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private" selected>Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option>On</option>
                    <option selected>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      </div>
    </section>

    <!-- VIDEOS SECTION -->
    <section class="st-section" id="videos-section">
      <div class="container">
      <div class="st-section-header d-flex flex-wrap align-items-center justify-content-between">
        <div class="st-section-title">
          <span>Videos</span>
          <span class="st-section-title-pill">Clips &amp; previews</span>
        </div>
        <div class="st-page-subtitle">Change visibility, comments or likes, or play a quick preview.</div>
      </div>
      <div class="st-section-divider"></div>

      <div class="st-media-wrapper">
        <div class="st-media-header">
          <div>
            <strong>Your videos</strong> &nbsp;·&nbsp; visibility + comments/likes controls per video
          </div>
          <div>Changes are saved automatically</div>
        </div>

        <div class="st-media-grid">
          <!-- Video – Public -->
          <article class="st-media-item" data-video-src="sample-video.mp4">
            <div class="st-thumb-wrapper st-video-thumb">
              <div class="st-thumb-placeholder">Video</div>
              <div class="st-thumb-badge st-thumb-badge--video">Public</div>
              <div class="st-video-play-pill">
                <span>▶</span>
                <span>Play</span>
              </div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">VID_001.mp4</span>
                <span class="st-media-length">01:23</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public" selected>Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private">Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <!-- Video – Friends only -->
          <article class="st-media-item" data-video-src="sample-video.mp4">
            <div class="st-thumb-wrapper st-video-thumb">
              <div class="st-thumb-placeholder">Video</div>
              <div class="st-thumb-badge st-thumb-badge--video">Friends</div>
              <div class="st-video-play-pill">
                <span>▶</span>
                <span>Play</span>
              </div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">ClubNight_02.mp4</span>
                <span class="st-media-length">05:12</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public">Public</option>
                  <option value="friends" selected>Friends only</option>
                  <option value="private">Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <!-- Video – Private -->
          <article class="st-media-item" data-video-src="sample-video.mp4">
            <div class="st-thumb-wrapper st-video-thumb">
              <div class="st-thumb-placeholder">Video</div>
              <div class="st-thumb-badge st-thumb-badge--video">Private</div>
              <div class="st-video-play-pill">
                <span>▶</span>
                <span>Play</span>
              </div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">PrivateClip_01.mp4</span>
                <span class="st-media-length">00:45</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public">Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private" selected>Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option>On</option>
                    <option selected>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <!-- More videos -->
          <article class="st-media-item" data-video-src="sample-video.mp4">
            <div class="st-thumb-wrapper st-video-thumb">
              <div class="st-thumb-placeholder">Video</div>
              <div class="st-thumb-badge st-thumb-badge--video">Public</div>
              <div class="st-video-play-pill">
                <span>▶</span>
                <span>Play</span>
              </div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">Party_03.mp4</span>
                <span class="st-media-length">02:12</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public" selected>Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private">Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <article class="st-media-item" data-video-src="sample-video.mp4">
            <div class="st-thumb-wrapper st-video-thumb">
              <div class="st-thumb-placeholder">Video</div>
              <div class="st-thumb-badge st-thumb-badge--video">Friends</div>
              <div class="st-video-play-pill">
                <span>▶</span>
                <span>Play</span>
              </div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">RoomTour_04.mp4</span>
                <span class="st-media-length">03:45</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public">Public</option>
                  <option value="friends" selected>Friends only</option>
                  <option value="private">Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>

          <article class="st-media-item" data-video-src="sample-video.mp4">
            <div class="st-thumb-wrapper st-video-thumb">
              <div class="st-thumb-placeholder">Video</div>
              <div class="st-thumb-badge st-thumb-badge--video">Private</div>
              <div class="st-video-play-pill">
                <span>▶</span>
                <span>Play</span>
              </div>
            </div>
            <div class="st-media-meta">
              <div class="st-media-meta-top">
                <span class="st-media-name">Intro_05.mp4</span>
                <span class="st-media-length">01:02</span>
              </div>
              <div class="st-media-controls">
                <select class="st-media-select">
                  <option value="public">Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private" selected>Private</option>
                </select>
                <button class="st-btn-delete">Delete</button>
              </div>
              <div class="st-media-options">
                <div class="st-media-option">
                  <span class="st-option-label">Comments</span>
                  <select class="st-option-select">
                    <option>On</option>
                    <option selected>Off</option>
                  </select>
                </div>
                <div class="st-media-option">
                  <span class="st-option-label">Likes</span>
                  <select class="st-option-select">
                    <option selected>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      </div>
    </section>
  </section>
   <!-- Simple video preview modal -->
  <div class="st-video-modal-backdrop" id="videoModal">
    <div class="st-video-modal">
      <div class="st-video-modal-header">
        <span id="videoModalTitle">Preview</span>
        <button class="st-video-modal-close" type="button" aria-label="Close">&times;</button>
      </div>
      <!-- Dummy video; Atul can wire real URLs -->
      <video id="videoModalPlayer" controls>
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>
 <script>
export default {
  mounted() {
    // DELETE BUTTON WORKING
    document.querySelectorAll('.st-btn-delete').forEach((btn) => {
      btn.addEventListener('click', function () {
        const card = this.closest('.st-media-item');
        const name =
          card?.querySelector('.st-media-name')?.textContent || 'this media';
        const ok = confirm('Delete ' + name + '?');
        if (ok) card.remove();
      });
    });

    // VIDEO MODAL LOGIC (FIXED)
    const modal = document.getElementById('videoModal');
    const modalClose = modal.querySelector('.st-video-modal-close');
    const modalPlayer = document.getElementById('videoModalPlayer');
    const modalTitle = document.getElementById('videoModalTitle');

    function openVideoModal(card) {
      const name =
        card?.querySelector('.st-media-name')?.textContent || 'Video preview';
      const src = card?.getAttribute('data-video-src') || '';

      modalTitle.textContent = name;
      modalPlayer.pause();

      if (src) {
        modalPlayer.querySelector('source').src = src;
        modalPlayer.load();
      }

      modal.style.display = 'flex';
    }

    function closeVideoModal() {
      modal.style.display = 'none';
      modalPlayer.pause();
    }

    // ✅ FIXED SELECTOR (aapke HTML ke according)
    document
      .querySelectorAll('.st-video-thumb, .st-video-play-pill')
      .forEach((el) => {
        el.addEventListener('click', function (e) {
          e.stopPropagation();
          const card = this.closest('.st-media-item');
          openVideoModal(card);
        });
      });

    // Close button
    modalClose.addEventListener('click', closeVideoModal);

    // Backdrop click close
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeVideoModal();
    });
  },
};
</script>
