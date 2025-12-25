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
            <div class="lsv-brand-sub">PROFILE PICTURE</div>
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
                Select Profile Picture
                <span class="lsv-pill">All Photos</span>
              </h1>
              <p>
                Choose a photo from your photos to use as your profile picture.
              </p>
            </div>
          </div>

          <!-- Filters -->
          <div class="lsv-filters">
            <div class="lsv-filter-left">
              <span class="lsv-tag lsv-tag--accent">All Photos</span>
           
              
            </div>
            <div class="lsv-filter-right lsv-hint" v-if="is_uploading === false">
              Tip: Your selected photo will be visible to all members.
              <button class="lsv-no-picture-btn ms-2" @click="removeProfilePhoto()">
                 Remove Profile Picture
                <img src="/images/badges/animated/50X50px/delete.gif" alt="No picture" class="lsv-no-picture-icon" />
              </button>
            </div>
          </div>

          <!-- Media Grid -->
          <div class="lsv-media-grid">
            <div v-for="media in allFeeds" :key="media.feed_id" class="lsv-media-item"
              :class="{ 'lsv-media-item--selected': selectedMedia?.feed_id === media.feed_id }"
              @click="selectMedia(media)">
              <div class="lsv-media-image">
                <img :src="(media.media_path ?? '') + media.hd_feed_image" />
                <div class="lsv-media-overlay" v-if="selectedMedia?.feed_id === media.feed_id">
                  <span class="lsv-check-icon">✓</span>
                </div>
              </div>

            </div>
          </div>

          <!-- Current Selection Preview -->
          <div v-if="selectedMedia" class="lsv-selection-preview">
            <h3>Current Selection</h3>
            <div class="lsv-preview-content">
              <img :src="(selectedMedia.media_path ?? '') + selectedMedia.hd_feed_image" />
            </div>
          </div>

          <!-- Footer -->
          <div class="lsv-footer">
            <div class="lsv-hint">
              Selected photo will become your new profile picture immediately.
            </div>
            <button v-if="!is_uploading" class="lsv-save" @click="saveProfilePicture" :disabled="!selectedMedia">
              Set as Profile Picture
            </button>
            <span class="btn-loader" v-if="is_uploading"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { FeedsModel, UsersModel } from '~/composables/models'

const allFeeds = ref([] as FeedsModel.FeedsResponseModel[])
const login_store = useLoginStore()
const selectedMedia = ref<FeedsModel.FeedsResponseModel | null>(null)
const is_uploading = ref(false)
const fetchFeeds = async () => {
  const api_url = getUrl(RequestURL.fetchFeeds);
  const { data: feed_response, error: option_error } = await useFetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      login_id: login_store.getUserDetails?.user_id ?? 0,
      user_id: login_store.getUserDetails?.user_id ?? 0,
      media_type: 'image',
      feed_type: ''
    },
    headers: {
      "content-type": "application/json"
    }
  });
  return feed_response.value?.result ?? []
}
allFeeds.value = await fetchFeeds() as FeedsModel.FeedsResponseModel[]
compareProfilePic()
// Methods
const selectMedia = (media: FeedsModel.FeedsResponseModel) => {
  selectedMedia.value = media
}

const saveProfilePicture = async () => {
  if (selectedMedia.value) {
    is_uploading.value = true
    let api_url = getUrl(RequestURL.updateProfilePicture);
    let postData = {
      user_id: login_store.getUserDetails?.user_id ?? 0,
      profile_image: selectedMedia.value.lq_feed_image,
      hd_profile_image: selectedMedia.value.hd_feed_image
    }
    let response = await $fetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
      method: 'POST',
      body: postData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    is_uploading.value = false
    if (response.success) {
      showToastSuccess(response.message ?? "Success!!");
      login_store.setProfilePic(selectedMedia.value.lq_feed_image ?? '', selectedMedia.value.hd_feed_image ?? '')
      selectedMedia.value = null
      await navigateTo('/')
    }
    else {
      showToastError(response.message ?? "Something went wrong");
    }
  }
}

async function removeProfilePhoto() {
  const api_url = getUrl(RequestURL.removeProfilePhoto);
  is_uploading.value = true;
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
  is_uploading.value = false;
  if (response.success) {
    selectedMedia.value = null
    login_store.setProfilePic('','')
    // reloadNuxtApp({
    //   path: "/profile",
    //   ttl: 1000
    // })
  }
  else {
    showToastError("Failed to remove photo. Please try again.");
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
  allFeeds.value.forEach(media => {
    if (media.lq_feed_image === login_store.getUserDetails?.profile_image) {
      selectedMedia.value = media
    }
  })
}
</script>