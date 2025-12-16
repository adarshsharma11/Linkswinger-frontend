<template>
  <!-- Overlay -->
  <div
    class="ur-overlay"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
    @click.self="close"
  >
    <div class="ur-modal">
      <div class="ur-panel">

        <!-- Corner icons -->
        <div class="ur-corner ur-corner-left" title="Admin review">
          <img src="/images/badges/animated/50X50px/02.gif" alt="Admin moderator" />
        </div>

        <div class="ur-corner ur-corner-right" title="LinkSwingers">
          <img src="/images/badges/animated/50X50px/ls-watermark.gif" alt="LinkSwingers watermark" />
        </div>

        <!-- Content -->
        <div class="ur-content">
          <h1 :id="titleId" class="ur-title text-white">
            {{ title }}
          </h1>

          <p class="ur-sub" v-html="message" />

          <div class="ur-notice" v-if="notice" v-html="notice" />

          <div class="ur-status-hint" v-if="hint" v-html="hint" />

          <div class="ur-actions">
            <button class="ur-btn-ok" type="button" @click="close">
              OK
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['close'])

const props = defineProps({
  title: {
    type: String,
    default: 'Media uploaded — under review'
  },
  message: {
    type: String,
    default:
      'Thank you for uploading your media. This is <b>under review</b> by an admin.'
  },
  notice: {
    type: String,
    default:
      'When approved, it will be <b>live on the site</b>. Approval usually doesn’t take long.'
  },
  hint: {
    type: String,
    default:
      '<b>Check your Media Settings</b> for the status of your upload.'
  }
})

const titleId = 'ur-title'

function close() {
  emit('close')
}

function handleKey(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKey)
})
</script>
