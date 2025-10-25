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
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-dark border-secondary">New</button>
              <button class="btn btn-sm btn-dark border-secondary">Group</button>
            </div>
          </div>
          <div class="custom-scroll" style="max-height:70vh;overflow:auto;">
            <!-- Example Conversation Items -->
            <div class="p-2 rounded-3 d-flex align-items-center justify-content-between hover-overlay chat-item"
              style="background-color:rgba(23,23,23,0.4);margin-bottom:6px;" v-for="historymodel in chatHistoryModels"
              @click="fetchChats(historymodel.from_id ?? 0,historymodel.to_id ?? 0)">
              <div class="d-flex align-items-center gap-3">
                <div class="position-relative chat-item-left">
                  <img
                    class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold"
                    style="width:40px;height:40px;" :src="getImagePath(historymodel)"></img>
                  <span
                    class="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-success border border-dark"
                    style="width:12px;height:12px;"></span>
                </div>
                <div class="chat-item-right">
                  <div class="d-flex align-items-center gap-2">
                    <strong>{{ historymodel.nick_name }}</strong>
                    <span class="badge bg-warning bg-opacity-25 text-warning border border-warning">{{
                      historymodel.tier_name ?? 'Free' }}</span>
                  </div>
                  <small class="text-secondary">{{ historymodel.message }}</small>
                </div>
              </div>
              <!-- <span class="badge bg-danger glow-red text-white">2</span> -->
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
                  style="width:12px;height:12px;"></span>
              </div>
              <div>
                <h6 class="mb-0"> {{ userDetails?.nick_name }} <span class="badge bg-warning text-dark ms-1">{{
                  userDetails?.tier_name ?? 'Free' }}</span></h6>
                <small class="text-secondary">Online now • {{ userDetails?.profile_type }}</small>
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
          <div id="messages" ref="scrollContainer" class="flex-grow-1 p-3 custom-scroll"
            style="overflow:auto;max-height:60vh;">
            <!-- <div class="text-center text-secondary small my-3">Today</div> -->
            <div v-for="chat in chatModels" class="message-bubble" :class="{
              'message-incoming': chat.from_id !== login_store.getUserDetails?.user_id,
              'message-outgoing': chat.from_id === login_store.getUserDetails?.user_id,
              'ms-auto': chat.from_id === login_store.getUserDetails?.user_id,
              'glow-red': chat.from_id === login_store.getUserDetails?.user_id
            }">
              {{ chat.message }}
              <div class="message-time">{{ chat.created_at }}</div>
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
                <button id="attach-btn" class="btn bbtn-dark border-secondary text-white ms-2"><svg viewBox="0 0 24 24"
                    class="h-5 w-5" fill="currentColor">
                    <path d="M16.5 6.5 9 14a3 3 0 1 0 4.24 4.24l7.07-7.07a5 5 0 1 0-7.07-7.07L6.1 7.17" fill="none"
                      stroke="currentColor" stroke-width="1.5"></path>
                  </svg></button>
                <button id="btnvoicenote" class="btn btn-dark border-secondary text-white ms-2"><svg viewBox="0 0 24 24"
                    class="h-5 w-5" fill="currentColor">
                    <path
                      d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3zm-7-3h2a5 5 0 0 0 10 0h2a7 7 0 0 1-14 0zm6 7v-2h2v2h3v2H8v-2h3z">
                    </path>
                  </svg></button>
                <button id="btnSend" class="btn btn-danger glow-red-strong text-white ms-2"
                  @click="sendMessage()">Send</button>
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
if (to_id !== 0) 
{
  const fetchChat = async () => {
    const api_url = getUrl(RequestURL.fetchChat);
    const { data: fetch_response, error: option_error } = await useFetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
      cache: "no-cache",
      method: "post",
      body: {
        "from_id": user_store.getLoginId,
        "to_id": to_id,
        "page": 0
      },
      headers: {
        "content-type": "application/json"
      }
    });
    return fetch_response.value?.result
  }
  chatModels.value = await fetchChat() as ChatsModel.ChatResponseModel[]

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

onMounted(() => {

  eventBus.on('chatEvent', (responseevent) => {
    let event_name = responseevent.event_name ?? ''
    if (event_name === 'chat_sent') {
      messageTxt.value = ''
      appendLastMessagetohistory(responseevent.to_id ?? 0, responseevent.message ?? '')
    }
    let chatresponse = new ChatsModel.ChatResponseModel()
    chatresponse.chat_id = responseevent.chat_id
    chatresponse.from_id = responseevent.from_id
    chatresponse.to_id = responseevent.to_id
    chatresponse.message_type = responseevent.message_type
    chatresponse.message = responseevent.message
    chatresponse.created_at = responseevent.created_at
    chatModels.value.push(chatresponse)

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

})
onUnmounted(() => {
  eventBus.off('chatEvent')
})


function sendMessage() {
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
  sendmsgtoworker(eventmodel, true)
}



function appendLastMessagetohistory(to_id: number, message: string) {
  let histories = chatHistoryModels.value.filter((history: ChatsModel.ChatResponseModel) => history.to_id === to_id)
  if (histories.length > 0) {
    histories[0].message = message
  }
}

async function fetchChats(from_id: number,to_id: number) {
    
  let user_id = from_id === login_store.getUserDetails?.user_id ? to_id : from_id

 // chatModels.value = []
 router.push({ path: `/chat/${user_id}` })

  // fetchUserDetails(user_id)

  // let api_url = getUrl(RequestURL.fetchChat);
  // let postData = {
  //   "from_id": user_store.getLoginId,
  //   "to_id": user_id,
  //   "page": 0
  // }
  // let response = await $fetch<SuccessError<ChatsModel.ChatResponseModel>>(api_url, {
  //   method: 'POST',
  //   body: postData,
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });

  // if (response.success) {
  //   chatModels.value = response.result ?? []
  // }


}

async function fetchUserDetails(user_id: number) {
 
  let api_url = getUrl(RequestURL.getProfileDetails);
  let postData = {
    "user_id": user_id,
  }
  let response = await $fetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.success) {
   userDetails.value = response.response;
  }
  

}



function getImagePathForUser(user: UsersModel.ProfileDetailsResponseModel | null | undefined): string {
  if (user)
  {
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


</script>
