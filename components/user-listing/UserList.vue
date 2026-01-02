<template>
  <div class="user-list-container">
    <div class="nearby-loc-togl" v-if="type === 'nearby'">
      <div class="loc-togl-text">Location On/Off</div>
      <div class="vs-toggle"><input v-model="is_location_on" type="checkbox" class="switch" id="hideProfile">
      </div>
    </div>
    <div class="user-grid" :class="gridClass">
      <UserCard v-for="(user, index) in users" :key="user.user_id" :user="user" :is-mine=isMine
        :online-users="onlineUsers" :last-seens="lastSeens" @open-profile="openProfile" @open-chat="openChat"
        @show-code-alert="showCodeAlert" @decline-user="declineUser" @remove-like-user="removeLikeUser" />
    </div>
    <div v-if="users.length === 0" class="no-users">
      <p>No users found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, computed } from 'vue'
import type { UsersModel } from '~/composables/models'
import UserCard from '~/components/profile/user/UserCard.vue'
import type { CallsModel } from '~/composables/websocketModels'
const route = useRoute()
const user_store = userStore()
const login_store = useLoginStore();
const type = ref('')
const user_id = ref('')


const users = ref<UsersModel.ProfileDetailsResponseModel[]>([])
const eventBus = useMittEmitter()
const id_store = idStore()
const onlineUsers = ref([] as number[])
const lastSeens = ref([] as LastSeenModel[])
const isWSConnected = ref(false)
const has_location_error = ref(false)
const is_location_on = ref(login_store.getUserDetails?.is_location_on ?? false);
const user_latitude = ref<number | null>(login_store.getUserDetails?.user_latitude ?? null)
const user_longitude = ref<number | null>(login_store.getUserDetails?.user_longitude ?? null)


// Event emitters
user_id.value = route.query.user_id as string || 'all'
type.value = route.query.type as string || 'all'

const isMine = ref(user_id.value === (login_store.getUserDetails?.user_udid ?? ''))
if (type.value === 'nearby') {
   let body = {
    user_id:   login_store.getUserDetails?.user_id ?? 0,
    latitude:  is_location_on.value  ? user_latitude.value :  null,
    longitude: is_location_on.value  ? user_longitude.value :  null,
  }
  const userList = async () => {
    const api_url = getUrl(RequestURL.fetchNearByUsers);
    const { data: response, error: option_error } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(
      api_url,
      {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.value?.result || []
  };
  users.value = await userList();
} else if (type.value === 'views') {
  const userList = async () => {
    const api_url = getUrl(RequestURL.fetchProfileViews);
    const { data: response, error: option_error } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(
      api_url,
      {
        method: "POST",
        body: {
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

}
else if (type.value === 'crushes') {
  isMine.value = true
  const userList = async () => {
    const api_url = getUrl(RequestURL.fetchCrushList);
    const { data: response, error: option_error } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(
      api_url,
      {
        method: "POST",
        body: {
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

}

else if (type.value === 'friends') {
  const userList = async () => {
    const api_url = getUrl(RequestURL.fetchFriends);
    const { data: response, error: option_error } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(
      api_url,
      {
        method: "POST",
        body: {
          user_udid: user_id.value,
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
}


async function fetchNearByUserList() {
  const api_url = getUrl(RequestURL.fetchNearByUsers);
  users.value = []
  let body = {
    user_id:   login_store.getUserDetails?.user_id ?? 0,
    latitude:  is_location_on.value  ? user_latitude.value :  null,
    longitude: is_location_on.value ? user_longitude.value :  null,
  }
  
  let response = await $fetch<SuccessError<UsersModel.LoginRequestModel>>(api_url, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.success) {
    users.value = response.result as UsersModel.ProfileDetailsResponseModel[];
    checkuseronline()
  }
  else {
    users.value = []
    showToastError(response.message ?? "Something went wrong");
  }
}
watch(is_location_on, (newValue, oldValue) => {
  if (is_location_on.value) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        user_latitude.value = position.coords.latitude
        user_longitude.value = position.coords.longitude
        updateUserLocation()
        fetchNearByUserList()
        
      },
      (err) => {
         is_location_on.value = oldValue
         has_location_error.value = true
         showToastError(err.message)
      }
    )
  }
  else
  {
    if (has_location_error.value === false)
    {
       updateUserLocation()
       fetchNearByUserList()
    }
    has_location_error.value = false
  }
});

async function updateUserLocation() {
  const api_url = getUrl(RequestURL.updateUserLocation);
  var body = {
    user_id: login_store.getUserDetails?.user_id ?? 0,
    latitude : is_location_on.value ? user_latitude.value : null,
    longitude : is_location_on.value ? user_longitude.value : null
  } 
  let response = await $fetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(api_url, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.success) {
     login_store.setIsLocationOn(response.response?.is_location_on ?? false , user_latitude.value , user_longitude.value)
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}

// Computed properties
// const gridClass = computed(() => {
//   return {
//     'grid-1': props.gridColumns === 1,
//     'grid-2': props.gridColumns === 2,
//     'grid-3': props.gridColumns === 3,
//     'grid-4': props.gridColumns === 4,
//     'grid-5': props.gridColumns === 5
//   }
// })
const gridClass = computed(() => {
  return `grid-3`; // Always return grid-5 for 5 columns
})

// Methods
const openProfile = async (user: UsersModel.ProfileDetailsResponseModel) => {
  await navigateTo(`/user-profile/${user.user_id}`)
}

const openChat = async (user: UsersModel.ProfileDetailsResponseModel) => {
  await navigateTo(`/chat/${user.user_id}`)
}

const showCodeAlert = (userId: number, isVideo: boolean) => {
  Swal.fire({
    title: 'Please enter code',
    input: 'text', // Specifies a text input field
    inputPlaceholder: 'Type code here', // Placeholder text for the input
    showCancelButton: true, // Displays a cancel button
    inputValidator: (value: string) => { // Optional: input validation
      if (!value) {
        return 'Please enter code';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      validateCall(userId, result.value ?? '', isVideo)
    }
  });
}
const declineUser = (userId: number) => {
  users.value.splice(users.value.findIndex(u => u.user_id === userId), 1);
}

const removeLikeUser = (userId: number) => {
  users.value.splice(users.value.findIndex(u => u.user_id === userId), 1);
}

async function validateCall(to_id: number, code: string, is_video: boolean) {
  const api_url = getUrl(RequestURL.validateCall);
  await $fetch<SuccessError<CallsModel.ValidateCallResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      "from_id": login_store.getUserDetails?.user_id ?? 0,
      "from_socket_id": id_store.getDeviceId,
      "to_id": to_id,
      "call_code": code,
      "is_video": is_video
    },
    headers: {
      "content-type": "application/json"
    },
    onResponse: async ({ response }) => {

      var response_model = response._data as SuccessError<CallsModel.ValidateCallResponseModel>
      if (response_model.success) {
        showToastSuccess(response_model.message)
      }
      else {
        showToastError(response_model.message)
      }
    }
  });
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

<style scoped>
.user-list-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.user-list-header {
  text-align: center;
  margin-bottom: 2rem;
}

.user-list-header h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.user-list-header p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

.user-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Grid column variants */
.grid-1 {
  grid-template-columns: 1fr;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-5 {
  grid-template-columns: repeat(5, 1fr);
}

.no-users {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Responsive design */
@media (max-width: 1200px) {
  .grid-5 {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {

  .grid-4,
  .grid-5 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {

  .grid-3,
  .grid-4,
  .grid-5 {
    grid-template-columns: repeat(2, 1fr);
  }

  .user-list-container {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {

  .grid-1,
  .grid-2,
  .grid-3,
  .grid-4,
  .grid-5 {
    grid-template-columns: 1fr;
  }

  .user-list-header h2 {
    font-size: 1.5rem;
  }
}
</style>