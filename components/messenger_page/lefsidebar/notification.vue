<template>

  <div
    class="notification-tab dynemic-sidebar custom-scroll"
    :class="{ active: activesidebar === 5 }"
    id="notification"
  >
    <div class="theme-title">
      <div class="d-flex">
        <div>
          <h2>Notification</h2>
          <h4>List of notifications</h4>
        </div>
        <div class="flex-grow-1  text-end">
          <a
            class="icon-btn btn-outline-light btn-sm close-panel"
            href="javascript:void(0)"
            @click="activemenu(0)"
          >
          <Icon name="lucide:x" size="15" height="15"></Icon>
          </a>
        </div>
      </div>
    </div>
    <ul class="chat-main">
      <li v-for="user in notifications" :key="user.id">
        <div class="chat-box notification">
          <div
            class="profile"
            :class="user.profile"
            :style="
              user.img
                ? [
                    { 'background-image': `url(${getImgUrl( user.img)})` },
                    styleObject,
                  ]
                : ''
            "
          >
            <span v-if="user.profile_tag">{{ user.profile_tag }}</span>
          </div>
          <div class="details">
            <span>{{ user.name }}</span>
            <h5>{{ user.status }}</h5>
            <p>{{ user.desc }}</p>
          </div>
          <div class="date-status">
            <h6>{{ user.time }}</h6>
          </div>
        </div>
      </li>
    </ul>
  </div>
 
</template>

<script setup>
import { ref, computed } from "vue";
import { useSidebarStore } from "@/store/sidebar";
import { useCommonStore } from "@/store/common";

const sidebarStore = useSidebarStore();
const commonStore = useCommonStore();
const config = useRuntimeConfig();

const styleObject = ref({
  "background-size": "cover",
  "background-position": "center",
  display: "block",
});

const activesidebar = computed(() => commonStore.activesidebar);
const notifications = computed(() => sidebarStore.notificationData);

const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

const activemenu = (id) => {
  commonStore.activesidebar = id;
};
</script>
