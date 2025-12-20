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
        <button :class="{ active: mode === 'today' }" @click="mode = 'today'">
          Today
        </button>
        <button :class="{ active: mode === 'week' }" @click="mode = 'week'">
          This Week
        </button>
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-row">
      <div class="stat-card" v-for="s in stats" :key="s.key">
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
            <!-- <span class="link text-white">See top lists →</span> -->
          </div>

          <div class="highlights-grid">
            <div v-for="m in topMedia" :key="m.feed_id" class="media-card">
              <span class="media-action text-white">{{ mediaLabel(m.media_type) }}</span>
              <div class="media-thumb">
                <img :src="(m.media_path ?? '') + (m.hd_feed_image)" v-if="m.media_type === 'image'">
                <img :src="(m.media_path ?? '') + (m.feed_thumbnail)" v-else-if="m.media_type === 'video'"></img>
              </div>

              <div class="media-body">
                <div class="media-kicker">{{ (m.comment_count ?? 0) < (m.like_count ?? 0) ? 'Most Liked'
                  : 'Most Commented' }}</div>
                    <div class="media-title">
                      {{ m.nick_name }} • {{ m.profile_type }} • {{ distanceText(m.distance_miles) }}
                    </div>

                    <div class="media-meta">
                      <span v-for="p in mediaMeta(m)" :key="p" class="pill text-white">
                        {{ p }}
                      </span>
                    </div>
                </div>
              </div>
            </div>
             <div v-if="!topMedia.length" class="meet-empty">
                No recent top media.
              </div>
          </div>

          <!-- NEW MEMBERS -->
          <div class="panel">
            <div class="panel-title">
              <h3 class="text-white">New Members</h3>
              <!-- <span class="link text-white">View all →</span> -->
            </div>

            <div class="new-members">
              <div v-for="m in members" :key="m.key" class="mini">
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
              <!-- <span class="link text-white">See all →</span> -->
            </div>

            <div class="status-list">
              <div v-for="s in statusUpdates" :key="s.user_id" class="status-item">
                <div class="status-head">
                  <div class="status-name">
                    {{ s.nick_name }}
                  </div>
                  <div class="status-tag">
                    {{ statusTag(s) }}
                  </div>
                </div>

                <div class="status-text">
                  {{ s.profile_status }}
                </div>
              </div>
              <div v-if="!statusUpdates.length" class="meet-empty">
                No recent status updates.
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

            <div v-for="a in activity" :key="a.title" class="admin-post">
              <div class="admin-body">{{ a.body }}</div>
              <div class="admin-title">
                <span v-if="a.color" :class="['badge-dot', a.color]"></span>
                {{ a.title }}
              </div>
            </div>
          </div>

          <!-- <div class="panel">
            <div class="panel-title">
              <h3 class="text-white">Activity Snapshot</h3>
              <span class="link text-white">Archive →</span>
            </div>

            <div v-for="a in admin" :key="a.title" class="admin-post">
              <div class="admin-type">{{ a.type }}</div>
              <div class="admin-title">{{ a.title }}</div>
              <div class="admin-body">{{ a.body }}</div>
              <span class="admin-cta text-white">{{ a.cta }}</span>
            </div>
          </div> -->

        </div>
      </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { HomeDashboardModel } from "~/composables/models";
const emit = defineEmits(['homeModeChanged'])
interface Props {
  mode?: string,
  dashboardStat?: HomeDashboardModel.Response,
}
const props = defineProps<Props>()

const mode = ref(props.mode ?? 'today')

const topMedia = computed(() => {
  return props.dashboardStat?.top_media ?? []
})

const mediaLabel = (type?: string) => {
  if (type === "video") return "VIDEO"
  return "PHOTO"
}

const distanceText = (miles?: number) => {
  if (miles == null) return ""
  return miles < 1
    ? `${Math.round(miles * 5280)} ft`
    : `${miles.toFixed(1)} mi`
}

const mediaMeta = (m: any) => {
  return [
    `❤️ ${m.like_count ?? 0}`,
    `💬 ${m.comment_count ?? 0}`,
    `🕒 ${timeAgo(m.created_at)}`
  ]
}

function timeAgo(date?: string) {
  if (!date) return ""
  const d = new Date(date)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)

  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}



const value = (key: keyof HomeDashboardModel.Response) => {
  return props.dashboardStat?.[key] ?? "—"
}

const stats = [
  { key: "online", label: "Users online now", hint: "Live across the platform" },
  { key: "local", label: "Users online in your area", hint: "Based on your location radius" },
  { key: "meets", label: "Meet events active now", hint: "Open & upcoming listings" },
  { key: "signups", label: "New sign-ups", hint: "Verified + unverified combined" },
]

watch(mode, () => {

  emit('homeModeChanged', mode.value)

});

const members = [
  { key: "women", label: "New Women", color: "bd-green" },
  { key: "men", label: "New Men", color: "bd-red" },
  { key: "couples", label: "New Couples", color: "bd-green" },
  { key: "trans", label: "New Trans/TS", color: "bd-red" },
]
const statusUpdates = computed(() => {
  return props.dashboardStat?.status_updates ?? []
})
const statusTag = (s: any) => {
  if (!s.profile_type) return s.tag ?? ""
  return `${s.profile_type} • ${s.tag ?? ""}`
}


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
    title: props.dashboardStat?.most_active_region ?? null,
    body: "Most active region",
  },
  {
    title: props.dashboardStat?.meets_today ?? null,
    body: "Meet events posted today",
    color: "bd-green",
  },
]
</script>