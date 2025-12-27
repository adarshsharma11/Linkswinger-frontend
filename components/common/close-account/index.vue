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
              <div class="ls-modal-kicker">Account closed</div>
          <div class="ls-modal-title">Your account has been deleted</div>
          </div>
        </div>

         <div class="ls-modal-body">
        <p>
          Due to repeated <span class="ls-highlight">Terms of Use violations</span>
          and/or serious reports, your LinkSwingers account has been
          <span class="ls-highlight">permanently deleted</span>.
        </p>
        <p style="margin-top:0.45rem;">
          You can no longer access this account or its content.
        </p>
          <p style="margin-top:0.45rem;">
            <span class="ls-highlight">Banned Reason:</span> {{ banned_reason }}
          </p>
        <p style="margin-top:0.35rem;">
          If you believe this was done in error, please contact our
          <span class="ls-highlight">Support team</span> with any relevant details.
        </p>
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

.demo-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background: rgba(15, 23, 42, 0.9);
  color: var(--text-main);
  cursor: pointer;
  font-size: 0.9rem;
}

.demo-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Overlay */
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
  position: relative;
  background: radial-gradient(circle at top,
      #1f2937 0,
      #05030a 55%);
  border-radius: 20px;
  border: 1px solid rgba(239, 68, 68, 0.95);
  box-shadow:
    0 0 42px rgba(0, 0, 0, 0.95),
    0 0 30px rgba(239, 68, 68, 0.65);
  max-width: 460px;
  width: 92%;
  padding: 1.4rem 1.5rem 1.2rem;
  overflow: hidden;
}

.ls-glow-strip {
  position: absolute;
  inset: -40%;
  background:
    radial-gradient(circle at 12% 0,
      rgba(239, 68, 68, 0.32),
      transparent 60%),
    radial-gradient(circle at 85% 100%,
      rgba(127, 29, 29, 0.35),
      transparent 60%);
  opacity: 0.9;
  pointer-events: none;
}

.ls-modal-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.ls-modal-header {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 0.6rem;
}

/* Warning icon container – more intense red */
.ls-warning-icon {
  width: 74px;
  height: 74px;
  border-radius: 22px;
  background: radial-gradient(circle at 30% 0,
      rgba(239, 68, 68, 0.28),
      rgba(15, 23, 42, 1) 70%);
  border: 1px solid rgba(248, 113, 113, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 26px rgba(248, 113, 113, 1),
    0 0 14px rgba(127, 29, 29, 0.95);
  animation: pulseDeleted 1.6s infinite ease-in-out;
}

.ls-warning-icon-inner {
  position: relative;
  width: 42px;
  height: 38px;
}

.ls-warning-icon-inner::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 21px solid transparent;
  border-right: 21px solid transparent;
  border-bottom: 38px solid #f97316;
  filter: drop-shadow(0 0 6px rgba(248, 113, 113, 0.95));
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
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(254, 226, 226, 0.8);
  margin-bottom: 0.15rem;
}

.ls-modal-title {
  font-size: 1.3rem;
  font-weight: 700;
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

.ls-modal-body {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-top: 0.55rem;
  line-height: 1.6;
}

.ls-highlight {
  color: #fecaca;
  font-weight: 500;
}

.ls-modal-footer {
  margin-top: 1.15rem;
  display: flex;
  justify-content: flex-end;
}

.ls-btn {
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.85);
  padding: 0.5rem 1.4rem;
  font-size: 0.9rem;
  cursor: pointer;
  background: rgba(15, 23, 42, 0.98);
  color: var(--text-main);
  transition: 0.15s;
  font-weight: 500;
}

.ls-btn:hover {
  border-color: rgba(248, 113, 113, 1);
  color: #fecaca;
  box-shadow: 0 0 18px rgba(248, 113, 113, 1);
}

@keyframes pulseDeleted {

  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 0 20px rgba(248, 113, 113, 0.9),
      0 0 10px rgba(127, 29, 29, 0.8);
  }

  50% {
    transform: scale(1.06);
    box-shadow:
      0 0 30px rgba(248, 113, 113, 1),
      0 0 16px rgba(127, 29, 29, 1);
  }
}

@media (max-width: 640px) {
  .ls-modal-overlay {
    align-items: flex-end;
  }

  .ls-modal {
    width: 100%;
    border-radius: 18px 18px 0 0;
    padding: 1.3rem 1.3rem 1.05rem;
  }

  .ls-modal-footer {
    justify-content: center;
  }

  .ls-btn {
    width: 100%;
  }
}
</style>
