<template>

<div class="pro-setting">
  <div class="pro-container">
    <div class="pro-head">
        <img src="public/images/badges/Profile_settings.png">
        <h1 class="text-white">Profile Settings</h1>
    </div>
    <div class="pro-flex">
      <div class="profile-left" v-show="!isMobile || (isMobile && !showRightPanel)">
        <nav class="nav" id="sideNav">
            <a href="#account" data-route="account" class="text-white" @click.prevent="setActiveNav('account')" :class="{ active: activeNav === 'account' }">Account</a>
            <a href="#visibility" data-route="visibility" @click.prevent="setActiveNav('visibility')" :class="{ active: activeNav === 'visibility' }" class="text-white">Visibility</a>
            <a href="#privacy-safety" data-route="privacy-safety" @click.prevent="setActiveNav('privacy-safety')" :class="{ active: activeNav === 'privacy-safety' }" class="text-white">Privacy & Safety</a>
            <a href="#block-list" data-route="block-list" @click.prevent="setActiveNav('block-list')" :class="{ active: activeNav === 'block-list' }" class="text-white">Block List</a>
            <a href="#messaging" data-route="messaging" @click.prevent="setActiveNav('messaging')" :class="{ active: activeNav === 'messaging' }" class="text-white">Messaging</a>
            <a href="#notifications" data-route="notifications" @click.prevent="setActiveNav('notifications')" :class="{ active: activeNav === 'notifications' }" class="text-white">Notifications</a>
            <a href="#verification" data-route="verification" @click.prevent="setActiveNav('verification')" :class="{ active: activeNav === 'verification' }" class="text-white">Verification</a>
            <a href="#payments-subscriptions" data-route="payments-subscriptions" @click.prevent="setActiveNav('payments-subscriptions')" :class="{ active: activeNav === 'payments-subscriptions' }" class="text-white">Payments & Subscriptions</a>
            <a href="#privacy-mode" data-route="privacy-mode" @click.prevent="setActiveNav('privacy-mode')" :class="{ active: activeNav === 'privacy-mode' }" class="text-white">Privacy Mode</a>
            <a href="#data-deletion" data-route="data-deletion" @click.prevent="setActiveNav('data-deletion')" :class="{ active: activeNav === 'data-deletion' }" class="text-white">Data & Deletion</a>
        </nav>
      </div>
      <div class="pro-right" v-show="!isMobile || (isMobile && showRightPanel)">
          <section class="pro-tab" id="view-account" :hidden="activeNav !== 'account'">
            <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Account</h2>
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
              <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Visibility</h2>
                <div class="d-flex align-items-center justify-content-between py-3 border-b">
                  <div class="vs-left">
                    <div class="font-medium">Hide my profile</div>
                    <div class="text-sm text-slate-400">Remove your profile from public listings</div>
                  </div>
                  <div class="vs-toggle">
                  <input type="checkbox" class="switch" id="hideProfile">
                  </div>
                </div> 
                <div class="py-3 border-b border-white/5">
                  <label class="font-medium">Who can view my profile</label>
                  <select class="mt-2 w-full px-3 py-2">
                    <option>Everyone</option>
                    <option>Verified only</option>
                    <option>Friends only</option>
                  </select>
                </div>
                <div class="d-flex align-items-center justify-content-between py-3 border-b">
                  <div class="vs-left">
                    <div class="font-medium">Show online status</div>
                  </div>
                  <div class="vs-toggle">
                    <input type="checkbox" class="switch">
                  </div>
                </div>
                <div class="py-3 border-b border-white/5">
                  <label class="font-medium">Show last seen</label>
                  <select class="mt-2 w-full px-3 py-2">
                    <option>Everyone</option>
                    <option>Friends</option>
                    <option>Plus &amp; Elite</option>
                    <option>Nobody</option>
                  </select>
                </div>
                <div class="d-flex align-items-center justify-content-between py-3 border-b">
                  <div class="vs-left">
                    <div class="font-medium">Show my location for Nearby</div>
                  </div>
                  <div class="vs-toggle">
                    <input type="checkbox" class="switch" id="nearby">
                  </div>
                </div>
                
              </div>
          </section>
          <section id="view-privacy-safety" :hidden="activeNav !== 'privacy-safety'">
              <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Privacy & Safety</h2>
                <div class="py-3 border-b border-white/5">
                  <label class="font-medium">Who can comment on my posts/media</label>
                  <select class="mt-2 w-full px-3 py-2">
                    <option>Everyone</option>
                    <option>Friends</option>
                    <option>Nobody</option>
                  </select>
                </div>
                <div class="py-3 border-b border-white/5">
                  <label class="font-medium">Who can like my media</label>
                  <select class="mt-2 w-full px-3 py-2">
                    <option>Everyone</option>
                    <option>Friends</option>
                    <option>Nobody</option>
                  </select>
                </div>
                <div class="d-flex align-items-center justify-content-between py-3 border-b">
                  <div class="vs-left">
                    <div class="font-medium">Allow friend requests</div>
                  </div>
                  <div class="vs-toggle">
                    <input type="checkbox" class="switch" checked="">
                  </div>
                </div>

                <div class="d-flex align-items-center justify-content-between py-3 border-b">
                  <div class="vs-left">
                    <div class="font-medium">Hide me from “Looked at me” lists</div>
                  </div>
                  <div class="vs-toggle">
                    <input type="checkbox" class="switch">
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-between py-3 border-b">
                  <div class="vs-left">
                    <div class="font-medium">Friends list public</div>
                  </div>
                  <div class="vs-toggle">
                    <input type="checkbox" class="switch" checked="">
                  </div>
                </div>

                <div class="py-3">
                  <label class="font-medium">Verification status</label>
                  <div class="mt-2 d-flex align-items-center gap-2">
                    <span class="green-tag px-2 py-1">Unverified</span>
                    <button class="btn btn-primary glow-green">Start verification</button>
                  </div>
                </div>
                
              </div>
          </section>
          <section id="view-block-list" class="pro-tab" :hidden="activeNav !== 'block-list'">
              <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Block List</h2>
                
                <!-- User List -->
                <div class="space-y-3">
                  <!-- User Item 1 -->
                  <div class="d-flex align-items-center justify-content-between p-3 bg-black/20 rounded-lg">
                    <div class="d-flex align-items-center gap-3">
                      <div class="avatar avatar-sm">
                        <img src="/images/user-list/user-1.jpg" alt="User" class="rounded-circle" width="40" height="40">
                      </div>
                      <div>
                        <div class="font-medium">John Doe</div>
                        <div class="text-sm text-slate-400">@johndoe</div>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger">Unblock</button>
                  </div>
                  
                  <!-- User Item 2 -->
                  <div class="d-flex align-items-center justify-content-between p-3 bg-black/20 rounded-lg">
                    <div class="d-flex align-items-center gap-3">
                      <div class="avatar avatar-sm">
                        <img src="/images/user-list/user-1.jpg" alt="User" class="rounded-circle" width="40" height="40">
                      </div>
                      <div>
                        <div class="font-medium">Jane Smith</div>
                        <div class="text-sm text-slate-400">@janesmith</div>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger">Unblock</button>
                  </div>
                  
                  <!-- User Item 3 -->
                  <div class="d-flex align-items-center justify-content-between p-3 bg-black/20 rounded-lg">
                    <div class="d-flex align-items-center gap-3">
                      <div class="avatar avatar-sm">
                        <img src="/images/user-list/user-1.jpg" alt="User" class="rounded-circle" width="40" height="40">
                      </div>
                      <div>
                        <div class="font-medium">Mike Johnson</div>
                        <div class="text-sm text-slate-400">@mikejohnson</div>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger">Unblock</button>
                  </div>
                  
                  <!-- User Item 4 -->
                  <div class="d-flex align-items-center justify-content-between p-3 bg-black/20 rounded-lg">
                    <div class="d-flex align-items-center gap-3">
                      <div class="avatar avatar-sm">
                        <img src="/images/user-list/user-1.jpg" alt="User" class="rounded-circle" width="40" height="40">
                      </div>
                      <div>
                        <div class="font-medium">Sarah Wilson</div>
                        <div class="text-sm text-slate-400">@sarahwilson</div>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger">Unblock</button>
                  </div>
                  
                  <!-- User Item 5 -->
                  <div class="d-flex align-items-center justify-content-between p-3 bg-black/20 rounded-lg">
                    <div class="d-flex align-items-center gap-3">
                      <div class="avatar avatar-sm">
                        <img src="/images/user-list/user-1.jpg" alt="User" class="rounded-circle" width="40" height="40">
                      </div>
                      <div>
                        <div class="font-medium">David Brown</div>
                        <div class="text-sm text-slate-400">@davidbrown</div>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger">Unblock</button>
                  </div>
                </div>
                
                <!-- Empty State (Optional) -->
                <div class="text-center py-8" style="display: none;">
                  <div class="text-slate-400 mb-2">No blocked users</div>
                  <div class="text-sm text-slate-500">You haven't blocked anyone yet</div>
                </div>
                
              </div>
          </section>
          <section class="pro-tab" id="view-messaging" :hidden="activeNav !== 'messaging'">
            <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Messaging</h2>
                <div class="py-3 border-b border-white/5">
                    <label class="font-medium block mb-2">Who can message me <span class="text-slate-400 text-sm">(choose one or more)</span></label>
                    <div id="msgAudience" class="msg-audience row">
                      <div class="col-md-4 py-1">
                        <label class="d-inline-flex align-items-center gap-2"><div class="vs-toggle"><input type="checkbox" class="switch" id="msgEveryone" checked /></div><span>Everyone</span></label>
                      </div>
                      <div class="col-md-4 py-1">
                        <label class="d-inline-flex align-items-center gap-2"><div class="vs-toggle"><input type="checkbox" class="switch" id="msgMen"></div><span>Men</span></label>
                      </div>
                      <div class="col-md-4 py-1">
                        <label class="d-inline-flex align-items-centergap-2"><div class="vs-toggle"><input type="checkbox" class="switch" id="msgWomen"></div><span>Women</span></label>
                      </div>
                      <div class="col-md-4 py-1">
                        <label class="d-inline-flex align-items-center gap-2"><div class="vs-toggle"><input type="checkbox" class="switch" id="msgFriends"></div><span>Friends</span></label>
                      </div>
                      <div class="col-md-4 py-1">
                        <label class="d-inline-flex align-items-center gap-2"><div class="vs-toggle"><input type="checkbox" class="switch" id="msgCoupleMF"></div><span>Couple M/F</span></label>
                      </div>
                      <div class="col-md-4 py-1">
                      <label class="d-inline-flex align-items-center gap-2"><div class="vs-toggle"><input type="checkbox" class="switch" id="msgCoupleMM"></div><span>Couple M/M</span></label>
                      </div>
                      <div class="col-md-4 py-1">
                       <label class="d-inline-flex align-items-center gap-2"><div class="vs-toggle"><input type="checkbox" class="switch" id="msgTS"></div><span>TS</span></label>
                      </div> 
                      <div class="col-md-4 py-1">
                        <label class="d-inline-flex align-items-center gap-2"><div class="vs-toggle"><input type="checkbox" class="switch" id="msgPhotoVerified"></div><span>Photo verified</span></label>
                      </div>
                    </div>
                    <p class="text-xs text-slate-400 mt-2">Tip: Selecting <strong>Everyone</strong> will ignore the other choices. You can tick multiple specific audiences instead.</p>
                  </div>
                  <div class="py-3 border-b border-white/5">
                    <label class="font-medium block mb-2">Age range</label>
                    <div class="grid md:grid-cols-2 gap-3 items-end">
                      <div class="frm-field">
                        <label class="block text-sm">Min age</label>
                          <input id="ageMin" type="number" min="18" max="99" value="18" class="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2">
                      </div>
                      <div class="frm-field">
                        <label class="block text-sm">Max age</label>
                          <input id="ageMax" type="number" min="18" max="99" value="99" class="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2">
                      </div>
                    </div>
                    <p class="text-xs text-slate-400 mt-2">Default is 18 to 99.</p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between py-3 border-b border-white/5">
                    <div class="font-medium">Call PIN (4 digits, required)</div>
                    <button class="btn">Set / Change</button>
                  </div>
                  <div class="py-3">
                    <div class="font-medium">Chat media auto-delete</div>
                    <p class="text-sm text-slate-400">Media in chats is automatically removed after 60 days.</p>
                  </div>                
              </div>
          </section>
          <section class="pro-tab" id="view-notifications" :hidden="activeNav !== 'notifications'">
            <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Notifications</h2>
                <div class="d-flex align-items-center justify-content-between py-3 border-b">
                  <div class="vs-left">
                    <div class="font-medium">Message notifications</div>
                  </div>
                  <div class="vs-toggle">
                   <input type="checkbox" class="switch" checked>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-between py-3 border-b">
                  <div class="vs-left">
                    <div class="font-medium">Call notifications</div>
                  </div>
                  <div class="vs-toggle">
                   <input type="checkbox" class="switch" checked>
                  </div>
                </div>

                <div class="d-flex align-items-center justify-content-between py-3 border-b">
                  <div class="vs-left">
                    <div class="font-medium d-flex gap-1 align-items-center">Marketing emails <span class="tooltip text-slate-400" data-bs-toggle="tooltip" data-bs-placement="top" title="Receive occasional updates about new features, events, and promotions.">!</span></div>
                  </div>
                  <div class="vs-toggle">
                   <input type="checkbox" class="switch">
                  </div>
                </div>
              </div>
              
          </section>
          <section class="pro-tab" id="view-verification" :hidden="activeNav !== 'verification'">
            <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Verification</h2>
                <div class="py-1 curnt-sts">
                  <div class="font-medium">Your current status</div>
                  <span class="inline-flex mt-2 items-center px-2 py-1 rounded-md text-sm bg-yellow-500 text-yellow-300 border border-yellow-400">Pending</span>
                </div>
                <div>
                <div class="font-medium veri-opt mt-3">Verification options</div>
                  <ul class="list-disc-tt mt-2">
                    <li>Photo + Code verification</li>
                    <li>Facial match verification</li>
                    <li>ID verification (if required)</li>
                  </ul>
                </div>
                <button class="btn btn-primary glow-green mt-4">Start / Resume verification</button>
            </div>
          </section>
          <section class="pro-tab" id="view-payments-subscriptions" :hidden="activeNav !== 'payments-subscriptions'">
            <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Payments Subscriptions</h2>
                <div class="py-3 border-b border-white/5">
                  <label class="font-medium">Membership tier</label>
                  <select class="mt-2 w-full px-3 py-2">
                    <option>Basic</option>
                    <option>Basic+</option>
                    <option>Plus</option>
                    <option>Elite</option>
                  </select>
                </div>
                <div class="py-3">
                  <label class="font-medium">Billing history</label>
                  <div class="mt-2">
                    <button class="btn">View invoices</button>
                  </div>
                </div>
              </div>
              
          </section>
          <section class="pro-tab" id="view-privacy-mode" :hidden="activeNav !== 'privacy-mode'">
            <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Privacy Mode</h2>
                <div class="d-flex align-items-center justify-content-between py-1">
                  <div class="vs-left">
                    <div class="font-medium">Privacy Mode</div>
                  </div>
                  <div class="vs-toggle">
                    <input type="checkbox" class="switch" id="blurMode">
                  </div>
                </div>
              </div>
              
          </section>
          <section class="pro-tab" id="view-data-deletion" :hidden="activeNav !== 'data-deletion'">
             <div class="tab-pannel">
              <h2 class="text-xl font-semibold mb-4"><button class="back-btn btn" v-if="isMobile" @click="handleBack">← Back</button> Data & Deletion</h2>
                <div class="py-1 curnt-sts">
                  <div class="font-medium">Remove your account permanently. Media follows platform expiry policies.</div>
                   <button class="btn btn-primary btn bg-red-500 border-red-400 hover:bg-red-500 mt-4">Delete my account</button>
                </div>
                <div>
                <div class="font-medium veri-opt mt-3">Legal</div>
                  <ul class="list-disc-tt mt-2">
                    <li><a href="#" class="hover:underline">Privacy Policy</a></li>
                    <li><a href="#" class="hover:underline">Terms of Use</a></li>
                    <li><a href="#" class="hover:underline">Community Guidelines</a></li>
                    <li><a href="#" class="hover:underline">GDPR Compliance</a></li>
                  </ul>
                </div>
               
            </div>
             
          </section>
      </div> 
    </div>
  </div>
</div>
<div class="ft-btm-section">
    <div class="pro-container px-4 d-flex flex-wrap align-items-center gap-2">
      <a href="#" class="hover:underline">Privacy Policy</a>
      <span>·</span>
      <a href="#" class="hover:underline">Terms of Use</a>
      <span>·</span>
      <a href="#" class="hover:underline">Community Guidelines</a>
      <span>·</span>
      <a href="#" class="hover:underline">GDPR Compliance</a>
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
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

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

  // ✅ For mobile: hide sidebar and show content
  if (isMobile.value) {
    const profileLeft = document.querySelector('.profile-left')
    const proRight = document.querySelector('.pro-right')
    if (profileLeft && proRight) {
      profileLeft.style.display = 'none'
      proRight.style.display = 'block'
    }
  }
}

function handleBackBtn() {
  if (isMobile.value) {
    const profileLeft = document.querySelector('.profile-left')
    const proRight = document.querySelector('.pro-right')
    if (profileLeft && proRight) {
      profileLeft.style.display = 'block'
      proRight.style.display = 'none'
    }
  }
}

function checkMobile() {
  isMobile.value = window.innerWidth <= 980

  // ✅ Reset default visibility on resize
  const profileLeft = document.querySelector('.profile-left')
  const proRight = document.querySelector('.pro-right')

  if (!profileLeft || !proRight) return

  if (isMobile.value) {
    // On mobile, show only sidebar initially
    profileLeft.style.display = 'block'
    proRight.style.display = 'none'
  } else {
    // On desktop, show both normally
    profileLeft.style.display = ''
    proRight.style.display = ''
  }
}

onMounted(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1) || 'account'
    activeNav.value = hash
  }

  handleHashChange()
  window.addEventListener('hashchange', handleHashChange)
  window.addEventListener('resize', checkMobile)

  nextTick(() => checkMobile())

  // Attach back button click listeners dynamically
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('back-btn')) {
      handleBackBtn()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
