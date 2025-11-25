<template>
  <section class="profile-page bg-dark text-white min-vh-100 py-4">
  
    <div class="container">
      <!-- Header -->
      <div class="profile-header container-fluid px-3 px-md-4">

        <div class="row align-items-center d-md-none">
          <!-- Mobile Settings Menu -->
          <div class="col-12 mb-2 d-md-none">
            <div class="dropdown d-flex justify-content-end">
              <button v-if="isMine()" id="settingsMenuMobile"
                class="btn p-0 border-0 bg-transparent d-flex flex-column align-items-center text-white mr-2"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/images/badges/animated/50X50px/settings.gif" alt="Settings" class="rounded-circle"
                  style="width: 40px; height: 40px; object-fit: cover" />
                <small>Settings</small>
              </button>
              <ul class="dropdown-menu dropdown-menu-end bg-dark text-white setting-dropdown-menu"
                aria-labelledby="settingsMenuMobile">
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center" @click="navigateTo('/membership')">
                    <img src="/images/badges/animated/50X50px/elite.gif" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Membership</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center"
                    @click="navigateTo(`/edit-profile`)">
                    <img src="/images/badges/animated/50X50px/edit-profile.gif" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Edit Profile</span>
                  </button>
                </li>
                <li v-if="(getUser()?.is_photo_verified ?? false) === false">
                  <button class="dropdown-item text-white d-flex align-items-center" data-bs-toggle="modal"
                    data-bs-target="#photoVerificationModal">
                    <img src="/images/badges/animated/50X50px/verified.gif" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Verify Photo</span>
                  </button>
                </li>
                <li v-if="(getUser()?.is_photo_verified ?? false) === true">
                  <button class="dropdown-item text-white d-flex align-items-center" data-bs-toggle="modal"
                    data-bs-target="#mediaUploadModal">
                    <img src="/images/badges/animated/50X50px/upload-media.gif" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Upload Media</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center"
                    @click="navigateTo(`/profile-settings`)">
                    <img src="/images/badges/animated/50X50px/profile-settings.gif" alt="Verify"
                      class="rounded-circle me-2" style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Profile Settings</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center"
                    @click="navigateTo(`/help`)">
                    <img src="/images/badges/animated/50X50px/profile-settings.gif" alt="Verify"
                      class="rounded-circle me-2" style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">LS Help</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center" @click="logout"
                    :disabled="is_logout_loading">
                    <img src="/images/badges/animated/50X50px/logout.gif" alt="Logout" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Logout</span>
                    <span class="btn-loader ms-2" v-if="is_logout_loading"></span>
                  </button>
                </li>
              </ul>
              <div class="ml-2">
                <nuxt-link to="/dashboard" class="d-flex flex-column align-items-center text-white">
                  <img src="/images/badges/animated/50X50px/home.gif" alt="Home" class="badge-icon" />
                  <small>Home</small>
                </nuxt-link>
              </div>
            </div>
          </div>

        </div>
        <!-- First Row -->
        <div class="row align-items-center">

          <!-- Left: Avatar + Badge -->
          <div class="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
            <div class="d-flex flex-column align-items-center position-relative">
              <div class="position-relative profile-avatar-container">
                <img :src="getProfilePlaceholder()" alt="Profile" class="rounded-circle mb-2"
                  style="width: 90px; height: 90px; object-fit: cover" />
                <!-- Profile Picture Selection button - top left -->
                <button v-if="!is_photo_uploading && isMine()" type="button" class="btn btn-transparent rounded-circle position-absolute profile-picture-btn"
                  @click="navigateTo('/profile-picture')">
                  <i class="fa fa-photo text-white"></i>
                </button>
                <!-- Upload/Edit button - top right -->
                <button v-if="!is_photo_uploading && isMine()" type="button" class="btn btn-transparent rounded-circle position-absolute profile-edit-btn"
                  @click="triggerFileInput">
                  <i class="fa fa-camera text-white"></i>
                </button>
                <!-- Remove button - bottom right -->
                <button @click="removeProfilePhoto()" v-if="!is_photo_uploading && isMine() && (getUser()?.profile_image ?? '').length !== 0"
                  type="button" class="btn btn-transparent rounded-circle position-absolute profile-remove-btn">
                 <i class="fa fa-trash text-white"></i>
                </button>
              </div>
              <input type="file" v-if="!is_photo_uploading && isMine()" accept="image/png,image/jpeg" class="d-none"
                ref="fileInput" @change="handleFileUpload" />
              <span class="btn-loader" v-if="is_photo_uploading"></span>
              <span class="badge bg-theme-color fs-6 mt-2">{{ (getUser()?.tier_name ?? '').length === 0
                ? 'Free' :
                (getUser()?.tier_name ?? '') }}</span>
            </div>
          </div>

          <!-- Center: User Info -->
          <div class="col-12 col-md-6 text-center mt-2">
            <h3 class="mb-2 text-white fs-5 fs-md-4">{{ getUser()?.nick_name }},
              {{ getGender() }} {{ getAge(getUser()?.dob ?? '') }} from
              {{ getUser()?.town ?? '' }}</h3>
            <span class="badge bg-success fs-6">Active</span>
            <p class="mb-0 mt-2 text-white">{{ getUser()?.profile_status }} <i v-if="isMine() && !is_status_loading"
                class="fa fa-pencil text-white fa-lg" @click="editStatus()"></i><span class="btn-loader"
                v-if="is_status_loading"></span></p>

          </div>

          <!-- Right: Settings Dropdown (Desktop only) -->
          <div class="col-md-3 d-none d-md-flex justify-content-center">
            <div class="dropdown">
              <button v-if="isMine()" id="settingsMenu"
                class="btn p-0 border-0 bg-transparent d-flex flex-column align-items-center text-white"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/images/badges/animated/50X50px/settings.gif" alt="Settings" class="rounded-circle"
                  style="width: 50px; height: 50px; object-fit: cover" />
                <small>Settings</small>
              </button>
              <ul class="dropdown-menu dropdown-menu-end bg-dark text-white setting-dropdown-menu"
                aria-labelledby="settingsMenu">
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center" @click="navigateTo('/membership')">
                    <img src="/images/badges/animated/50X50px/elite.gif" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Membership</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center"
                    @click="navigateTo(`/edit-profile`)" v-if="isMine()">
                    <img src="/images/badges/animated/50X50px/edit-profile.gif" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Edit Profile</span>
                  </button>
                </li>
                <li v-if="(getUser()?.is_photo_verified ?? false) === false">
                  <button class="dropdown-item text-white d-flex align-items-center" data-bs-toggle="modal"
                    data-bs-target="#photoVerificationModal">
                    <img src="/images/badges/animated/50X50px/verified.gif" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Verify Photo</span>
                  </button>
                </li>
                <li v-if="(getUser()?.is_photo_verified ?? false) === true && isMine()">
                  <button class="dropdown-item text-white d-flex align-items-center" data-bs-toggle="modal"
                    data-bs-target="#mediaUploadModal">
                    <img src="/images/badges/animated/50X50px/upload-media.gif" alt="Verify" class="rounded-circle me-2"
                      style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Upload Media</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center"
                    @click="navigateTo(`/profile-settings`)" v-if="isMine()">
                    <img src="/images/badges/animated/50X50px/profile-settings.gif" alt="Verify"
                      class="rounded-circle me-2" style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">Profile Settings</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center"
                    @click="navigateTo(`/help`)" v-if="isMine()">
                    <img src="/images/badges/animated/50X50px/profile-settings.gif" alt="Verify"
                      class="rounded-circle me-2" style="width: 30px; height: 30px; object-fit: cover" />
                    <span class="text-white">LS Help</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item text-white d-flex align-items-center" @click="logout"
                    :disabled="is_logout_loading" v-if="isMine()">
                    <img src="/images/badges/animated/50X50px/logout.gif" alt="Logout" class="rounded-circle me-2"
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
        <div class="row align-items-center mb-2 mt-2">
          <!-- Left: Membership badges -->
          <div class="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
            <div class="d-flex gap-2 flex-wrap justify-content-center">
              <img :src="getmembershipIcon()" alt="Elite" class="badge-icon" />
              <img src="/images/badges/photo-verified.gif" v-if="(getUser()?.is_photo_verified ?? false) === true"
                alt="Silver" class="badge-icon" />
            </div>
          </div>

          <!-- Center: Action icons -->
          <div class="col-12 col-md-6">
            <div class="d-flex gap-3 gap-md-4 flex-wrap justify-content-center">
              <div class="d-flex flex-column align-items-center" @click="openChat()">
                <img src="/images/badges/animated/50X50px/chat.gif" alt="Chat" class="badge-icon" />
                <small>Chat</small>
              </div>
              <div class="d-flex flex-column align-items-center" @click="showCodeAlert(false)">
                <img src="/images/badges/animated/50X50px/call.gif" alt="Call" class="badge-icon" />
                <small>Call</small>
              </div>
              <div class="d-flex flex-column align-items-center" @click="showCodeAlert(true)">
                <img src="/images/badges/animated/50X50px/video-call.gif" alt="Video Call" class="badge-icon" />
                <small>Video</small>
              </div>
              <div class="d-flex flex-column align-items-center">
                <img src="/images/badges/animated/50X50px/ls-like.gif" alt="Like" class="badge-icon" />
                <small>Like</small>
              </div>
              <div class="d-flex flex-column align-items-center">
                <img src="/images/badges/animated/50X50px/video-roulette-available.gif" alt="VIP" class="badge-icon" />
                <small>VIP</small>
              </div>
            </div>
          </div>

          <!-- Right: Empty spacer (desktop only) -->
          <div class="col-md-3 d-md-block d-none">
            <nuxt-link to="/dashboard" class="d-flex flex-column align-items-center text-white">
              <img src="/images/badges/animated/50X50px/home.gif" alt="Home" class="badge-icon" />
              <small>Home</small>
            </nuxt-link>
          </div>
        </div>
      </div>


      <!-- Grid Layout -->
      <div class="profile-grid">
        <!-- Photos -->
        <div class="card bg-black text-white">
          <div class="card-body">
            <h5 class="text-white mb-3">Photos & Videos</h5>
            <ul class="list-unstyled photo-list mb-0">
              <li
                @click="navigateTo('/feeds/' + getUser()?.user_id + '?' + 'media_type=image' + '&' + 'feed_type=public')">
                 <span class="badge bg-theme-color ms-2">{{ getFeedCount('public', 'image') }}</span>
                <img src="/images/badges/public-photos.png" class="icon" /> Public Photos
               
              </li>
              <li
                @click="navigateTo('/feeds/' + getUser()?.user_id + '?' + 'media_type=video' + '&' + 'feed_type=public')">
                 <span class="badge bg-theme-color ms-2">{{ getFeedCount('public', 'video') }}</span>
                <img src="/images/badges/public-photos.png" class="icon" /> Public Videos
               
              </li>
              <li
                @click="navigateTo('/feeds/' + getUser()?.user_id + '?' + 'media_type=image' + '&' + 'feed_type=friends')">
                  <span class="badge bg-theme-color ms-2">{{ getFeedCount('friends', 'image') }}</span>
                <img src="/images/badges/friends-only-photos.png" class="icon" /> Friends-Only Photos
              
              </li>
              <li
                @click="navigateTo('/feeds/' + getUser()?.user_id + '?' + 'media_type=video' + '&' + 'feed_type=friends')">
                 <span class="badge bg-theme-color ms-2">{{ getFeedCount('friends', 'video') }}</span>
                <img src="/images/badges/friends-only-photos.png" class="icon" /> Friends-Only Videos
               
              </li>
              <li
                @click="navigateTo('/feeds/' + getUser()?.user_id + '?' + 'media_type=image' + '&' + 'feed_type=private')">
                  <span class="badge bg-theme-color ms-2">{{ getFeedCount('private', 'image') }}</span>
                <img src="/images/badges/private-photos.png" class="icon" /> Private Photos
              
              </li>
              <li
                @click="navigateTo('/feeds/' + getUser()?.user_id + '?' + 'media_type=video' + '&' + 'feed_type=private')">
                  <span class="badge bg-theme-color ms-2">{{ getFeedCount('private', 'video') }}</span>
                <img src="/images/badges/private-photos.png" class="icon" /> Private Videos
              
              </li>
            </ul>
          </div>
        </div>

        <!-- Info Cards -->
        <div class="info-grid">
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Personal Information</h5>
              <ul class="list-unstyled mb-0 info-list">
                <li><strong>Gender:</strong> {{ getUser()?.gender }}</li>
                <li><strong>Orientation:</strong> {{ getUser()?.orientation }}</li>
                <li><strong>Looking for:</strong> {{ getUser()?.looking_for?.join(',') }}</li>
                <li><strong>Height:</strong> {{ getHeight() }}</li>
                <li><strong>Ethnicity:</strong> {{ getUser()?.ethnicity }}</li>
                <li><strong>Body Type:</strong> {{ getUser()?.body_type }}</li>
                <li><strong>Town:</strong> {{ getUser()?.town }}</li>
              </ul>
            </div>
          </div>
          <div class="card bg-black text-white" v-if="getUser()?.profile_type === 'Couple'">
            <div class="card-body">
              <h5 class="text-white mb-3">Partner Information</h5>
              <ul class="list-unstyled mb-0 info-list">
                <li><strong>Nickname:</strong> {{ getUser()?.partner_nick_name }}</li>
                <li><strong>Gender:</strong> {{ getUser()?.partner_gender }}</li>
                <li><strong>Orientation:</strong> {{ getUser()?.partner_orientation }}</li>
                <li><strong>Height:</strong>{{ getPartnerHeight() }}</li>
                <li><strong>Ethnicity:</strong> {{ getUser()?.ethnicity }}</li>
                <li><strong>Body Type:</strong> {{ getUser()?.body_type }}</li>
              </ul>
            </div>
          </div>
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">About Me</h5>
              <p>
                {{ getUser()?.about_me }}
              </p>
            </div>
          </div>
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Sexual Interest</h5>
              <div class="d-flex gap-2 flex-wrap">
                <span v-for="interest in getUser()?.interests" class="badge bg-secondary">{{
                  interest.interest_name }}</span>
              </div>
            </div>
          </div>
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Meet Preferences</h5>
              <p>{{getUser()?.meet_perferences?.map(it => it.preference_name).join(',')}}</p>
            </div>
          </div>
          <div class="card bg-black text-white">
            <div class="card-body">
              <h5 class="text-white mb-3">Meet Verification</h5>
              <p v-for="verification in verifications"><strong>{{ verification.nick_name }}:</strong>{{
                verification.review }}</p>
              <button v-if="isMine() === false && is_verified === false && is_verify_loading === false"
                class="btn btn-sm btn-outline-light mt-2" @click="showVerificationAlert()">Verify</button>
              <span class="btn-loader" v-if="is_verify_loading"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Teleport to="body">
    <div style="position: fixed; z-index: 999999; left: 0; top: 0;">
      <EmojiPicker ref="emojiPickerRef" v-on:selected-emoji="selectedEmoji" />
    </div>
  </Teleport>

</template>
<script setup lang="ts">
import { MeetVerificationsModel, type UsersModel } from '~/composables/models';
import Swal from 'sweetalert2'
import { EmojiPicker } from '#components';
import { Teleport } from 'vue';
import type { CallsModel } from '~/composables/websocketModels';
interface Props {
  user_id: number
}
const props = defineProps<Props>()
const emojiPickerRef = ref(null)
const user_store = userStore()
const login_store = useLoginStore();
const is_logout_loading = ref(false);
const is_verify_loading = ref(false);
const is_status_loading = ref(false);
const verifications = ref([] as MeetVerificationsModel.FetchVerifyResponseModel[])
const userDetails = ref<UsersModel.ProfileDetailsResponseModel | null | undefined>(null);
const feedCounts = ref([] as UsersModel.FeedCountResponseModel[])
const is_verified = ref(false);
const eventBus = useMittEmitter()
const id_store = idStore()
const is_photo_uploading = ref(false);
const previewUrlFile = ref<Blob | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);

if (isMine() === false) {
  const fetchUserDetails = async () => {
    const api_url = getUrl(RequestURL.getProfileDetails);
    const { data: response, error: option_error } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(
      api_url,
      {
        method: "POST",
        body: {
          user_id: Number(props.user_id ?? 0),
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.value?.success) {
      userDetails.value = response.value.response;
    }
  };
  fetchUserDetails();
}
const fetchMeetVerifications = async () => {
  const api_url = getUrl(RequestURL.fetchMeetVerifications);
  const { data: response, error: option_error } = await useFetch<SuccessError<MeetVerificationsModel.FetchVerifyResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        from_id: user_store.getLoginId,
        to_id: Number(props.user_id ?? 0)
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.value?.success) {
    if (response.value.result) {
      is_verified.value = response.value.result[0].is_verified ?? false
    }
    return response.value.result
  }
  else {
    return []
  }
};

const fetchfeedCounts = async () => {
  const api_url = getUrl(RequestURL.getFeedCount);
  const { data: response, error: option_error } = await useFetch<SuccessError<UsersModel.FeedCountResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        user_id: Number(props.user_id ?? 0)
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.value?.success) {
    return response.value.result
  }
  else {
    return []
  }
};

verifications.value = await fetchMeetVerifications() as MeetVerificationsModel.FetchVerifyResponseModel[]
feedCounts.value = await fetchfeedCounts() as UsersModel.FeedCountResponseModel[]


onMounted(() => {

  eventBus.on('callDeclineAlert', (eventModel) => {
    showToastError('Call declined')
  })
  eventBus.on('callAcceptAlert', async (eventModel) => {
    if (eventModel.is_video) {
      await navigateTo(`/video-call/${eventModel.token}`)
    }
    else {
      await navigateTo(`/voice-call/${eventModel.token}`)
    }
  })

});

onBeforeUnmount(() => {
  eventBus.off('callDeclineAlert')
  eventBus.off('callAcceptAlert')
})


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
  let height = getUser()?.height ?? ''
  let height_unit = getUser()?.height_unit ?? 'cm'
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
  let height = getUser()?.partner_height ?? ''
  let height_unit = getUser()?.height_unit ?? 'cm'
  if (height_unit === 'cm') {
    return height + ' cm'
  }
  else {
    let parseHeight = parseFloat(height)
    let feet_inch = convertToInches(parseHeight)
    return feet_inch.feet + 'ft ' + feet_inch.inches + 'in'
  }
}

function showVerificationAlert() {
  Swal.fire({
    title: 'Please enter review',
    input: 'text', // Specifies a text input field
    inputPlaceholder: 'Type review here', // Placeholder text for the input
    showCancelButton: true, // Displays a cancel button
    inputValidator: (value: string) => { // Optional: input validation
      let trim = value.trim()
      if (trim.length === 0) {
        return 'Please enter review';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      addVerification(result.value ?? '')
    }
  });
}

function showCodeAlert(is_video: boolean) {
  if (isMine()) {
    return;
  }
  Swal.fire({
    title: 'Please enter code',
    input: 'text', // Specifies a text input field
    inputPlaceholder: 'Type code here', // Placeholder text for the input
    showCancelButton: true, // Displays a cancel button
    inputValidator: (value: string) => { // Optional: input validation
      if (!value) {
        return 'Please enter code';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      validateCall(result.value ?? '', is_video)
    }
  });
}

async function validateCall(code: string, is_video: boolean) {
  let to_id = Number(props.user_id ?? 0)
  const api_url = getUrl(RequestURL.validateCall);
  await $fetch<SuccessError<CallsModel.ValidateCallResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      "from_id": user_store.getLoginId,
      "from_socket_id": id_store.getDeviceId,
      "to_id": to_id,
      "call_code": code,
      "is_video": is_video
    },
    headers: {
      "content-type": "application/json"
    },
    onResponse: async ({ response }) => {

      var response_model = response._data as SuccessError<CallsModel.ValidateCallResponseModel>
      if (response_model.success) {
        showToastSuccess(response_model.message)
      }
      else {
        showToastError(response_model.message)
      }
    }
  });
}

function editStatus() {
  Swal.fire({
    title: 'Edit Profile Status',
    html: `
  <div style="
  display: flex;
  align-items: center; 
  gap: 6px;
">
  <input id="status-input" class="swal2-input" placeholder="Type status here"
    style="margin: 0; width: auto; flex: 1;" />
  <button  id="clear-btn" class="swal2-confirm" 
     style="
    height: 2.5em;
    padding: 0 12px;
    border: none !important;
    box-shadow: none !important;
    border-radius: 10px !important;
  ">
    😊
  </button>
</div>
  `,
    focusConfirm: false,
    showCancelButton: true,
    willClose: () => {
      // Close your emoji picker here
      emojiPickerRef.value?.closeEmojiPicker()
      // or: showEmoji.value = false
    },
    preConfirm: () => {
      const value = (document.getElementById('status-input') as HTMLInputElement).value.trim();
      if (!value) {
        Swal.showValidationMessage("Please enter status");
        return false;
      }
      updateStatus(value);
      return value;
    }
  });


  nextTick(() => {
    const clearBtn = document.getElementById('clear-btn');
    const statusInput = document.getElementById('status-input') as HTMLInputElement;
    statusInput.value = getUser()?.profile_status ?? ''
    clearBtn?.addEventListener('click', () => {
      statusInput.focus();
      handleToggle()
    });

    const emojiRegex =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
    // Watch input changes
    statusInput.addEventListener("input", () => {
      statusInput.value = statusInput.value.replace(emojiRegex, "")
      statusInput.focus();
    })
  });
}
function handleToggle() {
  if (emojiPickerRef.value) {
    emojiPickerRef.value.toggleEmojiPicker()
  }
}

function getFeedCount(feed_type: string, media_type: string): number {
  let count = feedCounts.value.find(fc => fc.feed_type === feed_type && fc.media_type === media_type)?.count ?? 0
  return count
}

function selectedEmoji(emoji: string) {
  const statusInput = document.getElementById('status-input') as HTMLInputElement;
  if (statusInput) {
    const start = statusInput.selectionStart;
    const end = statusInput.selectionEnd;
    const value = statusInput.value;

    statusInput.value = value.substring(0, start) + emoji + value.substring(end);

    // Move cursor after the emoji
    const newPos = start + emoji.length;
    statusInput.setSelectionRange(newPos, newPos);

    // Ensure input stays focused
    statusInput.focus();
  }
}

async function updateStatus(profile_status: string) {
  if (is_status_loading.value) {
    return;
  }
  const api_url = getUrl(RequestURL.updateUserStatus);
  is_status_loading.value = true;
  const response = await $fetch<SuccessError<UsersModel.LoginResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        user_id: user_store.getLoginId,
        profile_status: profile_status
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  is_status_loading.value = false;
  if (response.success) {
    getUser()!.profile_status = profile_status
    showToastSuccess(response.message)
  }
  else {
    showToastError("Logout failed. Please try again.");
  }
}
async function addVerification(review: string) {
  if (is_verify_loading.value) {
    return;
  }
  const api_url = getUrl(RequestURL.addMeetVerification);
  is_verify_loading.value = true;
  const response = await $fetch<SuccessError<UsersModel.LoginResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        from_id: user_store.getLoginId,
        to_id: Number(props.user_id ?? 0),
        review: review
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  is_verify_loading.value = false;
  if (response.success) {
    is_verified.value = true
    let fetchmodel = new MeetVerificationsModel.FetchVerifyResponseModel()
    fetchmodel.from_id = user_store.getLoginId
    fetchmodel.nick_name = login_store.getUserDetails?.nick_name
    fetchmodel.to_id = Number(props.user_id ?? 0)
    fetchmodel.review = review
    verifications.value.push(fetchmodel)
    showToastSuccess(response.message)
  }
  else {
    showToastError("Logout failed. Please try again.");
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

function getGender() {
  let profile_type = getUser()?.profile_type ?? ''
  let gender = getUser()?.gender ?? ''
  let partner_gender = getUser()?.partner_gender ?? ''
  if (profile_type === 'Couple') {
    let genderShot = 'M';
    let partnerGenderShot = 'M';
    if (gender === 'Woman') {
      genderShot = 'F'
    }
    else if (gender === 'Others') {
      genderShot = 'TS'
    }

    if (partner_gender === 'Woman') {
      partnerGenderShot = 'F'
    }
    else if (partner_gender === 'Others') {
      partnerGenderShot = 'TS'
    }

    return genderShot + partnerGenderShot
  }
  return gender
}

function getmembershipIcon(): string {
  let tier_name = getUser()?.tier_name ?? ''
  if (tier_name.includes("Elite")) return "/images/badges/elite.gif";
  if (tier_name.includes("Basic+")) return "/images/badges/basic.gif";
  if (tier_name.includes("Plus")) return "/images/badges/plus.gif";
  return "/images/badges/free.gif";
}

function getProfilePlaceholder(): string {
  let media_path = getUser()?.media_path ?? ''
  let profile_image = getUser()?.profile_image ?? ''
  if (media_path.length > 0 && profile_image.length > 0) {
    return media_path + profile_image
  }
  let profile_type = getUser()?.profile_type ?? ''
  if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png";
  if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png";
  if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png";
  if (profile_type === 'Man') return "/images/profile-placeholders/man.png";
  return "/images/profile-placeholders/man.png"
}
function getUser(): UsersModel.ProfileDetailsResponseModel | null | undefined {
  if (isMine()) {
    return login_store.getUserDetails
  }
  return userDetails.value
}

async function openChat() {
  if (isMine()) {
    await navigateTo('/chat')
  }
  else {
    await navigateTo('/chat/' + String(props.user_id ?? 0))
  }
}

function isMine(): boolean {
  let user_id = Number(props.user_id ?? 0)
  let login_id = Number(login_store.getUserDetails?.user_id ?? 0)
  return user_id === login_id
}

async function removeProfilePhoto() {
  const api_url = getUrl(RequestURL.removeProfilePhoto);
  is_photo_uploading.value = true;
  const response = await $fetch<SuccessError<UsersModel.LoginResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        user_id: login_store.getUserDetails?.user_id
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  is_photo_uploading.value = false;
  if (response.success) {
     reloadNuxtApp({
        path: "/profile",
        ttl: 1000
      })
  }
  else {
    showToastError("Failed to remove photo. Please try again.");
  }
}

function triggerFileInput() {
  fileInput.value?.click();
}

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const profile_image = await file.arrayBuffer()
    previewUrl.value = URL.createObjectURL(file)
    previewUrlFile.value = new Blob([profile_image])
    await uploadPhoto(file.type)
  }
  target.value = ''
}

async function uploadPhoto(contentType: string = 'image/jpeg') {
  let api_url = getUrl(RequestURL.getProfilePhotoURL);
  is_photo_uploading.value = true;
  let response = await $fetch<SuccessError<UsersModel.ProfilePhotoResponseModel>>(api_url, {
    method: 'POST',
    body: {
      "user_id": login_store.getUserDetails?.user_id,
      "contentType": contentType
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  let worker_model = response.response?.worker_model as WorkerModel
  worker_model.timeStamp = Date.now()
  upload(worker_model, contentType)
}

function upload(worker_model: WorkerModel, contentType: string = 'image/jpeg') {
  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      let value = Math.round((e.loaded / e.total) * 100)
      worker_model.progress = value
      sendmsgtoworker(worker_model, true)
    }
  })

  xhr.upload.addEventListener('error', () => {
    // error.value = 'Upload failed'
    // uploading.value = false
    is_photo_uploading.value = false;
    showToastError('Photo upload failed. Please try again.')
    worker_model.progress = -1
    sendmsgtoworker(worker_model, true)
  })

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      is_photo_uploading.value = false;
      worker_model.progress = 100
      sendmsgtoworker(worker_model, true)

      reloadNuxtApp({
        path: "/profile",
        ttl: 1000
      })

    }
  }

  xhr.open('PUT', worker_model.url ?? '')
  xhr.setRequestHeader('Content-Type', contentType)
  // add headers if needed: xhr.setRequestHeader('Authorization', 'Bearer ...')

  xhr.send(previewUrlFile.value)
}


</script>
