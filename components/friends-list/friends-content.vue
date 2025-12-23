<template>
  <div class="friends-page">
    <div class="friends-container">
      <!-- Header -->
      <div class="friends-header mt-4">
        <h1 class="text-white">Friends</h1>
        <div class="friends-hint">Connect with amazing individuals in your area</div>
      </div>

      <!-- Tabs -->
      <div class="friends-tabs" role="tablist" aria-label="Friends tabs">
        <button 
          class="friends-tab" 
          :class="{ active: activeTab === 'requests' }"
          role="tab" 
          :aria-selected="activeTab === 'requests'"
          aria-controls="panel-requests" 
          id="tab-requests"
          @click="setActiveTab('requests')"
        >
          Friend Requests <span class="friends-badge">{{ friendRequests.length }}</span>
        </button>
        <button 
          class="friends-tab" 
          :class="{ active: activeTab === 'friends' }"
          role="tab" 
          :aria-selected="activeTab === 'friends'"
          aria-controls="panel-friends" 
          id="tab-friends"
          @click="setActiveTab('friends')"
        >
          My Friends <span class="friends-badge green">{{ myFriends.length }}</span>
        </button>
      </div>

      <!-- Friend Requests Panel -->
      <section 
        class="friends-panel" 
        :class="{ active: activeTab === 'requests' }"
        id="panel-requests" 
        role="tabpanel" 
        aria-labelledby="tab-requests"
      >
        <div class="friends-section-header">
          <h2>Friend Requests (Pending)</h2>
          <div class="friends-hint">Only show Accept / Decline here.</div>
        </div>

        <div class="friends-grid">
          <article 
            v-for="request in friendRequests" 
            :key="request.id"
            class="friends-card"
          >
            <div class="friends-card-inner">
              <div class="friends-card-image">
                <span class="friends-pill">
                  <span class="friends-dot"></span>
                  <span class="text-white">REQUEST</span>
                </span>
              </div>
              <div class="friends-card-meta">
                <div class="friends-name-row">
                  <div class="friends-name">{{ request.name }}</div>
                  <div class="friends-rank">{{ request.rank }}</div>
                </div>
                <div class="friends-info">
                  {{ request.location }} • {{ request.distance }}<br/>
                  Last seen: {{ request.lastSeen }}
                </div>
                <div class="friends-bio">{{ request.bio }}</div>
              </div>

              <div class="friends-actions friends-actions-two">
                <button 
                  class="friends-btn friends-btn-accept" 
                  @click="acceptFriendRequest(request.id)"
                  aria-label="Accept friend request"
                >
                  <svg class="friends-icon-3d" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="gTickFriends" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="rgba(53,255,122,1)"/>
                        <stop offset="1" stop-color="rgba(0,168,58,1)"/>
                      </linearGradient>
                      <linearGradient id="gTickEdgeFriends" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="rgba(255,255,255,.55)"/>
                        <stop offset="1" stop-color="rgba(0,0,0,.35)"/>
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10.2" fill="url(#gTickFriends)" stroke="rgba(255,255,255,.20)" stroke-width="1.2"/>
                    <circle cx="12" cy="12" r="10.2" fill="none" stroke="url(#gTickEdgeFriends)" stroke-width="1.2" opacity=".45"/>
                    <path d="M7.2 12.4l2.7 2.8L17 8.9" stroke="rgba(0,0,0,.35)" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.2 12.4l2.7 2.8L17 8.9" stroke="rgba(255,255,255,.92)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Accept
                </button>

                <button 
                  class="friends-btn friends-btn-decline" 
                  @click="declineFriendRequest(request.id)"
                  aria-label="Decline friend request"
                >
                  <svg class="friends-icon-3d" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="gXFriends" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="rgba(255,51,68,1)"/>
                        <stop offset="1" stop-color="rgba(184,0,24,1)"/>
                      </linearGradient>
                      <linearGradient id="gXEdgeFriends" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="rgba(255,255,255,.55)"/>
                        <stop offset="1" stop-color="rgba(0,0,0,.35)"/>
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10.2" fill="url(#gXFriends)" stroke="rgba(255,255,255,.20)" stroke-width="1.2"/>
                    <circle cx="12" cy="12" r="10.2" fill="none" stroke="url(#gXEdgeFriends)" stroke-width="1.2" opacity=".45"/>
                    <path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" stroke="rgba(0,0,0,.35)" stroke-width="3.6" stroke-linecap="round"/>
                    <path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" stroke="rgba(255,255,255,.92)" stroke-width="2.6" stroke-linecap="round"/>
                  </svg>
                  Decline
                </button>
              </div>
            </div>
          </article>
        </div>

        <div class="friends-note">
          <strong>Rule:</strong> Friend Requests list must only contain <b>Pending</b> items and must not show "Remove/Cancel Friend".
        </div>

        <div class="friends-divider"></div>
      </section>

      <!-- My Friends Panel -->
      <section 
        class="friends-panel" 
        :class="{ active: activeTab === 'friends' }"
        id="panel-friends" 
        role="tabpanel" 
        aria-labelledby="tab-friends"
      >
        <div class="friends-section-header">
          <h2>My Friends (Accepted)</h2>
          <div class="friends-hint">Show Message / Call / Video + Remove Friend only here.</div>
        </div>

        <div class="friends-grid">
          <article 
            v-for="friend in myFriends" 
            :key="friend.id"
            class="friends-card"
          >
            <div class="friends-card-inner">
              <div class="friends-card-image">
                <span class="friends-pill">
                  <span class="friends-dot green"></span>
                  <span class="text-white">FRIEND</span>
                </span>
              </div>
              <div class="friends-card-meta">
                <div class="friends-name-row">
                  <div class="friends-name">{{ friend.name }}</div>
                  <div class="friends-rank">{{ friend.rank }}</div>
                </div>
                <div class="friends-info">
                  {{ friend.location }} • {{ friend.distance }}<br/>
                  Last seen: {{ friend.lastSeen }}
                </div>
                <div class="friends-bio">{{ friend.bio }}</div>
              </div>

              <div class="friends-actions friends-actions-four">
                <button class="friends-btn friends-btn-small" @click="messageFriend(friend.id)">Message</button>
                <button class="friends-btn friends-btn-small" @click="callFriend(friend.id)">Call</button>
                <button class="friends-btn friends-btn-small" @click="videoCallFriend(friend.id)">Video</button>
                <button class="friends-btn friends-btn-small friends-btn-decline" @click="removeFriend(friend.id)">Remove</button>
              </div>
            </div>
          </article>
        </div>

        <div class="friends-note">
          <strong>Rule:</strong> Accepted friends list must not show Accept/Decline.
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive data
const activeTab = ref<'requests' | 'friends'>('requests')

// Mock data - replace with actual API calls
const friendRequests = ref([
  {
    id: 1,
    name: 'johnlauren',
    rank: 'Photo Verified',
    location: 'Cannock',
    distance: '15.49 miles',
    lastSeen: '1 day ago',
    bio: 'Any couples online? 😏'
  },
  {
    id: 2,
    name: 'ls-test',
    rank: 'Testing',
    location: 'London',
    distance: '101.09 miles',
    lastSeen: '3 weeks ago',
    bio: 'Temporary test profile for system testing 😈😈'
  },
  {
    id: 3,
    name: 'johnnight',
    rank: 'Verified',
    location: 'Walsall',
    distance: '7.64 miles',
    lastSeen: '1 day ago',
    bio: 'Looking for some fun 🔥 😈'
  }
])

const myFriends = ref([
  {
    id: 1,
    name: 'CoupleNextDoor',
    rank: 'Elite',
    location: 'Birmingham',
    distance: '6.12 miles',
    lastSeen: '2 hours ago',
    bio: 'Discreet couple looking for like-minded 😈'
  },
  {
    id: 2,
    name: 'SassyLola',
    rank: 'Plus',
    location: 'Wolverhampton',
    distance: '10.45 miles',
    lastSeen: '1 day ago',
    bio: 'Let\'s chat 💬'
  },
  {
    id: 3,
    name: 'MidnightPair',
    rank: 'Basic+',
    location: 'Cannock',
    distance: '15.49 miles',
    lastSeen: '3 days ago',
    bio: 'Weekend plans? 🔥'
  }
])

// Methods
const setActiveTab = (tab: 'requests' | 'friends') => {
  activeTab.value = tab
}

const acceptFriendRequest = (id: number) => {
  // Implement accept friend request logic
  console.log('Accept friend request:', id)
  // Remove from requests and add to friends
  const request = friendRequests.value.find(r => r.id === id)
  if (request) {
    friendRequests.value = friendRequests.value.filter(r => r.id !== id)
    myFriends.value.push(request)
  }
}

const declineFriendRequest = (id: number) => {
  // Implement decline friend request logic
  console.log('Decline friend request:', id)
  friendRequests.value = friendRequests.value.filter(r => r.id !== id)
}

const messageFriend = (id: number) => {
  // Implement message friend logic
  console.log('Message friend:', id)
}

const callFriend = (id: number) => {
  // Implement call friend logic
  console.log('Call friend:', id)
}

const videoCallFriend = (id: number) => {
  // Implement video call friend logic
  console.log('Video call friend:', id)
}

const removeFriend = (id: number) => {
  // Implement remove friend logic
  console.log('Remove friend:', id)
  if (confirm('Are you sure you want to remove this friend?')) {
    myFriends.value = myFriends.value.filter(f => f.id !== id)
  }
}
</script>