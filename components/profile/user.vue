<template>
  <section class="profile-page bg-dark text-white min-vh-100 py-4">
    <div class="container">
      <!-- Header -->
      <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap text-center text-md-start">
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
          </div>
        </div>
        <span class="badge bg-danger fs-6 mt-3 mt-md-0">Elite</span>
      </div>

      <!-- Action buttons -->
      <div class="d-flex gap-3 mb-4 flex-wrap justify-content-center justify-content-md-start">
        <button class="btn btn-outline-light"><i class="bi bi-chat-dots"></i></button>
        <button class="btn btn-outline-light"><i class="bi bi-person"></i></button>
        <button class="btn btn-outline-light"><i class="bi bi-telephone"></i></button>
        <button class="btn btn-outline-light"><i class="bi bi-camera-video"></i></button>
      </div>

      <div class="row g-3">
        <!-- Photos -->
        <div class="col-md-6">
          <div class="card bg-black text-white h-100">
            <div class="card-body">
              <h5 class="text-white mb-3">Photos</h5>
              <div class="d-flex flex-wrap gap-2">
                <div class="photo-box">Public Photos</div>
                <div class="photo-box">Friends-Only</div>
                <div class="photo-box">Private</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="col-md-6">
          <div class="card bg-black text-white h-100">
            <div class="card-body">
              <h5 class="text-white mb-3">Information</h5>
              <ul class="list-unstyled mb-0">
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
        </div>

        <!-- Meet Preferences -->
        <div class="col-md-6">
          <div class="card bg-black text-white h-100">
            <div class="card-body">
              <h5 class="text-white mb-3">Meet Preferences</h5>
              <p>Coffee, Drinks</p>
            </div>
          </div>
        </div>

        <!-- About Me -->
        <div class="col-md-6">
          <div class="card bg-black text-white h-100">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Save -->
      <div class="mt-4 text-center">
        <button class="btn btn-danger btn-lg">Save Profile</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  border-radius: 12px;
  border: 1px solid #333;
}

.photo-box {
  flex: 1 1 45%;
  background: #222;
  border-radius: 10px;
  padding: 1.2rem;
  text-align: center;
  font-size: 0.9rem;
  color: white;
}
</style>
