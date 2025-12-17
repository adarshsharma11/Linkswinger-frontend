<template>
  <!-- Overlay -->
  <div
    class="rm-overlay"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
    @click.self="close"
  >
    <div class="rm-modal">

      <!-- Header -->
      <div class="rm-header">
        <h2 :id="titleId" class="text-white">Report content</h2>
        <button class="rm-close" @click="close" aria-label="Close">✕</button>
      </div>

      <!-- Body -->
      <div class="rm-body">
        <p class="rm-subtitle">
          Please only report content that clearly breaks our rules.
        </p>

        <div class="rm-warning">
          ⚠️ Please do not report for no reason. Misusing reports can lead
          to your own account being flagged and banned.
        </div>

        <!-- Reason -->
        <div class="rm-group">
          <label class="rm-label">Reason for report</label>

          <div class="rm-reasons">
            <label v-for="r in reasons" :key="r.value" class="rm-option">
              <input
                type="radio"
                name="report_reason"
                :value="r.value"
                v-model="selectedReason"
              />
              <span class="text-white">{{ r.label }}</span>
            </label>
          </div>
        </div>

        <!-- Details -->
        <div class="rm-group">
          <label class="rm-label">Additional details (optional)</label>
          <textarea
            v-model="details"
            class="rm-textarea"
            placeholder="Write any details that help our team review this report…"
          />
          <p class="rm-helper">
            For video chat, a screenshot may be captured when you submit this report.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="rm-footer">
        <button class="rm-btn rm-secondary" @click="close">Cancel</button>
        <button class="rm-btn rm-danger" @click="submit">Submit report</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const emit = defineEmits(["close", "submit"])

const titleId = "report-title"

const selectedReason = ref(null)
const details = ref("")

const reasons = [
  { value: "underage", label: "Underage / age concern" },
  { value: "violence", label: "Violence or self-harm" },
  { value: "bestiality", label: "Bestiality or sexual activity with animals" },
  { value: "drugs", label: "Drug use or obvious drug dealing" },
  { value: "nonconsensual", label: "Non-consensual or forced content" },
  { value: "harassment", label: "Hate, harassment or threats" },
  { value: "spam", label: "Spam / scam / fake profile" },
  { value: "copyright", label: "Copyright / impersonation" },
  { value: "other", label: "Other (please describe)" },
]

function close() {
  emit("close")
}

function submit() {
  if (!selectedReason.value) {
    alert("Please select a reason for this report.")
    return
  }

  emit("submit", {
    reason: selectedReason.value,
    details: details.value,
  })

  close()
}

function onKey(e) {
  if (e.key === "Escape") close()
}

onMounted(() => document.addEventListener("keydown", onKey))
onBeforeUnmount(() => document.removeEventListener("keydown", onKey))
</script>

