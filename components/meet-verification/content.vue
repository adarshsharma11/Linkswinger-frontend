<template>
  <div class="lsv-page">
    <div class="lsv-wrap">
      <!-- Top bar -->
      <div class="lsv-top-bar">
        <div class="lsv-top-left">
          <button class="lsv-top-btn" @click="goBack()"><span class="icon">←</span> Back</button>
          <button class="lsv-top-btn" @click="goHome()"><span class="icon">🏠</span> Home</button>
        </div>
        <div class="lsv-brand">
          <div class="lsv-logo"><img src="/images/logo/landing-logo.gif" alt="LinkSwinger" /></div>
          <div>
            <div>LinkSwingers</div>
            <div class="lsv-brand-sub">MY VERIFICATIONS</div>
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
                My verifications
                <span class="lsv-pill">MEET CONFIRMATION</span>
              </h1>
              <p>
                This page shows all Meet verifications other members left for you.
                For each one you control how it appears on your profile:
                <strong>Public</strong>, <strong>Friends only</strong> or <strong>Private</strong>.
              </p>
            </div>

            <div class="lsv-profile-mini">
              <div class="lsv-profile-top">
                <img class="lsv-avatar lsv-avatar--md"
                  :src="getImagePath(login_store.getUserDetails?.profile_type ?? '', login_store.getUserDetails?.media_path ?? '', login_store.getUserDetails?.profile_image ?? '')"></img>
                <div>
                  <div><strong>{{ login_store.getUserDetails?.nick_name }}</strong> · {{
                    login_store.getUserDetails?.town }}</div>
                </div>
              </div>

              <div class="lsv-badges">
                <div class="lsv-badge" v-if="login_store.getUserDetails?.is_photo_verified === true"><span
                    class="lsv-dot"></span> Photo verified</div>
                <!-- <div class="lsv-badge">Meet history · 4</div> -->
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="lsv-filters">
            <div class="lsv-filter-left">
              <button v-if="is_loading === false" class="lsv-tag" :class="{ 'lsv-tag--accent': !is_given_open }" @click="fetchRecVerification()">Received ({{ recCount }})</button>
              <button v-if="is_loading === false" class="lsv-tag" :class="{ 'lsv-tag--accent': is_given_open }" @click="fetchGivenVerification()">Given ({{ givenCount }})</button>
              <span class="btn-loader" v-if="is_loading"></span>
            </div>
            <div class="lsv-filter-right lsv-hint">
              Tip: “Private” still shows “Verified by man / woman / couple / TS” without revealing who.
            </div>
          </div>

          <!-- List -->
          <div class="lsv-list">
            <!-- ITEM 1 -->
            <article class="lsv-item" v-for="verification in verifications" :key="verification.meet_verification_id">
              <img class="lsv-avatar lsv-avatar--lg"
                :src="getImagePath(verification.profile_type ?? '', verification.media_path ?? '', verification.profile_image ?? '')"></img>

              <div class="lsv-item-body">
                <div class="lsv-meta"><strong>{{ verification.nick_name }}</strong> · {{ verification.profile_type }} {{
                  getGender(verification) }} · {{ formatRelativeDate(verification.created_at ?? '') }}</div>
                <div class="lsv-text">“{{ verification.review }}”</div>
                <div class="lsv-tags">
                  <span v-if="is_given_open === false" class="lsv-chip">Verified by {{ verification.profile_type }} {{ getGender(verification)
                    }}</span>
                  <span class="lsv-chip lsv-pill-public" v-if="(verification.visibility ?? '').length > 0">Visible: {{
                    verification.visibility?.toUpperCase() }}</span>
                </div>
              </div>

              <div class="lsv-visibility" v-if="is_given_open === false">
                <div class="lsv-vis-label">Visibility on your profile</div>
                <select v-model="verification.visibility" class="lsv-select">
                  <option value="" disabled>Select Visibility</option>
                  <option value="public">Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private">Private</option>
                </select>
                <button @click="showVerificationAlert(verification)" class="lsv-btn-outline"
                  v-if="(verification.is_verified ?? false) === false && (verification.is_verify_loading ?? false) === false && is_given_open === false">VERIFY
                  {{
                    verification.nick_name }} BACK</button>
                <span class="btn-loader" v-if="verification.is_verify_loading === true"> </span>
              </div>
            </article>
          </div>

          <!-- Footer -->
          <div class="lsv-footer">
            <div class="lsv-hint">
              When you verify someone back, they will see it on their “My verifications” page.
            </div>
            <button class="lsv-save" v-if="is_updating === false && is_given_open === false" @click="updateVisibility()">SAVE VISIBILITY SETTINGS</button>
            <span class="btn-loader" v-if="is_updating === true"> </span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Swal from 'sweetalert2'
import type { MeetVerificationsModel } from '~/composables/models';
const verifications = ref([] as MeetVerificationsModel.FetchVerifyResponseModel[])
const user_store = userStore()
const login_store = useLoginStore();
const givenCount = ref(0)
const recCount = ref(0)
const is_updating = ref(false)
const is_loading = ref(false)
const is_given_open = ref(false)

// Navigation functions
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/profile')
  }
}

const goHome = () => {
  navigateTo('/dashboard')
}

const fetchMeetVerifications = async () => {
  const api_url = getUrl(RequestURL.fetchMeetVerifications);
  const { data: response, error: option_error } = await useFetch<SuccessError<MeetVerificationsModel.FetchVerifyResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        from_id: 0,
        to_id: user_store.getLoginId
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.value?.success) {
    if (response.value.result) {
      givenCount.value = response.value.result[0].given_count ?? 0
      recCount.value = response.value.result[0].received_count ?? 0
    }

    return response.value.result
  }
  else {
    return []
  }
};
verifications.value = await fetchMeetVerifications() as MeetVerificationsModel.FetchVerifyResponseModel[]



function getImagePath(profile_type: string, media_path: string, profile_image: string): string {
  if (profile_image.length !== 0) {
    return media_path + profile_image
  }
  if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png";
  if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png";
  if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png";
  if (profile_type === 'Man') return "/images/profile-placeholders/man.png";
  return "/images/profile-placeholders/man.png"
}

function getGender(user: MeetVerificationsModel.FetchVerifyResponseModel): string {
  let profile_type = user.profile_type ?? ''
  let gender = user.gender ?? ''
  let partner_gender = user.partner_gender ?? ''
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
  return ''
}

function formatRelativeDate(inputDate: string) {
  const date = new Date(inputDate);
  const today = new Date();

  // Difference in ms → days
  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "1 week ago";
  if (diffWeeks <= 4) return `${diffWeeks} weeks ago`;

  // If more than 4 weeks → return date
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

function showVerificationAlert(verifyModel: MeetVerificationsModel.FetchVerifyResponseModel) {
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
      addVerification(verifyModel, result.value ?? '')
    }
  });
}

async function addVerification(verifyModel: MeetVerificationsModel.FetchVerifyResponseModel, review: string) {
  if (verifyModel.is_verify_loading) {
    return;
  }
  const api_url = getUrl(RequestURL.addMeetVerification);
  verifyModel.is_verify_loading = true;
  const response = await $fetch<SuccessError<MeetVerificationsModel.FetchVerifyResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        from_id: user_store.getLoginId,
        to_id: verifyModel.from_id ?? 0,
        review: review
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  verifyModel.is_verify_loading = false;
  if (response.success) {
    verifyModel.is_verified = true
    givenCount.value = givenCount.value + 1
    showToastSuccess(response.message)
  }
  else {
    showToastError("Logout failed. Please try again.");
  }
}

async function updateVisibility() {
  if (is_updating.value) {
    return;
  }

  var visibilities = [] as MeetVerificationsModel.FetchVerifyResponseModel[]
  verifications.value.forEach((el) => {
    if ((el.visibility ?? '').length > 0) {
      visibilities.push({
        meet_verification_id: el.meet_verification_id,
        visibility: el.visibility
      })
    }
  })
  if (visibilities.length === 0)
  {
      return;
  }
  const api_url = getUrl(RequestURL.updateVisibility);
  is_updating.value = true;
  const response = await $fetch<SuccessError<MeetVerificationsModel.FetchVerifyResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        visibilities: visibilities
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  is_updating.value = false;
  if (response.success) {
    showToastSuccess(response.message)
  }
  else {
    showToastError("Logout failed. Please try again.");
  }
}
async function fetchRecVerification() 
{
  is_given_open.value = false
     is_loading.value = true
  verifications.value = []
    const api_url = getUrl(RequestURL.fetchMeetVerifications);
const response = await $fetch<SuccessError<MeetVerificationsModel.FetchVerifyResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        from_id: 0,
        to_id: user_store.getLoginId
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
    is_loading.value = false
   verifications.value = response.result ?? []
}
async function fetchGivenVerification() 
{
  verifications.value = []
    is_given_open.value = true
  is_loading.value = true
 const api_url = getUrl(RequestURL.fetchGivenMeetVerifications);
const response = await $fetch<SuccessError<MeetVerificationsModel.FetchVerifyResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        from_id: user_store.getLoginId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
   is_loading.value = false
     verifications.value = response.result ?? []
}


</script>

<style scoped>
/* Enhanced button styling for better UX */
.lsv-top-btn {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.lsv-top-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.lsv-top-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Ensure proper spacing for mobile */
@media (max-width: 576px) {
  .lsv-top-left {
    gap: 0.5rem;
  }
  
  .lsv-top-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>
