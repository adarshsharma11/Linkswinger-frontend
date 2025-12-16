<template>
  <div class="ls-dashboard">

    <!-- HEADER -->
    <div class="zone-header">
      <div>
        <div class="zone-title">Home Dashboard</div>
        <div class="zone-sub">
          Community highlights • live activity • new members • admin updates
        </div>
      </div>

      <div class="toggle">
        <button
          :class="{ active: mode === 'today' }"
          @click="mode = 'today'"
        >
          Today
        </button>
        <button
          :class="{ active: mode === 'week' }"
          @click="mode = 'week'"
        >
          This Week
        </button>
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-row">
      <div
        class="stat-card"
        v-for="s in stats"
        :key="s.key"
      >
        <div class="stat-label">{{ s.label }}</div>
        <div class="stat-value">{{ value(s.key) }}</div>
        <div class="stat-hint">{{ s.hint }}</div>
      </div>
    </div>

    <!-- GRID -->
    <div class="dash-grid">

      <!-- LEFT COLUMN -->
      <div>

        <!-- MEDIA -->
        <div class="panel">
          <div class="panel-title">
            <h3 class="text-white">Top Media Highlights</h3>
            <span class="link text-white">See top lists →</span>
          </div>

          <div class="highlights-grid">
            <div
              v-for="m in media"
              :key="m.id"
              class="media-card"
            >
              <span class="media-action">{{ m.type }}</span>
              <div class="media-thumb">{{ m.highlight }}</div>

              <div class="media-body">
                <div class="media-kicker">{{ m.kicker }}</div>
                <div class="media-title">
                  {{ mode === 'today' ? m.today.title : m.week.title }}
                </div>

                <div class="media-meta">
                  <span
                    v-for="p in (mode === 'today' ? m.today.meta : m.week.meta)"
                    :key="p"
                    class="pill text-white"
                  >
                    {{ p }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- NEW MEMBERS -->
        <div class="panel">
          <div class="panel-title">
            <h3 class="text-white">New Members</h3>
            <span class="link text-white">View all →</span>
          </div>

          <div class="new-members">
            <div
              v-for="m in members"
              :key="m.key"
              class="mini"
            >
              <div class="mini-label">{{ m.label }}</div>
              <div class="mini-value">
                <span :class="['badge-dot', m.color]"></span>
                {{ value(m.key) }}
              </div>
            </div>
          </div>
        </div>

        <!-- LATEST STATUS UPDATES -->
        <div class="panel">
          <div class="panel-title">
            <h3 class="text-white">Latest Status Updates</h3>
            <span class="link text-white">See all →</span>
          </div>

          <div class="status-list">
            <div
              v-for="s in status"
              :key="s.id"
              class="status-item"
            >
              <div class="status-head">
                <div class="status-name">{{ s.name }}</div>
                <div class="status-tag">{{ s.tag }}</div>
              </div>

              <div class="status-text">
                {{ s.text }}
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN -->
      <div>

        <!-- ADMIN UPDATES -->
        <div class="panel">
          <div class="panel-title">
            <h3 class="text-white">Activity Snapshot</h3>
            <span class="link text-white">Archive →</span>
          </div>

          <div
            v-for="a in activity"
            :key="a.title"
            class="admin-post"
          >
           <div class="admin-body">{{ a.body }}</div>
           <div class="admin-title">
             <span v-if="a.color" :class="['badge-dot', a.color]"></span>
             {{ a.title }}
           </div>
          </div>
        </div>

          <div class="panel">
          <div class="panel-title">
            <h3 class="text-white">Activity Snapshot</h3>
            <span class="link text-white">Archive →</span>  
          </div>

          <div
            v-for="a in admin"
            :key="a.title"
            class="admin-post"
          >
            <div class="admin-type">{{ a.type }}</div>
            <div class="admin-title">{{ a.title }}</div>
            <div class="admin-body">{{ a.body }}</div>
            <span class="admin-cta text-white">{{ a.cta }}</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"

const mode = ref("today")

const values = {
  today: {
    online: "1,284",
    local: "86",
    meets: "1,002",
    signups: "132",
    women: "48",
    men: "39",
    couples: "32",
    trans: "13",
  },
  week: {
    online: "Peak 4,910",
    local: "Peak 210",
    meets: "1,240",
    signups: "1,018",
    women: "356",
    men: "301",
    couples: "255",
    trans: "106",
  }
}

const value = key => values[mode.value][key]

const stats = [
  { key: "online", label: "Users online now", hint: "Live across the platform" },
  { key: "local", label: "Users online in your area", hint: "Based on your location radius" },
  { key: "meets", label: "Meet events active now", hint: "Open & upcoming listings" },
  { key: "signups", label: "New sign-ups", hint: "Verified + unverified combined" },
]

const media = [
  {
    id: 1,
    type: "PHOTO",
    highlight: "Most liked",
    kicker: "Most liked photo",
    today: {
      title: "‘Midnight Glow’ • Couple M/F • 2.3km",
      meta: ["❤️ 412", "💬 38", "🕒 3h ago"],
    },
    week: {
      title: "‘Weekend Escape’ • Couple M/F • London",
      meta: ["❤️ 2,940", "💬 221", "🕒 2d ago"],
    },
  },
   {
    id: 2,
    type: "PHOTO",
    highlight: "Most liked",
    kicker: "Most liked photo",
    today: {
      title: "‘Midnight Glow’ • Couple M/F • 2.3km",
      meta: ["❤️ 412", "💬 38", "🕒 3h ago"],
    },
    week: {
      title: "‘Weekend Escape’ • Couple M/F • London",
      meta: ["❤️ 2,940", "💬 221", "🕒 2d ago"],
    },
  },
   {
    id: 3,
    type: "PHOTO",
    highlight: "Most liked",
    kicker: "Most liked photo",
    today: {
      title: "‘Midnight Glow’ • Couple M/F • 2.3km",
      meta: ["❤️ 412", "💬 38", "🕒 3h ago"],
    },
    week: {
      title: "‘Weekend Escape’ • Couple M/F • London",
      meta: ["❤️ 2,940", "💬 221", "🕒 2d ago"],
    },
  },
   {
    id: 4,
    type: "PHOTO",
    highlight: "Most liked",
    kicker: "Most liked photo",
    today: {
      title: "‘Midnight Glow’ • Couple M/F • 2.3km",
      meta: ["❤️ 412", "💬 38", "🕒 3h ago"],
    },
    week: {
      title: "‘Weekend Escape’ • Couple M/F • London",
      meta: ["❤️ 2,940", "💬 221", "🕒 2d ago"],
    },
  },
]

const members = [
  { key: "women", label: "New Women", color: "bd-green" },
  { key: "men", label: "New Men", color: "bd-red" },
  { key: "couples", label: "New Couples", color: "bd-green" },
  { key: "trans", label: "New Trans/TS", color: "bd-red" },
]

const status = [
  {
    id: 1,
    name: "Alex & Sam",
    tag: "Couple • 2km",
    text: "Out tonight 🍸 Looking for chilled vibes and good chat.",
  },
  {
    id: 2,
    name: "Jess",
    tag: "Woman • Online",
    text: "New here ✨ Say hi if you’re nearby.",
  },
  {
    id: 3,
    name: "D & M",
    tag: "Couple • Verified",
    text: "Planning a meet this weekend — open to suggestions 🗺️",
  },
  {
    id: 4,
    name: "Roxy",
    tag: "Trans/TS • New",
    text: "Late-night chats welcome 🔥",
  },
]

const admin = [
  {
    type: "Update",
    title: "Meet Events improvements",
    body: "Faster filtering, clearer meeting flow, and improved location accuracy.",
    cta: "Read more",
  },
  {
    type: "Announcement",
    title: "Photo verification rollout",
    body: "Human-only verification queue now live.",
    cta: "How it works",
  },
 {
    type: "Promo",
    title: "Elite features preview",
    body: "Human-only verification queue now live.",
    cta: "See benefits",
  },
]

const activity = [
  {
    title: "West Midlands",
    body: "Most active region",
  },
  {
    title: "Top category trending",
    body: "Couples near you",
  },
  {
    title: "25",
    body: "Meet events posted today",
    color: "bd-green",
  },
]
</script>