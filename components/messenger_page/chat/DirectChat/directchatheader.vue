<template>
 
  <div class="contact-details">
    <div class="row">
      <form class="form-inline search-form" :class="openSearch ? 'open' : ''">
        <div class="form-group">
          <input
            class="form-control-plaintext"
            type="search"
            placeholder="Search.."
          />
          <div
            class="icon-close close-search"
            @click="openSearch = false"
          ></div>
        </div>
      </form>
      <div class="col-7">
        <div class="d-flex left">
          <div class="media-left">
            <div
              class="menu-trigger"
              :class="currentChat.profile"
              :style="[
                {
                  'background-image': 'url(' + getImgUrl(currentChat.img) + ')',
                },
                styleObject,
              ]"
              @click="openprofile()"
            ></div>
          </div>
          <div class="flex-grow-1">
            <h5>{{ currentChat.name }}</h5>
            <div
              class="badge"
              :class="currentChat.online ? 'badge-success' : 'badge-danger'"
            >
              {{ currentChat.online ? "Active" : "InActive" }}
            </div>
          </div>
          <div class="media-right">
            <ul>
              <li>
                <a
                  class="icon-btn btn-light button-effect mute"
                  href="javascript:void(0)"
                  @click="showvolume = !showvolume"
                  ><span v-if="showvolume" class="effect-wave"></span
                  ><i
                    class="fa"
                    :class="showvolume ? 'fa-volume-up' : 'fa-volume-up off'"
                  ></i
                ></a>
              </li>
              <li>
                <a
                  class="icon-btn btn-light search-right"
                  href="javascript:void(0)"
                  @click="toggleSearchbar()"
                  ><Icon name="lucide:search" size="15" height="15"></Icon
                ></a>
              </li>
              <li>
                <a
                  class="icon-btn btn-light button-effect mobile-sidebar"
                  @click="backtochat()"
                  href="javascript:void(0)"
                  ><Icon name="lucide:chevron-left" size="15" height="15"></Icon
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col">
        <ul class="calls text-end">
          <li>
            <a
              class="icon-btn btn-light button-effect"
             
              
              title="Quick Audio Call"
              href="javascript:void(0)"
              data-tippy-content="Quick Audio Call"
              data-bs-toggle="modal" data-bs-target="#audiocall"
              ><Icon name="lucide:phone" size="15" height="15"></Icon
            ></a>
          </li>
          <li>
            <a
              class="icon-btn btn-light button-effect"
             
              
              title="Quick Video Call"
              href="javascript:void(0)"
              data-tippy-content="Quick Video Call"
             data-bs-toggle="modal" data-bs-target="#videocall"
              ><Icon name="lucide:video" size="15" height="15"></Icon
            ></a>
          </li>
          <li>
            <a
              class="icon-btn btn-light button-effect apps-toggle"
              @click="togglerightside()"
              
              title="All Apps"
              href="javascript:void(0)"
              data-tippy-content="All Apps"
              ><i class="ti-layout-grid2"></i
            ></a>
          </li>
          <MessengerPageCommonProfile/>
        </ul>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDirectChatStore } from "@/store/chat";
import { useCommonStore } from "@/store/common";
const config = useRuntimeConfig();
const openSearch = ref(false);
const showvolume = ref(true);
const currentchat = ref([]);

const styleObject = ref({
  "background-size": "cover",
  "background-position": "center",
  display: "block",
});

const commonStore = useCommonStore();
const chatStore = useDirectChatStore();


const currentChat = computed(() => {
  currentchat.value = chatStore.currentChat;
  return currentchat.value;
});


const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

const toggleSearchbar = () => {
  openSearch.value = !openSearch.value;
  commonStore.showprofilemenu = false;
};

const openprofile = () => {
  document.querySelector(".chitchat-main").classList.add("small-sidebar");
  const body = document.getElementById("body");

  if (body.classList.contains("menu-active")) {
    body.classList.remove("menu-active");
    document.querySelector(".app-sidebar").classList.add("active");
  } else {
    body.classList.add("menu-active");
    document.querySelector(".app-sidebar").classList.remove("active");
  }
};

const togglerightside = () => {
  commonStore.togglerightside = !commonStore.togglerightside;
  const body = document.getElementById("body");

  if (!commonStore.togglerightside) {
    body.classList.remove("sidebar-active");
    body.classList.add("main-page");
  } else {
    body.classList.remove("menu-active");
    body.classList.remove("main-page");
    body.classList.add("sidebar-active");
  }
};

const backtochat = () => {
  document.querySelector(".sidebar-toggle")?.classList.remove("mobile-menu");
};

onMounted(() => {
  currentChat.value;
});
</script>
