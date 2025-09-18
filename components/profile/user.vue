<template>
  <section class="profile-page bg-dark text-white min-vh-100 py-4">
    <div class="container">
      <!-- Header -->
     <!-- Header -->
<div class="profile-header container-fluid px-3 px-md-4">
  <!-- First Row -->
  <div class="row gy-3 align-items-center">
    <!-- Left: Avatar + Badge -->
    <div class="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
      <div class="d-flex flex-column align-items-center align-items-md-start">
        <img
          src="/images/avtar/1.jpg"
          alt="Profile"
          class="rounded-circle mb-2"
          style="width: 90px; height: 90px; object-fit: cover"
        />
        <span class="badge bg-theme-color fs-6 mt-2">Elite</span>
      </div>
    </div>

    <!-- Center: User Info -->
    <div class="col-12 col-md-6 text-center">
      <h3 class="mb-2 text-white fs-4 fs-md-3">Alex, Man 32 from London</h3>
      <span class="badge bg-success fs-6">Active</span>
    </div>

    <!-- Right: Settings Dropdown -->
    <div class="col-12 col-md-3 d-flex justify-content-center justify-content-md-end">
      <div class="dropdown">
        <button
          id="settingsMenu"
          class="btn p-0 border-0 bg-transparent"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="/images/badges/settings.png"
            alt="Settings"
            class="rounded-circle"
            style="width: 50px; height: 50px; object-fit: cover"
          />
        </button>

        <ul
          class="dropdown-menu dropdown-menu-end bg-dark text-white mt-2"
          aria-labelledby="settingsMenu"
        >
          <li>
            <button
              class="dropdown-item text-white d-flex align-items-center"
              @click="logout"
              :disabled="is_logout_loading"
            >
              <img
                src="/images/badges/logout.png"
                alt="Logout"
                class="rounded-circle me-2"
                style="width: 30px; height: 30px; object-fit: cover"
              />
              <span class="text-white">Logout</span>
              <span class="btn-loader ms-2" v-if="is_logout_loading"></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Second Row: Membership + Actions -->
  <div class="row gy-3 align-items-center mb-2">
    <!-- Left: Membership badges -->
    <div class="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
      <div class="d-flex gap-2 flex-wrap">
        <img src="/images/badges/elite.png" alt="Elite" class="badge-icon" />
        <img src="/images/badges/basic-plus.png" alt="Gold" class="badge-icon" />
        <img src="/images/badges/photo-verified.png" alt="Silver" class="badge-icon" />
      </div>
    </div>

    <!-- Center: Action icons -->
    <div class="col-12 col-md-6 d-flex justify-content-center">
      <div class="d-flex gap-4 flex-wrap text-center">
        <div class="d-flex flex-column align-items-center">
          <img src="/images/badges/chat.png" alt="Chat" class="badge-icon" />
          <small>Chat</small>
        </div>
        <div class="d-flex flex-column align-items-center">
          <img src="/images/badges/call.png" alt="Call" class="badge-icon" />
          <small>Call</small>
        </div>
        <div class="d-flex flex-column align-items-center">
          <img src="/images/badges/video-call.png" alt="Video Call" class="badge-icon" />
          <small>Video</small>
        </div>
        <div class="d-flex flex-column align-items-center">
          <img src="/images/badges/like-button.png" alt="Like" class="badge-icon" />
          <small>Like</small>
        </div>
        <div class="d-flex flex-column align-items-center">
          <img src="/images/badges/public-photos.png" alt="VIP" class="badge-icon" />
          <small>VIP</small>
        </div>
      </div>
    </div>

    <!-- Right: Empty spacer (keeps alignment with header row) -->
    <div class="col-12 col-md-3 d-flex justify-content-center justify-content-md-end"></div>
  </div>
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
<script setup lang="ts">
import type { UsersModel } from '~/composables/models';

const user_store = userStore()
const is_logout_loading = ref(false);

async function logout() {

  if (is_logout_loading.value) {
    return;
  }

  const api_url = getUrl(RequestURL.logout);
  is_logout_loading.value = true;
  const response = await $fetch<SuccessError<UsersModel.LoginResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        user_id: user_store.getLoginId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  is_logout_loading.value = false;
  if (response.success) {
    // let socketmodel = new OnlineSocketModel()
    // socketmodel.event_name = "logoutself"
    // sendmsgtoworker(socketmodel)
      const user_store = userStore();
    user_store.clear()
    await clearloginstore()
    reloadNuxtApp({
      path: "/",
      ttl: 1000
    })
  }
  else {
    showToastError("Logout failed. Please try again.");
  }


}

</script>
