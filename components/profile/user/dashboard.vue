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
              class="sidebar-ic" :src="`/images/badges/user.png`" /></span>My Profile</a>
        <a href="#userlist" data-route="notifications" @click.prevent="setActiveNav('userlist')"
          :class="{ active: activeNav === 'userlist' }" class="text-white"><span class="icon"><!--🔔--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/user-list.gif`" /></span>User List</a>
        <a href="#home" data-route="home" class="text-white" @click.prevent="setActiveNav('home')"
          :class="{ active: activeNav === 'home' }"><span class="icon"><!--🏠--> <img class="sidebar-ic"
              :src="`/images/badges/home.png`" /></span>Home</a>
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
              class="sidebar-ic" :src="`/images/badges/search.png`" /></span>Search</a>
        <a href="#new-photos" data-route="new-photos" @click.prevent="setActiveNav('new-photos')"
          :class="{ active: activeNav === 'new-photos' }" class="text-white"><span class="icon"><!--🖼--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/public-photos.gif`" /></span>New Photos</a>
        <a href="#new-video" data-route="new-video" @click.prevent="setActiveNav('new-video')"
          :class="{ active: activeNav === 'new-video' }" class="text-white"><span class="icon"><!--🎞--> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/video-call.gif`" /></span>New Videos</a>
        <a href="#meet-events" data-route="meet-events" @click.prevent="setActiveNav('meet-events')"
          :class="{ active: activeNav === 'meet-events' }" class="text-white"><span class="icon"><!--📅--> <img
              class="sidebar-ic" :src="`/images/badges/calender.png`" /></span>Meet Events</a>
        <a href="#club-events" data-route="club-events" @click.prevent="setActiveNav('club-events')"
          :class="{ active: activeNav === 'club-events' }" class="text-white"><span class="icon"><!--🏷--> <img
              class="sidebar-ic" :src="`/images/badges/club.png`" /> </span>Club Events</a>
        <a href="#video-roullet" data-route="video-roullet" @click.prevent="setActiveNav('video-roullet')"
          :class="{ active: activeNav === 'video-roullet' }" class="text-white"><span class="icon"> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/video-roulette-available.gif`" /></span>Video Roullet</a>
        <a href="#live" data-route="live" @click.prevent="setActiveNav('live')"
          :class="{ active: activeNav === 'live' }" class="text-white"><span class="icon"> <img
              class="sidebar-ic" :src="`/images/badges/animated/50X50px/live-oncam.gif`" /></span>Live / On Cam</a>
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
                <input id="q" class="input" type="search" placeholder="Search by nickname…" />
              </div>
              <div class="quc-frm">
                <select id="gender" class="select" aria-label="Gender">
                  <option value="">All genders</option>
                  <option>Woman</option>
                  <option>Man</option>
                  <option>Couple</option>
                  <option>Trans</option>
                </select>
                <select id="distance" class="select" aria-label="Distance">
                  <option value="">Any distance</option>
                  <option value="10">≤ 10 km</option>
                  <option value="25">≤ 25 km</option>
                  <option value="50">≤ 50 km</option>
                  <option value="100">≤ 100 km</option>
                </select>
                <label class="check"><input id="nearby" type="checkbox" /> Nearby</label>
                <label class="check"><input id="onlyVerified" type="checkbox" /> Verified members</label>
                <a class="btn primary" href="advanced-search.html" aria-label="Go to Advanced Search">Advanced
                  Search</a>
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
                    <div class="name">{{ user.nick_name }}</div>
                    <div class="meta">{{ user.town }} • {{ getDistance(user) }} km </div>
                  </div>
                </div>
                <div class="chips">
                  <span class="chip" v-for="interest in user.interests?.slice(0, 3)">{{ interest.interest_name }}</span>
                  <button class="chip" v-if="(user.interests?.length ?? 0) > 3" @click="openProfile(user)"> +{{
                    (user.interests?.length ?? 0) - 3 }} more</button>
                </div>
                <div class="actions">
                  <button class="action" data-action="message" aria-label="Message" @click="openChat(user)"><span
                      class="act-icon"><img src="/images/badges/animated/50X50px/chat.gif" alt="Message" class="rounded-circle"
                        style="width: 15px; height: 15px; object-fit: cover" /></span> Message</button>
                  <button class="action" data-action="call" aria-label="Voice call"><span class="act-icon">
                    <img src="/images/badges/animated/50X50px/call.gif" alt="Message" class="rounded-circle"
                        style="width: 15px; height: 15px; object-fit: cover" />
                    </span>Call</button>
                  <button class="action primary" data-action="video" aria-label="Video call"><span class="act-icon"><img src="/images/badges/animated/50X50px/video-call.gif" alt="Message" class="rounded-circle"
                        style="width: 15px; height: 15px; object-fit: cover" />
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
          @click.prevent="setActiveNav('home')">🏠<!--<small>Home</small>--></a>
        <a href="#search" data-route="search" class="nav-item" :class="{ active: activeNav === 'search' }"
          @click.prevent="setActiveNav('search')">🔍<!--<small>Search</small>--></a>
        <a href="#upload" id="mUpload" @click.prevent="fakeUpload" class="nav-item">＋<!--<small>Post</small>--></a>
        <a href="#friends" data-route="friends" class="nav-item" :class="{ active: activeNav === 'friends' }"
          @click.prevent="setActiveNav('messages')">👥<!--<small>My Friends</small>--></a>
        <a href="#notifications" data-route="notifications" class="nav-item"
          :class="{ active: activeNav === 'notifications' }"
          @click.prevent="setActiveNav('notifications')">🔔<!--<small>My Friends</small>--></a>
        <a href="#messages" data-route="messages" class="nav-item" :class="{ active: activeNav === 'messages' }"
          @click.prevent="setActiveNav('messages')">💬<!--<small>Chats</small>--></a>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { UsersModel } from '~/composables/models'
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
const routeTitle = computed(() => {
  const path = route.path.split('/').pop() || 'home'
  return path.charAt(0).toUpperCase() + path.slice(1)
})

function setActive(r: string) {
  const targetRoute = r === 'home' ? '/dashboard' : `/dashboard/${r}`
  router.push(targetRoute)
}

async function setActiveNav(nav: string) {

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
      user_id: login_store.getUserDetails?.user_id ?? 0
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

async function fetchUsersList() {
  const api_url = getUrl(RequestURL.fetchallusers);
  let response = await $fetch<SuccessError<UsersModel.LoginRequestModel>>(api_url, {
    method: 'POST',
    body: {
      page: 0,
      search: searchTxt.value,
      user_id: login_store.getUserDetails?.user_id ?? 0
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.success) {
    users.value = response.result as UsersModel.ProfileDetailsResponseModel[];
    checkuseronline()
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}

function getDistance(user: UsersModel.ProfileDetailsResponseModel): string {
  let lat = login_store.getUserDetails?.latitude ?? 0
  let lon = login_store.getUserDetails?.longitude ?? 0
  let distance = getDistanceFromLatLonInKm(
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
    let groupmodel = new GroupEventSocketModel()
    groupmodel.admin_id = id_store.getDeviceId
    groupmodel.event_name = "add_user_to_group"
    groupmodel.user_ids = user_ids ?? []
    groupmodel.socket_id = id_store.getDeviceId
    sendmsgtoworker(groupmodel, true)
  }
}

onMounted(() => {
  // Handle hash-based navigation

  isWSConnected.value = isSocketConnected()
  eventBus.on('socketConnection', (is_connected) => {
    isWSConnected.value = is_connected
    checkuseronline()
  })
  eventBus.on('onlineUserIds', (onlineUserIds) => {
    onlineUsers.value = onlineUserIds
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
  onUnmounted(() => {
    //window.removeEventListener('hashchange', handleHashChange)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  eventBus.off('socketConnection')
  eventBus.off('onlineUserIds')
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
</script>
