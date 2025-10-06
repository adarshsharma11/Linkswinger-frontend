<script setup lang="ts">
import { ref } from 'vue'

// reactive state
const email = ref('')
const consent = ref(false)
const success = ref(false)
const error = ref<string | null>(null)

const handleSubmit = async () => {
  success.value = false
  error.value = null

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value) || !consent.value) {
    error.value = 'Please enter a valid email and tick consent.'
    return
  }

  try {
    const res = await $fetch('/api/early-access', {
      method: 'POST',
      body: { email: email.value }
    })

    if (res) {
      success.value = true
      email.value = ''
      consent.value = false
    } else {
      error.value = 'That didn’t work. Please try again.'
    }
  } catch (e) {
    error.value = 'That didn’t work. Please try again.'
  }
}
</script>

<template>
  <div class="wrap">
      <div class="login-content-header mb-4 d-flex justify-content-center">
          <CommonLogo :logo="'landing-logo.gif'" />
      </div>

    <main class="card">
      <h1>
        Be first in — get <span class="highlight">1 month free</span>
      </h1>
      <p class="sub">
        We’re building a modern swingers platform for singles, couples and trans
        people to meet your way — at home, while travelling, or outdoors. With
        accurate location filters and built-in video, it’s easier to connect
        safely and have fun. Pre-sign up below and we’ll send your invite at
        launch with <strong>one month free access</strong>.
      </p>

      <div class="badges">
        <span class="badge">Singles • Couples • Trans</span>
        <span class="badge">Accurate location filters</span>
        <span class="badge">Video calls for verification</span>
        <span class="badge">Video Chat Roulette</span>
        <span class="badge">Invite-only clubs</span>
        <span class="badge">Genuine profiles only</span>
      </div>

      <section class="grid">
        <div class="features">
          <article class="feature">
            <h3>Meet your way</h3>
            <p>
              Plan meets at your place, on the road, or outdoors — you choose
              the vibe.
            </p>
          </article>
          <article class="feature">
            <h3>Accurate location filters</h3>
            <p>
              Dial in distance and city/town accuracy so you find people
              actually nearby.
            </p>
          </article>
          <article class="feature">
            <h3>Video calls for peace of mind</h3>
            <p>
              Hop on a quick call to verify who you’re meeting, enjoy 1-to-1
              video fun, or try our Video Chat Roulette.
            </p>
          </article>
          <article class="feature">
            <h3>Invite-only clubs & confirmed events</h3>
            <p>
              High-quality club spaces with events we confirm before they go
              live. More clubs will be added over time.
            </p>
          </article>
          <article class="feature">
            <h3>Genuine profiles only</h3>
            <p>
              We take great care with checks and reviews so only real, genuine
              profiles make it through.
            </p>
          </article>
          <article class="feature">
            <h3>Broadcast your camera (coming soon)</h3>
            <p>
              Share your live cam to entertain and explore — a new way to
              connect when you’re not meeting in person.
            </p>
          </article>
        </div>

        <div class="cta">
          <form @submit.prevent="handleSubmit" class="access-form">
            <div class="access-row">
              <input
                id="email"
                v-model="email"
                type="email"
                inputmode="email"
                autocomplete="email"
                placeholder="Enter your email"
                required
              />
              <button type="submit">Join the early-access list</button>
            </div>
            <label class="tick d-flex align-items-center gap-2">
              <input type="checkbox" v-model="consent" required />
              <span class="text-sm text-white">I agree to receive a one-off invite email and launch updates. You
              can unsubscribe any time.</span>
            </label>

            <div v-if="success" class="success">
              Thanks — you’re on the list. We’ll email your invite at launch.
            </div>
            <div v-if="error" class="error">
              {{ error }}
            </div>

            <p class="legal">
              Protected by re-checks and rate limits. We never sell your data.
              View our <NuxtLink to="/privacy">Privacy Policy</NuxtLink>.
            </p>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>
