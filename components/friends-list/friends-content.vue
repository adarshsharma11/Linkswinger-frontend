<template>
  <div class="friends-page">
    <div class="friends-container">
      <!-- Header -->
      <div class="friends-header mt-4">
        <h1 class="text-white">Friends</h1>
        <div class="friends-hint">Connect with amazing individuals in your area</div>
      </div>

      <!-- Tabs -->
      <div class="friends-tabs" role="tablist" aria-label="Friends tabs">
        <button class="friends-tab" :class="{ active: activeTab === 'requests' }" role="tab"
          :aria-selected="activeTab === 'requests'" aria-controls="panel-requests" id="tab-requests"
          @click="setActiveTab('requests')" v-if="isMine()">
          Friend Requests <span class="friends-badge">{{ filteredUsers('requests').length }}</span>
        </button>
        <button class="friends-tab" :class="{ active: activeTab === 'friends' }" role="tab"
          :aria-selected="activeTab === 'friends'" aria-controls="panel-friends" id="tab-friends"
          @click="setActiveTab('friends')">
          {{ isMine() ? 'My' : '' }} Friends <span class="friends-badge green">{{ filteredUsers('friends').length
          }}</span>
        </button>
      </div>

      <!-- Friend Requests Panel -->
      <section class="friends-panel" :class="{ active: activeTab === 'requests' }" id="panel-requests" role="tabpanel"
        aria-labelledby="tab-requests" v-if="isMine()">
        <!-- <div class="friends-section-header">
          <h2>Friend Requests (Pending)</h2>
          <div class="friends-hint">Only show Accept / Decline here.</div>
        </div> -->

        <div class="friends-grid">
          <article v-for="request in filteredUsers('requests')" :key="request.user_id" class="friends-card">
            <div class="friends-card-inner">
              <div class="friends-card-image">
                 <img :src="getImagePath(request)" :alt="request.nick_name" loading="lazy" decoding="async">
                <span class="friends-pill">
                  <span class="friends-dot" :class="{'green' : isOnline(request)}"></span>
                  <span class="text-white">REQUEST</span>
                </span>
              </div>
              <div class="friends-card-meta">
                <div class="friends-name-row">
                  <div class="friends-name">{{ request.nick_name }}</div>
                  <ul class="nm-icons">
                    <li><img :src="getmembershipIcon(request)" alt="Membership" class="rounded-circle" /></li>
                    <li v-if="request.is_meet_verified">
                      <img src="/images/badges/animated/150X150px/MEET-VERIFYED.gif" alt="Meet Verified"
                        class="rounded-circle" />
                    </li>
                    <li v-if="request.is_photo_verified">
                      <img src="/images/badges/animated/150X150px/FLAG-ANIMATION.gif" alt="Photo Verified"
                        class="rounded-circle" />
                    </li>
                  </ul>
                </div>
                <div class="friends-info">
                  {{ request.town }} • {{ getDistance(request) }}<br />
                   <div class="meta" v-if="!isOnline(request) && lastDate(request).length > 0">Last seen: {{
                    lastDate(request) }}</div>
                </div>
                <div class="friends-bio">{{ request.profile_status }}</div>
              </div>

              <div class="friends-actions friends-actions-two">
                <button class="friends-btn friends-btn-accept" @click="acceptFriendRequest(request)"
                  aria-label="Accept friend request">
                  <svg class="friends-icon-3d" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="gTickFriends" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="rgba(53,255,122,1)" />
                        <stop offset="1" stop-color="rgba(0,168,58,1)" />
                      </linearGradient>
                      <linearGradient id="gTickEdgeFriends" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="rgba(255,255,255,.55)" />
                        <stop offset="1" stop-color="rgba(0,0,0,.35)" />
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10.2" fill="url(#gTickFriends)" stroke="rgba(255,255,255,.20)"
                      stroke-width="1.2" />
                    <circle cx="12" cy="12" r="10.2" fill="none" stroke="url(#gTickEdgeFriends)" stroke-width="1.2"
                      opacity=".45" />
                    <path d="M7.2 12.4l2.7 2.8L17 8.9" stroke="rgba(0,0,0,.35)" stroke-width="3.6"
                      stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.2 12.4l2.7 2.8L17 8.9" stroke="rgba(255,255,255,.92)" stroke-width="2.6"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  Accept
                </button>

                <button class="friends-btn friends-btn-decline" @click="declineFriendRequest(request)"
                  aria-label="Decline friend request">
                  <svg class="friends-icon-3d" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="gXFriends" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="rgba(255,51,68,1)" />
                        <stop offset="1" stop-color="rgba(184,0,24,1)" />
                      </linearGradient>
                      <linearGradient id="gXEdgeFriends" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="rgba(255,255,255,.55)" />
                        <stop offset="1" stop-color="rgba(0,0,0,.35)" />
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10.2" fill="url(#gXFriends)" stroke="rgba(255,255,255,.20)"
                      stroke-width="1.2" />
                    <circle cx="12" cy="12" r="10.2" fill="none" stroke="url(#gXEdgeFriends)" stroke-width="1.2"
                      opacity=".45" />
                    <path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" stroke="rgba(0,0,0,.35)" stroke-width="3.6"
                      stroke-linecap="round" />
                    <path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" stroke="rgba(255,255,255,.92)" stroke-width="2.6"
                      stroke-linecap="round" />
                  </svg>
                  Decline
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- <div class="friends-note">
          <strong>Rule:</strong> Friend Requests list must only contain <b>Pending</b> items and must not show "Remove/Cancel Friend".
        </div> -->

        <div class="friends-divider"></div>
      </section>

      <!-- My Friends Panel -->
      <section class="friends-panel" :class="{ active: activeTab === 'friends' }" id="panel-friends" role="tabpanel"
        aria-labelledby="tab-friends">
        <!-- <div class="friends-section-header">
          <h2>My Friends (Accepted)</h2>
          <div class="friends-hint">Show Message / Call / Video + Remove Friend only here.</div>
        </div> -->

        <div class="friends-grid">
          <article v-for="friend in filteredUsers('friends')" :key="friend.user_id" class="friends-card">
            <div class="friends-card-inner">
              <div class="friends-card-image">
                 <img :src="getImagePath(friend)" :alt="friend.nick_name"  loading="lazy" decoding="async">
                <span class="friends-pill">
                  <span class="friends-dot" :class="{'green' : isOnline(friend)}"></span>
                  <span class="text-white">FRIEND</span>
                </span>
              </div>
              <div class="friends-card-meta">
                <div class="friends-name-row">
                  <div class="friends-name">{{ friend.nick_name }}</div>
                  <ul class="nm-icons">
                    <li><img :src="getmembershipIcon(friend)" alt="Membership" class="rounded-circle" /></li>
                    <li v-if="friend.is_meet_verified">
                      <img src="/images/badges/animated/150X150px/MEET-VERIFYED.gif" alt="Meet Verified"
                        class="rounded-circle" />
                    </li>
                    <li v-if="friend.is_photo_verified">
                      <img src="/images/badges/animated/150X150px/FLAG-ANIMATION.gif" alt="Photo Verified"
                        class="rounded-circle" />
                    </li>
                  </ul>
                </div>
                <div class="friends-info">
                  {{ friend.town }} • {{ getDistance(friend) }}<br />
                  <div class="meta" v-if="!isOnline(friend) && lastDate(friend).length > 0">Last seen: {{
                    lastDate(friend) }}</div>
                </div>
                <div class="friends-bio">{{ friend.profile_status }}</div>
              </div>

              <div class="friends-actions friends-actions-four">
                <button class="friends-btn friends-btn-small" @click="messageFriend(friend)">Message</button>
                <button class="friends-btn friends-btn-small" @click="callFriend(friend)">Call</button>
                <button class="friends-btn friends-btn-small" @click="videoCallFriend(friend)">Video</button>
                <button class="friends-btn friends-btn-small friends-btn-decline"
                  @click="removeFriend(friend)" v-if="isMine()">Remove</button>
              </div>
            </div>
          </article>
        </div>

        <!-- <div class="friends-note">
          <strong>Rule:</strong> Accepted friends list must not show Accept/Decline.
        </div> -->
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UsersModel } from '~/composables/models'
const route = useRoute()
const user_store = userStore()
const login_store = useLoginStore();
// Reactive data
const activeTab = ref<'requests' | 'friends'>(isMine() ? 'requests' : 'friends')
const users = ref<UsersModel.ProfileDetailsResponseModel[]>([])

const eventBus = useMittEmitter()
const id_store = idStore()
const onlineUsers = ref([] as number[])
const lastSeens = ref([] as LastSeenModel[])
const isWSConnected = ref(false)
// Mock data - replace with actual API calls

const userList = async () => {
  const api_url = getUrl(RequestURL.fetchFriends);
  const { data: response, error: option_error } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(
    api_url,
    {
      method: "POST",
      body: {
        user_udid: route.params.id,
        user_id: user_store.getLoginId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.value?.result || []
};

users.value = await userList();

function filteredUsers(type: string): UsersModel.ProfileDetailsResponseModel[] {
  if (isMine()) {

    if (type === 'friends')
    {
        return users.value.filter((el) => {
          return el.friend_status === 'accepted'
        })
    }
    return users.value.filter((el) => {
          return el.friend_status === 'pending' && el.from_id !==  login_store.getUserDetails?.user_id
        })
  }
  return users.value
}
function isMine() {
  return route.params.id === login_store.getUserDetails?.user_udid
}


// Methods
const setActiveTab = (tab: 'requests' | 'friends') => {
  activeTab.value = tab
}

const acceptFriendRequest = (user: UsersModel.ProfileDetailsResponseModel) => {

}

const declineFriendRequest = (user: UsersModel.ProfileDetailsResponseModel) => {

}

const messageFriend = (user: UsersModel.ProfileDetailsResponseModel) => {

}

const callFriend = (user: UsersModel.ProfileDetailsResponseModel) => {

}

const videoCallFriend = (user: UsersModel.ProfileDetailsResponseModel) => {

}

const removeFriend = (user: UsersModel.ProfileDetailsResponseModel) => {

}

async function removeCancelFriendRequest(user: UsersModel.ProfileDetailsResponseModel, cancel: boolean) {
  let postData = {
    "from_id": login_store.getUserDetails?.user_id ?? 0,
    "to_id": user.user_id ?? 0,
    "action": cancel ? "cancel" : "remove"
  };
  user.isFriendDecisionLoading = true;
  let api_url = getUrl(RequestURL.removeFriend);
  let response = await $fetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  user.isFriendDecisionLoading = false;
  if (response.success) {
     // emit('declineUser', user.user_id ?? 0)
  }
  else {
    showToastError(response.message)
  }
}

async function acceptDeclineFriendRequest(user: UsersModel.ProfileDetailsResponseModel, accept: boolean) {
  let postData = {
    "to_id": login_store.getUserDetails?.user_id ?? 0,
    "from_id": user.user_id ?? 0,
    "action": accept ? "accepted" : "declined"
  };
  user.isFriendDecisionLoading = true;
  let api_url = getUrl(RequestURL.acceptDeclineFriend);
  let response = await $fetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  user.isFriendDecisionLoading = false;
  if (response.success) {
    if (accept) {
      user.friend_status = 'accepted'
    }
    else {
      //emit('declineUser', user.user_id ?? 0)
    }

  }
  else {
    showToastError(response.message)
  }
}


function getDistance(user: UsersModel.ProfileDetailsResponseModel): string {
  let lat = login_store.getUserDetails?.latitude ?? 0
  let lon = login_store.getUserDetails?.longitude ?? 0
  let distance = getDistanceFromLatLonInMiles(
    user.latitude ?? 0,
    user.longitude ?? 0,
    lat,
    lon)
  return distance.toFixed(2) as string
}

function checkuseronline() {
  if (isWSConnected.value) {

    let user_ids = users.value.map(it => it.user_id ?? 0)

    if (user_ids.length > 0) {
      let groupmodel = new GroupEventSocketModel()
      groupmodel.admin_id = id_store.getDeviceId
      groupmodel.event_name = "add_user_to_group"
      groupmodel.user_ids = user_ids ?? []
      groupmodel.socket_id = id_store.getDeviceId
      sendmsgtoworker(groupmodel, true)

    }
  }
}

function isOnline(user: UsersModel.ProfileDetailsResponseModel): boolean {
  return onlineUsers.value.includes(user.user_id ?? 0)
}

function lastDate(user: UsersModel.ProfileDetailsResponseModel): string {

  if (lastSeens.value.length > 0) {
    const lastSeen = lastSeens.value.filter(ls => ls.user_id === user.user_id)
    if (lastSeen.length > 0) {
      return formatRelativeDate(lastSeen[0].last_active ?? '') ?? ''
    }
  }
  return ''
}

function getmembershipIcon(user: UsersModel.ProfileDetailsResponseModel): string {
  const tier_name = user.tier_name ?? ''
  if (tier_name.includes("Elite")) return "/images/badges/elite.gif"
  if (tier_name.includes("Basic+")) return "/images/badges/basic.gif"
  if (tier_name.includes("Plus")) return "/images/badges/plus.gif"
  return "/images/badges/free.gif"
}
function getImagePath(user: UsersModel.ProfileDetailsResponseModel): string {
  const media_path = user.media_path ?? ''
  const profile_image = user.profile_image ?? ''
  if (media_path.length > 0 && profile_image.length > 0) {
    return media_path + profile_image
  }
  const profile_type = user.profile_type ?? ''
  if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png"
  if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png"
  if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png"
  return "/images/profile-placeholders/man.png"
}
onMounted(() => {
  isWSConnected.value = isSocketConnected()
  checkuseronline()
  eventBus.on('socketConnection', (is_connected) => {
    isWSConnected.value = is_connected
    checkuseronline()
  })
  eventBus.on('onlineUserIds', (group) => {
    onlineUsers.value = group.user_ids ?? []
    lastSeens.value = group.last_seens ?? []

  })

  eventBus.on('callDeclineAlert', (eventModel) => {
    showToastError('Call declined')
  })
  eventBus.on('callAcceptAlert', async (eventModel) => {
    if (eventModel.is_video) {
      await navigateTo(`/video-call/${eventModel.token}`)
    }
    else {
      await navigateTo(`/voice-call/${eventModel.token}`)
    }
  })
})

onBeforeUnmount(() => {
  eventBus.off('socketConnection')
  eventBus.off('onlineUserIds')
  eventBus.off('callDeclineAlert')
  eventBus.off('callAcceptAlert')
})

</script>