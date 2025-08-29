<template>
  <div class="fevorite-tab dynemic-sidebar" id="favourite" :class="activesidebar === 2 ? 'active' : ''">
    <div class="theme-title">
      <div class="d-flex">
        <div>
          <h2>Favourite</h2>
          <h4>Last Recent</h4>
        </div>
        <div class="flex-grow-1 text-end">
          <a class="icon-btn btn-outline-light btn-sm m-r-15 search" href="javascript:void(0)" @click="openSeachbar">
            <Icon name="lucide:search" size="15" height="15"></Icon>
          </a>
          <form class="form-inline search-form" :class="{ open: openSearch }">
            <div class="form-group">
              <input class="form-control-plaintext" type="search" placeholder="Search.." />
              <div class="icon-close close-search" @click="openSearch = false"></div>
            </div>
          </form>
          <a class="icon-btn btn-outline-light btn-sm m-r-15" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
            <Icon name="lucide:plus" size="15" height="15"></Icon>
          </a>
          <a class="icon-btn btn-outline-light btn-sm close-panel" href="javascript:void(0)" @click="activemenu(0)">
            <Icon name="lucide:x" size="15" height="15"></Icon>
          </a>
        </div>
      </div>
    </div>
    <ul class="chat-main">
      <li v-for="(user, index) in favourite" :key="user.id">
        <div class="chat-box">
          <div class="d-flex">
            <div
              class="profile"
              :class="user.profile"
              :style="[
                { 'background-image': `url(${getImgUrl(user.img)})` },
                styleObject,
              ]"
            ></div>
            <div class="details">
              <h5>{{ user.name }}</h5>
              <h6>{{ user.place }}</h6>
            </div>
            <div class="flex-grow-1">
              <a
                class="icon-btn btn-sm pull-right favourite"
                :class="{ 'btn-primary': active(index), 'btn-outline-primary': !active(index) }"
                href="javascript:void(0)"
                @click="setFavourite(index)"
              >
                <Icon name="lucide:star" size="15" height="15"></Icon>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script setup>
import { ref, computed } from "vue";
import { useCommonStore } from "@/store/common";
import {useSidebarStore} from "@/store/sidebar"
const config = useRuntimeConfig();

const commonStore = useCommonStore();
const store=useSidebarStore()
const favourite=store.favouriteData


const activeIndex = ref([]);
const openSearch = ref(false);
const newContactComponent = ref(null);

const styleObject = {
  "background-size": "cover",
  "background-position": "center",
  display: "block",
};


const activesidebar = computed(() => commonStore.activesidebar);

const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

const activemenu = (id) => {
  commonStore.activesidebar = id;
};

const setFavourite = (id) => {
  if (activeIndex.value.includes(id)) {
    activeIndex.value = activeIndex.value.filter((i) => i !== id);
  } else {
    activeIndex.value.push(id);
  }
};

const active = (index) => activeIndex.value.includes(index);

const showNewContactModal = () => {
  newContactComponent.value?.show();
};

const openSeachbar = () => {
  openSearch.value = !openSearch.value;
};
</script>
