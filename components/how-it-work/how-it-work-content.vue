<template>
<div class="how-main-section"> 
<div class="how-hero">
    <div class="how-container">
    <img class="hw-logo" src="/public/images/logo/landing-logo.gif" alt="LinkSwingers logo" />
    <div class="badge">Launching Soon • Join the Waitlist</div>
    <h1 class="hw-title">How it works</h1>
    <p class="subtitle">We’re launching soon — join the waitlist to get <strong>promotional access for free</strong>. Below is a quick tour of the platform: profile browsing, calls and HD video calls, video roulette, and secure media uploads.</p>
    <div class="cta-row">
      <a class="btn primary" href="/early-access">Join waitlist</a>
      <a class="btn ghost" href="#features">See features</a>
    </div>
    <!-- Top email form -->
    <form class="email-form" @submit.prevent="handleSubmit">
      <input type="email" name="email" v-model="email" placeholder="Enter your email to join the waitlist…" required />
      <button type="submit">Get Early Access</button>
    </form>
    <div class="email-form"><small>We’ll only email you about launch and early access. You can opt out any time.</small></div>
    </div>
</div>

  <div class="how-container">
    <section class="get-section" id="get-started">
      <div class="kicker">Join waitlist</div>
      <div class="steps" style="margin-top:12px">
        <div class="step card-hw">
          <div></div>
          <div>
            <h3>Sign up & set your profile</h3>
            <p class="muted">Create an account, add a profile photo, set your display name and preferences. Optional photo verification adds a trusted badge.</p>
          </div>
        </div>
        <div class="step card-hw">
          <div></div>
          <div>
            <h3>Browse & filter</h3>
            <p class="muted">Use advanced filters (location, preferences, online status) to discover profiles. Save favourites and control who can message you.</p>
          </div>
        </div>
        <div class="step card-hw">
          <div></div>
          <div>
            <h3>Chat, call, video call</h3>
            <p class="muted">Start private messages, place secure audio calls, or jump on HD video calls with PIN protection to prevent spam.</p>
          </div>
        </div>
        <div class="step card-hw">
          <div></div>
          <div>
            <h3>Share media safely</h3>
            <p class="muted">Upload photos and short videos to your profile or share privately in chat. You stay in control of what’s visible.</p>
          </div>
        </div>
      </div>
    </section>

    <div class="separator"></div>

    <section class="feature-section" id="features">
      <div class="kicker">Key features</div>
      <div class="grid cols-3" style="margin-top:12px">
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/SEARCH.gif" alt="Browse Profiles icon" /></div>
            <div>
              <h3>Browse Profiles</h3>
              <p>Explore profiles with rich details and verification badges. Quick actions: view, favourite, message.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/chat.gif" alt="Private Messaging icon" /></div>
            <div>
              <h3>Private Messaging</h3>
              <p>Fast, reliable chat with read receipts, media sharing, and controls for who can contact you.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/call.gif" alt="Audio Calls icon" /></div>
            <div>
              <h3>Audio Calls</h3>
              <p>One-to-one calls with optional PINs to stop unsolicited ringing and reduce spam.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/video-call.gif" alt="HD Video Calls icon" /></div>
            <div>
              <h3>HD Video Calls</h3>
              <p>Secure, high-quality video with device checks and quick mute/camera controls.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/video-roulette-available.gif" alt="Video Roulette icon" /></div>
            <div>
              <h3>Video Roulette</h3>
              <p>Opt-in, one-to-one random video matching. You can skip, block, or report at any time.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/24.gif" alt="Photo Uploads icon" /></div>
            <div>
              <h3>Photo Uploads</h3>
              <p>Upload profile photos and albums. Control visibility (public, friends, or private).</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/15.gif" alt="Video Uploads icon" /></div>
            <div>
              <h3>Video Uploads</h3>
              <p>Share short clips on your profile or in chats. Large files stream smoothly via CDN.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/FLAG-ANIMATION.gif" alt="Profile Verification icon" /></div>
            <div>
              <h3>Profile Verification</h3>
              <p>Optional selfie check adds a verified badge and helps reduce impersonation.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/18-plus.gif" alt="Privacy Controls icon" /></div>
            <div>
              <h3>Privacy Controls</h3>
              <p>Choose who can message or call you, hide activity, and manage notifications.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/ADMIN-MODERATOR.gif" alt="Safety & Moderation icon" /></div>
            <div>
              <h3>Safety & Moderation</h3>
              <p>AI-assisted checks plus human review keep things safe. Quick report & block tools.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/MEMBERSHIP.gif" alt="Membership Options icon" /></div>
            <div>
              <h3>Membership Options</h3>
              <p>Start free. Upgrade any time to unlock premium features. No auto-renew by default.</p>
            </div>
          </div>
        </article>
        <article class="card-hw">
          <div class="d-flex gap-3 align-items-center c-row">
            <div class="icon"><img src="/public/images/badges/animated/150X150px/02-150.gif" alt="Control Centre icon" /></div>
            <div>
              <h3>Control Centre</h3>
              <p>Manage reports, blocks, privacy settings and notifications from one place. Full control at any time.</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <div class="separator"></div>

    <section class="trust-section" id="trust">
      <div class="kicker">Why people trust LinkSwingers</div>
      <div class="grid cols-3" style="margin-top:12px">
        <div class="card-hw"><span class="pill-hw">No spam policy</span><h3>PIN-protected calls</h3><p>Call requests require a short PIN you share only with people you want to speak to—reduces spam and notifications overload.</p></div>
        <div class="card-hw"><span class="pill-hw">Your data, your rules</span><h3>GDPR-friendly</h3><p>Clear controls for downloads, deletion, and marketing emails. You decide what’s visible and what stays private.</p></div>
        <div class="card-hw"><span class="pill-hw">Secure by design</span><h3>Modern infrastructure</h3><p>Media is served via CDN with signed links; sensitive uploads follow our retention policy and can be removed by you.</p></div>
      </div>
    </section>

    <div class="separator"></div>

    <section class="faq-section" id="faq">
      <div class="kicker">FAQ</div>
      <details>
        <summary>Is this a dating site?</summary>
        <p class="muted-hw">It’s a private social platform with messaging and calling tools. Content must follow our community rules. We avoid matchmaking language to comply with advertising policies.</p>
      </details>
      <details>
        <summary>Can I turn off calls?</summary>
        <p class="muted-hw">Yes. You can limit who can call you, require a PIN, or disable calls altogether from Profile → Settings.</p>
      </details>
      <details>
        <summary>Can I delete my uploads?</summary>
        <p class="muted-hw">Yes. Remove photos or videos at any time. Deleted items are taken offline and purged on a schedule from backup storage.</p>
      </details>
      <details>
        <summary>Do memberships auto-renew?</summary>
        <p class="muted-hw">By default, no. You purchase access for 30 days. Auto-renew may be offered later as an optional toggle.</p>
      </details>
      <details>
        <summary>Is my profile private?</summary>
        <p class="muted-hw">Yes. You register with an email and choose a nickname. No real name, address, or personal details are required unless you choose to add them.</p>
      </details>
    
      <details>
        <summary>Is it free?</summary>
        <p class="muted-hw">Yes. It’s free to sign up and use. We only charge for premium features, and we aim to keep prices fair and low.</p>
      </details>
    </section>

    <div class="separator"></div>

    <!-- Bottom email form section -->
    <section class="early-section" id="early-access" style="text-align:center">
      <h2 style="margin:0 0 8px">Get early access</h2>
      <p class="muted-hw" style="margin:0 auto 14px; max-width:730px">Join the waitlist below and we’ll notify you when promotional access is live.</p>
      <form class="email-form" action="/waitlist" method="GET" style="margin-top:0">
        <input type="email" name="email" placeholder="Your email address" required />
        <button type="submit">Join Waitlist</button>
      </form>
      <div class="email-form"><small>We’ll only email you about launch and early access.</small></div>
    </section>

    <p class="footer">© <span id="y"></span> LinkSwingers • This page is for information only and avoids restricted advertising terms.</p>
  </div>
</div>
</template>

<script setup lang="ts">
import type { EarlyAccessModel } from '~/composables/models'
const email = ref('')
const success = ref(false)
const error = ref<string | null>(null)

const handleSubmit = async () => {
  success.value = false
  error.value = null
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email.'
    return
  }
  try {
    let url = getUrl(RequestURL.addEarlyAccess)
    const res = await $fetch<SuccessError<EarlyAccessModel.AddResponseModel>>(url, {
      method: 'POST',
      body: { email: email.value , should_receive_updates: false },
    })

    if (res.success)
     {
      success.value = true
      email.value = ''
      await navigateTo('/thank-you')
    } else {
     showToastError(res.message)
    }
  } catch (e) {
    showToastError('That didn’t work. Please try again.')
  }
}

</script>



