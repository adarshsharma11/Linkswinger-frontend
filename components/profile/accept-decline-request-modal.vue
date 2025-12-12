<template>
  <!-- Fullscreen overlay -->
  <div class="msgf-overlay" @click.self="closeAll">
    <div class="msgf-panel" @click.stop>

      <!-- HEADER -->
      <div class="msgf-header">


        <!-- Close button -->
        <button type="button" class="msgf-pill" aria-label="Close" @click="closeAll">
          ✕
        </button>
      </div>

      <!-- STATUS -->


      <!-- MAIN BODY -->
      <div class="msgf-ghost-list">
        <div class="msgf-ghost-item">
          <div class="msgf-row">
            <span class="text-white">
              Send Friend Request
            </span>
          </div>
        </div>

        <div class="msgf-ghost-item" @click="openFriendsList()">
          <div class="msgf-row">
            <span class="text-white">
              Friend List
            </span>
          </div>
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
const emit = defineEmits(["close", "friendsList"])

function openFriendsList() {
  emit("friendsList")
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
