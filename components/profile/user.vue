<template>
  <section class="profile-page bg-dark text-white min-vh-100 py-4">
    <div class="container">
      <!-- Header -->
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div class="d-flex align-items-center">
          <img
            src="/images/avtar/1.jpg"
            alt="Profile"
            class="rounded-circle me-3"
            style="width: 90px; height: 90px; object-fit: cover"
          />
          <div>
            <h3 class="mb-1">{{ profile.nickname }}, {{ profile.age }}</h3>
            <div class="d-flex gap-2">
              <span class="badge bg-success">ID Verified</span>
              <span class="badge bg-success">Photo Verified</span>
            </div>
          </div>
        </div>
        <span class="badge bg-danger fs-6">Elite</span>
      </div>

      <!-- Action buttons -->
      <div class="d-flex gap-3 mb-4">
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
              <h5>Photos</h5>
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
              <h5>Information</h5>
              <ul class="list-unstyled mb-0">
                <li><strong>Gender:</strong> {{ profile.gender }}</li>
                <li><strong>Orientation:</strong> {{ profile.orientation }}</li>
                <li><strong>Looking for:</strong> {{ profile.lookingFor }}</li>
                <li><strong>Membership:</strong> {{ profile.membership }}</li>
                <li><strong>Last Active:</strong> {{ profile.lastActive }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Events -->
        <div class="col-md-6">
          <div class="card bg-black text-white h-100">
            <div class="card-body">
              <h5>Meet Events</h5>
              <p>{{ profile.event }} <br /><small>{{ profile.tickets }} tickets left</small></p>
            </div>
          </div>
        </div>

        <!-- About Me -->
        <div class="col-md-6">
          <div class="card bg-black text-white h-100">
            <div class="card-body">
              <h5>About Me</h5>
              <p>{{ profile.about }}</p>
              <div class="d-flex gap-2 flex-wrap">
                <span v-for="tag in profile.tags" :key="tag" class="badge bg-secondary">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Save / Validation -->
      <div class="mt-4 text-center">
        <button class="btn btn-danger btn-lg" @click="saveProfile">Save Profile</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const profile = reactive({
  nickname: "Olivia",
  age: 29,
  gender: "Female",
  orientation: "Bisexual",
  lookingFor: "Relationship",
  membership: "Elite",
  lastActive: "Today",
  event: "Spring Fever Party",
  tickets: 10,
  about:
    "I’m an open-minded and adventurous woman who loves exploring new experiences together. Let’s enjoy some wine and travel the world!",
  tags: ["Bisexual", "Wine", "Travel"],
});

</script>

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
}
</style>
