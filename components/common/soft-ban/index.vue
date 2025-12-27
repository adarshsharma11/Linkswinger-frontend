<template>
  <!-- Overlay -->
  <div class="ls-modal-overlay active" @click.self="close">
    <div class="ls-modal">
      <div class="ls-glow-strip"></div>

      <button class="ls-modal-close" @click="close">×</button>

      <div class="ls-modal-inner">
        <div class="ls-modal-header">
          <div class="ls-warning-icon">
            <div class="ls-warning-icon-inner">
              <span class="ls-warning-exclamation">!</span>
            </div>
          </div>
          <div>
            <div class="ls-modal-kicker">Soft ban</div>
            <div class="ls-modal-title">
              Your account is temporarily restricted
            </div>
          </div>
        </div>

        <div class="ls-modal-body">
          <p>
            Your account has received a
            <span class="ls-highlight">soft ban</span>
            due to reports and/or policy violations.
          </p>
          <p style="margin-top:0.45rem;">
            <span class="ls-highlight">Banned Reason:</span> {{ banned_reason }}
          </p>
          <p style="margin-top: 0.45rem">
            Some features will be limited until this soft ban expires.
            Please follow our
            <span class="ls-highlight">Terms of Use</span>.
          </p>

          <div class="ls-countdown-wrap">
            <span class="ls-countdown-label">Time remaining</span>
            <span class="ls-countdown-time">{{ formattedTime }}</span>
          </div>
        </div>

        <div class="ls-modal-footer">
          <button class="ls-btn" @click="close">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const timeStart = ref(0);
let timer: ReturnType<typeof setInterval> | null = null
interface Props {
  banned_date: string,
  banned_reason: string
}
const props = defineProps<Props>()

const emit = defineEmits(['closeSoftBanPopup'])

function close() {
  emit('closeSoftBanPopup')
}
// const open = (seconds) => {
//   remaining.value = typeof seconds === 'number' && seconds > 0
//     ? seconds
//     : 24 * 60 * 60

//   isOpen.value = true
//   startTimer()
// }

// const close = () => {
//   isOpen.value = false
//   stopTimer()
// }

const startTimer = () => {
  stopTimer()
  timer = setInterval(() => {
    if (timeStart.value > 0) {
      timeStart.value--

    } else {
      stopTimer()
    }
  }, 1000)

}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const formattedTime = computed(() => {
  const hours = Math.floor(timeStart.value / 3600).toString().padStart(2, '0');
  const mins = Math.floor((timeStart.value % 3600) / 60).toString().padStart(2, '0');
  const secs = (timeStart.value % 60).toString().padStart(2, '0');
  return `${hours}:${mins}:${secs}`;
});

onMounted(() => {
  const diffSeconds = props.banned_date
    ? Math.floor(
      (new Date(props.banned_date).getTime() - Date.now()) / 1000
    )
    : 0;

  timeStart.value = diffSeconds

  startTimer()

})

onUnmounted(stopTimer)

// defineExpose({ open, close })
</script>
<style scoped>
:root {
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
  --accent: #f97316;
}

/* Demo */
.demo-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background: rgba(15, 23, 42, 0.9);
  color: var(--text-main);
  cursor: pointer;
}

/* Overlay — centers modal */
.ls-modal-overlay {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at top,
      rgba(239, 68, 68, 0.25),
      rgba(0, 0, 0, 0.95));
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(6px);
}

.ls-modal-overlay.active {
  display: flex;
}

/* Modal */
.ls-modal {
  background: radial-gradient(circle at top, #1f2937 0, #05030a 55%);
  border-radius: 20px;
  border: 1px solid rgba(248, 113, 113, 0.9);
  box-shadow:
    0 0 40px rgba(0, 0, 0, 0.9),
    0 0 28px rgba(248, 113, 113, 0.6);
  max-width: 460px;
  width: 92%;
  padding: 1.4rem 1.5rem 1.2rem;
  position: relative;
  overflow: hidden;
}

.ls-glow-strip {
  position: absolute;
  inset: -40%;
  background:
    radial-gradient(circle at 12% 0, rgba(248, 113, 113, 0.28), transparent 60%);
  pointer-events: none;
}

.ls-modal-close {
  position: absolute;
  top: 0.7rem;
  right: 0.85rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.1rem;
  z-index: 2;
}

.ls-modal-close:hover {
  color: var(--text-main);
}

.ls-modal-header {
  display: flex;
  gap: 0.9rem;
}

.ls-warning-icon {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: radial-gradient(circle at 30% 0,
      rgba(248, 113, 113, 0.25),
      rgba(15, 23, 42, 1) 70%);
  border: 1px solid rgba(248, 113, 113, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 22px rgba(248, 113, 113, 0.9),
    0 0 12px rgba(239, 68, 68, 0.8);
  animation: pulseSoftBan 1.6s infinite ease-in-out;
}

.ls-warning-icon-inner {
  position: relative;
  width: 40px;
  height: 36px;
}

.ls-warning-icon-inner::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 36px solid #facc15;
  filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.95));
}

.ls-warning-exclamation {
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  font-weight: 800;
  color: #1f2937;
}

.ls-modal-kicker {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #fecaca;
}

.ls-modal-title {
  font-size: 1.3rem;
  font-weight: 700;
}

.ls-modal-body {
  margin-top: 0.6rem;
  color: var(--text-muted);
}

.ls-highlight {
  color: var(--accent);
}

.ls-countdown-wrap {
  margin-top: 0.7rem;
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(248, 113, 113, 0.8);
  display: inline-flex;
  gap: 0.5rem;
}

.ls-modal-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}


.ls-btn {
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.8);
  padding: 0.5rem 1.4rem;
  font-size: 0.9rem;
  cursor: pointer;
  background: rgba(15, 23, 42, 0.95);
  color: var(--text-main);
  transition: 0.15s;
  font-weight: 500;
}

.ls-btn:hover {
  border-color: rgba(248, 113, 113, 0.9);
  color: #fecaca;
  box-shadow: 0 0 16px rgba(248, 113, 113, 0.95);
}

@keyframes pulseSoftBan {

  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 0 18px rgba(248, 113, 113, 0.8),
      0 0 10px rgba(239, 68, 68, 0.7);
  }

  50% {
    transform: scale(1.06);
    box-shadow:
      0 0 28px rgba(248, 113, 113, 1),
      0 0 16px rgba(239, 68, 68, 0.95);
  }
}

@media (max-width: 640px) {
  .ls-modal {
    width: 100%;
    border-radius: 18px 18px 0 0;
  }


}
</style>
