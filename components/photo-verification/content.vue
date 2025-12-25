<template>
  <div class="lsv-page">
    <div class="lsv-wrap">
      <!-- Top bar -->
      <div class="lsv-top-bar">
        <div class="lsv-top-left">
          <button class="lsv-top-btn" @click="goBack"><span class="icon">←</span> Back</button>
          <button class="lsv-top-btn" @click="goHome"><span class="icon">🏠</span> Home</button>
        </div>
        <div class="lsv-brand">
          <div class="lsv-logo"><img src="/images/logo/landing-logo.gif" alt="LinkSwinger" /></div>
          <div>
            <div>LinkSwingers</div>
            <div class="lsv-brand-sub">VERIFY PHOTO</div>
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
                VERIFY PHOTO
                <span class="lsv-pill">All Photos</span>
              </h1>
              <p>
                 Select a photo to upload for verification. Make sure it clearly shows your face.
              </p>
            </div>
          </div>

          <!-- Filters -->
          <div class="lsv-filters" v-if="allVerifications.length > 0">
            <div class="lsv-filter-left">
              <span class="lsv-tag lsv-tag--accent">All Photos</span>
            </div>
          
          </div>

          <!-- Media Grid -->
          <div class="lsv-media-grid" v-if="allVerifications.length > 0">
            <div v-for="media in allVerifications" :key="media.photo_verification_id" class="lsv-media-item"
              :class="{ 'lsv-media-item--selected': selectedMedia?.photo_verification_id === media.photo_verification_id }"
              @click="selectMedia(media)">
              <div class="lsv-media-image">
                <img :src="(media.assets_path ?? '') + media.verified_photo" />
                <div class="lsv-media-overlay" v-if="selectedMedia?.photo_verification_id === media.photo_verification_id">
                  <span class="lsv-check-icon">✓</span>
                </div>
              </div>
         

            </div>
          </div>

          <!-- Current Selection Preview -->
          <div v-if="selectedMedia" class="lsv-selection-preview">
            <h3>Status : {{ selectedMedia.verification_status?.toUpperCase()  }}</h3>
            <div class="lsv-preview-content">
              <img :src="(selectedMedia.assets_path ?? '') + selectedMedia.verified_photo" />
              <div v-if="(selectedMedia.reason ?? '').length > 0">{{'Rejected Reason : '.toUpperCase() + (selectedMedia.reason ?? '') }}</div>
            </div>
            
          </div>

          <!-- Footer -->
          <div class="lsv-footer" v-if="has_approved === false">
            <!-- <div class="lsv-hint">
              Selected photo will become your new profile picture immediately.
            </div> -->
            <button v-if="!is_uploading" class="lsv-save" data-bs-toggle="modal"
              data-bs-target="#photoVerificationModal">
              Upload Photo for Verification
            </button>
            <span class="btn-loader" v-if="is_uploading"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
    <ProfilePhotoVerifyModal @reload="reloadData"/>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { FeedsModel, UsersModel } from '~/composables/models'

const allVerifications = ref([] as UsersModel.ProfileDetailsResponseModel[])
const login_store = useLoginStore()
const selectedMedia = ref<UsersModel.ProfileDetailsResponseModel | null>(null)
const is_uploading = ref(false)
const has_approved = ref(false)

 const api_url = getUrl(RequestURL.fetchPhotoVerifications);
  const { data: feed_response, error: option_error , refresh } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      user_id: login_store.getUserDetails?.user_id ?? 0,
    },
    headers: {
      "content-type": "application/json"
    }
  });

allVerifications.value = feed_response.value?.result ?? []

has_approved.value = (allVerifications.value.filter((el) => {return el.verification_status === "approved"}).length !== 0)

selectedMedia.value = allVerifications.value.length > 0 ? allVerifications.value[0] : null
compareProfilePic()

const reloadData = async () => {
    const api_url = getUrl(RequestURL.fetchPhotoVerifications)
  let response_model = await $fetch<SuccessError<UsersModel.ValidateNicknameResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
   body: {
      user_id: login_store.getUserDetails?.user_id ?? 0,
    }
  });
  is_uploading.value = false
  if (response_model.success) {
    allVerifications.value = response_model?.result ?? []
    selectedMedia.value = allVerifications.value.length > 0 ? allVerifications.value[0] : null
compareProfilePic()
  }
  else {
 
  }
}


const selectMedia = (media: UsersModel.ProfileDetailsResponseModel) => {
  selectedMedia.value = media
}

const saveProfilePicture = async () => {
  if (selectedMedia.value) {

  }
}

const goBack = () => {
  // Navigate back
  window.history.back()
}

const goHome = () => {
  // Navigate to home
  window.location.href = '/dashboard'
}

onMounted(() => {
  // Load user's approved media from API in real implementation
  console.log('Profile picture selection page loaded')
})

function compareProfilePic() {
  allVerifications.value.forEach(media => {
    if (media.verified_photo === login_store.getUserDetails?.verified_photo) {
      selectedMedia.value = media
    }
  })
}
</script>