<template>
 
  <div
    class="tab-pane fade"
    :class="activechatType == 2 ? 'show active' : ''"
    id="group"
    role="tabpanel"
    aria-labelledby="group-tab"
  >
    <div class="search2">
      <div>
        <div class="input-group">
          <div class="input-group-append">
            <span class="input-group-text"><i class="fa fa-search"></i></span>
          </div>
          <input class="form-control" type="text" placeholder="Start Chat" />
        </div>
      </div>
    </div>
    <ul class="group-main menu-trigger">
      <li
        :class="{ active: activeIndex === index }"
        data-to="group_chat"
        v-for="(user, index) in chatuser"
        :key="user.id"
        @click="setActive(index), setActiveuser(user.id)"
      >
        <div class="group-box">
          <div
            class="profile"
            :class="user.profile ? user.profile : ''"
            :style="
              user.img
                ? [
                    { 'background-image': 'url(' + getImgUrl(user.img) + ')' },
                    styleObject,
                  ]
                : ''
            "
          >
            <span v-if="user.profile_tag">{{ user.profile_tag }}</span>
          </div>
          <div class="details">
            <h5>{{ user.name }}</h5>
            <h6>{{ user.status }}</h6>
          </div>
          <div class="date-status" v-if="user.group">
            <ul class="grop-icon">
              <li>
                <a
                  class="group-tp"
                  href="javascript:void(0)"
                  data-tippy-content="Josephin"
                >
                  <img
                    src="/images/contact/1.jpg"
                    alt="group-icon-img"
                /></a>
              </li>
              <li>
                <a
                  class="group-tp"
                  href="javascript:void(0)"
                  data-tippy-content="Jony "
                >
                  <img
                    src="/images/contact/2.jpg"
                    alt="group-icon-img"
                /></a>
              </li>
              <li>
                <a
                  class="group-tp"
                  href="javascript:void(0)"
                  data-tippy-content="Pabelo"
                >
                  <img
                    src="/images/contact/3.jpg"
                    alt="group-icon-img"
                /></a>
              </li>
              <li>+ {{ user.group }}</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>
<script setup>
import { useCommonStore } from "@/store/common";
import {useGroupChatStore} from "@/store/groupchat"
const config = useRuntimeConfig();
const activeIndex = ref(0);
    const styleObject = ref({
      "background-size": "cover",
      "background-position": "center",
      display: "block",
    })
    const commonStore = useCommonStore();
let chatStore=useGroupChatStore()

const chatuser = computed(() => chatStore.users);
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