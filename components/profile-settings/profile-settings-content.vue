<template>

<div class="pro-setting">
  <div class="pro-container">
    <div class="pro-head">
        <img src="public/images/badges/Profile_settings-min.png">
        <h1 class="text-white">Profile Settings</h1>
    </div>
    <div class="pro-flex">
      <div class="profile-left">
        <nav class="nav" id="sideNav">
            <a href="#account" data-route="account" @click.prevent="setActiveNav('account')" :class="{ active: activeNav === 'account' }" class="text-white">Account</a>
            <a href="#visibility" data-route="visibility" @click.prevent="setActiveNav('visibility')" :class="{ active: activeNav === 'visibility' }" class="text-white">Visibility</a>
            <a href="#privacy-safety" data-route="privacy-safety" @click.prevent="setActiveNav('privacy-safety')" :class="{ active: activeNav === 'privacy-safety' }" class="text-white">Privacy & Safety</a>
            <a href="#messaging" data-route="messaging" @click.prevent="setActiveNav('messaging')" :class="{ active: activeNav === 'messaging' }" class="text-white">Messaging</a>
            <a href="#notifications" data-route="notifications" @click.prevent="setActiveNav('notifications')" :class="{ active: activeNav === 'notifications' }" class="text-white">Notifications</a>
            <a href="#verification" data-route="verification" @click.prevent="setActiveNav('verification')" :class="{ active: activeNav === 'verification' }" class="text-white">Verification</a>
            <a href="#payments-subscriptions" data-route="payments-subscriptions" @click.prevent="setActiveNav('payments-subscriptions')" :class="{ active: activeNav === 'payments-subscriptions' }" class="text-white">Payments & Subscriptions</a>
            <a href="#privacy-mode" data-route="privacy-mode" @click.prevent="setActiveNav('privacy-mode')" :class="{ active: activeNav === 'privacy-mode' }" class="text-white">Privacy Mode</a>
            <a href="#data-deletion" data-route="data-deletion" @click.prevent="setActiveNav('data-deletion')" :class="{ active: activeNav === 'data-deletion' }" class="text-white">Data & Deletion</a>
        </nav>
      </div>
      <div class="pro-right">
          <section class="pro-tab" id="view-account" :hidden="activeNav !== 'account'">
            <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4">Account</h2>
                <div class="grid md:grid-cols-2 ">
                  <div class="frm-field">
                    <label class="block">Username</label>
                    <input class="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2" value="ilie_culda" disabled />
                  </div>
                  <div class="frm-field">
                    <label class="block">Email</label>
                    <input class="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2" value="ilie@webblizzconnect.co.uk" disabled />
                  </div>
                </div>  
                <div class="grid md:grid-cols-3 mt-4">
                  <div class="frm-field">
                    <label class="block">Current password</label>
                    <input type="password" class="mt-1 w-full" placeholder="********"></input>
                  </div>
                  <div class="frm-field">
                    <label class="block">New password</label>
                    <input type="password" class="mt-1 w-full ">
                  </div>
                  <div class="frm-field">
                    <label class="block">Confirm new password</label>
                    <input type="password" class="mt-1 w-full ">
                  </div>
                </div>
              </div>  
          </section>
          <section class="pro-tab" id="view-visibility" :hidden="activeNav !== 'visibility'">
              Visibility
          </section>
          <section id="view-privacy-safety" :hidden="activeNav !== 'privacy-safety'">
              privacy-safety
          </section>
          <section class="pro-tab" id="view-messaging" :hidden="activeNav !== 'messaging'">
              messaging
          </section>
          <section class="pro-tab" id="view-notifications" :hidden="activeNav !== 'notifications'">
              notifications
          </section>
          <section class="pro-tab" id="view-verification" :hidden="activeNav !== 'verification'">
              verification
          </section>
          <section class="pro-tab" id="view-payments-subscriptions" :hidden="activeNav !== 'payments-subscriptions'">
              payments-subscriptions
          </section>
          <section class="pro-tab" id="view-privacy-mode" :hidden="activeNav !== 'privacy-mode'">
              privacy-mode
          </section>
          <section class="pro-tab" id="view-data-deletion" :hidden="activeNav !== 'data-deletion'">
              data-deletion
          </section>
      </div> 
    </div>
  </div>
</div>
<div class="cst-sticky-bar ">
    <div class="pro-container">
      <div class="pro-btn-ps">
        <button id="discardBtn" class="btn">Discard</button>
        <button id="saveBtn" class="btn btn-primary glow-green">Save changes</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const router = useRouter()
const drawerOpen = ref(false)
const isMobile = ref(false)
const showAdvancedSearch = ref(false)
const activeNav = ref("account")

const routeTitle = computed(() => {
  const path = route.path.split('/').pop() || 'account'
  return path.charAt(0).toUpperCase() + path.slice(1)
})

function setActive(r) {
  const targetRoute = r === 'account' ? '/dashboard' : `/dashboard/${r}`
  router.push(targetRoute)
}

function setActiveNav(nav) {
  activeNav.value = nav
  window.location.hash = nav
}

function openAdvanced() {
  drawerOpen.value = true
  showAdvancedSearch.value = true
}

function closeAdvanced() {
  drawerOpen.value = false
  showAdvancedSearch.value = false
}

function fakeUpload() {
  alert('Open upload composer here (photo/video/event/post).')
}

function checkMobile() {
  isMobile.value = window.innerWidth <= 980
}

onMounted(() => {
  // Handle hash-based navigation
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1) || 'home'
    activeNav.value = hash
  }
  
  // Set initial state based on hash
  handleHashChange()
  
  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange)
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  // Cleanup listener on unmount
  onUnmounted(() => {
    window.removeEventListener('hashchange', handleHashChange)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

</script>

