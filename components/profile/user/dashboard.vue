<template>
  <div class="dashboard-container">
    <!-- Desktop Sidebar -->
    <aside class="dashboard-sidebar">
      <div class="brand">
        <div class="brand-logo" title="Swap src to your local path once deployed" />
        <h1 class="text-white">LinkSwingers</h1>
      </div>
      <nav class="nav" id="sideNav">
        <a href="#profile" data-route="profile" @click.prevent="setActiveNav('profile')" :class="{ active: activeNav === 'profile' }" class="text-white"><span class="icon">👤</span>My Profile</a>
        <a href="#home" data-route="home" class="active text-white" @click.prevent="setActiveNav('home')" :class="{ active: activeNav === 'home' }"><span class="icon">🏠</span>Home</a>
        <a href="#messages" data-route="messages" @click.prevent="setActiveNav('messages')" :class="{ active: activeNav === 'messages' }" class="text-white"><span class="icon">💬</span>Messages/Calls</a>
        <a href="#notifications" data-route="notifications" @click.prevent="setActiveNav('notifications')" :class="{ active: activeNav === 'notifications' }" class="text-white"><span class="icon">🔔</span>Notifications</a>
        <a href="#nearby" data-route="nearby" @click.prevent="setActiveNav('nearby')" :class="{ active: activeNav === 'nearby' }" class="text-white"><span class="icon">📍</span>Nearby People</a>
        <a href="#friends" data-route="friends" @click.prevent="setActiveNav('friends')" :class="{ active: activeNav === 'friends' }" class="text-white"><span class="icon">👥</span>My Friends</a>
        <a href="#crush" data-route="crush" @click.prevent="setActiveNav('crush')" :class="{ active: activeNav === 'crush' }" class="text-white"><span class="icon">⭐</span>Crush List</a>
        <a href="#search" data-route="search" @click.prevent="setActiveNav('search')" :class="{ active: activeNav === 'search' }" class="text-white"><span class="icon">🔍</span>Search</a>
        <a href="#new-photos" data-route="new-photos" @click.prevent="setActiveNav('new-photos')" :class="{ active: activeNav === 'new-photos' }" class="text-white"><span class="icon">🖼</span>New Photos</a>
        <a href="#new-video" data-route="new-video" @click.prevent="setActiveNav('new-video')" :class="{ active: activeNav === 'new-video' }" class="text-white"><span class="icon">🎞</span>New Videos</a>
        <a href="#meet-events" data-route="meet-events" @click.prevent="setActiveNav('meet-events')" :class="{ active: activeNav === 'meet-events' }" class="text-white"><span class="icon">📅</span>Meet Events</a>
        <a href="#club-events" data-route="club-events" @click.prevent="setActiveNav('club-events')" :class="{ active: activeNav === 'club-events' }" class="text-white"><span class="icon">🏷</span>Club Events</a>
        <a href="#live" data-route="live" @click.prevent="setActiveNav('live')" :class="{ active: activeNav === 'live' }" class="text-white"><span class="icon">🔴</span>Live / On Cam</a>
      </nav>
      <div class="spacer" />
      <button class="dash-button primary" id="dash-buttonUpload" @click="fakeUpload">＋ Upload/Post</button>
    </aside>

    <!-- MAIN COLUMN -->
    <div class="dashboard-main">
      <header class="dashboard-header">
        <div class="dash-row" style="gap:10px;flex:1">
          <strong id="routeTitle" class="text-white">{{ routeTitle }}</strong>
          <div class="search">
            <input type="search" placeholder="Quick search people, photos, videos…" class="text-white"/>
            <button class="dash-button text-white" id="dash-buttonOpenAdvanced" @click="openAdvanced">Advanced</button>
          </div>
        </div>
        <div class="quick">
          <button @click="showAdvancedSearch = true" class="dash-button text-white">Verified ✅</button>
          <button @click="showAdvancedSearch = true" class="dash-button text-white">Nearby 📍</button>
          <button @click="showAdvancedSearch = true" class="dash-button text-white">Who’s live 🔴</button>
        </div>
      </header>

      <main class="dashboard-content">
        <!-- FEED / HOME -->
        <section id="view-home" :hidden="activeNav !== 'home'">
          <div class="tabs">
            <button class="tab active text-white" data-feed="all">Feed</button>
            <button class="tab text-white" data-feed="nearby">Nearby</button>
            <button class="tab text-white" data-feed="trending">Trending</button>
            <button class="tab text-white" data-feed="events">Events</button>
          </div>

          <div class="dash-row" style="flex-wrap:wrap;gap:8px;margin:8px 0 12px">
            <a href="#nearby" class="pill text-white" @click.prevent="setActiveNav('nearby')">📍 Nearby people</a>
            <a href="#friends" class="pill text-white" @click.prevent="setActiveNav('friends')">👥 My friends</a>
            <a href="#new-photos" class="pill text-white" @click.prevent="setActiveNav('new-photos')">🖼 New photos</a>
            <a href="#new-video" class="pill text-white" @click.prevent="setActiveNav('new-video')">🎞 New video</a>
            <a href="#meet-events" class="pill text-white" @click.prevent="setActiveNav('meet-events')">📅 Meet events</a>
            <a href="#club-events" class="pill text-white" @click.prevent="setActiveNav('club-events')">🏷 Club events</a>
          </div>

          <div class="dashboard-card glow">
            <h2 class="text-white">Recently Uploaded</h2>
            <div class="grid">
              <div class="media" />
              <div class="media" />
              <div class="media" />
            </div>
          </div>

          <div class="dashboard-card mt-4">
            <div class="dash-row" style="margin-bottom: 12px;">
              <h2 class="text-white">Suggested Profiles</h2>
              <a href="#search" class="muted text-white" @click.prevent="setActiveNav('search')">See all →</a>
            </div>
            <div class="list">
              <div class="item">
                <div class="avatar" />
                <div style="flex:1; font-size: 13px;" class="text-white">Alex & Sam • 2 km • Verified ✅</div>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Message</button>
              </div>
              <div class="item">
                <div class="avatar" />
                <div style="flex:1; font-size: 13px;" class="text-white">Jess • 5 km • Online 🟢</div>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Call</button>
              </div>
              <div class="item">
                <div class="avatar" />
                <div style="flex:1; font-size: 13px;" class="text-white">D & M • 12 km • New ✨</div>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Message</button>
              </div>
            </div>
          </div>
        </section>

        <!-- SEARCH / EXPLORE -->
        <section id="view-search" :hidden="activeNav !== 'search'">
          <div class="tabs">
            <button class="tab active" data-scope="profiles">Profiles</button>
            <button class="tab" data-scope="photos">Photos</button>
            <button class="tab" data-scope="videos">Videos</button>
            <button class="tab" data-scope="events">Events</button>
          </div>

          <div class="dashboard-card glow">
            <h2>Quick Filters</h2>
            <div class="dash-row" style="flex-wrap:wrap;gap:8px">
              <span class="pill">📍 Accurate location</span>
              <span class="pill">✅ Verified</span>
              <span class="pill">🟢 Online now</span>
              <span class="pill">📅 Meeting today</span>
              <span class="pill">🖼 With public photo</span>
            </div>
          </div>

          <div class="dashboard-card mt-4">
            <h2>Results</h2>
            <div class="grid">
              <div class="media" title="Result" />
              <div class="media" />
              <div class="media" />
            </div>
          </div>
        </section>

        <!-- MESSAGES / CALLS -->
        <section id="view-messages" :hidden="activeNav !== 'messages'">
          <div class="dashboard-card glow">
            <div class="tabs" id="msgTabs">
              <button class="tab active text-white" data-mtab="inbox">Chats</button>
              <button class="tab text-white" data-mtab="roulette">Video Roulette</button>
            </div>

            <!-- Chats Panel -->
            <div id="mtab-inbox">
              <h2 class="text-white">Inbox</h2>
              <div class="list">
                <div class="item">
                  <div class="avatar" />
                  <div style="flex:1" class="text-white">Alex & Sam <div class="muted">Hey, free tonight?</div></div>
                  <button class="dash-button">Open</button>
                </div>
                <div class="item">
                  <div class="avatar" />
                  <div style="flex:1" class="text-white">Jess <div class="muted">Send verification call PIN: 4321</div></div>
                  <button class="dash-button">Call</button>
                </div>
              </div>

              <div class="dashboard-card" style="margin-top:12px">
                <h2 class="text-white">Start a New Chat / Call</h2>
                <div class="composer">
                  <input type="text" placeholder="Search user…" class="text-white"/>
                  <button class="dash-button">Chat</button>
                  <button class="dash-button">Video Call</button>
                </div>
                <p class="muted" style="margin-top:8px">Calls require 4‑digit PIN confirmation.</p>
              </div>
            </div>

            <!-- Roulette Panel -->
            <div id="mtab-roulette" hidden>
              <h2 class="text-white">Video Roulette</h2>
              <div class="roulette">
                <div class="video"><span class="tag">You</span></div>
                <div class="video"><span class="tag">Partner</span></div>
              </div>
              <div class="ctrls">
                <button class="dash-button">⏭ Next</button>
                <button class="dash-button">⏮ Back</button>
                <button class="dash-button">⚠️ Report</button>
                <span class="pill text-white">Gender: Any</span>
                <span class="pill text-white">Location: Nearby</span>
                <span class="pill text-white">Accurate location</span>
              </div>
              <p class="muted" style="margin-top:8px">Self‑view is not mirrored (no flip). Implement real media streams later (Janus/WebRTC).</p>
            </div>
          </div>
        </section>

        <!-- SHORTLIST -->
        <section id="view-crush" :hidden="activeNav !== 'crush'">
          <div class="dashboard-card glow">
            <h2 class="text-white" style="margin-bottom: 8px;">Crush List</h2>
            <p class="muted" style="margin-bottom: 16px;">Save profiles you like (not friends yet). Later this becomes “Add to Crush List” on profile dashboard-cards.</p>
            <div class="list">
              <div class="item">
                <div class="avatar" />
                <div style="flex:1; font-size: 13px;" class="text-white">Jamie • 4 km • Verified ✅</div>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Message</button>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Remove</button>
              </div>
              <div class="item">
                <div class="avatar" />
                <div style="flex:1; font-size: 13px;" class="text-white">Taylor • 9 km • Online 🟢</div>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Message</button>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Remove</button>
              </div>
            </div>
            <!-- Empty state -->
            <div style="text-align: center; padding: 24px; color: var(--muted); font-size: 13px;">
              No crushes yet. Start exploring profiles to find people you like!
            </div>
          </div>
        </section>

        <!-- SUBPAGES (no sidebar entry) -->
        <section id="view-nearby" :hidden="activeNav !== 'nearby'">
          <div class="dashboard-card glow">
            <h2 class="text-white">Nearby People</h2>
            <p class="muted" style="margin-bottom: 16px;">People within your selected radius. (Hook to geolocation + distance filter.)</p>
            <div class="list">
              <div class="item">
                <div class="avatar" />
                <div style="flex:1; font-size: 13px;" class="text-white">User A • 1.2 km • Online 🟢</div>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Message</button>
              </div>
              <div class="item">
                <div class="avatar" />
                <div style="flex:1; font-size: 13px;" class="text-white">Couple B • 3.5 km • Verified ✅</div>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Call</button>
              </div>
            </div>
            <!-- Empty state -->
            <div style="text-align: center; padding: 24px; color: var(--muted); font-size: 13px;">
              No nearby users found. Try expanding your search radius.
            </div>
          </div>
        </section>

        <section id="view-friends" :hidden="activeNav !== 'friends'">
          <div class="dashboard-dashboard-card glow">
            <h2 class="text-white">My Friends</h2>
            <p class="muted" style="margin-bottom: 16px;">Your connections and favourites.</p>
            <div class="list">
              <div class="item">
                <div class="avatar" />
                <div style="flex:1; font-size: 13px;" class="text-white">Jess • last active 5m</div>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Open chat</button>
              </div>
              <div class="item">
                <div class="avatar" />
                <div style="flex:1; font-size: 13px;" class="text-white">Alex & Sam • last active 1h</div>
                <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Open chat</button>
              </div>
            </div>
            <!-- Empty state -->
            <div style="text-align: center; padding: 24px; color: var(--muted); font-size: 13px;">
              No friends yet. Start connecting with people to build your network!
            </div>
          </div>
        </section>

        <section id="view-new-photos" :hidden="activeNav !== 'new-photos'">
          <div class="dashboard-card glow">
            <h2 class="text-white">New Photos</h2>
            <p class="muted" style="margin-bottom: 16px;">Latest uploads from people you follow.</p>
            <div class="grid-2 has-gap">
              <div class="photo-dashboard-card">
                <img src="https://via.placeholder.com/150" alt="" />
                <div class="text-white">User C</div>
              </div>
              <div class="photo-dashboard-card">
                <img src="https://via.placeholder.com/150" alt="" />
                <div class="text-white">Couple D</div>
              </div>
            </div>
            <!-- Empty state -->
            <div style="text-align: center; padding: 32px; color: var(--muted); font-size: 13px;">
              No new photos available. Check back later!
            </div>
          </div>
        </section>

        <section id="view-new-video" :hidden="activeNav !== 'new-video'">
          <div class="dashboard-card glow">
            <h2 class="text-white" style="margin-bottom: 16px;">New Video</h2>
            <div class="grid" style="gap: 12px;">
              <div class="media" />
              <div class="media" />
              <div class="media" />
            </div>
            <!-- Empty state -->
            <div style="text-align: center; padding: 32px; color: var(--muted); font-size: 13px;" class="text-white">
              No new videos available. Check back later!
            </div>
          </div>
        </section>

        <section id="view-meet-events" :hidden="activeNav !== 'meet-events'">
          <div class="dashboard-card glow">
            <div class="dash-row" style="margin-bottom: 16px;">
              <h2 class="text-white">Meet Events</h2>
              <button class="dash-button" style="font-size: 12px; padding: 6px 12px;">Create meet event</button>
            </div>
            <ul style="padding-left: 20px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">Tonight 9pm • City Centre meet • 8 attending</li>
              <li style="margin-bottom: 8px;">Fri 7pm • Drinks & chat • 15 attending</li>
            </ul>
            <!-- Empty state -->
            <div style="text-align: center; padding: 24px; color: var(--muted); font-size: 13px;" class="text-white">
              No meet events scheduled. Create one to get started!
            </div>
          </div>
        </section>

        <section id="view-club-events" :hidden="activeNav !== 'club-events'">
          <div class="dashboard-card glow">
            <h2 class="text-white">Club Events</h2>
            <p class="muted" style="margin-bottom: 16px;">Events hosted by clubs you are a member of.</p>
            <div class="dash-row" style="margin-bottom: 16px;">
              <button class="dash-button" style="font-size: 12px; padding: 6px 10px;">Create Club Event</button>
            </div>
            <!-- Empty state -->
            <div v-if="false" class="empty-state">
              <p class="text-white">No club events scheduled.</p>
            </div>
          </div>
        </section>

        <!-- LIVE / ON CAM -->
        <section id="view-live" :hidden="activeNav !== 'live'">
          <div class="dashboard-card glow">
            <div class="dash-row">
              <h2 class="text-white">Live / On Cam</h2>
              <span class="pill">🟢 Online now</span>
            </div>
            <div class="roulette" style="margin-top:8px">
              <div class="video"><span class="tag">Jess — 2 km</span></div>
              <div class="video"><span class="tag">Alex & Sam — 5 km</span></div>
              <div class="video"><span class="tag">Couple D&M — 12 km</span></div>
              <div class="video"><span class="tag">New — 1 km</span></div>
            </div>
            <div class="ctrls">
              <a href="#messages" class="dash-button" @click.prevent="setActiveNav('messages')">Open roulette</a>
              <a href="#search" class="dash-button" @click.prevent="setActiveNav('search')">Filters</a>
            </div>
            <p class="muted" style="margin-top:8px">Hook this to your "who’s live" data source (WebRTC presence / signalling). Thumbnails are placeholders.</p>
          </div>
        </section>

        <!-- NOTIFICATIONS -->
        <section id="view-notifications" :hidden="activeNav !== 'notifications'">
          <div class="dashboard-card glow">
            <h2 class="text-white" style="margin-bottom: 16px;">Notifications</h2>
            <ul style="padding-left: 20px; line-height: 1.6;">
              <li class="text-white" style="margin-bottom: 8px;">User X liked your photo.</li>
              <li class="text-white" style="margin-bottom: 8px;">New message from User Y.</li>
            </ul>
            <!-- Empty state -->
            <div v-if="false" class="empty-state">
              <p class="text-white">No new notifications.</p>
            </div>
          </div>
        </section>

        <!-- PROFILE -->
        <section id="view-profile" :hidden="activeNav !== 'profile'">
          <div class="dashboard-card glow">
            <div class="dash-row">
              <h2 class="text-white">My Profile</h2>
              <button class="dash-button">Edit profile</button>
            </div>
            <div class="tabs mt-4">
              <button class="tab active text-white" data-ptab="posts">Posts</button>
              <button class="tab text-white" data-ptab="media">Media</button>
              <button class="tab text-white" data-ptab="friends">Friends</button>
              <button class="tab text-white" data-ptab="events">Events</button>
              <button class="tab text-white" data-ptab="settings">Settings</button>
            </div>
            <div id="profileContent">
              <p class="muted text-white">Your posts will show here.</p>
            </div>
          </div>
        </section>
      </main>

      <!-- MOBILE NAV -->
      <nav class="mobile-dashboard-nav" id="mobileNav" :hidden="!isMobile">
        <a href="#home" data-route="home" class="nav-item" :class="{ active: activeNav === 'home' }" @click.prevent="setActiveNav('home')">🏠<small>Home</small></a>
        <a href="#search" data-route="search" class="nav-item" :class="{ active: activeNav === 'search' }" @click.prevent="setActiveNav('search')">🔍<small>Search</small></a>
        <a href="#upload" id="mUpload" @click.prevent="fakeUpload" class="nav-item">＋<small>Post</small></a>
        <a href="#messages" data-route="messages" class="nav-item" :class="{ active: activeNav === 'messages' }" @click.prevent="setActiveNav('messages')">💬<small>Chats</small></a>
        <a href="#profile" data-route="profile" class="nav-item" :class="{ active: activeNav === 'profile' }" @click.prevent="setActiveNav('profile')">👤<small>Profile</small></a>
      </nav>
    </div>
  </div>

  <!-- ADVANCED SEARCH DRAWER -->
  <div class="drawer" id="advDrawer" :class="{ open: drawerOpen }" aria-hidden="false">
    <div class="inner">
      <div class="dash-row">
        <h2 class="text-white">Advanced Search</h2>
        <button class="dash-button text-white" id="dash-buttonCloseAdvanced" @click="closeAdvanced">Close</button>
      </div>
      <div class="grid-2">
        <div class="field">
          <label class="text-white">Looking for</label>
          <select class="text-white">
            <option>People</option>
            <option>Couples</option>
          </select>
        </div>
        <div class="field">
          <label class="text-white">Age between</label>
          <div class="dash-row">
            <input type="number" value="18" class="text-white"/>
            <input type="number" value="99" class="text-white"/>
          </div>
        </div>
        <div class="field">
          <label class="text-white">Distance</label>
          <input type="number" value="50" class="text-white"/>
        </div>
        <div class="field">
          <label class="text-white">Online status</label>
          <select class="text-white">
            <option>Any</option>
            <option>Online now</option>
            <option>Last 24 hours</option>
          </select>
        </div>
        <div class="field">
          <label class="text-white">Verification</label>
          <select class="text-white">
            <option>Any</option>
            <option>Verified only</option>
          </select>
        </div>
        <div class="field">
          <label class="text-white">Interests</label>
          <input type="text" placeholder="e.g. hiking, movies" class="text-white"/>
        </div>
      </div>
      <div class="dash-row" style="margin-top: 16px;">
        <button class="dash-button primary text-white">Apply Filters</button>
        <button class="dash-button text-white">Clear Filters</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const router = useRouter()
const drawerOpen = ref(false)
const isMobile = ref(false)
const showAdvancedSearch = ref(false)
const activeNav = ref("home")

const routeTitle = computed(() => {
  const path = route.path.split('/').pop() || 'home'
  return path.charAt(0).toUpperCase() + path.slice(1)
})

function setActive(r) {
  const targetRoute = r === 'home' ? '/dashboard' : `/dashboard/${r}`
  router.push(targetRoute)
}

function setActiveNav(nav) {
  activeNav.value = nav
  window.location.hash = nav
}

function openAdvanced() {
  drawerOpen.value = true
  showAdvancedSearch.value = true
}

function closeAdvanced() {
  drawerOpen.value = false
  showAdvancedSearch.value = false
}

function fakeUpload() {
  alert('Open upload composer here (photo/video/event/post).')
}

function checkMobile() {
  isMobile.value = window.innerWidth <= 980
}

onMounted(() => {
  // Handle hash-based navigation
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1) || 'home'
    activeNav.value = hash
  }
  
  // Set initial state based on hash
  handleHashChange()
  
  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange)
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  // Cleanup listener on unmount
  onUnmounted(() => {
    window.removeEventListener('hashchange', handleHashChange)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

