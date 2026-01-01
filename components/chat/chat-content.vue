<template>
  <div class="container py-4">
    <div class="row g-3 mt-4">
      <!-- Sidebar -->
      <aside class="col-12 col-lg-4 col-xl-3" :class="{ 'd-none': showMobileChat && isMobile }">
        <!-- Dashboard Button - Positioned above the chat card -->
        <div class="mb-3 d-flex justify-content-end">
          <button class="btn btn-dashboard d-flex align-items-center gap-2" @click="navigateTo('/dashboard')"
            title="Go to Dashboard">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            <span class="text-white d-lg-inline">Dashboard</span>
          </button>
        </div>
        <div class="chat-card p-2">
          <div
            class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-2 cht-top">
            <div class="d-flex align-items-center gap-2">
              <span>Messages</span>
            </div>
            <button class="btn btn-dashboard d-flex align-items-center gap-2 msgf-filter-btn"
              @click="showFilters = true" title="Filters">

              <!-- filter icon -->
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M3 5h18l-6.5 8v6l-5 3v-9L3 5z"></path>
              </svg>

              <span class="text-white d-lg-inline">Filters</span>
            </button>
          </div>
          <div class="custom-scroll" style="max-height:70vh;overflow:auto;">
            <!-- Example Conversation Items -->
            <div class="p-2 rounded-3 d-flex align-items-center justify-content-between hover-overlay chat-item"
              :class="{ 'chat-active': activeChatId === (historymodel.user_id ?? 0) }"
              style="background-color:rgba(23,23,23,0.4);margin-bottom:6px;" v-for="historymodel in chatHistoryModels"
              :key="historymodel.user_id" @click="selectUserForMobile(historymodel.user_id ?? 0)">
              <div class="d-flex align-items-center gap-3">
                <div class="position-relative chat-item-left">
                  <img
                    class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold"
                    style="width:40px;height:40px;object-fit: cover; object-position: center;"
                    :src="getImagePath(historymodel)"></img>
                  <span
                    class="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-success border border-dark"
                    style="width:12px;height:12px;" v-if="onlineUsers.includes(historymodel.user_id ?? 0)"></span>
                </div>
                <div class="chat-item-right">
                  <div class="d-flex align-items-center gap-2">
                    <strong>{{ historymodel.nick_name }}</strong>
                    <div @click.stop="deleteWholeChat(historymodel)"
                      v-if="(historymodel.is_deleting ?? false) === false">
                      <img src="/images/badges/animated/50X50px/delete.gif" alt="Delete"
                        style="width: 20px; height: 20px;">
                    </div>
                    <span class="btn-loader" v-if="historymodel.is_deleting"></span>
                  </div>
                  <small class="text-secondary" v-if="(historymodel.is_typing ?? false) === true">Typing...</small>
                  <div v-if="(historymodel.is_deleted ?? false) === false">
                    <small class="text-secondary"
                      v-if="(historymodel.is_typing ?? false) === false && historymodel.message_type === 'text'">{{
                        historymodel.message }}</small>
                    <small class="text-secondary"
                      v-if="(historymodel.is_typing ?? false) === false && (historymodel.message_type === 'image' || historymodel.message_type === 'video')">Media</small>
                    <div class="text-secondary"
                      v-if="(historymodel.is_typing ?? false) === false && (historymodel.message_type === 'emoji')">
                      <Lottie renderer="svg" v-if="getFileExtension(historymodel.message ?? '') === '.json'"
                        :link="(historymodel.media_path ?? '') + (historymodel.message ?? '')"
                        style="max-width: 40px; max-height: 40px;">
                      </Lottie>
                      <video v-else-if="getFileExtension(historymodel.message ?? '') === '.webm'"
                        :src="(historymodel.media_path ?? '') + (historymodel.message ?? '')"
                        style="max-width: 40px; max-height: 40px;" loop autoplay></video>
                      <img v-else-if="getFileExtension(historymodel.message ?? '') !== '.json'"
                        :src="(historymodel.media_path ?? '') + (historymodel.message ?? '')"
                        style="max-width: 40px; max-height: 40px;" />
                    </div>
                  </div>
                  <div
                    v-if="(historymodel.is_deleted ?? false) === true && (historymodel.is_typing ?? false) === false">
                    <small class="text-secondary">This message was deleted</small>
                  </div>
                </div>
              </div>
              <span class="badge bg-danger glow-red text-white" v-if="(historymodel.badge_count ?? 0) > 0">{{
                historymodel.badge_count }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Chat Section -->
      <section class="col-12 col-lg-8 col-xl-9" :class="{ 'd-none': !showMobileChat && isMobile }">

        <!-- No Chat Selected Placeholder -->
        <div v-if="!route.params.id || route.params.id === '0'"
          class="chat-card d-flex flex-column h-100 justify-content-center align-items-center">
          <div class="text-center text-secondary">
            <svg viewBox="0 0 24 24" class="h-16 w-16 mb-4 opacity-50" fill="currentColor">
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
            <h5>Select a conversation</h5>
            <p class="mb-0">Choose a conversation from the list to start chatting</p>
          </div>
        </div>

        <!-- Chat Content (only show when there's an ID) -->
        <div v-else class="chat-card d-flex flex-column h-100">
          <!-- Header -->
          <div class="d-flex justify-content-between align-items-center border-bottom border-secondary p-3 chat-header">
            <div class="d-flex align-items-center gap-3 chat-hd">
              <!-- Desktop Back Button -->
              <button class="btn btn-sm btn-dark border-secondary d-none d-lg-inline-flex" @click="goBack">
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>
              <!-- Mobile Back Button -->
              <div class="position-relative">
                <img
                  class="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold"
                  style="width:40px;height:40px;" :src="getImagePathForUser(userDetails)"></img>
                <span
                  class="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-success border border-dark"
                  style="width:12px;height:12px;" v-if="onlineUsers.includes(userDetails?.user_id ?? 0)"></span>
              </div>
              <div>
                <h6 class="mb-0"> {{ userDetails?.nick_name }} </h6>
                <div v-if="(userDetails?.is_typing ?? false) === false">
                  <small class="text-secondary" v-if="onlineUsers.includes(userDetails?.user_id ?? 0)">Online now
                    •</small>
                  <small class="text-secondary">{{ userDetails?.profile_type }}</small>
                </div>

              </div>
            </div>
            <div class="d-flex gap-2 chat-hd-btn">
              <button class="btn btn-sm btn-dark border-secondary" @click="toggleSelectMode">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M9 11H3V5h6v6zm2-6h10v6H11V5zm0 8h10v6H11v-6zM3 13h6v6H3v-6z" />
                </svg>
                <span style="color: white;" v-if="selectMode === false">Select</span>
                <span style="color: white;" v-if="selectMode">DeSelect</span>
              </button>
              <button class="btn btn-sm btn-dark border-secondary" @click="showCodeAlert(false)">
                <img src="/images/badges/animated/50X50px/call.gif" alt="voice call" class="chat-btn-icon" />
                Voice</button>
              <button class="btn btn-sm btn-dark border-secondary" @click="showCodeAlert(true)">
                <img src="/images/badges/animated/50X50px/video.gif" alt="video call"
                  class="chat-btn-icon" />Video</button>
              <span class="btn-loader" v-if="is_code_loading"></span>
              <button class="btn btn-sm btn-danger glow-red-strong text-white"
                v-if="!is_code_loading && call_code.length === 0" @click="fetchCallCode()">Show my call code</button>
              <button class="btn btn-sm btn-danger glow-red-strong text-white"
                v-if="!is_code_loading && call_code.length !== 0" @click="updateCallCodealert()">{{
                  call_code.length > 4 ? call_code.toUpperCase().slice(-4) : call_code }} <svg viewBox="0 0 24 24"
                  class="h-4 w-4" fill="currentColor">
                  <path
                    d="M12 2a10 10 0 1 0 9.95 11H20a8 8 0 1 1-8-8c2.03 0 3.89.76 5.29 2.01L14 10h8V2l-2.35 2.35A9.97 9.97 0 0 0 12 2z" />
                </svg></button>
            </div>
          </div>

          <!-- Messages -->
          <div id="messages" ref="scrollContainer" @scroll="handleScroll" class="flex-grow-1 p-3 custom-scroll"
            style="overflow:auto;max-height:60vh;">
            <!-- <div class="text-center text-secondary small my-3">Today</div> -->
            <div v-for="chat in chatModels" :key="chat.chat_id" class="message-bubble" :class="{
              'message-incoming': chat.from_id !== login_store.getUserDetails?.user_id,
              'message-outgoing': chat.from_id === login_store.getUserDetails?.user_id,
              'ms-auto': chat.from_id === login_store.getUserDetails?.user_id,
              'glow-red': chat.from_id === login_store.getUserDetails?.user_id,
              'message-selected': selectedMessages.includes(chat.chat_id ?? 0),
              'emoji-bubble': chat.message_type === 'emoji',
            }" :id="`${chat.chat_id ?? 0}`">
              <div v-if="(chat.is_deleted ?? false) === true" class="text-secondary">This message was deleted</div>
              <div v-if="(chat.is_deleted ?? false) === false" class="chat-item">
                <div v-if="chat.message_type === 'text'">{{ chat.message }}</div>
                <!-- IMAGE PREVIEW -->
                <div v-if="chat.message_type === 'image' && is_mounted" class="attachment-preview "
                  @click="openPreview(chat)">
                  <img :src="(chat.media_path ?? '') + (chat.message ?? '')" class="attachment-img" loading="lazy" />
                </div>

                <!-- VIDEO PREVIEW -->
                <div v-if="chat.message_type === 'video' && is_mounted" class="attachment-preview video"
                  @click="openPreview(chat)">
                  <video :src="(chat.media_path ?? '') + (chat.message ?? '')" class="attachment-video" muted></video>

                  <div class="video-play-overlay">
                    <img src="/images/icons-folder/Play-150x150px.png" alt="Play" class="video-play-icon" />
                  </div>
                </div>


                <!-- FALLBACK FOR UNKNOWN FILES (DOC, PDF etc.) -->
                <div
                  v-if="chat.message_type !== 'image' && chat.message_type !== 'video' && chat.message_type !== 'text' && chat.message_type !== 'emoji' && is_mounted"
                  class="attachment-file" @click="openPreview(chat)">
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                    <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                  </svg>
                  <small>{{ chat.message }}</small>
                </div>

                <div v-if="chat.message_type === 'emoji' && is_mounted">
                  <Lottie renderer="svg" v-if="getFileExtension(chat.message ?? '') === '.json'"
                    :link="(chat.media_path ?? '') + (chat.message ?? '')" style="max-width: 80px; max-height: 80px;">
                  </Lottie>
                  <video loop autoplay playsinline v-else-if="getFileExtension(chat.message ?? '') === '.webm'"
                    :src="(chat.media_path ?? '') + (chat.message ?? '')"
                    style="max-width: 40px; max-height: 40px;"></video>
                  <img v-else-if="getFileExtension(chat.message ?? '') !== '.json'"
                    :src="(chat.media_path ?? '') + (chat.message ?? '')" style="max-width: 80px; max-height: 80px;" />
                </div>
              </div>
              <div class="message-time" v-if="chat.from_id !== login_store.getUserDetails?.user_id">{{
                formatRelativeDate(chat.created_at)
              }}
              </div>
              <div class="message-time" v-if="chat.from_id === login_store.getUserDetails?.user_id">{{
                formatRelativeDate(chat.created_at)
              }}
                • {{ chat.status }}</div>

              <div v-if="selectMode && (chat.is_deleting ?? false) === false && (chat.is_deleted ?? false) === false"
                class="message-select-box trash-btn">
                <div class="select-circle" :class="{ active: selectedMessages.includes(chat.chat_id ?? 0) }"
                  @click.stop="toggleMessageSelection(chat.chat_id ?? 0)">
                  <svg v-if="selectedMessages.includes(chat.chat_id ?? 0)" viewBox="0 0 24 24" width="14" height="14"
                    fill="white">
                    <path d="M20 6L9 17l-5-5" stroke="white" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
              </div>

              <span class="btn-loader" v-if="chat.is_deleting"></span>
            </div>

            <div class="typing-animate" v-if="(userDetails?.is_typing ?? false) === true">
              Typing<span></span><span></span><span></span></div>
          </div>
          <div v-if="selectMode && selectedMessages.length > 0" class="select-toolbar">
            <span class="text-white">{{ selectedMessages.length }} selected</span>
            <button class="btn btn-primary btn-sm" @click="deleteSelected">Delete Selected</button>
          </div>

          <!-- Composer -->
          <div class="border-top border-secondary p-3 chat-ftr">
            <div class="d-flex align-items-center message-input chat-ftr-left">
              <!--<button class="btn btn-link text-light fs-5" @click="handleToggle">😊</button>-->
              <button class="btn btn-link text-light fs-5" aria-label="Go to emoji icon"
                @click="handleToggle">😊</button>
              <textarea v-model="messageTxt" id="composer" ref="messageRef" rows="1"
                class="form-control bg-transparent border-0 text-light"
                placeholder="Type a message… (Ctrl/⌘ + Enter to send)"></textarea>
              <div class="d-flex flex items-center gap-2 chat-ftr-btns">
                <input type="file" accept="image/png,image/jpeg,video/mp4" class="form-control d-none" ref="fileInput"
                  @change="handleFileUpload" />
                <button id="attach-btn" class="btn bbtn-dark border-secondary text-white ms-2" @click="openChatModal()">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                    <path d="M16.5 6.5 9 14a3 3 0 1 0 4.24 4.24l7.07-7.07a5 5 0 1 0-7.07-7.07L6.1 7.17" fill="none"
                      stroke="currentColor" stroke-width="1.5"></path>
                  </svg>
                </button>

                <button v-if="!is_uploading" id="btnSend" class="btn btn-danger glow-red-strong text-white ms-2"
                  @click="sendMessage()">Send</button>
                <button v-else class="btn btn-danger glow-red-strong text-white ms-2">Send {{
                  uploadProgress }}</button>
              </div>
            </div>
            <small class="text-secondary d-block mt-2">Attachments auto-expire after 60 days. Keep it respectful —
              verified adults only.</small>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Bottom Glow Bar -->
  <div class="fixed-bottom">
    <div class="container-fluid">
      <div class="mx-auto"
        style="height:4px;background:linear-gradient(90deg,var(--ls-green),var(--ls-red),var(--ls-green));filter:blur(6px);opacity:0.8;">
      </div>
    </div>
  </div>



  <!-- LightGallery: rendered only client-side and only after dynamic import -->

  <FilterModal :friends-only="friendsOnly" :photo-verified-only="photoVerifiedOnly" :show-unread="showUnread"
    :with-attachments="withAttachments" v-if="showFilters" @close="showFilters = false" @apply-filters="applyFilters"
    @clear-filters="clearFilters()" />

  <EmojiPicker v-if="showPicker" ref="emojiPickerRef" v-on:selected-emoji="selectedEmoji"
    v-on:select-custom-emoji="selectCustomEmoji" @closed-emoji-picker="showPicker = false" />


  <CommonChatMediaModel id="chatMediaModal" @send-media="sendMedia"></CommonChatMediaModel>

  <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModal" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content bg-black">
        <div class="modal-header">
          <button type="button" class="msgf-pill" data-bs-dismiss="modal" aria-label="Close">
            ✕
          </button>
        </div>
        <div class="modal-body p-0 h-100">
          <ChatGallery :key="galleryItems.length > 0 ? galleryItems[selectedMediaIndex].chat_id : 0" :all-feeds="galleryItems"
            :from-feeds="false" v-if="galleryItems.length > 0" :selected-index="selectedMediaIndex" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatsModel, FeedsModel, UsersModel } from '~/composables/models'
import Swal from 'sweetalert2'
import FilterModal from './filter-modal.vue'
import type { CallsModel } from '~/composables/websocketModels'// optional fallback component if you want

// stores / utilities (preserve your existing app stores)
const id_store = idStore()
const route = useRoute()
const user_store = userStore()
const login_store = useLoginStore()
const eventBus = useMittEmitter()
const componentKey = ref(0)

// refs / state
const messageTxt = ref('')
const emojiPickerRef = ref<any>(null)
const messageRef = ref<HTMLTextAreaElement | null>(null);
const chatHistoryModels = ref([] as ChatsModel.ChatResponseModel[])
const chatModels = ref([] as ChatsModel.ChatResponseModel[])
const scrollContainer = ref<HTMLElement | null>(null);
const userDetails = ref<UsersModel.ProfileDetailsResponseModel | null | undefined>(null);
const router = useRouter()
const pageIndex = ref(0);
const isWSConnected = ref(false);
const onlineUsers = ref([] as number[])
let typingTimeout: ReturnType<typeof setInterval> | null = null
const hideTimers: Record<number, ReturnType<typeof setTimeout>> = {};
const is_uploading = ref(false)
const is_code_loading = ref(false)
const uploadProgress = ref(0);
let is_loading = false
const call_code = ref('')
const previewUrl = ref<string | null>(null);
const previewUrlFile = ref<Blob | null>(null);
const contentType = ref('');
const fileInput = ref<HTMLInputElement | null>(null);
const activeChatId = ref<number | null>(null);
const showMobileChat = ref(false);
const selectMode = ref(false);
const selectedMessages = ref<number[]>([]);
const showFilters = ref(false);
var pickerModel: any = null
const { $bootstrap } = useNuxtApp();
// LightGallery dynamic imports (client-only)
var chatMediaModal: any = null
var videoModalSub: any = null


const galleryItems = ref<any[]>([]);

const fileWidth = ref(0);
const fileHeight = ref(0);

const showUnread = ref(false)
const friendsOnly = ref(false)
const withAttachments = ref(false)
const photoVerifiedOnly = ref(false)
const showPicker = ref(false)
const is_mounted = ref(true)
const selectedMediaIndex = ref(0)
const stack = computed(() =>
  route.query.modals ? route.query.modals.toString().split(',') : []
)
const { openModal, closeTopModal } = useModalStack()


function buildGalleryItems() {
  const allMedia = chatModels.value.filter(
    (c) => c.message_type === "image" || c.message_type === "video"
  );
  galleryItems.value = allMedia


  // allMedia.map((c) => {
  //   const src = (c.media_path ?? "") + (c.message ?? "");
  //   const isVideo = c.message_type === "video";
  //   // fallback in case metadata fails
  //   const width = c?.width || 720;
  //   const height = c?.height || 1280;

  //   if (isVideo) {
  //     return {
  //       id: c.chat_id,
  //       isVideo: true,
  //       src,
  //       size: `${width}-${height}`,
  //       thumb: null,
  //       poster: null,
  //       video: JSON.stringify({
  //         source: [{ src, type: "video/mp4" }],
  //         attributes: {
  //           controls: true,
  //           preload: "metadata"
  //         }
  //       })
  //     };
  //   }
  //   return {
  //     id: c.chat_id,
  //     isVideo: false,
  //     src,
  //     thumb: src,
  //     poster: null,
  //     size: `${width}-${height}`,
  //     video: null
  //   };
  // })
}


function openPreview(chat: any) {
  nextTick(() => {
    buildGalleryItems()
    const index = galleryItems.value.findIndex(
      (i) => i.chat_id === chat.chat_id
    );

    selectedMediaIndex.value = index
    openModal('gallery')
    videoModalSub.show();
  })
}

function applyFilters(filters?: { unread: boolean; friends: boolean; attachments: boolean; photoVerified: boolean }) {
  if (filters) {
    showUnread.value = filters.unread
    friendsOnly.value = filters.friends
    withAttachments.value = filters.attachments
    photoVerifiedOnly.value = filters.photoVerified
    fetchHistoryWithFilter()
  }
}
function clearFilters() {
  showUnread.value = false
  friendsOnly.value = false
  withAttachments.value = false
  photoVerifiedOnly.value = false
  fetchHistoryWithFilter()
}
// Other UI helpers (unchanged)
function toggleSelectMode() {
  selectMode.value = !selectMode.value;
  selectedMessages.value = [];
}

function toggleMessageSelection(chatId: number) {
  if (selectedMessages.value.includes(chatId)) {
    selectedMessages.value = selectedMessages.value.filter(id => id !== chatId);
  } else {
    if (selectedMessages.value.length < 20) {
      selectedMessages.value.push(chatId);
    }
  }
}
const isMobile = ref(process.client ? window.innerWidth < 768 : false);

const shouldShowChat = computed(() => {
  const hasIdInRoute = route.params.id && route.params.id !== '0'
  if (!hasIdInRoute) return false
  if (!process.client) return true
  if (!isMobile.value) return true
  return showMobileChat.value
})

watch(() => route.params.id, (newId, oldId) => {
  if (isMobile.value) {
    if (oldId !== undefined) {
      if (newId && newId !== '0') {
        showMobileChat.value = true
      } else {
        showMobileChat.value = false
      }
    }
  }
})

// --- Networking functions: keep as-is (you're using useFetch/$fetch) ---
const fetchHistory = async () => {
  const api_url = getUrl(RequestURL.chatHistory);
  const { data: fetch_response, error: option_error } = await useFetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      "from_id": user_store.getLoginId
    },
    headers: {
      "content-type": "application/json"
    }
  });

  return fetch_response.value?.result
}

// Note: top-level await is okay in Nuxt pages; preserve behaviour but protect client-only behavior for LightGallery
chatHistoryModels.value = await fetchHistory() as ChatsModel.ChatResponseModel[]

let to_id = Number(route.params.id ?? '0') ?? 0
if (to_id !== 0) {
  const fetchChat = async () => {
    const api_url = getUrl(RequestURL.fetchChat);
    const { data: fetch_response, error: option_error } = await useFetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
      cache: "no-cache",
      method: "post",
      body: {
        "from_id": user_store.getLoginId,
        "to_id": to_id,
        "page": pageIndex.value
      },
      headers: {
        "content-type": "application/json"
      }
    });

    return fetch_response.value?.result
      ? [...fetch_response.value.result].sort((a, b) => (a.chat_id ?? 0) - (b.chat_id ?? 0))
      : []
  }
  chatModels.value = await fetchChat() as ChatsModel.ChatResponseModel[]

  pageIndex.value = 0
  const fetchUserDetails = async () => {
    const api_url = getUrl(RequestURL.getProfileDetails);
    const { data: response, error: option_error } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(
      api_url,
      {
        method: "POST",
        body: {
          user_id: to_id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.value?.success) {
      userDetails.value = response.value.response;
    }
  };
  fetchUserDetails();
}

async function fetchHistoryWithFilter() {
  chatHistoryModels.value = []
  const api_url = getUrl(RequestURL.chatHistory);
  const response = await $fetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      "from_id": user_store.getLoginId,
      showUnread: showUnread.value,
      friendsOnly: friendsOnly.value,
      withAttachments: withAttachments.value,
      photoVerifiedOnly: photoVerifiedOnly.value
    },
    headers: {
      "content-type": "application/json"
    }
  });
  if (response.success) {
    chatHistoryModels.value = response.result ?? []
  }
  else {
    showToastError(response.message)
  }
}

// navigation helpers
function goBack() {
  if (isMobile.value && showMobileChat.value && route.params.id) {
    showMobileChat.value = false
    router.push('/chat')
  } else {
    router.back()
  }
}

function getFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return '';
  }
  return filename.slice(lastDotIndex);
}

function selectUserForMobile(userId: number) {
  if (isMobile.value) {
    showMobileChat.value = true
  }
  navigateTo(`/chat/${userId}`)
}

function showTypingIndicator(from_id: number) {
  const chat = chatHistoryModels.value.find(c => c.user_id === from_id);
  if (chat) {
    chat.is_typing = true;
    if (from_id === userDetails.value?.user_id) {
      userDetails.value.is_typing = true
    }
    clearTimeout(hideTimers[from_id]);
    hideTimers[from_id] = setTimeout(() => {
      chat.is_typing = false;
      if (from_id === userDetails.value?.user_id) {
        userDetails.value.is_typing = false
      }
      delete hideTimers[from_id];
    }, 3000);
  } else {
    console.warn(`Typing event received for unknown user_id: ${from_id}`);
  }
}

async function fetchCallCode() {
  if (is_code_loading.value) return
  is_code_loading.value = true
  const api_url = getUrl(RequestURL.fetchCallCode);
  await $fetch<SuccessError<UsersModel.FetchCallCodeResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: { "user_id": user_store.getLoginId },
    headers: { "content-type": "application/json" },
    onResponse: async ({ response }) => {
      is_code_loading.value = false
      const response_model = response._data as SuccessError<UsersModel.FetchCallCodeResponseModel>
      if (response_model.success) call_code.value = response_model.response?.call_code ?? ''
      else showToastError(response_model.message)
    }
  });
}

function updateCallCodealert() {
  if (is_code_loading.value) return
  Swal.fire({
    title: 'Update Code',
    input: 'text',
    inputPlaceholder: 'Type code here',
    showCancelButton: true,
    inputAttributes: { maxlength: '4', inputmode: 'numeric' },
    inputValidator: (value: string) => {
      if (!value) return 'Please enter code';
      if (!/^\d+$/.test(value)) return 'Only numbers are allowed';
      if (value.length > 4) return 'Maximum length is 4 digits';
    }
  }).then((result) => {
    if (result.isConfirmed) updatecallcode(result.value ?? '');
  });
}
async function updatecallcode(callcode: string) {
  is_code_loading.value = true
  const api_url = getUrl(RequestURL.updateCallCode);
  await $fetch<SuccessError<UsersModel.FetchCallCodeResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: { "user_id": user_store.getLoginId, "call_code": callcode },
    headers: { "content-type": "application/json" },
    onResponse: async ({ response }) => {
      is_code_loading.value = false
      const response_model = response._data as SuccessError<UsersModel.FetchCallCodeResponseModel>
      if (response_model.success) call_code.value = response_model.response?.call_code ?? ''
      else showToastError(response_model.message)
    }
  });
}

// emoji / typing & socket helpers (unchanged)
function selectCustomEmoji(emoji: string) {
  if (isWSConnected.value) {
    const to_id = Number(route.params.id) ?? 0
    if (to_id === 0) return
    const eventmodel = new ChatEventSocketModel()
    eventmodel.event_name = 'chat'
    eventmodel.from_id = login_store.getUserDetails?.user_id ?? 0
    eventmodel.to_id = to_id
    eventmodel.message_type = 'emoji'
    eventmodel.message = emoji
    eventmodel.socket_id = id_store.getDeviceId
    sendmsgtoworker(eventmodel, true)
  } else showToastError('Socket not connected')
}

function selectedEmoji(emoji: string) {
  const statusInput = messageRef.value;
  if (statusInput) {
    const start = statusInput.selectionStart!;
    const end = statusInput.selectionEnd!;
    const value = statusInput.value;
    statusInput.value = value.substring(0, start) + emoji + value.substring(end);

    const newPos = start + emoji.length;
    statusInput.setSelectionRange(newPos, newPos);
    statusInput.focus();

    messageTxt.value = statusInput.value 
  }
}

function handleToggle() {
  showPicker.value = true
  nextTick(() => {
    if (emojiPickerRef.value) {
      emojiPickerRef.value.toggleEmojiPicker()
    }
  })
  // showPicker.value = false
}



function showCodeAlert(is_video: boolean) {
  Swal.fire({
    title: 'Please enter code',
    input: 'text',
    inputPlaceholder: 'Type code here',
    showCancelButton: true,
    inputValidator: (value: string) => { if (!value) return 'Please enter code'; }
  }).then((result) => {
    if (result.isConfirmed) validateCall(result.value ?? '', is_video)
  });
}

async function validateCall(code: string, is_video: boolean) {
  const to_id = Number(route.params.id ?? '0') ?? 0
  const api_url = getUrl(RequestURL.validateCall);
  await $fetch<SuccessError<CallsModel.ValidateCallResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      "from_id": user_store.getLoginId,
      "from_socket_id": id_store.getDeviceId,
      "to_id": to_id,
      "call_code": code,
      "is_video": is_video
    },
    headers: { "content-type": "application/json" },
    onResponse: async ({ response }) => {
      const response_model = response._data as SuccessError<CallsModel.ValidateCallResponseModel>
      if (response_model.success) showToastSuccess(response_model.message)
      else showToastError(response_model.message)
    }
  });
}

function onUserTyping(to_id: number) {
  if (typingTimeout) return;
  sendTypingStatus(to_id);
  typingTimeout = setTimeout(() => { typingTimeout = null; }, 2000);
}

function sendTypingStatus(to_id: number) {
  const type = new TypingEventSocketModel()
  type.event_name = "typing"
  type.from_id = login_store.getUserDetails?.user_id
  type.to_id = userDetails.value?.user_id
  sendmsgtoworker(type, true)
}

watch(messageTxt, () => {
  // const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
  // messageTxt.value = messageTxt.value.replace(emojiRegex, '')
  onUserTyping(userDetails.value?.user_id ?? 0)
});

function openChatModal() {
  chatMediaModal.show();
  openModal('media')
}

watch(() => stack.value, (s) => {

  if (s.includes('media') === true) {
    chatMediaModal?.show()
  }
  else if (s.includes('gallery') === true) {
    videoModalSub?.show()
  }
  if (s.includes('media') === false) {
    chatMediaModal?.hide()
  }
  if (s.includes('gallery') === false) {
    videoModalSub?.hide()
  }
 

},
  { immediate: true })

// mount / socket event wiring
onMounted(async () => {
  chatMediaModal = new ($bootstrap as any).Modal(document.getElementById('chatMediaModal'));
  chatMediaModal._element.addEventListener('hidden.bs.modal', () => {
    if (stack.value.includes('media') === true) {
      closeTopModal()
    }
  })

  videoModalSub = new ($bootstrap as any).Modal(document.getElementById('videoModal'));

  videoModalSub._element.addEventListener('hidden.bs.modal', () => {
    //galleryItems.value = []
    if (stack.value.includes('gallery') === true) {
      closeTopModal()
    }
  })


  // ensure mobile detection and listeners
  if (process.client) {
    isMobile.value = window.innerWidth < 768
    window.addEventListener('resize', () => { isMobile.value = window.innerWidth < 768 })
  }

  const currentChatId = Number(route.params.id ?? '0')
  if (currentChatId !== 0) activeChatId.value = currentChatId
  if (isMobile.value) {
    if (currentChatId !== 0) showMobileChat.value = true
    else showMobileChat.value = false
  }

  isWSConnected.value = isSocketConnected()
  eventBus.on('socketConnection', (is_connected) => {
    isWSConnected.value = is_connected
    checkuseronline()
  })
  eventBus.on('onlineUserIds', (group) => onlineUsers.value = group.user_ids ?? [])
  eventBus.on('typing', (typing) => showTypingIndicator(typing.from_id ?? 0))
  eventBus.on('chatUpdateStatus', (eventModel) => updateMessageStatus(eventModel))
  eventBus.on('chatDeleteStatus', (eventModel) => deleteMessageStatus(eventModel))
  eventBus.on('callDeclineAlert', () => showToastError('Call declined'))
  eventBus.on('callAcceptAlert', async (eventModel) => {
    if (eventModel.is_video) await navigateTo(`/video-call/${eventModel.token}`)
    else await navigateTo(`/voice-call/${eventModel.token}`)
  })
  eventBus.on('chatEvent', (responseevent) => {
    const event_name = responseevent.event_name ?? ''
    if (event_name === 'chat_sent') messageTxt.value = ''
    const route_id = Number(route.params.id ?? '0') ?? 0
    if (route_id === responseevent.from_id || route_id === responseevent.to_id) {
      const chatresponse = new ChatsModel.ChatResponseModel()
      chatresponse.chat_id = responseevent.chat_id
      chatresponse.from_id = responseevent.from_id
      chatresponse.to_id = responseevent.to_id
      chatresponse.message_type = responseevent.message_type
      chatresponse.message = responseevent.message
      chatresponse.created_at = responseevent.created_at
      chatresponse.status = responseevent.status
      chatresponse.media_path = responseevent.media_path
      chatresponse.width = responseevent.width
      chatresponse.height = responseevent.height
      chatModels.value.push(chatresponse)

      if (event_name === 'chat_response') {
        const chatresponse2 = new ChatEventSocketModel()
        chatresponse2.chat_id = responseevent.chat_id
        chatresponse2.from_id = responseevent.from_id
        chatresponse2.to_id = responseevent.to_id
        chatresponse2.message_type = responseevent.message_type
        chatresponse2.message = responseevent.message
        chatresponse2.created_at = responseevent.created_at
        chatresponse2.status = responseevent.status
        chatresponse2.event_name = "chat_read_status"
        sendmsgtoworker(chatresponse2, true)
      }
    }
    const user_id = responseevent.from_id === login_store.getUserDetails?.user_id ? responseevent.to_id : responseevent.from_id
    appendLastMessagetohistory(responseevent.chat_id ?? 0, user_id ?? 0, responseevent.message ?? '', responseevent.message_type ?? 'text')
    nextTick(() => { if (scrollContainer.value) scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight; })
  })

  nextTick(() => {
    is_mounted.value = true
    scrollBottomSmooth()
  });

  checkuseronline()
  const tid = Number(route.params.id) ?? 0
  if (tid !== 0) updateBadgeCount(tid)
})

const scrollBottomSmooth = () => {
  requestAnimationFrame(() => {
    const el = scrollContainer.value
    if (!el) return
    el.scrollTop = el.scrollHeight
  })
};


// cleanup
onBeforeUnmount(() => {
  eventBus.off('chatEvent')
  eventBus.off('socketConnection')
  eventBus.off('onlineUserIds')
  eventBus.off('typing')
  eventBus.off('chatUpdateStatus')
  eventBus.off('chatDeleteStatus')
  eventBus.off('callDeclineAlert')
  eventBus.off('callAcceptAlert')
})

// scrolling/pagination etc. (keep unchanged)
const handleScroll = async () => {
  if (scrollContainer.value?.scrollTop === 0) {
    if (!is_loading) {
      is_loading = true
      pageIndex.value = pageIndex.value + 1
      const api_url = getUrl(RequestURL.fetchChat);
      await $fetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
        cache: "no-cache",
        method: "post",
        body: {
          "from_id": user_store.getLoginId,
          "to_id": to_id,
          "page": pageIndex.value
        },
        headers: { "content-type": "application/json" },
        onResponse: async ({ response }) => {
          const response_model = response._data as SuccessError<ChatsModel.ChatResponseModel>
          if (response_model.success) {
            const filterarray = response_model.result?.sort((a, b) => (a.chat_id ?? 0) - (b.chat_id ?? 0));
            const lastMessage = (filterarray ?? []).at(-1);
            chatModels.value.push(...filterarray ?? [])
            chatModels.value.sort((a, b) => (a.chat_id ?? 0) - (b.chat_id ?? 0));
            scrollToMessage(lastMessage?.chat_id ?? 0)
          } else {
            pageIndex.value = pageIndex.value - 1
          }
          is_loading = false
        }
      });
    }
  }
};
const scrollToMessage = (messageId: number) => { nextTick(() => { const messageElement = document.getElementById(`${messageId}`); if (messageElement) messageElement.scrollIntoView({ behavior: "smooth", block: "center" }); }) };

function checkuseronline() {
  if (isWSConnected.value) {
    const user_ids = chatHistoryModels.value.map(it => it.user_id ?? 0)
    const groupmodel = new GroupEventSocketModel()
    groupmodel.admin_id = id_store.getDeviceId
    groupmodel.event_name = "add_user_to_group"
    groupmodel.user_ids = user_ids ?? []
    groupmodel.socket_id = id_store.getDeviceId
    sendmsgtoworker(groupmodel, true)
  }
}

function updateMessageStatus(eventmodel: ChatEventSocketModel) {
  const to_id = Number(route.params.id) ?? 0
  if (to_id === 0 || to_id !== (eventmodel.to_id ?? 0)) return;
  const chat = chatModels.value.filter(h => h.chat_id === eventmodel.chat_id)
  if (chat.length > 0) chat[0].status = eventmodel.status
}
function deleteMessageStatus(eventmodel: ChatEventSocketModel) {
  const chat = chatModels.value.filter(h => h.chat_id === eventmodel.chat_id)
  if (chat.length > 0) chat[0].is_deleted = true
  const histories = chatHistoryModels.value.filter(h => h.user_id === eventmodel.to_id)
  if (histories.length > 0 && histories[0].chat_id === eventmodel.chat_id) histories[0].is_deleted = true
}

async function deleteChat() {

  let is_deleting = chatModels.value.filter((el) => {
    return el.is_deleting
  })
  if (is_deleting.length > 0) {
    return;
  }

  selectedMessages.value.forEach((el) => {
    let first = chatModels.value.filter((chel) => {
      return chel.chat_id === el
    })
    if (first.length > 0) {
      first[0].is_deleting = true
    }
  })

  const api_url = getUrl(RequestURL.deleteChat);
  await $fetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: { "chat_ids": selectedMessages.value, "from_id": login_store.getUserDetails?.user_id },
    headers: { "content-type": "application/json" },
    onResponse: async ({ response }) => {
      const response_model = response._data as SuccessError<ChatsModel.ChatResponseModel>
      if (response_model.success) {
        selectedMessages.value.forEach((el) => {
          const index = chatModels.value.findIndex(c => c.chat_id === el);
          if (index !== -1) {
            let chat = chatModels.value[index]
            if (chat.from_id === login_store.getUserDetails?.user_id) {
              chat.is_deleted = true
            }
            else {
              chatModels.value.splice(index, 1);
            }
          }
        })

        if (chatModels.value.length > 0) {
          const lastMessage = chatModels.value[chatModels.value.length - 1];
          let user_id = lastMessage.from_id === login_store.getUserDetails?.user_id ? lastMessage.to_id : lastMessage.from_id
          const histories = chatHistoryModels.value.filter(h => h.user_id === user_id)
          if (histories.length > 0) {
            histories[0].from_id = lastMessage.from_id ?? 0
            histories[0].to_id = lastMessage.to_id ?? 0
            histories[0].chat_id = lastMessage.chat_id ?? 0
            histories[0].message = lastMessage.message ?? ''
            histories[0].message_type = lastMessage.message_type ?? ''
            histories[0].is_deleted = lastMessage.is_deleted ?? false
          }
        }
        showToastSuccess(response_model.message)
        selectedMessages.value.forEach((el) => {
          let first = chatModels.value.filter((chel) => {
            return chel.chat_id === el
          })
          if (first.length > 0) {
            first[0].is_deleting = false
          }
        })
        selectMode.value = false
        selectedMessages.value = []
      }
      else {
        showToastError(response_model.message)
        selectedMessages.value.forEach((el) => {
          let first = chatModels.value.filter((chel) => {
            return chel.chat_id === el
          })
          if (first.length > 0) {
            first[0].is_deleting = false
          }
        })
      }


    }
  });
}

async function deleteWholeChat(chat: any) {
  if (chat.is_deleting === true) return
  chat.is_deleting = true
  const api_url = getUrl(RequestURL.deleteWholeChat);
  await $fetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: { "chat_id": chat.chat_id, "from_id": login_store.getUserDetails?.user_id, "to_id": chat.user_id },
    headers: { "content-type": "application/json" },
    onResponse: async ({ response }) => {
      const response_model = response._data as SuccessError<ChatsModel.ChatResponseModel>
      if (response_model.success) {
        navigateTo('/chat')
        showToastSuccess(response_model.message)
      } else showToastError(response_model.message)
      chat.is_deleting = false
    }
  });
}

function sendMessage() {
  if (isWSConnected.value === false) {
    showToastError('Please wait while we are connecting to server');
    return
  }
  const statusInput = messageRef.value as HTMLTextAreaElement;
  const trim = statusInput.value.trim()
  const to_id2 = Number(route.params.id) ?? 0
  if (trim.length === 0 || to_id2 === 0) return
  const eventmodel = new ChatEventSocketModel()
  eventmodel.event_name = 'chat'
  eventmodel.from_id = login_store.getUserDetails?.user_id ?? 0
  eventmodel.to_id = to_id2
  eventmodel.message_type = 'text'
  eventmodel.message = trim
  eventmodel.socket_id = id_store.getDeviceId
  sendmsgtoworker(eventmodel, true)
}

function updateBadgeCount(to_id2: number) {
  const histories = chatHistoryModels.value.filter(h => h.user_id === to_id2)
  if (histories.length > 0) histories[0].badge_count = 0
}

function appendLastMessagetohistory(chat_id: number, to_id2: number, message: string, message_type: string) {
  const histories = chatHistoryModels.value.filter(h => h.user_id === to_id2)
  if (histories.length > 0) {
    histories[0].chat_id = chat_id
    histories[0].badge_count = 0
    histories[0].message = message
    histories[0].is_deleted = false
    histories[0].message_type = message_type
  }
}

async function fetchChats(from_id: number, to_id2: number) {
  const user_id = from_id === login_store.getUserDetails?.user_id ? to_id2 : from_id
  activeChatId.value = user_id;
  await navigateTo(`/chat/${user_id}`)
}

function getImagePathForUser(user: UsersModel.ProfileDetailsResponseModel | null | undefined): string {
  if (user) {
    const profile_image = user.profile_image ?? ''
    if (profile_image.length !== 0) return (user.media_path ?? '') + profile_image
    const profile_type = user.profile_type ?? ''
    if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png";
    if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png";
    if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png";
    if (profile_type === 'Man') return "/images/profile-placeholders/man.png";
    return "/images/profile-placeholders/man.png"
  }
  return ""
}

function getImagePath(user: ChatsModel.ChatResponseModel): string {
  const profile_image = user.profile_image ?? ''
  if (profile_image.length !== 0) return (user.media_path ?? '') + profile_image
  const profile_type = user.profile_type ?? ''
  if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png";
  if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png";
  if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png";
  if (profile_type === 'Man') return "/images/profile-placeholders/man.png";
  return "/images/profile-placeholders/man.png"
}
function triggerFileInput() { fileInput.value?.click(); }

async function handleFileUpload(event: Event) {
  previewUrl.value = null
  const target = event.target as HTMLInputElement;
  const files = target?.files ?? []
  const file = files[0]
  if (file) {
    contentType.value = file.type
    if (file.type.startsWith("image/")) {
      const img = new Image();
      const profile_image = await file.arrayBuffer()
      previewUrlFile.value = new Blob([profile_image])
      img.onload = async function () {
        fileWidth.value = img.width
        fileHeight.value = img.height
        await uploadMedia()
      }
      img.src = URL.createObjectURL(file)
      previewUrl.value = URL.createObjectURL(file)


    } else {
      const video = document.createElement('video');
      video.preload = 'metadata';
      const video_file = await file.arrayBuffer()
      video.onloadedmetadata = async function () {

        if (video.duration > 180) {
          showToastError("Please upload video less than 3 minutes long.");
          target.value = ''
        } else {
          fileWidth.value = video.videoWidth
          fileHeight.value = video.videoHeight
          previewUrlFile.value = new Blob([video_file])
          previewUrl.value = URL.createObjectURL(file)
          await uploadMedia()
        }
      };
      video.src = URL.createObjectURL(file);
    }
  }
  target.value = ''
}
function sendMedia(item: FeedsModel.FeedsResponseModel) {
  let is_local = item.is_local ?? false
  if (is_local) {

    previewUrl.value = item.media_path ?? ''
    contentType.value = item.contentType ?? ''
    fileWidth.value = item.width ?? 0
    fileHeight.value = item.height ?? 0
    if (item.fileBlob) {
      previewUrlFile.value = item.fileBlob
    }
    uploadMedia()
    chatMediaModal.hide()
  }
  else {
    const to_id2 = Number(route.params.id ?? '0') ?? 0
    const eventmodel = new ChatEventSocketModel()
    eventmodel.event_name = 'chat'
    eventmodel.from_id = login_store.getUserDetails?.user_id ?? 0
    eventmodel.to_id = to_id2
    eventmodel.message_type = item.media_type
    eventmodel.message = item.media_type === 'image' ? item.hd_feed_image : item.hd_feed_video
    eventmodel.socket_id = id_store.getDeviceId
    eventmodel.width = 0
    eventmodel.height = 0
    sendmsgtoworker(eventmodel, true)
    chatMediaModal.hide()
  }

}
async function uploadMedia() {
  if (previewUrl.value === null) { showToastError('Please select media to upload.'); return; }
  if (is_uploading.value) return;
  uploadProgress.value = 0
  const api_url = getUrl(RequestURL.getChatMediaURL);
  is_uploading.value = true;
  const response = await $fetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
    method: 'POST',
    body: { "contentType": contentType.value },
    headers: { 'Content-Type': 'application/json' },
  })
  const worker_model = response.response as ChatsModel.ChatResponseModel
  uploadattachment(worker_model.url ?? '', worker_model.key ?? '', contentType.value)
}

function uploadattachment(url: string, key: string, contentTypeStr: string = 'image/jpeg') {
  uploadProgress.value = 0;
  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) uploadProgress.value = Math.round((e.loaded / e.total) * 100);
  })

  xhr.upload.addEventListener('error', () => {
    is_uploading.value = false;
    showToastError('Photo upload failed. Please try again.')
    uploadProgress.value = 0;
  })

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      let [type] = contentTypeStr.split("/");
      if (type !== 'image' && type !== 'video') type = 'file'
      is_uploading.value = false;
      const to_id2 = Number(route.params.id ?? '0') ?? 0
      const eventmodel = new ChatEventSocketModel()
      eventmodel.event_name = 'chat'
      eventmodel.from_id = login_store.getUserDetails?.user_id ?? 0
      eventmodel.to_id = to_id2
      eventmodel.message_type = type
      eventmodel.message = key
      eventmodel.socket_id = id_store.getDeviceId
      eventmodel.width = fileWidth.value
      eventmodel.height = fileHeight.value
      sendmsgtoworker(eventmodel, true)
    }
  }

  xhr.open('PUT', url ?? '')
  xhr.setRequestHeader('Content-Type', contentTypeStr)
  uploadProgress.value = 0;
  xhr.send(previewUrlFile.value)
}

async function deleteSelected() {
  // implement batch delete logic as needed - placeholder
  // You probably want to iterate selectedMessages and call deleteChat API for each
  // selectedMessages.value = []
  // showToastSuccess('Selected messages deleted (placeholder)')

  if (selectedMessages.value.length > 0) {
    await deleteChat()
  }
}




</script>

<style scoped>
.chat-active {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-left: 3px solid #ff6b6b;
}

/* Dashboard Button Styling */
.btn-dashboard {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-dashboard:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-dashboard:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-dashboard svg {
  transition: transform 0.2s ease;
}

.btn-dashboard:hover svg {
  transform: scale(1.1);
}

/* Original btn-outline-light styles for other elements */
.btn-outline-light {
  color: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease-in-out;
}

.btn-outline-light:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

.btn-outline-light:active {
  transform: translateY(0);
}

/* Mobile optimizations */
@media (max-width: 576px) {
  .chat-hd-btn {
    gap: 0.5rem !important;
  }

  .btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }

  .btn-outline-light svg {
    width: 14px;
    height: 14px;
  }

  /* Sidebar dashboard button mobile optimizations */
  .cht-top .btn-outline-light {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }

  .cht-top .btn-outline-light svg {
    width: 12px;
    height: 12px;
  }
}

/* Tablet optimizations */
@media (min-width: 577px) and (max-width: 768px) {
  .btn-outline-light {
    padding: 0.5rem 0.875rem;
  }

  .cht-top .btn-outline-light {
    padding: 0.375rem 0.625rem;
    font-size: 0.8rem;
  }
}

.attachment-preview {
  cursor: pointer;
}

.attachment-img {
  max-width: 240px;
  border-radius: 8px;
}

.attachment-video {
  max-width: 240px;
  border-radius: 8px;
  display: block;
}

.video-play-overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.video-play-icon {
  width: 48px;
  height: 48px;
  opacity: 0.9;
}

.select-toolbar {
  position: sticky;
  bottom: 0;
  z-index: 50;
  padding: 0.5rem;
  background: rgba(15, 15, 15, 0.6);
}

.msgf-pill {
  font-size: 14px;
  line-height: 1;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  /* optional */
}

.modal-header {
  min-height: 0 !important;
  max-height: 20px;
  border-bottom: none !important;
}


.modal-dialog {
  height: 100%;
  max-height: 100%;
  margin: 0 auto;
}

@supports (-webkit-touch-callout: none) {
  .modal-dialog {
    height: 100dvh;
  }
}

.modal-content {
  height: auto;
  max-height: 100vh;
  overflow: hidden;
  /* disables internal scroll */
}
</style>
