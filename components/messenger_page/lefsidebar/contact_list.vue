<template>

  <div
    class="contact-list-tab dynemic-sidebar custom-scroll"
    :class="activesidebar === 4 ? 'active' : ''"
    id="contact-list"
  >
    <div class="theme-title">
      <div class="d-flex">
        <div>
          <h2>Contact</h2>
          <h4>Start talking now</h4>
        </div>
        <div class="flex-grow-1 text-end">
          <a
            class="icon-btn btn-outline-light btn-sm m-r-15 search"
            href="javascript:void(0)"
            @click="openSeachbar"
          >
          <Icon name="lucide:search" size="15" height="15"></Icon>
          </a>
          <form class="form-inline search-form" :class="{ open: openSearch }">
            <div class="form-group">
              <input
                class="form-control-plaintext"
                type="search"
                placeholder="Search.."
              />
              <div class="icon-close close-search" @click="openSearch = false"></div>
            </div>
          </form>
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
      <li v-for="user in contacts" :key="user.id">
        <div class="chat-box">
          <div
            class="profile"
            :class="user.profile"
            :style="[
              { 'background-image': `url(${getImgUrl( user.img)})` },
              styleObject,
            ]"
          ></div>
          <div class="details">
            <h5>{{ user.name }}</h5>
            <h6>{{ user.status }}</h6>
          </div>
          <div class="date-status">
            <h6>{{ user.date }}</h6>
            <div v-html="user.active"></div>
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

const openSearch = ref(false);
const styleObject = ref({
  "background-size": "cover",
  "background-position": "center",
  display: "block",
});

const activesidebar = computed(() => commonStore.activesidebar);
const contacts = computed(() => sidebarStore.contactData);
const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

const openSeachbar = () => {
  openSearch.value = !openSearch.value;
};

const activemenu = (id) => {
  commonStore.activesidebar = id;
};
</script>
