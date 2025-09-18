<template>
  <section class="profile-page bg-dark text-white min-vh-100 py-4">
    <div class="container">
      <!-- Header -->
      <div
        class="d-flex align-items-center justify-content-between mb-4 flex-wrap text-center text-md-start"
      >
        <!-- Left: Avatar + Info -->
        <div class="d-flex align-items-center flex-wrap gap-3">
          <img
            src="/images/avtar/1.jpg"
            alt="Profile"
            class="rounded-circle"
            style="width: 90px; height: 90px; object-fit: cover"
          />
          <div>
            <h3 class="mb-2 text-white">Alex, 29</h3>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge bg-success">ID Verified</span>
              <span class="badge bg-success">Photo Verified</span>
            </div>
            <span class="badge bg-theme-color fs-6 mt-3 d-inline-block">
              Elite
            </span>
          </div>
        </div>

        <!-- Right: Settings Dropdown -->
        <div class="dropdown mt-3 mt-md-0">
          <span
            id="settingsMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/images/badges/logout.png"
              alt="Profile"
              class="rounded-circle"
              style="width: 60px; height: 60px; object-fit: cover"
            />
          </span>
          <ul
            class="dropdown-menu dropdown-menu-end bg-dark text-white"
            aria-labelledby="settingsMenu"
          >
            <li>
               <button class="dropdown-item text-white" @click="logout" :disabled="is_logout_loading">
                <i class="bi bi-box-arrow-right me-2"></i> Logout
                <span class="btn-loader" v-if="is_logout_loading"></span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Membership badges -->
      <div
        class="d-flex gap-2 mb-4 flex-wrap justify-content-center justify-content-md-start"
      >
        <img src="/images/badges/elite.png" alt="Elite" class="badge-icon" />
        <img
          src="/images/badges/basic-plus.png"
          alt="Gold"
          class="badge-icon"
        />
        <img
          src="/images/badges/photo-verified.png"
          alt="Silver"
          class="badge-icon"
        />
      </div>

      <!-- Grid Layout -->
      <div class="profile-grid">
        <!-- Photos -->
        <div class="card bg-black text-white">
          <div class="card-body">
            <h5 class="text-white mb-3">Photos & Videos</h5>
            <ul class="list-unstyled photo-list mb-0">
              <li><img src="/images/badges/public-photos.png" class="icon" /> Public Photos</li>
              <li><img src="/images/badges/public-photos.png" class="icon" /> Public Videos</li>
              <li><img src="/images/badges/friends-only-photos.png" class="icon" /> Friends-Only Photos</li>
              <li><img src="/images/badges/friends-only-photos.png" class="icon" /> Friends-Only Videos</li>
              <li><img src="/images/badges/private-photos.png" class="icon" /> Private Photos</li>
              <li><img src="/images/badges/private-photos.png" class="icon" /> Private Videos</li>
            </ul>
          </div>
        </div>

        <!-- Info Cards -->
        <div class="info-grid">
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Personal Information</h5>
              <ul class="list-unstyled mb-0 info-list">
                <li><strong>Gender:</strong> Male</li>
                <li><strong>Orientation:</strong> Straight</li>
                <li><strong>Looking for:</strong> Friendship, Casual, Networking</li>
                <li><strong>Height:</strong> 5ft 10in</li>
                <li><strong>Ethnicity:</strong> Asian</li>
                <li><strong>Body Type:</strong> Athletic</li>
                <li><strong>Town:</strong> New York</li>
              </ul>
            </div>
          </div>
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Partner Information</h5>
              <ul class="list-unstyled mb-0 info-list">
                <li><strong>Nickname:</strong> Olivia</li>
                <li><strong>Gender:</strong> Female</li>
                <li><strong>Orientation:</strong> Bisexual</li>
                <li><strong>Height:</strong> 5ft 6in</li>
                <li><strong>Ethnicity:</strong> Caucasian</li>
                <li><strong>Body Type:</strong> Slim</li>
                <li><strong>Town:</strong> Los Angeles</li>
              </ul>
            </div>
          </div>
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Account Details</h5>
              <ul class="list-unstyled mb-0 info-list">
                <li><strong>Email:</strong> alex@example.com</li>
                <li><strong>Password:</strong> ••••••••</li>
                <li><strong>Date of Birth:</strong> 12 Jan 1996</li>
                <li><strong>Membership:</strong> Elite</li>
              </ul>
            </div>
          </div>
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Meet Preferences</h5>
              <p>Coffee, Drinks, Travel, Parties</p>
            </div>
          </div>
        </div>
      </div>

      <!-- About Me -->
      <div class="card bg-black text-white mt-3">
        <div class="card-body">
          <h5 class="text-white mb-3">About Me</h5>
          <p>
            I’m open-minded and love meaningful connections. Exploring new
            experiences and meeting amazing people is what excites me!
          </p>
          <div class="d-flex gap-2 flex-wrap">
            <span class="badge bg-secondary">Travel</span>
            <span class="badge bg-secondary">Fitness</span>
            <span class="badge bg-secondary">Photography</span>
            <span class="badge bg-secondary">Wine</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 100%;
}
.card {
  height: 100%;
}
.photo-list li {
  font-size: 0.95rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.photo-list li:last-child {
  border-bottom: none;
}
.badge-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
@media (max-width: 991px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
