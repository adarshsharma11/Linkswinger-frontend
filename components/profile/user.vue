<template>
  <section class="profile-page bg-dark text-white min-vh-100 py-4">
    <div class="container">
      <!-- Header -->
      <div class="profile-header container-fluid px-3 px-md-4">
        <!-- First Row -->
        <div class="row gy-3 align-items-center">
          <!-- Mobile Settings Menu -->
          <div class="col-12 d-md-none mb-2">
            <div class="dropdown d-flex justify-content-end">
              <button id="settingsMenuMobile" class="btn p-0 border-0 bg-transparent" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="/images/badges/settings.png" alt="Settings" class="rounded-circle"
                  style="width: 40px; height: 40px; object-fit: cover" />
              </button>
              <ul class="dropdown-menu dropdown-menu-end bg-dark text-white" aria-labelledby="settingsMenuMobile">
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center" @click="logout"
                    :disabled="is_logout_loading">
                    <img src="/images/badges/logout.png" alt="Logout" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Logout</span>
                    <span class="btn-loader ms-2" v-if="is_logout_loading"></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Left: Avatar + Badge -->
          <div class="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
            <div class="d-flex flex-column align-items-center">
              <img src="/images/avtar/1.jpg" alt="Profile" class="rounded-circle mb-2"
                style="width: 90px; height: 90px; object-fit: cover" />
              <span class="badge bg-theme-color fs-6 mt-2">Elite</span>
            </div>
          </div>

          <!-- Center: User Info -->
          <div class="col-12 col-md-6 text-center">
            <h3 class="mb-2 text-white fs-5 fs-md-4">{{ login_store.getUserDetails?.nick_name }},
              {{ login_store.getUserDetails?.profile_type }} {{ getAge(login_store.getUserDetails?.dob ?? '') }} from
              {{ login_store.getUserDetails?.town ?? '' }}</h3>
            <span class="badge bg-success fs-6">Active</span>
          </div>

          <!-- Right: Settings Dropdown (Desktop only) -->
          <div class="col-md-3 d-none d-md-flex justify-content-end">
            <div class="dropdown">
              <button id="settingsMenu" class="btn p-0 border-0 bg-transparent" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="/images/badges/settings.png" alt="Settings" class="rounded-circle"
                  style="width: 50px; height: 50px; object-fit: cover" />
              </button>
              <ul class="dropdown-menu dropdown-menu-end bg-dark text-white" aria-labelledby="settingsMenu">
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center" @click="navigateTo('/membership')">
                    <img src="/images/badges/photo-verified.png" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Membership</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center" @click="navigateTo(`/edit-profile`)">
                    <img src="/images/badges/photo-verified.png" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Edit Profile</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center" data-bs-toggle="modal"
                    data-bs-target="#photoVerificationModal">
                    <img src="/images/badges/photo-verified.png" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Verify Photo</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center" @click="logout"
                    :disabled="is_logout_loading">
                    <img src="/images/badges/logout.png" alt="Logout" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Logout</span>
                    <span class="tbtn-loader ms-2" v-if="is_logout_loading"></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Second Row: Membership + Actions -->
        <div class="row gy-3 align-items-center mb-2 mt-3">
          <!-- Left: Membership badges -->
          <div class="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
            <div class="d-flex gap-2 flex-wrap justify-content-center">
              <img src="/images/badges/elite.png" alt="Elite" class="badge-icon" />
              <img src="/images/badges/basic-plus.png" alt="Gold" class="badge-icon" />
              <img src="/images/badges/photo-verified.png" alt="Silver" class="badge-icon" />
            </div>
          </div>

          <!-- Center: Action icons -->
          <div class="col-12 col-md-6">
            <div class="d-flex gap-3 gap-md-4 flex-wrap justify-content-center">
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

          <!-- Right: Empty spacer (desktop only) -->
          <div class="col-md-3 d-none d-md-block"></div>
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
                <li><strong>Gender:</strong> {{ login_store.getUserDetails?.gender }}</li>
                <li><strong>Orientation:</strong> {{ login_store.getUserDetails?.orientation }}</li>
                <li><strong>Looking for:</strong> {{ login_store.getUserDetails?.looking_for?.join(',') }}</li>
                <li><strong>Height:</strong> {{ getHeight() }}</li>
                <li><strong>Ethnicity:</strong> {{ login_store.getUserDetails?.ethnicity }}</li>
                <li><strong>Body Type:</strong> {{ login_store.getUserDetails?.body_type }}</li>
                <li><strong>Town:</strong> {{ login_store.getUserDetails?.town }}</li>
              </ul>
            </div>
          </div>
          <div class="card bg-black text-white" v-if="login_store.getUserDetails?.profile_type === 'Couple'">
            <div class="card-body">
              <h5 class="text-white mb-3">Partner Information</h5>
              <ul class="list-unstyled mb-0 info-list">
                <li><strong>Nickname:</strong> {{ login_store.getUserDetails?.partner_nick_name }}</li>
                <li><strong>Gender:</strong> {{ login_store.getUserDetails?.partner_gender }}</li>
                <li><strong>Orientation:</strong> {{ login_store.getUserDetails?.partner_orientation }}</li>
                <li><strong>Height:</strong>{{ getPartnerHeight() }}</li>
                <li><strong>Ethnicity:</strong> {{ login_store.getUserDetails?.ethnicity }}</li>
                <li><strong>Body Type:</strong> {{ login_store.getUserDetails?.body_type }}</li>
              </ul>
            </div>
          </div>
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Account Details</h5>
              <ul class="list-unstyled mb-0 info-list">
                <li><strong>Email:</strong>{{ login_store.getUserDetails?.email }}</li>
                <li><strong>Password:</strong> ••••••••</li>
                <li><strong>Date of Birth:</strong>{{ login_store.getUserDetails?.dob }}</li>
                <li><strong>Membership:</strong>{{ (login_store.getUserDetails?.tier_name ?? '').length === 0 ? 'Free' :
                  (login_store.getUserDetails?.tier_name ?? '') }}</li>
              </ul>
            </div>
          </div>
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Meet Preferences</h5>
              <p>{{login_store.getUserDetails?.meet_perferences?.map(it => it.preference_name).join(',')}}</p>
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
            <span v-for="interest in login_store.getUserDetails?.interests"
              class="badge bg-secondary">{{ interest.interest_name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { UsersModel } from '~/composables/models';

const user_store = userStore()
const login_store = useLoginStore();
const is_logout_loading = ref(false);

function getAge(dobStr: string): number {
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  // If birthday hasn't happened yet this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}
function getHeight(): string {
  let height = login_store.getUserDetails?.height ?? ''
  let height_unit = login_store.getUserDetails?.height_unit ?? 'cm'
  if (height_unit === 'cm') {
    return height + ' cm'
  }
  else {
    let parseHeight = parseFloat(height)
    let feet_inch = convertToInches(parseHeight)
    return feet_inch.feet + 'ft ' + feet_inch.inches + 'in'
  }
}
function getPartnerHeight(): string {
  let height = login_store.getUserDetails?.partner_height ?? ''
  let height_unit = login_store.getUserDetails?.height_unit ?? 'cm'
  if (height_unit === 'cm') {
    return height + ' cm'
  }
  else {
    let parseHeight = parseFloat(height)
    let feet_inch = convertToInches(parseHeight)
    return feet_inch.feet + 'ft ' + feet_inch.inches + 'in'
  }
}

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
    sendmsgtoworker(socketmodel, true)
  }
  else {
    showToastError("Logout failed. Please try again.");
  }
}

</script>
