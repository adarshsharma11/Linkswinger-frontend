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
          <div class="lsv-logo">LS</div>
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
                <span class="lsv-pill">APPROVED MEDIA</span>
              </h1>
              <p>
                Choose a photo from your approved media to use as your profile picture. 
                Only photos that have been approved by our moderation team are available for selection.
              </p>
            </div>

            <div class="lsv-profile-mini">
              <div class="lsv-profile-top">
                <div class="lsv-avatar lsv-avatar--md">{{ userInitials }}</div>
                <div>
                  <div><strong>{{ userName }}</strong> · {{ userLocation }}</div>
                  <div class="lsv-you">YOU</div>
                </div>
              </div>

              <div class="lsv-badges">
                <div class="lsv-badge"><span class="lsv-dot"></span> {{ approvedMediaCount }} Approved</div>
                <div class="lsv-badge">Photo verified</div>
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="lsv-filters">
            <div class="lsv-filter-left">
              <span class="lsv-tag lsv-tag--accent">Approved Media</span>
              <span class="lsv-tag">All Photos</span>
            </div>
            <div class="lsv-filter-right lsv-hint">
              Tip: Your selected photo will be visible to all members.
            </div>
          </div>

          <!-- Media Grid -->
          <div class="lsv-media-grid">
            <div 
              v-for="media in approvedMedia" 
              :key="media.id"
              class="lsv-media-item"
              :class="{ 'lsv-media-item--selected': selectedMediaId === media.id }"
              @click="selectMedia(media)"
            >
              <div class="lsv-media-image">
                <img :src="media.thumbnailUrl" :alt="media.title" />
                <div class="lsv-media-overlay" v-if="selectedMediaId === media.id">
                  <span class="lsv-check-icon">✓</span>
                </div>
              </div>
              <div class="lsv-media-info">
                <div class="lsv-media-title">{{ media.title }}</div>
                <div class="lsv-media-meta">{{ media.uploadDate }} · {{ media.category }}</div>
              </div>
            </div>
          </div>

          <!-- Current Selection Preview -->
          <div v-if="selectedMedia" class="lsv-selection-preview">
            <h3>Current Selection</h3>
            <div class="lsv-preview-content">
              <img :src="selectedMedia.fullUrl" :alt="selectedMedia.title" />
              <div class="lsv-preview-info">
                <h4>{{ selectedMedia.title }}</h4>
                <p>{{ selectedMedia.description }}</p>
                <div class="lsv-preview-meta">
                  <span>Uploaded: {{ selectedMedia.uploadDate }}</span>
                  <span>Category: {{ selectedMedia.category }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="lsv-footer">
            <div class="lsv-hint">
              Selected photo will become your new profile picture immediately.
            </div>
            <button 
              class="lsv-save" 
              @click="saveProfilePicture"
              :disabled="!selectedMediaId"
            >
              Set as Profile Picture
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Mock user data
const userName = ref('User 2')
const userLocation = ref('Birmingham')
const userInitials = computed(() => userName.value.split(' ').map(n => n[0]).join(''))

// Mock approved media data
const approvedMedia = ref([
  {
    id: 1,
    title: 'Beach Vacation',
    description: 'Summer vacation photo from Miami Beach',
    thumbnailUrl: '/images/user-list/user-2.jpg',
    fullUrl: '/images/user-list/user-2.jpg',
    uploadDate: '2 days ago',
    category: 'Travel'
  },
  {
    id: 2,
    title: 'Mountain Adventure',
    description: 'Hiking in the mountains',
    thumbnailUrl: '/images/user-list/user-1.jpg',
    fullUrl: '/images/user-list/user-1.jpg',
    uploadDate: '1 week ago',
    category: 'Adventure'
  },
  {
    id: 3,
    title: 'City Night Out',
    description: 'Night out with friends',
    thumbnailUrl: '/images/user-list/user-3.jpg',
    fullUrl: '/images/user-list/user-3.jpg',
    uploadDate: '2 weeks ago',
    category: 'Social'
  },
  {
    id: 4,
    title: 'Nature Walk',
    description: 'Exploring the forest trails',
    thumbnailUrl: '/images/user-list/user-4.jpg',
    fullUrl: '/images/user-list/user-4.jpg',
    uploadDate: '3 weeks ago',
    category: 'Nature'
  },
  {
    id: 5,
    title: 'Beautiful Sunset',
    description: 'Sunset at the beach',
    thumbnailUrl: '/images/user-list/user-2.jpg',
    fullUrl: '/images/user-list/user-2.jpg',
    uploadDate: '1 month ago',
    category: 'Travel'
  },
  {
    id: 6,
    title: 'Delicious Food',
    description: 'Amazing dinner experience',
    thumbnailUrl: '/images/user-list/user-1.jpg',
    fullUrl: '/images/user-list/user-1.jpg',
    uploadDate: '1 month ago',
    category: 'Food'
  }
])

const approvedMediaCount = computed(() => approvedMedia.value.length)
const selectedMediaId = ref(null)

const selectedMedia = computed(() => {
  return approvedMedia.value.find(media => media.id === selectedMediaId.value)
})

// Methods
const selectMedia = (media) => {
  selectedMediaId.value = media.id
}

const saveProfilePicture = () => {
  if (selectedMediaId.value) {
    // Here you would typically make an API call to save the selection
    alert(`Profile picture updated to: ${selectedMedia.value.title}`)
    // Navigate back or show success message
  }
}

const goBack = () => {
  // Navigate back
  window.history.back()
}

const goHome = () => {
  // Navigate to home
  window.location.href = '/'
}

onMounted(() => {
  // Load user's approved media from API in real implementation
  console.log('Profile picture selection page loaded')
})
</script>