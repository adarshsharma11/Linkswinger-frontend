<template>


  <div>
    <li
      :class="{ active: activeIndex === index }"
      v-for="(user, index) in chatuser"
      :key="user.id"
      @click="setActive(index), setActiveuser(user.id)"
    >
      <div class="chat-box">
        <div
          :class="user.profile"
          :style="[
            { 'background-image': 'url(' + getImgUrl(user.img) + ')' },
            styleObject,
          ]"
        ></div>
        <div class="details">
          <h5>{{ user.name }}</h5>
          <h6>{{ user.status }}</h6>
        </div>
        <div class="date-status">
          <i class="ti-pin2"></i>
          <h6>{{ user.date }}</h6>
          <div v-html="user.active"></div>
        </div>
      </div>
    </li>
  </div>

</template>

<script setup>
import { useCommonStore } from "@/store/common";
import {useDirectChatStore} from "@/store/chat"
const config = useRuntimeConfig();
const commonStore = useCommonStore();
let chatStore=useDirectChatStore()


const activeIndex = ref(0);
const styleObject = ref({
  "background-size": "cover",
  "background-position": "center",
  display: "block",
});


const chatuser = computed(() => chatStore.state.users);
const activechatType = computed(() => commonStore.activechatType);


const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

const setActiveuser = (id) => {
  chatStore.setActiveuser(id)
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width < 992) {
      document.querySelector(".sidebar-toggle")?.classList.add("mobile-menu");
    }
  }

  commonStore.showsticker = false;
  commonStore.showemogi = false;
  commonStore.showcontactcontent = false;
};

const setActive = (index) => {
  activeIndex.value = index;
};


</script>
