<template>
  <!-- Fullscreen overlay -->
  <div class="msgf-overlay" @click.self="closeAll">
    <div class="msgf-panel" @click.stop>

      <!-- HEADER -->
      <div class="msgf-header">
        <div class="msgf-title">Friend Request</div>

        <!-- Close button -->
        <button
          type="button"
          class="msgf-pill"
          aria-label="Close"
          @click="closeAll"
        >
          ✕
        </button>
      </div>

      <!-- STATUS -->
      <div class="msgf-status">
        <div class="label">You have a new friend request</div>

        <div class="msgf-chips">
          <span class="msgf-chip">{{ user.username }}</span>
        </div>
      </div>

      <!-- MAIN BODY -->
      <div class="msgf-ghost-list">
        <div class="msgf-ghost-item">
          <div class="msgf-row">
            <span class="text-white">
              {{ user.username }} wants to add you as a friend.
            </span>
          </div>
        </div>

        <!-- FOOTER BUTTONS -->
        <div class="msgf-footer">

          <!-- Decline -->
          <button
            type="button"
            class="msgf-footer-btn"
            @click="declineRequest"
          >
            Decline
          </button>

          <!-- Accept -->
          <button
            type="button"
            class="msgf-footer-btn secondary"
            @click="acceptRequest"
          >
            Accept
          </button>

          <!-- NEW: View Friends List -->
          <button
            type="button"
            class="msgf-footer-btn secondary"
            @click="openFriendsList"
          >
            Friends List
          </button>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
/**
 * Events emitted:
 *  - close
 *  - accept
 *  - decline
 *  - friends
 */
const emit = defineEmits(["close", "accept", "decline", "friends"])

/** Static mock user */
const user = reactive({
  id: 101,
  username: "Jonathan_92",
  avatar: null
})

/** Accept request */
function acceptRequest() {
  emit("accept", user)
  closeAll()
}

/** Decline request */
function declineRequest() {
  emit("decline", user)
  closeAll()
}

/** Open friends list */
function openFriendsList() {
  emit("friends")
  closeAll()
}

/** Close modal */
function closeAll() {
  emit("close")
}

/** Allow closing with ESC */
function handleKey(e) {
  if (e.key === "Escape") closeAll()
}

onMounted(() => {
  document.addEventListener("keydown", handleKey)
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKey)
})
</script>

<style scoped>
/* Optional: avoids scrolling behind modal */
.msgf-overlay {
  overflow-y: auto;
}
</style>
