<template>

  <div
    class="recent-default dynemic-sidebar"
    :class="activesidebar == 0 ? 'active' : ''"
  >
    <div class="recent">
      <div class="theme-title">
        <div class="d-flex">
          <div>
            <h2>Recent</h2>
            <h4>Chat from your friends &#128536;</h4>
          </div>
          <div class="flex-grow-1">
            <a
              class="icon-btn  button-effect pull-right mobile-back"
              :class="
                toggleleftside == 'on'
                  ? 'btn-outline-light'
                  : 'btn-outline-primary'
              "
              ><i class="ti-angle-right" @click="mobilemenu()"></i></a
            ><a
              class="icon-btn button-effect pull-right mainnav"
              :class="
                toggleleftside == 'on'
                  ? 'btn-outline-light'
                  : 'btn-outline-primary'
              "
              @click="toggleSidebar()"
              ><i class="ti-layout-grid2"></i
            ></a>
          </div>
        </div>
      </div>
      <div class="recent-slider recent-chat ">
        <div >
          <Swiper :slidesPerView="3" :swiperOption="swiperOption.breakpoints"  :loop="true" class="swiper-wrapper">
            <SwiperSlide
              class="swiper-slide"
              v-for="(item, index) in recentchat"
              :key="index"
            >
              <div class="item">
                <div class="recent-box">
                  <div :class="item.activeclass"></div>
                  <div
                    :class="item.defaultclass"
                    :style="[
                      { 'background-image': 'url(' + `${config.public.baseURL}${item.image}` + ')' },
                      styleObject,
                    ]"
                  >
                    <h6>{{ item.user }}</h6>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
    <div class="chat custom-scroll">
      <ul class="chat-cont-setting" :class="opeNewchat ? 'open' : ''">
        <li>
          <a
            href="javascript:void(0)"
            data-bs-toggle="modal" data-bs-target="#msgchatModal"
            ><span>new chat</span>
            <div class="icon-btn btn-outline-primary button-effect btn-sm">
              <Icon
                name="lucide:message-square"
                size="15"
                height="15"
              ></Icon></div
          ></a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
          data-bs-toggle="modal" data-bs-target="#msgcallModal"
            ><span>new call</span>
            <div class="icon-btn btn-outline-success button-effect btn-sm">
              <Icon name="lucide:phone" size="15" height="15"></Icon></div
          ></a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            data-bs-toggle="modal" data-bs-target="#exampleModalCenter"
            ><span>new Contact</span>
            <div class="icon-btn btn-outline-danger button-effect btn-sm">
              <Icon name="lucide:users" size="15" height="15"></Icon></div
          ></a>
        </li>
      </ul>
      <div class="theme-title">
        <div class="d-flex">
          <div>
            <h2>Chat</h2>
            <h4>Start New Conversation</h4>
          </div>
          <div class="flex-grow-1 text-end">
            <a
              class="icon-btn  btn-sm search contact-search"
              :class="
                toggleleftside == 'on'
                  ? 'btn-outline-light'
                  : 'btn-outline-primary'
              "
              href="javascript:void(0)"
              @click="toggleSearchbar()"
              ><Icon name="lucide:search" size="15" height="15"></Icon
            ></a>
            <form
              class="form-inline search-form"
              :class="openSearch ? 'open' : ''"
            >
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
            <a
              class="icon-btn btn-primary btn-fix chat-cont-toggle outside"
              :class="
                toggleleftside == 'on'
                  ? ''
                  : 'btn-outline-light btn-outline-primary'
              "
              @click="toggleNewChat()"
              href="javascript:void(0)"
              ><Icon name="lucide:plus" size="15" height="15"></Icon
            ></a>
          </div>
        </div>
      </div>
      <div class="theme-tab tab-sm chat-tabs">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" data-to="chat-content">
    <a
      class="nav-link button-effect"
     :class="activechat == 1 ? 'show active' : ''"
              @click="activateChat(1)"
      id="chat-tab"
      href="javascript:void(0);"
      role="tab"
      aria-controls="chat"
      aria-selected="true"
      data-intro="Start chat"
    >
      <Icon name="lucide:message-square"></Icon>Chat
    </a>
  </li>
  <li class="nav-item" data-to="call-content">
    <a
      class="nav-link button-effect"
      :class="activechat == 2 ? 'show active' : ''"
              @click="activateChat(2)"
      id="call-tab"
      href="javascript:void(0);"
      role="tab"
      aria-controls="call"
      aria-selected="false"
    >
      <Icon name="lucide:phone"></Icon>Call
    </a>
  </li>
  <li class="nav-item" data-to="contact-content">
    <a
      class="nav-link button-effect"
      :class="activechat == 3 ? 'show active' : ''"
              @click="activateChat(3)"
      id="contact-tab"
      href="javascript:void(0);"
      role="tab"
      aria-controls="contact"
      aria-selected="false"
    >
      <Icon name="lucide:users"></Icon>Contact
    </a>
  </li>
</ul>

<div class="tab-content" id="myTabContent">
  <div
    class="tab-pane fade"
   :class="activechat == 1 ? 'show active' : ''"
    id="chat"
    role="tabpanel"
    aria-labelledby="chat-tab"
  >
    <div class="theme-tab">
      <ul class="nav nav-tabs" id="myTab1" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link button-effect"
            :class="activechatType == 1 ? 'active' : ''"
            @click="activechatTab(1)"
            id="direct-tab"
            href="javascript:void(0);"
            role="tab"
            aria-controls="direct"
            aria-selected="false"
          >
            Direct
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link button-effect"
            :class="activechatType == 2 ? 'active' : ''"
            @click="activechatTab(2)"
            id="group-tab"
            href="javascript:void(0);"
            role="tab"
            aria-controls="group"
            aria-selected="true"
          >
            Group
          </a>
        </li>
      </ul>

      <div class="tab-content" id="myTabContent1">
        <div
          class="tab-pane fade"
          :class="activechatType == 1 ? 'show active' : ''"
          id="direct"
          role="tabpanel"
          aria-labelledby="direct-tab"
        >
          <ul class="chat-main menu-trigger">
            <MessengerPageChatDirectChatDirectchatuser/>
          </ul>
        </div>
        <MessengerPageChatGroupChatGroupchatuser/>
      </div>
    </div>
  </div>

  <MessengerPageCalls/>
  <MessengerPageContacts/>
</div>

      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useCommonStore } from "@/store/common";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const store = useCommonStore();

const openSearch = ref(false);
const opeNewchat = ref(false);
const config = useRuntimeConfig();

const swiperOption = reactive({
  breakpoints: {
    320: { slidesPerView: 2 },
    361: { slidesPerView: 3 },
    701: { slidesPerView: 5 },
    769: { slidesPerView: 7 },
    801: { slidesPerView: 2 },
    1367: { slidesPerView: 3 },
  },
});

const recentchat = reactive([
  {
    user: "John deo",
    image: "/images/avtar/1.jpg",
    activeclass: "dot-btn dot-danger grow",
    defaultclass: "recent-profile",
  },
  {
    user: "John",
    image: "/images/avtar/2.jpg",
    activeclass: "dot-btn dot-success grow",
    defaultclass: "recent-profile online",
  },
  {
    user: "Jony",
    image: "/images/avtar/3.jpg",
    activeclass: "dot-btn dot-warning grow",
    defaultclass: "recent-profile",
  },
  {
    user: "John deo",
    image: "/images/avtar/4.jpg",
    activeclass: "dot-btn dot-danger grow",
    defaultclass: "recent-profile",
  },
  {
    user: "John",
    image: "/images/avtar/5.jpg",
    activeclass: "dot-btn dot-success grow",
    defaultclass: "recent-profile online",
  },
  {
    user: "Jony",
    image: "/images/avtar/2.jpg",
    activeclass: "dot-btn dot-warning grow",
    defaultclass: "recent-profile",
  },
]);

const styleObject = reactive({
  "background-size": "cover",
  "background-position": "center",
  display: "block",
});

const toggleleftside = computed(() => store.toggleleftside);
const activesidebar = computed(() => store.activesidebar);
const activechatType=computed(()=>store.activechatType)
const activechat=computed(()=>store.activechat)

const activechatTab = (type) => {
  store.activechatType = type;
  store.showprofilemenu = false;
      store.showsticker = false;
      store.showemogi = false;
      store.showcontactcontent = false;
};

const activateChat = (type) => {
  store.activechat = type;
};

const mobilemenu = () => {
  document.querySelector(".sidebar-toggle")?.classList.add("mobile-menu");
};

const toggleSearchbar = () => {
  openSearch.value = !openSearch.value;
};

const toggleSidebar = () => {
  store.toggleleftside = store.toggleleftside === "on" ? "" : "on";
};

const toggleNewChat = () => {
  opeNewchat.value = !opeNewchat.value;
};

</script>
