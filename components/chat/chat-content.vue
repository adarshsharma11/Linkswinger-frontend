<template>
  <div class="container py-4">
    <div class="row g-3">
      <!-- Sidebar -->
      <aside class="col-12 col-lg-4 col-xl-3">
        <div class="chat-card p-2">
          <div
            class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-2 cht-top">
            <div class="d-flex align-items-center gap-2">
              <span>Messages</span>
              <span class="badge bg-success bg-opacity-25 text-success border border-success">Verified only</span>
            </div>
            <!-- <div class="d-flex gap-2">
              <button class="btn btn-sm btn-dark border-secondary">New</button>
              <button class="btn btn-sm btn-dark border-secondary">Group</button>
            </div> -->
          </div>
          <div class="custom-scroll" style="max-height:70vh;overflow:auto;">
            <!-- Example Conversation Items -->
            <div class="p-2 rounded-3 d-flex align-items-center justify-content-between hover-overlay chat-item"
              style="background-color:rgba(23,23,23,0.4);margin-bottom:6px;" v-for="historymodel in chatHistoryModels"
              @click="fetchChats(historymodel.from_id ?? 0, historymodel.to_id ?? 0)">
              <div class="d-flex align-items-center gap-3">
                <div class="position-relative chat-item-left">
                  <img
                    class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold"
                    style="width:40px;height:40px;" :src="getImagePath(historymodel)"></img>
                  <span
                    class="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-success border border-dark"
                    style="width:12px;height:12px;" v-if="onlineUsers.includes(historymodel.user_id ?? 0)"></span>
                </div>
                <div class="chat-item-right">
                  <div class="d-flex align-items-center gap-2">
                    <strong>{{ historymodel.nick_name }}</strong>
                    <span class="badge bg-warning bg-opacity-25 text-warning border border-warning">{{
                      historymodel.tier_name ?? 'Free' }}</span>
                  </div>
                  <small class="text-secondary" v-if="(historymodel.is_typing ?? false) === true">Typing...</small>
                  <small class="text-secondary"
                    v-if="(historymodel.is_typing ?? false) === false && historymodel.message_type === 'text'">{{
                      historymodel.message }}</small>
                  <small class="text-secondary"
                    v-if="(historymodel.is_typing ?? false) === false && historymodel.message_type !== 'text'">Media</small>
                </div>
              </div>
              <span class="badge bg-danger glow-red text-white" v-if="(historymodel.badge_count ?? 0) > 0">{{
                historymodel.badge_count }}</span>
            </div>
            <!-- <div class="p-2 rounded-3 d-flex align-items-center justify-content-between hover-overlay chat-item"
              style="background-color:rgba(23,23,23,0.4);margin-bottom:6px;">
              <div class="d-flex align-items-center gap-3">
                <div class="position-relative chat-item-left">
                  <div
                    class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold"
                    style="width:40px;height:40px;">MT</div>
                  <span
                    class="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-success border border-dark"
                    style="width:12px;height:12px;"></span>
                </div>
                <div class="chat-item-right">
                  <div class="d-flex align-items-center gap-2">
                    <strong>Ruby</strong>
                    <span class="badge bg-success bg-opacity-25 text-success border border-success">Plus</span>
                  </div>
                  <small class="text-secondary">You free Friday?</small>
                </div>
              </div>
              <span class="badge bg-danger glow-red text-white">2</span>
            </div> -->
          </div>
        </div>
      </aside>

      <!-- Chat Section -->
      <section class="col-12 col-lg-8 col-xl-9">
        <div class="chat-card d-flex flex-column h-100">
          <!-- Header -->
          <div class="d-flex justify-content-between align-items-center border-bottom border-secondary p-3 chat-header">
            <div class="d-flex align-items-center gap-3 chat-hd">
              <div class="position-relative">
                <img
                  class="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold"
                  style="width:40px;height:40px;" :src="getImagePathForUser(userDetails)"></img>
                <span
                  class="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-success border border-dark"
                  style="width:12px;height:12px;" v-if="onlineUsers.includes(userDetails?.user_id ?? 0)"></span>
              </div>
              <div>
                <h6 class="mb-0"> {{ userDetails?.nick_name }} <span class="badge bg-warning text-dark ms-1">{{
                  userDetails?.tier_name ?? 'Free' }}</span></h6>
                <div v-if="(userDetails?.is_typing ?? false) === false">
                  <small class="text-secondary" v-if="onlineUsers.includes(userDetails?.user_id ?? 0)">Online now
                    •</small>
                  <small class="text-secondary">{{ userDetails?.profile_type }}</small>
                </div>
                <small class="text-secondary" v-if="(userDetails?.is_typing ?? false) === true">Typing...</small>
              </div>
            </div>
            <div class="d-flex gap-2 chat-hd-btn">
              <button class="btn btn-sm btn-dark border-secondary grp-btn">Create Group</button>
              <button class="btn btn-sm btn-dark border-secondary"><svg viewBox="0 0 24 24" class="h-4 w-4"
                  fill="currentColor">
                  <path
                    d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.6-.36l3.4 1.14a1.5 1.5 0 0 1 1 1.41V20a2 2 0 0 1-2 2c-9.39 0-17-7.61-17-17a2 2 0 0 1 2-2h2.61a1.5 1.5 0 0 1 1.41 1l1.14 3.4a1.5 1.5 0 0 1-.36 1.6L6.6 10.8z">
                  </path>
                </svg> Voice</button>
              <button class="btn btn-sm btn-danger glow-red-strong text-white">Show my call code</button>
            </div>
          </div>

          <!-- Messages -->
          <div id="messages" ref="scrollContainer" @scroll="handleScroll" class="flex-grow-1 p-3 custom-scroll"
            style="overflow:auto;max-height:60vh;">
            <!-- <div class="text-center text-secondary small my-3">Today</div> -->
            <div v-for="chat in chatModels" class="message-bubble" :class="{
              'message-incoming': chat.from_id !== login_store.getUserDetails?.user_id,
              'message-outgoing': chat.from_id === login_store.getUserDetails?.user_id,
              'ms-auto': chat.from_id === login_store.getUserDetails?.user_id,
              'glow-red': chat.from_id === login_store.getUserDetails?.user_id
            }" :id="`${chat.chat_id ?? 0}`">
              <div v-if="chat.message_type === 'text'">{{ chat.message }}</div>
              <div v-if="chat.message_type === 'image'"><img :src="(chat.media_path ?? '') + (chat.message ?? '')"
                  style="max-width: 300px; max-height: 300px;" />
              </div>
              <div v-if="chat.message_type === 'video'"><video :src="(chat.media_path ?? '') + (chat.message ?? '')"
                  style="max-width: 300px; max-height: 300px;" controls></video></div>
              <div class="message-time" v-if="chat.from_id !== login_store.getUserDetails?.user_id">{{ chat.created_at
              }}</div>
              <div class="message-time" v-if="chat.from_id === login_store.getUserDetails?.user_id">{{ chat.created_at
              }} • {{ chat.status }}</div>
            </div>
            <!-- <div class="message-bubble message-incoming">We loved your profile pics. Fancy a chat tonight?<div
                class="message-time">13:43</div>
            </div>
            <div class="message-bubble message-outgoing ms-auto glow-red">Thanks! We’re around after 9pm. Video call ok?
              <div class="message-time">13:47 • Sent</div>
            </div>
            <div class="message-bubble message-incoming">Perfect. We’ll ping you here.<div class="message-time">13:49
              </div>
            </div>
            <div class="message-bubble message-outgoing ms-auto glow-red">Cool — speak later ✨<div class="message-time">
                13:50 • Delivered</div>
            </div> -->
          </div>

          <!-- Composer -->
          <div class="border-top border-secondary p-3 chat-ftr">
            <div class="d-flex align-items-center message-input chat-ftr-left">
              <button class="btn btn-link text-light fs-5">😊</button>
              <textarea v-model="messageTxt" id="composer" rows="1"
                class="form-control bg-transparent border-0 text-light"
                placeholder="Type a message… (Ctrl/⌘ + Enter to send)"></textarea>
              <div class="d-flex flex items-center gap-2 chat-ftr-btns">
                <input type="file" accept="image/png,image/jpeg,video/mp4" class="form-control d-none" ref="fileInput"
                  @change="handleFileUpload" />
                <button id="attach-btn" class="btn bbtn-dark border-secondary text-white ms-2"><svg viewBox="0 0 24 24"
                    class="h-5 w-5" fill="currentColor" @click="triggerFileInput">
                    <path d="M16.5 6.5 9 14a3 3 0 1 0 4.24 4.24l7.07-7.07a5 5 0 1 0-7.07-7.07L6.1 7.17" fill="none"
                      stroke="currentColor" stroke-width="1.5"></path>
                  </svg></button>
                <!-- <button id="btnvoicenote" class="btn btn-dark border-secondary text-white ms-2"><svg viewBox="0 0 24 24"
                    class="h-5 w-5" fill="currentColor">
                    <path
                      d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3zm-7-3h2a5 5 0 0 0 10 0h2a7 7 0 0 1-14 0zm6 7v-2h2v2h3v2H8v-2h3z">
                    </path>
                  </svg></button> -->
                <button v-if="is_uploading === false" id="btnSend"
                  class="btn btn-danger glow-red-strong text-white ms-2" @click="sendMessage()">Send</button>
                <button v-if="is_uploading === true" class="btn btn-danger glow-red-strong text-white ms-2">Send {{
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

</template>

<script setup lang="ts">
import { ChatsModel, UsersModel } from '~/composables/models'

const id_store = idStore()
const route = useRoute()
const user_store = userStore()
const login_store = useLoginStore()
const eventBus = useMittEmitter()
const messageTxt = ref('')
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
var is_uploading = ref(false)
var uploadProgress = ref(0);
var is_loading = false
const previewUrl = ref<string | null>(null);
const previewUrlFile = ref<Blob | null>(null);
const contentType = ref('');
const fileInput = ref<HTMLInputElement | null>(null);
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

function showTypingIndicator(from_id: number) {
  // Show UI element

  // 1. Find the chat model for that user
  const chat = chatHistoryModels.value.find(c => c.user_id === from_id);

  if (chat) {
    // 2. Set typing flag to true
    chat.is_typing = true;

    if (from_id === userDetails.value?.user_id) {
      userDetails.value.is_typing = true
    }

    // 3. Clear any previous hide timer for this user
    clearTimeout(hideTimers[from_id]);

    // 4. Schedule a new timeout to reset isTyping after 3 seconds
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


function onUserTyping(to_id: number) {
  if (typingTimeout) return; // already sent recently

  sendTypingStatus(to_id);

  typingTimeout = setTimeout(() => {
    typingTimeout = null;
  }, 2000); // only send every 2 seconds max
}

function sendTypingStatus(to_id: number) {
  let type = new TypingEventSocketModel()
  type.event_name = "typing"
  type.from_id = login_store.getUserDetails?.user_id
  type.to_id = userDetails.value?.user_id
  sendmsgtoworker(type, true)
}

watch(messageTxt, () => {
  onUserTyping(userDetails.value?.user_id ?? 0)
});

onMounted(() => {

  console.log('onmounted...chat')
  isWSConnected.value = isSocketConnected()
  eventBus.on('socketConnection', (is_connected) => {
    if (isWSConnected.value === false) {
      if (is_connected) {
        showToastSuccess('Socket Connected')
      }
    }
    isWSConnected.value = is_connected
    checkuseronline()
  })
  eventBus.on('onlineUserIds', (onlineUserIds) => {
    onlineUsers.value = onlineUserIds
  })
  eventBus.on('typing', (typing) => {
    showTypingIndicator(typing.from_id ?? 0)
  })
  eventBus.on('chatUpdateStatus', (eventModel) => {
    updateMessageStatus(eventModel)
  })


  eventBus.on('chatEvent', (responseevent) => {
    let event_name = responseevent.event_name ?? ''
    if (event_name === 'chat_sent') {
      messageTxt.value = ''
    }
    let route_id = Number(route.params.id ?? '0') ?? 0
    if (route_id === responseevent.from_id || route_id === responseevent.to_id) {
      let chatresponse = new ChatsModel.ChatResponseModel()
      chatresponse.chat_id = responseevent.chat_id
      chatresponse.from_id = responseevent.from_id
      chatresponse.to_id = responseevent.to_id
      chatresponse.message_type = responseevent.message_type
      chatresponse.message = responseevent.message
      chatresponse.created_at = responseevent.created_at
      chatresponse.status = responseevent.status
      chatresponse.media_path = responseevent.media_path
      chatModels.value.push(chatresponse)

      if (event_name === 'chat_response') {
        let chatresponse = new ChatEventSocketModel()
        chatresponse.chat_id = responseevent.chat_id
        chatresponse.from_id = responseevent.from_id
        chatresponse.to_id = responseevent.to_id
        chatresponse.message_type = responseevent.message_type
        chatresponse.message = responseevent.message
        chatresponse.created_at = responseevent.created_at
        chatresponse.status = responseevent.status
        chatresponse.event_name = "chat_read_status"
        sendmsgtoworker(chatresponse, true)
      }
    }
    let user_id = responseevent.from_id === login_store.getUserDetails?.user_id ? responseevent.to_id : responseevent.from_id

    appendLastMessagetohistory(user_id ?? 0, responseevent.message ?? '')
    nextTick(() => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
      }
    });
  })

  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  });

  checkuseronline()

  let to_id = Number(route.params.id) ?? 0
  if (to_id !== 0) {
    updateBadgeCount(to_id)
  }


})

onBeforeUnmount(() => {
  eventBus.off('chatEvent')
  eventBus.off('socketConnection')
  eventBus.off('onlineUserIds')
  eventBus.off('typing')
  eventBus.off('chatUpdateStatus')
  console.log('beforemount...chat')
})

onUnmounted(() => {

})

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
        headers: {
          "content-type": "application/json"
        },
        onResponse: async ({ response }) => {

          var response_model = response._data as SuccessError<ChatsModel.ChatResponseModel>
          if (response_model.success) {
            let filterarray = response_model.result?.sort((firstResponse, secondResponse) => {
              return (firstResponse.chat_id ?? 0) - (secondResponse.chat_id ?? 0);
            });
            const lastMessage = (filterarray ?? []).at(-1);
            chatModels.value.push(...filterarray ?? [])
            chatModels.value.sort((firstResponse, secondResponse) => {
              return (firstResponse.chat_id ?? 0) - (secondResponse.chat_id ?? 0);
            });
            scrollToMessage(lastMessage?.chat_id ?? 0)
          }
          else {
            pageIndex.value = pageIndex.value - 1
          }
          is_loading = false
        }
      });
    }

  }
};
const scrollToMessage = (messageId: number) => {
  nextTick(() => {
    const messageElement = document.getElementById(`${messageId}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
};

function checkuseronline() {
  if (isWSConnected.value) {
    let user_ids = chatHistoryModels.value.map(it => it.user_id ?? 0)
    let groupmodel = new GroupEventSocketModel()
    groupmodel.admin_id = id_store.getDeviceId
    groupmodel.event_name = "add_user_to_group"
    groupmodel.user_ids = user_ids ?? []
    groupmodel.socket_id = id_store.getDeviceId
    sendmsgtoworker(groupmodel, true)
  }
}
function updateMessageStatus(eventmodel: ChatEventSocketModel) {
  let to_id = Number(route.params.id) ?? 0
  if (to_id === 0 || to_id !== (eventmodel.to_id ?? 0)) {
    return;
  }
  let chat = chatModels.value.filter((history: ChatsModel.ChatResponseModel) => history.chat_id === eventmodel.chat_id)
  if (chat.length > 0) {
    chat[0].status = eventmodel.status
  }
}
function sendMessage() {

  if (isWSConnected.value === false) {
    showToastError('Please wait while we are connecting to server');
    return
  }

  let trim = messageTxt.value.trim()
  let to_id = Number(route.params.id) ?? 0
  if (trim.length === 0 || to_id === 0) {
    return
  }

  let eventmodel = new ChatEventSocketModel()
  eventmodel.event_name = 'chat'
  eventmodel.from_id = login_store.getUserDetails?.user_id ?? 0
  eventmodel.to_id = to_id
  eventmodel.message_type = 'text'
  eventmodel.message = trim
  eventmodel.socket_id = id_store.getDeviceId
  sendmsgtoworker(eventmodel, true)
}

function updateBadgeCount(to_id: number) {
  let histories = chatHistoryModels.value.filter((history: ChatsModel.ChatResponseModel) => history.user_id === to_id)
  if (histories.length > 0) {
    histories[0].badge_count = 0
  }
}

function appendLastMessagetohistory(to_id: number, message: string) {
  let histories = chatHistoryModels.value.filter((history: ChatsModel.ChatResponseModel) => history.user_id === to_id)
  if (histories.length > 0) {
    histories[0].badge_count = 0
    histories[0].message = message
  }
}

async function fetchChats(from_id: number, to_id: number) {
  let user_id = from_id === login_store.getUserDetails?.user_id ? to_id : from_id
  await navigateTo(`/chat/${user_id}`)
}

function getImagePathForUser(user: UsersModel.ProfileDetailsResponseModel | null | undefined): string {
  if (user) {
    let profile_image = user.profile_image ?? ''
    if (profile_image.length !== 0) {
      return (user.media_path ?? '') + profile_image
    }
    let profile_type = user.profile_type ?? ''
    if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png";
    if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png";
    if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png";
    if (profile_type === 'Man') return "/images/profile-placeholders/man.png";
    return "/images/profile-placeholders/man.png"
  }
  return ""
}

function getImagePath(user: ChatsModel.ChatResponseModel): string {
  let profile_image = user.profile_image ?? ''
  if (profile_image.length !== 0) {
    return (user.media_path ?? '') + profile_image
  }
  let profile_type = user.profile_type ?? ''
  if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png";
  if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png";
  if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png";
  if (profile_type === 'Man') return "/images/profile-placeholders/man.png";
  return "/images/profile-placeholders/man.png"
}
function triggerFileInput() {
  fileInput.value?.click();
}

async function handleFileUpload(event: Event) {
  previewUrl.value = null
  const target = event.target as HTMLInputElement;
  let files = target?.files ?? []
  const file = files[0]
  if (file) {
    contentType.value = file.type

    if (file.type.startsWith("image/")) {
      const profile_image = await file.arrayBuffer()
      previewUrlFile.value = new Blob([profile_image])
      previewUrl.value = URL.createObjectURL(file)
      await uploadMedia()
    }
    else {

      const video = document.createElement('video');
      video.preload = 'metadata';
      const video_file = await file.arrayBuffer()
      video.onloadedmetadata = async function () {
        if (video.duration > 180) {
          showToastError("Please upload video less than 3 minutes long.");
          target.value = '' // Clear the selected file
        }
        else {
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
async function uploadMedia() {
  if (previewUrl.value === null) {
    showToastError('Please select media to upload.');
    return;
  }
  if (is_uploading.value) {
    return;
  }
  uploadProgress.value = 0
  let api_url = getUrl(RequestURL.getChatMediaURL);
  is_uploading.value = true;
  let response = await $fetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
    method: 'POST',
    body: {
      "contentType": contentType.value,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  let worker_model = response.response as ChatsModel.ChatResponseModel
  uploadattachment(worker_model.url ?? '', worker_model.key ?? '', contentType.value)
}

function uploadattachment(url: string, key: string, contentType: string = 'image/jpeg') {
  uploadProgress.value = 0;
  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      let value = Math.round((e.loaded / e.total) * 100)
      uploadProgress.value = value;
    }
  })

  xhr.upload.addEventListener('error', () => {
    // error.value = 'Upload failed'
    // uploading.value = false
    is_uploading.value = false;
    showToastError('Photo upload failed. Please try again.')
    uploadProgress.value = 0;
  })

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      var [type, subtype] = contentType.split("/");
      if (type !== 'image' && type !== 'video') {
        type = 'file'
      }

      is_uploading.value = false;
      let to_id = Number(route.params.id ?? '0') ?? 0
      let eventmodel = new ChatEventSocketModel()
      eventmodel.event_name = 'chat'
      eventmodel.from_id = login_store.getUserDetails?.user_id ?? 0
      eventmodel.to_id = to_id
      eventmodel.message_type = type
      eventmodel.message = key
      eventmodel.socket_id = id_store.getDeviceId
      sendmsgtoworker(eventmodel, true)
    }
  }

  xhr.open('PUT', url ?? '')
  xhr.setRequestHeader('Content-Type', contentType)
  // add headers if needed: xhr.setRequestHeader('Authorization', 'Bearer ...')
  uploadProgress.value = 0;
  xhr.send(previewUrlFile.value)


}



</script>
