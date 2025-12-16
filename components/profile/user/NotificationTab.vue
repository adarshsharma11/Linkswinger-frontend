<template>
  <div class="np-root">
    <div class="np-card">

      <!-- Header -->
      <div class="np-header">
        <h2 class="np-title">Notifications</h2>
      </div>

      <!-- Filters + Actions -->
      <div class="np-controls">
         <div class="np-actions-mobile">
            <button class="np-icon-btn" @click="markAllRead" title="Mark all as read">✓</button>
            <button class="np-icon-btn ghost" @click="clearAll" title="Clear all">🧹</button>
        </div>
        <div class="np-filters">
          <button
            v-for="f in filters"
            :key="f.key"
            class="np-chip"
            :class="{ active: activeFilter === f.key }"
            @click="activeFilter = f.key"
          >
            {{ f.label }}
          </button>
        </div>

        <div class="np-actions">
          <button class="np-btn" @click="markAllRead">
            Mark all as read
          </button>
          <button class="np-btn ghost" @click="clearAll">
            Clear all
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div class="np-summary">
        <div class="np-pill">
          <div class="label">Total</div>
          <div class="value">{{ notifications.length }}</div>
        </div>
        <div class="np-pill">
          <div class="label">Unread</div>
          <div class="value">{{ unreadCount }}</div>
        </div>
        <div class="np-pill np-pill-wide">
          <div class="label">Scope</div>
          <div class="value">Non-message alerts only</div>
        </div>
      </div>

      <!-- List (scroll container) -->
      <div class="np-list">
        <template v-for="section in sections" :key="section.key">
          <div
            v-if="grouped[section.key]?.length"
            class="np-section"
          >
            <div class="np-section-header">
              <div class="np-section-title">
                {{ section.label }}
                <span class="np-badge">{{ section.badge }}</span>
                <span
                  v-if="unreadInSection(section.key)"
                  class="np-badge hot"
                >
                  {{ unreadInSection(section.key) }} unread
                </span>
              </div>
              <span class="np-count">
                {{ grouped[section.key].length }}
              </span>
            </div>

            <div class="np-items">
              <div
                v-for="n in grouped[section.key]"
                :key="n.id"
                class="np-item"
                :class="{ unread: n.unread }"
                @click="n.unread = !n.unread"
              >
                <div class="np-icon">
                  {{ n.icon }}
                </div>

                <div class="np-main">
                  <div class="np-headline">
                    {{ n.title }}
                  </div>

                  <div class="np-sub">
                    <span>{{ n.sub }}</span>
                    <span
                      v-for="t in n.tags"
                      :key="t"
                      class="np-meta"
                    >
                      {{ t }}
                    </span>
                  </div>
                </div>

                <div class="np-time">
                  {{ timeAgo(n.ts) }}
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Empty -->
        <div v-if="filtered.length === 0" class="np-empty">
          <strong>No notifications match your filters.</strong>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"

/* -----------------------
   Demo time helpers
----------------------- */
const now = Date.now()
const mins = m => now - m * 60000
const hrs  = h => now - h * 3600000
const days = d => now - d * 86400000

/* -----------------------
   Data (expanded for scroll)
----------------------- */
const notifications = ref([
  // Social
  { id:"s1", category:"social", icon:"❤️", title:"Someone liked your video.", sub:"User: ‘Nina_89’", unread:true, ts:mins(18), tags:["Like"] },
  { id:"s2", category:"social", icon:"💬", title:"Someone commented on your photo.", sub:"🔥 Love this shot!", unread:true, ts:hrs(3), tags:["Comment"] },
  { id:"s3", category:"social", icon:"🤝", title:"Friend request accepted.", sub:"You and ‘Couple_MF_WM’ are now friends.", unread:false, ts:days(1), tags:["Friends"] },

  // Discovery / New People
  { id:"d1", category:"discovery", icon:"✨", title:"New profiles signed up.", sub:"Filtered by your ‘Looking for’ preferences.", unread:false, ts:hrs(8), tags:["New sign-ups"] },
  { id:"d2", category:"discovery", icon:"📍", title:"New profiles near you.", sub:"Matches your range settings.", unread:true, ts:hrs(2), tags:["Nearby sign-ups"] },

  // Nearby
  { id:"n1", category:"nearby", icon:"📍", title:"People near you are active now.", sub:"Local activity update (not friends-only).", unread:true, ts:mins(35), tags:["Local activity"] },
  { id:"n2", category:"nearby", icon:"🧩", title:"Nearby user posted a new status.", sub:"Based on your location + range.", unread:false, ts:hrs(5), tags:["Status"] },
  { id:"n3", category:"nearby", icon:"📸", title:"Nearby user added new photos.", sub:"Local media update.", unread:false, ts:days(1), tags:["Photo"] },
  { id:"n4", category:"nearby", icon:"🎥", title:"Nearby user added a new video.", sub:"Local media update.", unread:true, ts:hrs(9), tags:["Video"] },

  // Friends
  { id:"f1", category:"friends", icon:"🧩", title:"Friend posted a new status.", sub:"‘Sophie’ updated her status.", unread:true, ts:mins(42), tags:["Status"] },
  { id:"f2", category:"friends", icon:"📸", title:"Friend added new photos.", sub:"‘Couple_MF_BHM’ added 3 photos.", unread:false, ts:hrs(6), tags:["Photo"] },
  { id:"f3", category:"friends", icon:"🎥", title:"Friend added a new video.", sub:"‘Liam&Em’ uploaded a clip.", unread:false, ts:days(2), tags:["Video"] },

  // Moderation
  { id:"m1", category:"moderation", icon:"🕵️", title:"Your media is under review.", sub:"We’re checking your upload.", unread:false, ts:hrs(10), tags:["Review"] },
  { id:"m2", category:"moderation", icon:"✔️", title:"Your media was approved.", sub:"Your content is now live.", unread:true, ts:hrs(4), tags:["Approved"] },
  { id:"m3", category:"moderation", icon:"⚠️", title:"Your media was removed.", sub:"Reason: policy review outcome.", unread:false, ts:days(5), tags:["Removed"] },
])

/* -----------------------
   Filters & sections
----------------------- */
const filters = [
  { key:"all", label:"All" },
  { key:"unread", label:"Unread" },
  { key:"social", label:"Social" },
  { key:"discovery", label:"New People" },
  { key:"nearby", label:"Nearby" },
  { key:"friends", label:"Friends" },
  { key:"moderation", label:"Moderation" },
]

const sections = [
  { key:"social", label:"Social", badge:"Likes, comments, friends" },
  { key:"discovery", label:"New People", badge:"Filtered by ‘Looking for’" },
  { key:"nearby", label:"Nearby", badge:"Local activity (not friends-only)" },
  { key:"friends", label:"Friends Activity", badge:"Status & media" },
  { key:"moderation", label:"Moderation", badge:"Your uploads" },
]

const activeFilter = ref("all")

/* -----------------------
   Computed
----------------------- */
const filtered = computed(() =>
  notifications.value.filter(n =>
    activeFilter.value === "all"
      ? true
      : activeFilter.value === "unread"
        ? n.unread
        : n.category === activeFilter.value
  )
)

const grouped = computed(() => {
  const map = {}
  filtered.value.forEach(n => {
    map[n.category] ||= []
    map[n.category].push(n)
  })
  return map
})

const unreadCount = computed(
  () => notifications.value.filter(n => n.unread).length
)

const unreadInSection = key =>
  grouped.value[key]?.filter(n => n.unread).length || 0

/* -----------------------
   Actions
----------------------- */
function markAllRead() {
  notifications.value.forEach(n => (n.unread = false))
}

function clearAll() {
  notifications.value.splice(0)
}

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 60000)
  if (diff < 1) return "Now"
  if (diff < 60) return `${diff}m`
  if (diff < 1440) return `${Math.floor(diff / 60)}h`
  return `${Math.floor(diff / 1440)}d`
}
</script>
