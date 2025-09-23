<template>
  <section class="profile-page bg-dark text-white min-vh-100 d-flex flex-column">
    <!-- MAIN CONTENT -->
    <div class="container flex-grow-1">
      <!-- HEADER -->
      <div class="d-flex flex-column flex-md-row align-items-center mb-4 text-white mt-4">
        <!-- Avatar -->
        <img
          src="/images/avtar/1.jpg"
          alt="Club Avatar"
          class="rounded-circle me-md-3 mb-3 mb-md-0"
          style="width: 100px; height: 100px; object-fit: cover"
        />

        <!-- Info -->
        <div class="flex-grow-1 text-center text-md-start">
          <h2 class="mb-1 text-white">Club Profile</h2>
          <p class="mb-1 text-white-50">Anytown, USA</p>
          <span class="badge bg-success">Verified</span>
        </div>

        <!-- Actions -->
        <div class="d-flex gap-2 mt-3 mt-md-0 flex-wrap justify-content-center">
          <button class="btn btn-outline-light btn-sm">Message</button>
          <button class="btn btn-outline-light btn-sm">Call</button>
          <button class="btn btn-outline-light btn-sm">Video Call</button>
        </div>
      </div>

      <!-- NAV TABS -->
      <ul class="nav nav-tabs border-secondary mb-3" id="clubTabs" role="tablist">
        <li class="nav-item">
          <button
            class="nav-link active"
            id="about-tab"
            data-bs-toggle="tab"
            data-bs-target="#about"
            type="button"
            role="tab"
          >
            About Us
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="members-tab" data-bs-toggle="tab" data-bs-target="#members" type="button">
            Members
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="events-tab" data-bs-toggle="tab" data-bs-target="#events" type="button">
            Events
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="photos-tab" data-bs-toggle="tab" data-bs-target="#photos" type="button">
            Photos
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="videos-tab" data-bs-toggle="tab" data-bs-target="#videos" type="button">
            Videos
          </button>
        </li>
      </ul>

      <!-- TAB CONTENT -->
      <div class="tab-content pb-4" id="clubTabsContent">
        <!-- ABOUT -->
        <div class="tab-pane fade show active" id="about" role="tabpanel">
          <div class="row g-3">
            <!-- LEFT COLUMN -->
            <div class="col-md-6 d-flex flex-column gap-3">
              <div class="card bg-black text-white p-3">
                <h5>Opening times</h5>
                <p class="small text-white-50 mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae elit ocl massa acventrum.
                </p>
              </div>

              <div class="card bg-black text-white p-3">
                <h5>Members</h5>
                <div class="d-flex gap-2 mb-2">
                  <img src="/images/avtar/1.jpg" class="rounded-circle" style="width:40px;height:40px" />
                  <img src="/images/avtar/1.jpg" class="rounded-circle" style="width:40px;height:40px" />
                  <img src="/images/avtar/1.jpg" class="rounded-circle" style="width:40px;height:40px" />
                </div>
                <a href="#" class="small text-info">View All</a>
              </div>

              <div class="card bg-black text-white p-3">
                <h5>Events</h5>
                <button class="btn btn-outline-light btn-sm">Create Event</button>
              </div>
            </div>

            <!-- RIGHT COLUMN -->
            <div class="col-md-6 d-flex flex-column gap-3">
              <div class="card bg-black text-white p-3">
                <h5>Photos</h5>
                <div class="d-flex gap-2 flex-wrap">
                  <span class="badge bg-secondary">Public</span>
                  <span class="badge bg-secondary">Members Only</span>
                  <span class="badge bg-secondary">Private</span>
                </div>
              </div>
              <div class="card bg-black text-white p-3">
                <h5>Videos</h5>
                <div class="d-flex gap-2 flex-wrap">
                  <span class="badge bg-secondary">Public</span>
                  <span class="badge bg-secondary">Members Only</span>
                  <span class="badge bg-secondary">Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MEMBERS -->
        <div class="tab-pane fade" id="members" role="tabpanel">
          <div class="card bg-black text-white p-3">
            <h5>Members</h5>
            <div class="d-flex gap-3 flex-wrap">
              <div class="text-center">
                <img src="/images/avtar/1.jpg" class="rounded-circle mb-1" style="width:60px;height:60px" />
                <div class="small">Alice</div>
              </div>
              <div class="text-center">
                <img src="/images/avtar/1.jpg" class="rounded-circle mb-1" style="width:60px;height:60px" />
                <div class="small">Ben</div>
              </div>
            </div>
          </div>
        </div>

        <!-- EVENTS -->
        <div class="tab-pane fade" id="events" role="tabpanel">
          <div class="card bg-black text-white p-3">
            <h5>Upcoming Events</h5>
            <ul class="small mb-0">
              <li>Summer Mixer — Jul 19-21, 2025</li>
              <li>Monthly Meetup — Aug 05, 2025</li>
            </ul>
          </div>
        </div>

        <!-- PHOTOS -->
        <div class="tab-pane fade" id="photos" role="tabpanel">
          <div class="card bg-black text-white p-3">
            <h5>Photos</h5>
            <div class="d-flex gap-2 flex-wrap">
              <span class="badge bg-secondary">Public</span>
              <span class="badge bg-secondary">Members Only</span>
              <span class="badge bg-secondary">Private</span>
            </div>
          </div>
        </div>

        <!-- VIDEOS -->
        <div class="tab-pane fade" id="videos" role="tabpanel">
          <div class="card bg-black text-white p-3">
            <h5>Videos</h5>
            <div class="d-flex gap-2 flex-wrap">
              <span class="badge bg-secondary">Public</span>
              <span class="badge bg-secondary">Members Only</span>
              <span class="badge bg-secondary">Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="bg-black text-white mt-auto py-3">
      <div class="container d-flex flex-wrap justify-content-between small">
        <a href="#" class="text-white-50 text-decoration-none">Report / Block Club</a>
        <a href="#" class="text-white-50 text-decoration-none">Terms & Conditions</a>
        <a href="#" class="text-white-50 text-decoration-none">Privacy Policy</a>
      </div>
    </footer>
  </section>
</template>
