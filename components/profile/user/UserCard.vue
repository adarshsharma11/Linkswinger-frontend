<template>
  <article class="card" :key="user.user_id">
    <div class="media" @click="openProfile">
      <img :src="imagePath" :alt="user.nick_name" loading="lazy" decoding="async">
      <span class="online-dot" title="Online now" v-if="isOnline"></span>
      <span class="badge-elite"><img :src="membershipIcon"></span>
    </div>

    <div class="content">
      <div class="row1">
        <div>
          <div class="name d-flex flex-wrap align-items-center">
            {{ user.nick_name }}
            <ul class="nm-icons">
              <li><img :src="membershipIcon" alt="Membership" class="rounded-circle" /></li>
              <li v-if="user.is_meet_verified">
                <img src="/images/badges/animated/150X150px/MEET-VERIFYED.gif" alt="Meet Verified"
                  class="rounded-circle" />
              </li>
              <li v-if="user.is_photo_verified">
                <img src="/images/badges/animated/150X150px/FLAG-ANIMATION.gif" alt="Photo Verified"
                  class="rounded-circle" />
              </li>
            </ul>
          </div>
          <div class="meta">{{ user.town }} • {{ distance }} miles</div>
          <div class="meta" v-if="(user.viewed_at ?? '').length > 0">Last viewed: {{ viewedAt(user) }}</div>
          <div class="meta" v-if="!isOnline && lastDate().length > 0">Last seen: {{ lastDate() }}</div>
          <span class="friends-pill" v-if="user.is_friend">
            <span class="text-white">FRIEND</span>
          </span>
        </div>
      </div>

      <div class="chips">
        <span style="color: white;">{{ user.profile_status }}</span>
      </div>
      <span class="btn-loader" v-if="(user.isFriendDecisionLoading ?? false) === true"></span>
      <div class="d-flex justify-content-start accept-decline gap-2"
        v-if="(user.friend_status?.length ?? 0) > 0 && props.isMine && (user.isFriendDecisionLoading ?? false) === false">
        <button
          v-if="((user.friend_status ?? '') === 'pending') && (user.from_id !== login_store.getUserDetails?.user_id)"
          class="action" data-action="message" aria-label="Message" @click="acceptDeclineFriendRequest(user, true)">
          <span class="act-icon">
            <img src="/images/badges/animated/50X50px/chat.gif" alt="Message" class="rounded-circle"
              style="width: 25px; height: 25px; object-fit: cover" />
          </span>
          Accept
        </button>

        <button
          v-if="((user.friend_status ?? '') === 'pending') && (user.from_id !== login_store.getUserDetails?.user_id)"
          class="action" data-action="call" aria-label="Voice call" @click="acceptDeclineFriendRequest(user, false)">
          <span class="act-icon">
            <img src="/images/badges/animated/50X50px/call.gif" alt="Call" class="rounded-circle"
              style="width: 25px; height: 25px; object-fit: cover" />
          </span>
          Decline
        </button>

        <button
          v-if="((user.friend_status ?? '') === 'pending') && (user.from_id === login_store.getUserDetails?.user_id)"
          class="action" data-action="call" aria-label="Voice call" @click="removeCancelFriendRequest(user, true)">
          <span class="act-icon">
            <img src="/images/badges/animated/50X50px/call.gif" alt="Call" class="rounded-circle"
              style="width: 25px; height: 25px; object-fit: cover" />
          </span>
          Cancel Friend
        </button>

        <button v-if="((user.friend_status ?? '') === 'accepted')" class="action" data-action="call"
          aria-label="Voice call" @click="removeCancelFriendRequest(user, false)">
          <span class="act-icon">
            <img src="/images/badges/animated/50X50px/call.gif" alt="Call" class="rounded-circle"
              style="width: 25px; height: 25px; object-fit: cover" />
          </span>
          Remove Friend
        </button>

      </div>

      <div class="d-flex justify-content-start accept-decline gap-2"
        v-if="props.isMine && isCrushList() && (user.isFriendDecisionLoading ?? false) === false">
        <button class="action" data-action="message" aria-label="Message" @click="removeLikeUser(user)">
          <span class="act-icon">
            <img src="/images/badges/animated/50X50px/crush-list.gif" alt="Message" class="rounded-circle"
              style="width: 25px; height: 25px; object-fit: cover" />
          </span>
          Remove from crush list
        </button>
      </div>

      <div class="actions">
        <button class="action" data-action="message" aria-label="Message" @click="openChat">
          <span class="act-icon">
            <img src="/images/badges/animated/50X50px/chat.gif" alt="Message" class="rounded-circle"
              style="width: 25px; height: 25px; object-fit: cover" />
          </span>
          Message
        </button>

        <button @click="showCodeAlert(false)" class="action" data-action="call" aria-label="Voice call">
          <span class="act-icon">
            <img src="/images/badges/animated/50X50px/call.gif" alt="Call" class="rounded-circle"
              style="width: 25px; height: 25px; object-fit: cover" />
          </span>
          Call
        </button>

        <button @click="showCodeAlert(true)" class="action" data-action="video" aria-label="Video call">
          <span class="act-icon">
            <img src="/images/badges/animated/50X50px/video-call.gif" alt="Video Call" class="rounded-circle"
              style="width: 25px; height: 25px; object-fit: cover" />
          </span>
          Video
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">

import type { UsersModel } from '~/composables/models'
const route = useRoute()
interface Props {
  user: UsersModel.ProfileDetailsResponseModel
  onlineUsers: number[],
  lastSeens: LastSeenModel[],
  isMine: Boolean,
}

const props = withDefaults(defineProps<Props>(), {
  user: () => ({} as UsersModel.ProfileDetailsResponseModel),
  onlineUsers: () => [],
  lastSeens: () => [],
  type: '',
  isMine: () => false
})

const login_store = useLoginStore();


// Computed properties for better performance
const isOnline = computed(() => {
  return props.onlineUsers.includes(props.user.user_id ?? 0)
})

function lastDate(): string {

  if (props.lastSeens.length > 0) {

    const lastSeen = props.lastSeens.filter(ls => ls.user_id === props.user.user_id)
    if (lastSeen.length > 0) {
      return formatRelativeDate(lastSeen[0].last_active ?? '') ?? ''
    }
  }
  return ''
}

function viewedAt(user: UsersModel.ProfileDetailsResponseModel): string {
  return formatRelativeDate(user.viewed_at ?? '') ?? ''
}

const imagePath = computed(() => {
  return getImagePath(props.user)
})

const membershipIcon = computed(() => {
  return getmembershipIcon(props.user)
})

const distance = computed(() => {
  return getDistance(props.user) || '0'
})

// Event emitters
const emit = defineEmits<{
  openProfile: [user: UsersModel.ProfileDetailsResponseModel]
  openChat: [user: UsersModel.ProfileDetailsResponseModel]
  showCodeAlert: [userId: number, isVideo: boolean]
  declineUser: [userId: number]
  removeLikeUser: [userId: number]
}>()

// Methods
const openProfile = () => {
  emit('openProfile', props.user)
}

const openChat = () => {
  emit('openChat', props.user)
}

const showCodeAlert = (isVideo: boolean) => {
  emit('showCodeAlert', props.user.user_id ?? 0, isVideo)
}

function isCrushList() {
  let type = route.hash.replace('#', '')
  if (type === 'crush') {
    return true
  }
  if (route.query.type === 'crushes') {
    return true
  }

  return false
}

// Utility functions (same as in dashboard)
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

function getmembershipIcon(user: UsersModel.ProfileDetailsResponseModel): string {
  const tier_name = user.tier_name ?? ''
  if (tier_name.includes("Elite")) return "/images/badges/elite.gif"
  if (tier_name.includes("Basic+")) return "/images/badges/basic.gif"
  if (tier_name.includes("Plus")) return "/images/badges/plus.gif"
  return "/images/badges/free.gif"
}

// function getDistance(user: UsersModel.ProfileDetailsResponseModel): string {
//   // Handle different possible distance property names
//   const distance = (user as any).distance ?? (user as any).miles ?? 0
//   return distance.toString()
// }

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



async function removeLikeUser(user: UsersModel.ProfileDetailsResponseModel) {
  let postData = {
    liker_id: login_store.getUserDetails?.user_id ?? 0,
    user_id: user.user_id ?? 0
  };
  user.isFriendDecisionLoading = true;
  let api_url = getUrl(RequestURL.addCrush);
  let response = await $fetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  user.isFriendDecisionLoading = false;
  if (response.success) {
    emit('removeLikeUser', user.user_id ?? 0)
  }
  else {
    showToastError(response.message)
  }
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
    emit('declineUser', user.user_id ?? 0)
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
      emit('declineUser', user.user_id ?? 0)
    }

  }
  else {
    showToastError(response.message)
  }
}

</script>