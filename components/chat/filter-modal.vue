<template>
  <!-- Fullscreen overlay -->
  <div class="msgf-overlay" @click.self="closeAll">
    <!-- Center card -->
    <div class="msgf-panel" @click.stop>
      <!-- Header -->
      <div class="msgf-header">
        <div class="msgf-title">Messages</div>

        <!-- Filters pill button (like screenshot) -->
        <button
          type="button"
          class="msgf-pill"
          @click.stop="toggleMenu"
          :aria-expanded="isMenuOpen ? 'true' : 'false'"
        >
          <span class="text-white">Filters</span>
          <!-- simple filter icon -->
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path
              fill="currentColor"
              d="M3 5h18l-6.5 8v5.3l-5 2.7V13L3 5z"
            />
          </svg>
        </button>

        <!-- DROPDOWN -->
        <div
          class="msgf-dropdown"
          v-if="isMenuOpen"
          role="menu"
          aria-label="Message filters"
          @click.stop
        >
          <label class="msgf-row">
            <input type="checkbox" v-model="filters.unread" />
            <span class="text-white">Unread</span>
          </label>

          <label class="msgf-row">
            <input type="checkbox" v-model="filters.friends" />
            <span class="text-white">Friends only</span>
          </label>

          <label class="msgf-row">
            <input type="checkbox" v-model="filters.attachments" />
            <span class="text-white">With attachments</span>
          </label>

          <label class="msgf-row">
            <input type="checkbox" v-model="filters.photoVerified" />
            <span class="text-white">Photo verified</span>
          </label>

          <div class="msgf-footer">
            <button type="button" class="msgf-footer-btn" @click="clearFilters">
              Clear
            </button>
            <button
              type="button"
              class="msgf-footer-btn secondary"
              @click="closeMenu"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- ACTIVE FILTERS STATUS (chips) -->
      <div class="msgf-status">
        <div class="label">Active filters</div>
        <div class="msgf-chips">
          <span v-if="activeLabels.length === 0" class="msgf-chip dim">
            None
          </span>
          <span
            v-for="label in activeLabels"
            :key="label"
            class="msgf-chip"
          >
            {{ label }}
          </span>
        </div>
      </div>

      <!-- Ghost list blocks like screenshot -->
      <div class="msgf-ghost-list">
        <div class="msgf-ghost-item"></div>
        <div class="msgf-ghost-item"></div>
        <div class="msgf-ghost-item"></div>
        <div class="msgf-ghost-item"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])

const filters = reactive({
  unread: false,
  friends: false,
  attachments: false,
  photoVerified: false
})

const isMenuOpen = ref(false)

const activeLabels = computed(() => {
  const active = []
  if (filters.unread) active.push('Unread')
  if (filters.friends) active.push('Friends only')
  if (filters.attachments) active.push('With attachments')
  if (filters.photoVerified) active.push('Photo verified')
  return active
})

function clearFilters() {
  filters.unread = false
  filters.friends = false
  filters.attachments = false
  filters.photoVerified = false
}

function openMenu() {
  isMenuOpen.value = true
}

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value ? closeMenu() : openMenu()
}

function closeAll() {
  isMenuOpen.value = false
  emit('close')
}

// Close dropdown / modal with ESC
function handleKey(e) {
  if (e.key === 'Escape') {
    if (isMenuOpen.value) closeMenu()
    else closeAll()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKey)
})
</script>

