<template>
  <div class="ls-help-body">
    <div :class="['ls-help-wrapper', { 'ls-help-show-content': showContent && isMobile }]">
      <!-- SIDEBAR / NAV -->
      <aside class="ls-help-sidebar" v-show="!showContent || !isMobile">
        <div class="ls-help-logo-area">
          <img class="ls-help-logo-img" :src="logoSrc" alt="LinkSwingers(LS) logo" />
          <div class="ls-help-logo-text">LinkSwingers(LS)</div>
        </div>

        <div class="ls-help-sidebar-title">HOW IT WORKS</div>

        <ul class="ls-help-nav-list">
          <li v-for="(s, idx) in sections" :key="s.id" class="ls-help-nav-item">
            <button
              class="ls-help-nav-btn"
              :class="{ 'ls-help-active': activeSection === s.id }"
              @click="openSection(s.id)">
              <span class="ls-help-index">{{ idx + 1 }}.</span>
              <span class="ls-help-nav-label">{{ s.title }}</span>
            </button>
          </li>
        </ul>
      </aside>

      <!-- CONTENT -->
      <main class="ls-help-content" v-show="!isMobile || showContent">
        <div class="ls-help-content-header">
          <button v-if="isMobile" class="ls-help-back-btn" @click="closeContent">
            ← <span>Back</span>
          </button>

          <div class="ls-help-content-header-text">
            <h1>How It Works</h1>
            <p>Quick guide to using LinkSwingers(LS).</p>
          </div>
        </div>

        <section
          v-for="s in sections"
          :key="s.id"
          :id="s.id"
          class="ls-help-section"
          :class="{ 'ls-help-active-section': activeSection === s.id }"
          v-show="activeSection === s.id">

          <small class="ls-help-section-label">{{ s.label }}</small>
          <h2 v-html="s.title"></h2>

          <!-- rich content block: paragraphs and lists rendered from structured data -->
          <div v-for="(block, i) in s.content" :key="i">
            <p v-if="block.type === 'p'" v-html="block.text"></p>

            <ul v-else-if="block.type === 'ul'">
              <li v-for="(li, j) in block.items" :key="j" v-html="li"></li>
            </ul>

            <div v-else-if="block.type === 'box'" :class="['ls-help-highlight-box', { 'ls-help-green': block.variant === 'green' }]" v-html="block.text"></div>

            <div v-else-if="block.type === 'coming'" class="ls-help-coming-soon" v-html="block.text"></div>
          </div>

          <button v-if="s.cta && !s.showForm" class="ls-help-btn-secondary" type="button">{{ s.cta }}</button>
          
          <!-- Contact Form for Support Section -->
          <div v-if="s.showForm" class="ls-help-contact-form">
            <div v-if="!formSubmitted" class="ls-help-form-container">
              <div class="ls-help-form-group">
                <label for="subject" class="ls-help-form-label">Subject</label>
                <input 
                  id="subject"
                  v-model="formData.subject" 
                  type="text" 
                  class="ls-help-form-input"
                  placeholder="Enter your subject"
                  required
                >
              </div>
              
              <div class="ls-help-form-group">
                <label for="message" class="ls-help-form-label">Message</label>
                <textarea 
                  id="message"
                  v-model="formData.message" 
                  class="ls-help-form-textarea"
                  placeholder="Type your message here..."
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button 
                @click="handleSubmit" 
                :disabled="isSubmitting || !formData.subject.trim() || !formData.message.trim()"
                class="ls-help-btn-secondary ls-help-submit-btn"
                type="button"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </div>
            
            <div v-if="formSubmitted" class="ls-help-success-message">
              <div class="ls-help-success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>Your message has been sent to the admin team. They will get back to you soon.</p>
            </div>
          </div>
          
          <div v-if="s.hint" class="ls-help-hint" v-html="s.hint"></div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const logoSrc = '/images/logo/landing-logo.gif'

// Sections data (converted from provided HTML)
const sections = [
  {
    id: 'section1',
    label: 'Step 1',
    title: 'Create your account',
    content: [
      { type: 'p', text: 'Sign up using your email address and set up your profile type and basic details.' },
      { type: 'ul', items: [
        'Choose your profile type: <strong>Man / Woman / Couple / TS / Club</strong>.',
        'Set your location and basic info.',
        'Optional: complete <strong>Photo Verification</strong> – this shows other users you are genuine, and in turn helps you know that the people you are talking to are genuine as well.'
      ] }
    ]
  },
  {
    id: 'section2',
    label: 'Step 2',
    title: 'Age verification',
    content: [
      { type: 'p', text: 'We use <strong>AgeChecked</strong> to confirm you are 18+.' },
      { type: 'ul', items: [
        '<strong>Not age-verified:</strong> you can browse the site, but <strong>no photos, videos, video chat or roulette</strong> are visible.',
        '<strong>Age-verified:</strong> full access unlocks instantly.'
      ] },
      { type: 'box', variant: null, text: 'This protects the community and helps keep LinkSwingers(LS) compliant with UK and international regulations.' }
    ]
  },
  {
    id: 'section3',
    label: 'Step 3',
    title: 'Build your profile',
    content: [
      { type: 'p', text: 'Make your profile stand out and control who can reach you.' },
      { type: 'ul', items: [
        'Upload photos and videos that represent you.',
        'Add a short bio, interests and what you’re looking for.',
        'Set <strong>Who can message me</strong>: Everyone / Men / Women / Couples / TS / Photo Verified.',
        'Use privacy options like: <em>Friends list public</em> and <em>Hide me from “Looked at me”</em>.'
      ] },
      { type: 'box', variant: null, text: 'You are fully responsible for any photos or videos you upload. Explicit content is allowed, but it <strong>must be your own content</strong> – no copyright material, no revenge porn, and no content that violates other people’s privacy. Users who abuse this may have their content removed and accounts suspended or banned.' }
    ]
  },
  {
    id: 'section4',
    label: 'Step 4',
    title: 'Messaging & media',
    content: [
      { type: 'p', text: 'Chat in real time and share media safely.' },
      { type: 'ul', items: [
        'Send text messages, images, videos and voice notes.',
        'Delete chats or remove attachments at any time from your side.',
        'Videos include controls: <strong>playback, seek bar, likes and comments</strong>.',
        'View all photos and videos in full screen on both mobile and desktop.'
      ] },
      { type: 'box', variant: null, text: 'Some messaging and media features, such as daily limits or advanced options, may depend on your current <strong>membership tier</strong>. For in-depth information, please see the <strong>Membership</strong> page.' }
    ]
  },
  {
    id: 'section5',
    label: 'Step 5',
    title: 'Direct video calls',
    content: [
      { type: 'p', text: 'LinkSwingers(LS) uses a <strong>Call Code</strong> so no one can randomly ring you.' },
      { type: 'p', text: '<strong>How direct calls work:</strong>' },
      { type: 'ul', items: [
        '<strong>Start a chat first</strong> with the user you want to call.',
        'If you both agree, <strong>they give you their 4-digit Call Code</strong> in chat.',
        'Tap <strong>Video Call</strong> inside that chat.',
        'Enter <strong>their</strong> Call Code to start the call.'
      ] },
      { type: 'box', variant: 'green', text: 'Each user has their own Call Code. You can change it in Settings any time. Without the correct code, nobody can call you.' }
    ]
  },
  {
    id: 'section6',
    label: 'Step 6',
    title: 'Video Roulette',
    content: [
      { type: 'p', text: 'Fast, random video matching for age-verified users.' },
      { type: 'ul', items: [
        'Tap <strong>Video Roulette</strong> to start.',
        'Get matched with a random online user.',
        'Use filters (gender, couples, location, etc. – where available).',
        'Tap next/skip to move on to another match.',
        'Start a private chat with someone you like at any time.'
      ] },
      { type: 'box', variant: null, text: 'Video Roulette is available for everyone once age-verified. Some usage limits and options may depend on your <strong>membership tier</strong>.' }
    ]
  },
  {
    id: 'section7',
    label: 'Step 7',
    title: 'Go live on cam',
    content: [
      { type: 'p', text: 'Broadcast yourself live and interact with multiple viewers at the same time.' },
      { type: 'ul', items: [
        'Start a live room and turn your camera on so other users can join and watch.',
        'Viewers can chat with you in real time using the live text chat.',
        'A docked camera layout can show your main cam and other users who choose to share theirs (when available).',
        'You stay in control – you can mute, block or remove viewers from your room.'
      ] },
      { type: 'box', variant: null, text: 'Access to live broadcasting and the number of viewers you can host may depend on your <strong>membership tier</strong>.' },
      { type: 'coming', text: "COMING SOON – WE'RE WORKING ON IT" }
    ],
    cta: null
  },
  {
    id: 'section8',
    label: 'Step 8',
    title: 'Clubs & events',
    content: [
      { type: 'p', text: 'For approved club profiles only.' },
      { type: 'ul', items: [
        'Clubs are invite-only and approved by the site admin.',
        'Clubs can create events with free or paid tickets.',
        'Checkout clearly shows: <strong>ticket price + service fee + VAT + total</strong>.',
        'Tickets appear instantly in your account after successful payment.'
      ] },
      { type: 'coming', text: "COMING SOON – WE'RE WORKING ON IT" }
    ]
  },
  {
    id: 'section9',
    label: 'Step 9',
    title: 'Nearby',
    content: [
      { type: 'p', text: 'See who is close to you while keeping your exact location private.' },
      { type: 'ul', items: [
        'Browse users within your chosen distance range (for example 1–100 km).',
        'Filter by gender, couple type, online status and more.',
        'Your location is always <strong>approximate</strong> – never your exact address.'
      ] }
    ]
  },
  {
    id: 'section10',
    label: 'Step 10',
    title: 'Safety & moderation',
    content: [
      { type: 'p', text: 'We allow adult content but never under-18s or anything illegal.' },
      { type: 'ul', items: [
        'AI helps flag risky content (age concerns, impersonation, copyright/DMCA).',
        '<strong>Human moderators</strong> review all flagged items.',
        'You can <strong>block</strong> and <strong>report</strong> users at any time.',
        'Serious violations can lead to content removal or account suspension.'
      ] }
    ]
  },
  {
    id: 'section11',
    label: 'Step 11',
    title: 'Notifications & email settings',
    content: [
      { type: 'p', text: 'Decide what alerts and emails you want to receive.' },
      { type: 'ul', items: [
        'Manage all options under <strong>Profile Settings → Notifications</strong>.',
        'Turn <strong>marketing emails</strong> on or off.',
        'System emails (account, password, age check, ticket receipts) are always sent when needed.'
      ] }
    ]
  },
  {
    id: 'section12',
    label: 'Step 12',
    title: 'Membership',
    content: [
      { type: 'p', text: 'LinkSwingers(LS) uses membership tiers so you can choose how deep you want to go with the site features.' },
      { type: 'ul', items: [
        '<strong>Free / Basic access</strong> – lets you join, browse, chat and get a feel for the community.',
        '<strong>Mid-level tiers</strong> – unlock extra daily usage, better visibility in lists and more comfort features.',
        '<strong>Top tier</strong> – priority placement, more control over filters and the best experience for active users and couples.'
      ] },
      { type: 'box', variant: null, text: 'This page only gives a general overview. For exact benefits, limits and current pricing, please visit the <strong>Membership</strong> page inside the site.' }
    ]
  },
  {
    id: 'section13',
    label: 'Step 13',
    title: 'Support',
    content: [
      { type: 'p', text: 'If you need help, have a question, or want to report an issue directly to the team:' },
      { type: 'ul', items: [
        'Open the in-site <strong>Help / Support</strong> section.',
        'Use the <strong>Message admin</strong> option to contact the LinkSwingers(LS) team.'
      ] }
    ],
    cta: 'Message admin',
    hint: 'When you click <strong>Message admin</strong>, a pop-up window will appear where you can choose a subject and type your message to the admin team.',
    showForm: true
  }
]

const activeSection = ref('section1')
const showContent = ref(false)
const isMobile = ref(false)
const formData = ref({
  subject: '',
  message: ''
})
const formSubmitted = ref(false)
const isSubmitting = ref(false)

function openSection(id) {
  activeSection.value = id
  if (isMobile.value) showContent.value = true
}

function closeContent() {
  showContent.value = false
}

function handleSubmit() {
  if (!formData.value.subject.trim() || !formData.value.message.trim()) {
    return
  }
  
  isSubmitting.value = true
  
  // Simulate form submission
  setTimeout(() => {
    formSubmitted.value = true
    isSubmitting.value = false
    
    // Reset form after 3 seconds
    setTimeout(() => {
      formData.value.subject = ''
      formData.value.message = ''
      formSubmitted.value = false
    }, 3000)
  }, 1000)
}

// responsive detection
let mq
onMounted(() => {
  mq = window.matchMedia('(max-width: 800px)')
  isMobile.value = mq.matches
  const handler = (e) => { isMobile.value = e.matches }
  mq.addEventListener('change', handler)
  // cleanup stored handler ref for removal
  onBeforeUnmount(() => mq.removeEventListener('change', handler))
})

onBeforeUnmount(() => {
  // nothing to cleanup here (removed above with closure) -- kept for clarity
})
</script>
