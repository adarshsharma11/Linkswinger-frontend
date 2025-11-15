<template>
  <div class="dashboard-container" @click="handleBodyClick">
    <!-- Desktop Sidebar -->
    <aside class="dashboard-sidebar" :class="{ active: isSidebarOpen }" @click.stop>
      <div class="brand">
        <div class="brand-logo" title="Swap src to your local path once deployed" />
        <h1 class="text-white">LinkSwingers</h1>
        <button class="cross-side-btn" @click="closeSidebar"><svg xmlns="http://www.w3.org/2000/svg" width="16"
            height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg></button>
      </div>
      <nav class="nav" id="sideNav">
        <a href="#profile" data-route="profile" @click.prevent="setActiveNav('profile')"
          :class="{ active: activeNav === 'profile' }" class="text-white"><span class="icon"><!--👤--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/edit-profile.gif`" /></span>My Profile</a>
        <a href="#userlist" data-route="notifications" @click.prevent="setActiveNav('userlist')"
          :class="{ active: activeNav === 'userlist' }" class="text-white"><span class="icon"><!--🔔--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/user-list.gif`" /></span>User List</a>
        <a href="#home" data-route="home" class="text-white" @click.prevent="setActiveNav('home')"
          :class="{ active: activeNav === 'home' }"><span class="icon"><!--🏠--> <img class="sidebar-ic"
              :src="`/images/badges/animated/150X150px/17.gif`" /></span>Home</a>
        <a href="#messages" data-route="messages" @click.prevent="setActiveNav('messages')"
          :class="{ active: activeNav === 'messages' }" class="text-white"><span class="icon"><!--💬--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/chat.gif`" /></span>Messages/Calls</a>
        <a href="#notifications" data-route="notifications" @click.prevent="setActiveNav('notifications')"
          :class="{ active: activeNav === 'notifications' }" class="text-white"><span class="icon"><!--🔔--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/notification.gif`" /></span>Notifications</a>
        <a href="#nearby" data-route="nearby" @click.prevent="setActiveNav('nearby')"
          :class="{ active: activeNav === 'nearby' }" class="text-white"><span class="icon"><!--📍--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/location.gif`" /></span>Nearby People</a>
        <a href="#friends" data-route="friends" @click.prevent="setActiveNav('friends')"
          :class="{ active: activeNav === 'friends' }" class="text-white"><span class="icon"><!--👥--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/my-friends.gif`" /></span>My Friends</a>
        <a href="#crush" data-route="crush" @click.prevent="setActiveNav('crush')"
          :class="{ active: activeNav === 'crush' }" class="text-white"><span class="icon"><!--⭐--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/crush-list.gif`" /></span>Crush List</a>
        <a href="#search" data-route="search" @click.prevent="setActiveNav('search')"
          :class="{ active: activeNav === 'search' }" class="text-white"><span class="icon"><!--🔍--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/SEARCH.gif`" /></span>Search</a>
        <a href="#new-photos" data-route="new-photos" @click.prevent="setActiveNav('new-photos')"
          :class="{ active: activeNav === 'new-photos' }" class="text-white"><span class="icon"><!--🖼--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/public-photos.gif`" /></span>New Photos</a>
        <a href="#new-video" data-route="new-video" @click.prevent="setActiveNav('new-video')"
          :class="{ active: activeNav === 'new-video' }" class="text-white"><span class="icon"><!--🎞--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/video-call.gif`" /></span>New Videos</a>
        <a href="#meet-events" data-route="meet-events" @click.prevent="setActiveNav('meet-events')"
          :class="{ active: activeNav === 'meet-events' }" class="text-white"><span class="icon"><!--📅--> <img
              class="sidebar-ic"
              :src="`/images/badges/animated/150X150px/Meet-Event-Calendar-150x150px.png`" /></span>Meet Events</a>
        <a href="#club-events" data-route="club-events" @click.prevent="setActiveNav('club-events')"
          :class="{ active: activeNav === 'club-events' }" class="text-white"><span class="icon"><!--🏷--> <img
              class="sidebar-ic" :src="`/images/badges/animated/150X150px/CLUB-events-150x150px.png`" /> </span>Club
          Events</a>
          <a href="#membership" data-route="membership" @click.prevent="setActiveNav('membership')"
          :class="{ active: activeNav === 'membership' }" class="text-white"><span class="icon"><!--🏷--> <img
              class="sidebar-ic" :src="`/images/badges/animated/150X150px/elite.gif`" /> </span>Membership</a>
        <a href="#video-roullet" data-route="video-roullet" @click.prevent="setActiveNav('video-roullet')"
          :class="{ active: activeNav === 'video-roullet' }" class="text-white"><span class="icon"> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/video-roulette-available.gif`" /></span>Video
          Roulette</a>
        <a href="#live" data-route="live" @click.prevent="setActiveNav('live')"
          :class="{ active: activeNav === 'live' }" class="text-white"><span class="icon"> <img class="sidebar-ic"
              :src="`/images/badges/animated/50X50px/live-oncam.gif`" /></span>Live / On Cam</a>
        <a  class="text-white" @click="logout()"><span class="icon" > <img class="sidebar-ic"
              :src="`/images/badges/animated/150X150px/19.gif`" /></span>Logout <span class="btn-loader" v-if="is_logout_loading"></span></a>
      </nav>
      <div class="spacer" />
      <button class="dash-button primary" id="dash-buttonUpload" @click="fakeUpload">＋ Upload/Post</button>
    </aside>

    <!-- MAIN COLUMN -->
    <div class="dashboard-main">
      <div class="dash-logo">
        <div class="brand">
          <div class="brand-logo" title="Swap src to your local path once deployed" />
          <h1 class="text-white">LinkSwingers</h1>
        </div>
        <button class="toggle-side-btn" @click.stop="openSidebar"><svg xmlns="http://www.w3.org/2000/svg" width="16"
            height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg></button>
      </div>
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
            <a href="#meet-events" class="pill text-white" @click.prevent="setActiveNav('meet-events')">📅 Meet
              events</a>
            <a href="#club-events" class="pill text-white" @click.prevent="setActiveNav('club-events')">🏷 Club
              events</a>
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

        <section id="view-list" :hidden="activeNav !== 'userlist'">
          <div class="quickbar" role="region" aria-label="Quick Search">
            <div class="controls">
              <div class="quc-search">
                <div class="qtitle">Quick Search</div>
                <div style="display: flex; gap: 10px; align-items: flex-end;">
                  <input id="q" v-model="searchTxt" class="input" type="search" placeholder="Search by nickname…"
                    style="width: 100%; min-width: 300px;" />
                  <button class="btn primary" style="white-space: nowrap; height: fit-content;"
                    @click="searchTapped()">Search</button>
                  <a class="btn primary" href="#" aria-label="Go to Advanced Search" data-bs-toggle="modal"
                    data-bs-target="#advancesearchmodal" style="white-space: nowrap; height: fit-content;">Advanced
                    Search</a>
                </div>
              </div>
            </div>
          </div>



          <div id="grid" class="grid user-grid" aria-live="polite">
            <article class="card" v-for="user in users" :key="user.user_id">
              <div class="media" @click="openProfile(user)">
                <img :src="getImagePath(user)" alt="Maya" loading="lazy" decoding="async">
                <span class="online-dot" title="Online now" v-if="onlineUsers.includes(user.user_id ?? 0)"></span>
                <span class="badge-elite"><img :src="getmembershipIcon(user)"></span>

              </div>
              <div class="content">
                <div class="row1">
                  <div>
                    <div class="name d-flex flex-wrap align-items-center">{{ user.nick_name }}
                      <ul class="nm-icons">
                        <li><img :src="getmembershipIcon(user)" alt="Message" class="rounded-circle" /></li>
                        <li><img v-if="user.is_meet_verified" src="/images/badges/animated/150X150px/MEET-VERIFYED.gif"
                            alt="Message" class="rounded-circle" /></li>
                        <li><img v-if="user.is_photo_verified"
                            src="/images/badges/animated/150X150px/FLAG-ANIMATION.gif" alt="Message"
                            class="rounded-circle" /></li>
                      </ul>
                    </div>
                    <div class="meta">{{ user.town }} • {{ getDistance(user) }} miles </div>
                  </div>
                </div>
                <!--<div class="chips">
                  <span class="chip" v-for="interest in user.interests?.slice(0, 3)">{{ interest.interest_name }}</span>
                  <button class="chip" v-if="(user.interests?.length ?? 0) > 3" @click="openProfile(user)"> +{{
                    (user.interests?.length ?? 0) - 3 }} more</button>
                </div>-->
                <div class="chips">
                  <span style="color: white;">{{ user.profile_status }}</span>
                </div>
                <div class="actions">
                  <button class="action" data-action="message" aria-label="Message" @click="openChat(user)"><span
                      class="act-icon"><img src="/images/badges/animated/50X50px/chat.gif" alt="Message"
                        class="rounded-circle" style="width: 25px; height: 25px; object-fit: cover" /></span>
                    Message</button>
                  <button @click="showCodeAlert(user.user_id ?? 0,false)" class="action" data-action="call" aria-label="Voice call"><span class="act-icon">
                      <img src="/images/badges/animated/50X50px/call.gif" alt="Message" class="rounded-circle"
                        style="width: 25px; height: 25px; object-fit: cover" />
                    </span>Call</button>
                  <button @click="showCodeAlert(user.user_id ?? 0,true)" class="action primary" data-action="video" aria-label="Video call"><span class="act-icon"><img
                        src="/images/badges/animated/50X50px/video-call.gif" alt="Message" class="rounded-circle"
                        style="width: 25px; height: 25px; object-fit: cover" />
                    </span>Video</button>
                </div>
              </div>
            </article>
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
                  <div style="flex:1" class="text-white">Alex & Sam <div class="muted">Hey, free tonight?</div>
                  </div>
                  <button class="dash-button">Open</button>
                </div>
                <div class="item">
                  <div class="avatar" />
                  <div style="flex:1" class="text-white">Jess <div class="muted">Send verification call PIN: 4321</div>
                  </div>
                  <button class="dash-button">Call</button>
                </div>
              </div>

              <div class="dashboard-card" style="margin-top:12px">
                <h2 class="text-white">Start a New Chat / Call</h2>
                <div class="composer">
                  <input type="text" placeholder="Search user…" class="text-white" />
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
              <p class="muted" style="margin-top:8px">Self‑view is not mirrored (no flip). Implement real media streams
                later (Janus/WebRTC).</p>
            </div>
          </div>
        </section>

        <!-- SHORTLIST -->
        <section id="view-crush" :hidden="activeNav !== 'crush'">
          <div class="dashboard-card glow">
            <h2 class="text-white" style="margin-bottom: 8px;">Crush List</h2>
            <p class="muted" style="margin-bottom: 16px;">Save profiles you like (not friends yet). Later this becomes
              “Add to Crush List” on profile dashboard-cards.</p>
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
            <p class="muted" style="margin-bottom: 16px;">People within your selected radius. (Hook to geolocation +
              distance filter.)</p>
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
            <p class="muted" style="margin-top:8px">Hook this to your "who’s live" data source (WebRTC presence /
              signalling). Thumbnails are placeholders.</p>
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
        <a href="#home" data-route="home" class="nav-item" :class="{ active: activeNav === 'home' }"
          @click.prevent="setActiveNav('home')"><img src="/images/badges/animated/50X50px/home.gif" alt="Home"
            class="badge-icon" /></a>
        <a href="#search" data-route="search" class="nav-item" :class="{ active: activeNav === 'search' }"
          @click.prevent="setActiveNav('search')"><img src="/images/badges/animated/50X50px/search.gif" alt="Search"
            class="badge-icon" /></a>
        <a href="#upload" id="mUpload" @click.prevent="fakeUpload" class="nav-item"><img
            src="/images/badges/animated/50X50px/upload-media.gif" alt="Post" class="badge-icon" /></a>
        <a href="#friends" data-route="friends" class="nav-item" :class="{ active: activeNav === 'friends' }"
          @click.prevent="setActiveNav('friends')"><img src="/images/badges/animated/50X50px/my-friends.gif"
            alt="My Friends" class="badge-icon" /></a>
        <a href="#notifications" data-route="notifications" class="nav-item"
          :class="{ active: activeNav === 'notifications' }" @click.prevent="setActiveNav('notifications')"><img
            src="/images/badges/animated/50X50px/notification.gif" alt="Notifications" class="badge-icon" /></a>
        <a href="#messages" data-route="messages" class="nav-item" :class="{ active: activeNav === 'messages' }"
          @click.prevent="setActiveNav('messages')"><img src="/images/badges/animated/50X50px/chat.gif" alt="Chats"
            class="badge-icon" /></a>
      </nav>
    </div>
    <div class="overlay-sidebar" :class="{ active: isSidebarOpen }"></div>
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
            <input type="number" value="18" class="text-white" />
            <input type="number" value="99" class="text-white" />
          </div>
        </div>
        <div class="field">
          <label class="text-white">Distance</label>
          <input type="number" value="50" class="text-white" />
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
          <input type="text" placeholder="e.g. hiking, movies" class="text-white" />
        </div>
      </div>
      <div class="dash-row" style="margin-top: 16px;">
        <button class="dash-button primary text-white">Apply Filters</button>
        <button class="dash-button text-white">Clear Filters</button>
      </div>
    </div>
  </div>








  <div class="modal fade ad-search-modal" id="advancesearchmodal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content bg-dark text-white">
        <!-- Header -->

        <div class="modal-header ad-sc-header border-0">
          <h2 class="modal-title text-white">Advance Search</h2>
          <p>Dial in exactly what you’re after. Choose one or many options below and tap Search.</p>
          <button class="close text-danger fs-3 fw-bold" type="button" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body ad-sc-body">
          <div id="advForm">
            <div class="group-fd">
              <div class="label">I am looking for</div>
              <div class="chips">
                <label class="chip"><input type="checkbox" v-model="lookingFor" name="looking_for" value="Man">
                  Man</label>
                <label class="chip"><input type="checkbox" v-model="lookingFor" name="looking_for" value="Woman">
                  Woman</label>
                <label class="chip"><input type="checkbox" v-model="lookingFor" name="looking_for" value="Couple MF">
                  Couple MF</label>
                <label class="chip"><input type="checkbox" v-model="lookingFor" name="looking_for" value="Couple MM">
                  Couple MM</label>
                <label class="chip"><input type="checkbox" v-model="lookingFor" name="looking_for" value="Couple FF">
                  Couple FF</label>
                <label class="chip"><input type="checkbox" v-model="lookingFor" name="looking_for" value="TS/TV">
                  TS/TV</label>
              </div>
            </div>

            <div class="group-fd">
              <div class="label">Who wants to meet</div>
              <div class="chips">
                <label class="chip"><input type="checkbox" v-model="whoMeets" name="who_meets" value="Man"
                    :disabled="lookingFor.length === 0"> Man</label>
                <label class="chip"><input type="checkbox" v-model="whoMeets" name="who_meets" value="Woman"
                    :disabled="lookingFor.length === 0"> Woman</label>
                <label class="chip"><input type="checkbox" v-model="whoMeets" name="who_meets" value="Couple MF"
                    :disabled="lookingFor.length === 0"> Couple MF</label>
                <label class="chip"><input type="checkbox" v-model="whoMeets" name="who_meets" value="Couple MM"
                    :disabled="lookingFor.length === 0"> Couple MM</label>
                <label class="chip"><input type="checkbox" v-model="whoMeets" name="who_meets" value="Couple FF"
                    :disabled="lookingFor.length === 0"> Couple FF</label>
                <label class="chip"><input type="checkbox" v-model="whoMeets" name="who_meets" value="TS/TV"
                    :disabled="lookingFor.length === 0"> TS/TV</label>
              </div>
            </div>

            <div class="group-fd">
              <div class="label">Age range</div>
              <div class="row">
                <div class="col-md-6">
                  <input class="input" type="number" name="age_min" v-model.number="ageMin" @blur="onAgeBlur()"
                    :min="MIN_AGE" :max="MAX_AGE" placeholder="Min (18)" />
                </div>
                <div class="col-md-6">
                  <input class="input" type="number" name="age_max" v-model.number="ageMax" @blur="onAgeBlur()"
                    :min="MIN_AGE" :max="MAX_AGE" placeholder="Max (99)" />
                </div>
              </div>
              <div class="hint">Allowed: 18 to 99.</div>
            </div>

            <div class="group-fd">
              <div class="label">Near town / postcode</div>
              <div class="inline-check"><label class="toggle"><input type="checkbox" id="use_my_location"
                    name="use_my_location" v-model="current_loc"> 📍 Use my location</label></div>
              <div class="row">
                <div class="col-md-6 pb-2">
                  <!-- <input class="input" type="text" name="near" placeholder="Enter town or postcode" /> -->
                  <Multiselect class="input" v-model="selectedTown" :options="allTowns" :multiple="false"
                    :close-on-select="true" placeholder="Enter town or postcode" :loading="is_town_loading"
                    @search-change="fetchTownsPostCodes" label="name" track_by="id" :internal-search="false" />
                </div>
                <div class="col-md-6 pb-2">
                  <select class="select" v-model="radius" name="distance">
                    <option value="0.25">Within ¼ mile</option>
                    <option value="0.5">Within ½ mile</option>
                    <option value="1">Within 1 mile</option>
                    <option value="2">Within 2 miles</option>
                    <option value="5">Within 5 miles</option>
                    <option value="10">Within 10 miles</option>
                    <option value="25">Within 25 miles</option>
                    <option value="50">Within 50 miles</option>
                    <option value="100">Within 100 miles</option>
                    <option value="250">Within 250 miles</option>
                    <option value="500">Within 500 miles</option>
                    <option value="1000">Within 1000 miles</option>
                    <option value="1500+">Within 1500+ miles</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="group-fd">
              <div class="label">More options</div>
              <div class="toggles">
                <label class="toggle">
                  <input type="checkbox" v-model="lookingToMeetToday" name="meet_today" />
                  Looking to meet today
                </label>
                <label class="toggle">
                  <input type="checkbox" v-model="is_photo_verified" name="photo_verified" />
                  Photo verified
                </label>
                <label class="toggle">
                  <input type="checkbox" v-model="is_meet_verified" name="meet_verified" />
                  Meet verified
                </label>
                <label class="toggle">
                  <input type="checkbox" v-model="with_public_media" name="public_photo" />
                  With public photo/video
                </label>
                <label class="toggle">
                  <input type="checkbox" v-model="premium_only" name="premium_only" />
                  Premium members only
                </label>
                <label class="toggle">
                  <input type="checkbox" v-model="has_profile_description" name="has_description" />
                  Has profile description
                </label>
                <label class="toggle">
                  <input type="checkbox" v-model="with_media_gallery" name="has_gallery" />
                  With media gallery
                </label>
                <label class="toggle">
                  <input type="checkbox" v-model="recently_active" name="recently_active" />
                  Recently active
                </label>
                <label class="toggle">
                  <input type="checkbox" v-model="is_online" name="online_now" />
                  Online now
                </label>
              </div>

            </div>

            <div class="actions">
              <button type="submit" class="btn primary" @click="fetchUsersList(true)">Search</button>
              <button type="reset" class="btn ghost" @click="resetSearch">Reset</button>
              <button type="button" class="btn" @click="saveSearch">💾 Save this search</button>
            </div>
            <div class="footnote">Tip: You can tick multiple options in the lists above.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { UsersModel } from '~/composables/models'
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import type { CallsModel } from '~/composables/websocketModels';
import Swal from 'sweetalert2'
const id_store = idStore()
const route = useRoute()
const router = useRouter()
const drawerOpen = ref(false)
const isMobile = ref(false)
const showAdvancedSearch = ref(false)
const activeNav = ref("home")
const login_store = useLoginStore();
const searchTxt = ref('')
const users = ref([] as UsersModel.ProfileDetailsResponseModel[])
const eventBus = useMittEmitter()
const onlineUsers = ref([] as number[])
const isWSConnected = ref(false);

const lookingFor = ref<Array<string>>([])   // binds to "I am looking for"
const whoMeets = ref<Array<string>>([])   // binds to "Who wants to meet"

// constants
const MIN_AGE = 18
const MAX_AGE = 99

// reactive age values: use numbers (default to 18/99 as per your UI)
const ageMin = ref<number | null>(18)
const ageMax = ref<number | null>(99)

const selectedTown = ref<UsersModel.FetchTownPostCodesResponseModel | null>(null);
const allTowns = ref<UsersModel.FetchTownPostCodesResponseModel[]>([]);
const is_town_loading = ref(false);

// radius selected from dropdown (as string)
const radius = ref<string | null>('0.25')

const current_loc = ref(false)
const lookingToMeetToday = ref(false) // still sent separately
const is_photo_verified = ref(false)
const is_meet_verified = ref(false)
const with_public_media = ref(false)
const with_media_gallery = ref(false)
const has_profile_description = ref(false)
const recently_active = ref(false)
const premium_only = ref(false)
const is_online = ref(false)
const STORAGE_KEY = 'filters_search_state'
const { $bootstrap } = useNuxtApp();
var advanceModelSub: any = null
const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)
const is_logout_loading = ref(false);

// Computed numeric version for backend payload
var radiusMiles = computed<number | null>(() => {
  if (!radius.value) return null

  // handle "1500+"
  if (radius.value.endsWith('+')) {
    return parseFloat(radius.value) || 1500
  }

  // convert normal values
  const num = parseFloat(radius.value)
  return Number.isNaN(num) ? null : num
})

const routeTitle = computed(() => {
  const path = route.path.split('/').pop() || 'home'
  return path.charAt(0).toUpperCase() + path.slice(1)
})

function setActive(r: string) {
  const targetRoute = r === 'home' ? '/dashboard' : `/dashboard/${r}`
  router.push(targetRoute)
}

async function setActiveNav(nav: string) {

  if(isSidebarOpen.value)
  {
     isSidebarOpen.value = false
  }

  if (nav === 'userlist') {
    activeNav.value = nav
    window.location.hash = nav
    fetchUsersList()
  }
  else if (nav === 'profile') {
    await navigateTo(`/profile`)
  }
  else if (nav === 'messages') {
    openChatOnly()
  }
  else if (nav === 'membership') {
    await navigateTo(`/membership`)
  }
  else {
    activeNav.value = nav
    window.location.hash = nav
  }

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



const fetchallusers = async () => {
  const api_url = getUrl(RequestURL.fetchallusers);
  const { data: users, error: cat_error } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      page: 0,
      search: searchTxt.value,
      user_id: login_store.getUserDetails?.user_id ?? 0,
     
    },
    headers: {
      "content-type": "application/json"
    }
  });
  return users.value?.result ?? []
}
let hash = route.hash
activeNav.value = hash.slice(1) || 'home'

if (hash === '#userlist') {
  console.log('Fetching all users for user list view...')
  users.value = await fetchallusers() as UsersModel.ProfileDetailsResponseModel[]
}

async function fetchUsersList(fromAdvance = false) {
  const api_url = getUrl(RequestURL.fetchallusers);
  let latitude_r =  selectedTown.value?.latitude ?? latitude.value ?? 0
  let longitude_r = selectedTown.value?.longitude ?? longitude.value ?? 0
  let radius_value = radiusMiles.value ?? 0

  if (latitude_r === 0 && longitude_r === 0) {
    radius_value = 0
  }
  var body = {
     page: 0,
      search: searchTxt.value,
      user_id: login_store.getUserDetails?.user_id ?? 0,
  }
  if (fromAdvance)
  {
     body =  {
      page: 0,
      search: searchTxt.value,
      user_id: login_store.getUserDetails?.user_id ?? 0,
      looking_for: lookingFor.value,
      who_wants_to_meet: whoMeets.value,
      age_min: ageMin.value ?? MIN_AGE,
      age_max: ageMax.value ?? MAX_AGE, 
      latitude: latitude_r,
      longitude: longitude_r,
      radius: radius_value,
      looking_to_meet_today: lookingToMeetToday.value,
      is_photo_verified: is_photo_verified.value,
      is_meet_verified: is_meet_verified.value,
      with_public_media: with_public_media.value,
      with_media_gallery: with_media_gallery.value,
      has_profile_description: has_profile_description.value,
      recently_active: recently_active.value,
      premium_only: premium_only.value,
      is_online: is_online.value,
    }
  }
  advanceModelSub.hide()
  let response = await $fetch<SuccessError<UsersModel.LoginRequestModel>>(api_url, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.success) {
    users.value = response.result as UsersModel.ProfileDetailsResponseModel[];
    checkuseronline()
    
  }
  else {
    users.value = []
    showToastError(response.message ?? "Something went wrong");
  }
}

function fetchTownsPostCodes(query: string) {
  if (query.length === 0 || is_town_loading.value) {
    allTowns.value = []
    return;
  }
  let api_url = getUrl(RequestURL.fetchTownsPostCodes);
  is_town_loading.value = true;
  allTowns.value = []
  $fetch<SuccessError<UsersModel.SignUpResponseModel>>(api_url, {
    method: 'POST',
    body: { "search": query },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
 is_town_loading.value = false;
    if (response.success) {
      allTowns.value = (response.result ?? []) as UsersModel.FetchTownPostCodesResponseModel[]
    }
  }).catch((error) => {
    is_town_loading.value = false;
  });
}

async function searchTapped() {
  await fetchUsersList()
}

watch(lookingFor, () => {

  if (lookingFor.value.length === 0) {
    whoMeets.value = []
  }

});
watch(current_loc, () => {

  if (current_loc.value) {
    selectedTown.value = null
    navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude.value = position.coords.latitude
      longitude.value = position.coords.longitude
    },
    (err) => {
      current_loc.value = false
      latitude.value = null
      longitude.value = null
    }
  )
  }

});
watch(selectedTown, () => {

  if (selectedTown.value !== null) {
    current_loc.value = false
    latitude.value = null
     longitude.value = null
    
  }

});


function resetSearch() {
  localStorage.removeItem(STORAGE_KEY)

  lookingFor.value = []
  whoMeets.value = []

  ageMin.value = MIN_AGE
  ageMax.value = MAX_AGE

  latitude.value = null
  longitude.value = null
  selectedTown.value = null
  radius.value = '0.25'
  lookingToMeetToday.value = false
  is_photo_verified.value = false
  is_meet_verified.value = false
  with_public_media.value = false
  with_media_gallery.value = false
  has_profile_description.value = false
  recently_active.value = false
  premium_only.value = false
  is_online.value = false
  current_loc.value = false

}

function saveSearch() {
  const payload = {
    looking_for: lookingFor.value,
    who_wants_to_meet: whoMeets.value,
    age_min: ageMin.value,
    age_max: ageMax.value,
    townPostCode: selectedTown.value,
    latitude: latitude.value ?? null,
    longitude: longitude.value ?? null,
    radius: radius.value,
    looking_to_meet_today: lookingToMeetToday.value,
    is_photo_verified: is_photo_verified.value,
    is_meet_verified: is_meet_verified.value,
    with_public_media: with_public_media.value,
    with_media_gallery: with_media_gallery.value,
    has_profile_description: has_profile_description.value,
    recently_active: recently_active.value,
    premium_only: premium_only.value,
    is_online: is_online.value,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

// optional: if user clears the field, we'll set null so buildPayload can omit it
// helper: clamp a value and ensure integer
function clampInt(val: number, min = MIN_AGE, max = MAX_AGE) {
  const n = Math.trunc(Number(val) || 0)
  if (Number.isNaN(n)) return min
  return Math.min(Math.max(n, min), max)
}

// called on blur to enforce allowed range and integerness
function onAgeBlur() {
  if (ageMin.value != null) ageMin.value = clampInt(ageMin.value)
  if (ageMax.value != null) ageMax.value = clampInt(ageMax.value)
  // ensure min <= max; if not, adjust min to <= max
  if (ageMin.value != null && ageMax.value != null && ageMin.value > ageMax.value) {
    // choose a sensible correction: set min = max
    ageMin.value = ageMax.value
  }

  console.log('Search filters reset. onAgeBlur')
}

// computed validation error (empty string / null when ok)
const ageError = computed(() => {
  if (ageMin.value == null && ageMax.value == null) return ''
  if (ageMin.value != null && (ageMin.value < MIN_AGE || ageMin.value > MAX_AGE)) {
    return `Min age must be between ${MIN_AGE} and ${MAX_AGE}.`
  }
  if (ageMax.value != null && (ageMax.value < MIN_AGE || ageMax.value > MAX_AGE)) {
    return `Max age must be between ${MIN_AGE} and ${MAX_AGE}.`
  }
  if (ageMin.value != null && ageMax.value != null && ageMin.value > ageMax.value) {
    return 'Min age cannot be greater than Max age.'
  }
  return ''
})

function getDistance(user: UsersModel.ProfileDetailsResponseModel): string {
  let lat = login_store.getUserDetails?.latitude ?? 0
  let lon = login_store.getUserDetails?.longitude ?? 0
  let distance = getDistanceFromLatLonInMiles(
    user.latitude ?? 0,
    user.longitude ?? 0,
    lat,
    lon)
  return distance.toFixed(2) as string
}
function getmembershipIcon(user: UsersModel.ProfileDetailsResponseModel): string {
  let tier_name = user.tier_name ?? ''
  if (tier_name.includes("Elite")) return "/images/badges/elite.gif";
  if (tier_name.includes("Basic+")) return "/images/badges/basic.gif";
  if (tier_name.includes("Plus")) return "/images/badges/plus.gif";
  return "/images/badges/free.gif";
}

function getImagePath(user: UsersModel.ProfileDetailsResponseModel): string {
  let profile_image = user.profile_image ?? ''
  if (profile_image.length !== 0) {
    return (user.media_path ?? '') + profile_image
  }
  let profile_type = user.profile_type ?? ''
  if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png";
  if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png";
  if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png";
  if (profile_type === 'Man') return "/images/profile-placeholders/man.png";
  return "/images/profile-placeholders/man.png"
}

async function openProfile(user: UsersModel.ProfileDetailsResponseModel) {
  await navigateTo(`/user-profile/${user.user_id}`)
}
async function openChatOnly() {
  await navigateTo(`/chat/`)
}
async function openChat(user: UsersModel.ProfileDetailsResponseModel) {
  await navigateTo(`/chat/${user.user_id}`)
}
function checkuseronline() {
  if (isWSConnected.value) {
    let user_ids = users.value.map(it => it.user_id ?? 0)
    if (user_ids.length > 0) {
      let groupmodel = new GroupEventSocketModel()
      groupmodel.admin_id = id_store.getDeviceId
      groupmodel.event_name = "add_user_to_group"
      groupmodel.user_ids = user_ids ?? []
      groupmodel.socket_id = id_store.getDeviceId
      sendmsgtoworker(groupmodel, true)
    }

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
        user_id: login_store.getUserDetails?.user_id ?? 0,
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

onMounted(() => {
  // Handle hash-based navigation

  advanceModelSub = new ($bootstrap as any).Modal(document.getElementById('advancesearchmodal'));
  console.log('onMounted...dashboard')
  isWSConnected.value = isSocketConnected()
  eventBus.on('socketConnection', (is_connected) => {
    isWSConnected.value = is_connected
    checkuseronline()
  })
  eventBus.on('onlineUserIds', (onlineUserIds) => {
    onlineUsers.value = onlineUserIds
  })

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

  let hash = route.hash
  activeNav.value = hash.slice(1) || 'home'

  window.location.hash = activeNav.value

  console.log(`Initial navigation to ${activeNav.value}`)

  // Set initial state based on hash
  //handleHashChange()

  // Listen for hash changes
  //window.addEventListener('hashchange', handleHashChange)

  checkMobile()
  window.addEventListener('resize', checkMobile)

  // Cleanup listener on unmount
  // onUnmounted(() => {
  //   //window.removeEventListener('hashchange', handleHashChange)
  // })
  if (isWSConnected.value) {
    checkuseronline()
  }

  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const data = JSON.parse(saved)
      // Restore only if keys exist

      lookingFor.value = data.looking_for ?? []
      whoMeets.value = data.who_wants_to_meet ?? []
      ageMin.value = data.age_min ?? MIN_AGE
      ageMax.value = data.age_max ?? MAX_AGE

       current_loc.value = false
      if (data.townPostCode) {
        selectedTown.value = data.townPostCode
      }
      if (data.latitude && data.longitude) {
        latitude.value = data.latitude
        longitude.value = data.longitude
        current_loc.value = true
      }
      radius.value = data.radius ?? '0.25'

      lookingToMeetToday.value = data.looking_to_meet_today ?? false
      is_photo_verified.value = data.is_photo_verified ?? false
      is_meet_verified.value = data.is_meet_verified ?? false
      with_public_media.value = data.with_public_media ?? false
      with_media_gallery.value = data.with_media_gallery ?? false
      has_profile_description.value = data.has_profile_description ?? false
      recently_active.value = data.recently_active ?? false
      premium_only.value = data.premium_only ?? false
      is_online.value = data.is_online ?? false

      console.log('✅ Filters restored from localStorage', data.looking_for)
    } catch (err) {
      console.warn('Failed to load saved filters:', err)
    }
  }


})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
  eventBus.off('socketConnection')
  eventBus.off('onlineUserIds')
   eventBus.off('callDeclineAlert')
  eventBus.off('callAcceptAlert')
  console.log('beforemount...dashboard')
})

onUnmounted(() => {

})





const isSidebarOpen = ref(false);

function openSidebar() {
  isSidebarOpen.value = true;
}

function closeSidebar() {
  isSidebarOpen.value = false;
}

function switchView(view) {
  currentView.value = view;
  closeSidebar(); // auto-close sidebar after click (mobile UX)
}

function handleBodyClick() {
  if (isSidebarOpen.value) closeSidebar();
}

function showCodeAlert(to_id:number,is_video: boolean) {
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
      validateCall(to_id,result.value ?? '', is_video)
    }
  });
}

async function validateCall(to_id:number,code: string, is_video: boolean) {
  const api_url = getUrl(RequestURL.validateCall);
  await $fetch<SuccessError<CallsModel.ValidateCallResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      "from_id": login_store.getUserDetails?.user_id ?? 0,
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



</script>
