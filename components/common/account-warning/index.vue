<template>
    <div id="warningModal" class="ls-modal-overlay"  >
        <div class="ls-modal ">
            <div class="ls-glow-strip"></div>

            <button class="ls-modal-close" @click="close()">
                ×
            </button>

            <div class="ls-modal-inner">
                <div class="ls-modal-header">
                    <div class="ls-warning-icon">
                        <div class="ls-warning-icon-inner">
                            <span class="ls-warning-exclamation">!</span>
                        </div>
                    </div>
                    <div>
                        <div class="ls-modal-kicker">Account warning</div>
                        <div class="ls-modal-title">
                            Your account has received a warning
                        </div>
                    </div>
                </div>

                <div class="ls-modal-body">
                    <p>
                        Your account has received a warning due to
                        <span class="ls-highlight">user reports</span>.
                    </p>
                    <p>
                         <span class="ls-highlight">{{ props.warning }}</span>
                    </p>
                    <p style="margin-top: 0.45rem">
                        Please make sure you follow our
                        <span class="ls-highlight">Terms of Use</span>
                        to avoid a ban or account deletion.
                    </p>
                </div>

                <div class="ls-modal-footer">
                    <button class="ls-btn" @click="close()">
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  warning?: string,

}
const props = defineProps<Props>()


const emit = defineEmits(['closeWarningPopup'])

function close()
{
    emit('closeWarningPopup')
}


</script>
<style scoped>
:root {
    --bg-main: #05030a;
    --border-soft: #262335;
    --text-main: #f9fafb;
    --text-muted: #9ca3af;
    --accent: #facc15;
    --accent-strong: #f97316;
}

* {
    box-sizing: border-box;
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
  display: none;              /* controlled by .active */
  display: flex;              /* REQUIRED */
  align-items: center;        /* vertical center */
  justify-content: center;    /* horizontal center */
  background: transparent;    /* no backdrop */
  backdrop-filter: none;
  z-index: 999;
}


.ls-modal-overlay.active {
    display: flex;
}

/* Modal */
.ls-modal {

    background: radial-gradient(circle at top, #1f2937 0, #05030a 55%);
    border-radius: 20px;
    border: 1px solid rgba(251, 191, 36, 0.7);
    box-shadow:
        0 0 40px rgba(0, 0, 0, 0.9),
        0 0 26px rgba(251, 191, 36, 0.5);
    max-width: 460px;
    
    padding: 1.4rem 1.5rem 1.2rem;
    overflow: hidden;
    align-items: center;      /* vertical */
  justify-content: center;
}

.ls-glow-strip {
    position: absolute;
    inset: -40%;
    background:
        radial-gradient(circle at 12% 0, rgba(251, 191, 36, 0.28), transparent 60%),
        radial-gradient(circle at 85% 100%, rgba(248, 113, 113, 0.2), transparent 60%);
    opacity: 0.8;
    pointer-events: none;
}

.ls-modal-inner {
    position: relative;
    z-index: 1;
}

.ls-modal-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 0.6rem;
}

/* Warning Icon */
.ls-warning-icon {
    width: 70px;
    height: 70px;
    border-radius: 20px;
    background: radial-gradient(circle at 30% 0,
            rgba(250, 204, 21, 0.2),
            rgba(15, 23, 42, 1) 70%);
    border: 1px solid rgba(251, 191, 36, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
        0 0 20px rgba(251, 191, 36, 0.8),
        0 0 10px rgba(248, 113, 113, 0.7);
    animation: pulseWarn 1.6s infinite ease-in-out;
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
    filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.9));
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
    color: rgba(251, 191, 36, 0.8);
}

.ls-modal-title {
    font-size: 1.3rem;
    font-weight: 700;
}

.ls-modal-close {
    position: absolute;
    top: 0.7rem;
    right: 0.85rem;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
}

.ls-modal-body {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.55;
}

.ls-highlight {
    color: var(--accent);
    font-weight: 500;
}

.ls-modal-footer {
    margin-top: 1.1rem;
    display: flex;
    justify-content: flex-end;
}

.ls-btn {
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.8);
    padding: 0.5rem 1.4rem;
    background: rgba(15, 23, 42, 0.95);
    color: var(--text-main);
    cursor: pointer;
}

.ls-btn:hover {
    border-color: var(--accent-strong);
    color: var(--accent-strong);
    box-shadow: 0 0 16px rgba(251, 191, 36, 0.9);
}

@keyframes pulseWarn {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.06);
    }
}

@media (max-width: 640px) {
    .ls-modal-overlay {
        align-items: flex-end;
    }

    .ls-modal {
        width: 100%;
        border-radius: 18px 18px 0 0;
    }

    .ls-modal-footer {
        justify-content: center;
    }

    .ls-btn {
        width: 100%;
    }
}
</style>
