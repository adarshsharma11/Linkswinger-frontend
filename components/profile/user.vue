<template>
  <section class="profile-page bg-dark text-white min-vh-100 py-4">
    <div class="container">
      <!-- Header -->
      <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap text-center text-md-start">
        <!-- Left: Avatar + Info -->
        <div class="d-flex align-items-center flex-wrap gap-3">
          <img src="/images/avtar/1.jpg" alt="Profile" class="rounded-circle"
            style="width: 90px; height: 90px; object-fit: cover" />
          <div>
            <h3 class="mb-2 text-white">Alex, 29</h3>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge bg-success">ID Verified</span>
              <span class="badge bg-success">Photo Verified</span>
            </div>
            <!-- Elite Badge moved below -->
            <span class="badge bg-theme-color fs-6 mt-3 d-inline-block">
              Elite
            </span>
          </div>
        </div>

        <!-- Right: Settings Dropdown -->
        <div class="dropdown mt-3 mt-md-0">
          <button class="btn btn-outline-light dropdown-toggle" type="button" id="settingsMenu"
            data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-gear"></i> Settings
          </button>
          <ul class="dropdown-menu dropdown-menu-end bg-dark text-white" aria-labelledby="settingsMenu">
            <li>
              <a class="dropdown-item text-white" href="/profile/edit">
                <i class="bi bi-pencil-square me-2"></i> Edit Profile
              </a>
            </li>
            <li>
              <button class="dropdown-item text-white" @click="logout" :disabled="is_logout_loading">
                <i class="bi bi-box-arrow-right me-2"></i> Logout
                <span class="btn-loader" v-if="is_logout_loading"></span>
              </button>

            </li>
          </ul>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="d-flex gap-3 mb-4 flex-wrap justify-content-center justify-content-md-start">
        <button class="btn btn-outline-light">
          <i class="bi bi-chat-dots"></i>
        </button>
        <button class="btn btn-outline-light">
          <i class="bi bi-person"></i>
        </button>
        <button class="btn btn-outline-light">
          <i class="bi bi-telephone"></i>
        </button>
        <button class="btn btn-outline-light">
          <i class="bi bi-camera-video"></i>
        </button>
      </div>

      <!-- Rest of profile -->
      <div class="row g-3">
        <!-- Photos -->
        <div class="col-md-6 col-lg-4">
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
        <div class="col-md-6 col-lg-4">
          <div class="card bg-black text-white h-100">
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
        </div>

        <!-- Partner Info -->
        <div class="col-md-6 col-lg-4">
          <div class="card bg-black text-white h-100">
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
        </div>

        <!-- Account Info -->
        <div class="col-md-6 col-lg-6">
          <div class="card bg-black text-white h-100">
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
        </div>

        <!-- Meet Preferences -->
        <div class="col-md-6 col-lg-6">
          <div class="card bg-black text-white h-100">
            <div class="card-body">
              <h5 class="text-white mb-3">Meet Preferences</h5>
              <p>Coffee, Drinks, Travel, Parties</p>
            </div>
          </div>
        </div>

        <!-- About Me -->
        <div class="col-12">
          <div class="card bg-black text-white">
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
    let socketmodel = new OnlineSocketModel()
    socketmodel.event_name = "logoutself"
    sendmsgtoworker(socketmodel)
  }
  else {
    showToastError("Logout failed. Please try again.");
  }


}

</script>
