<template>

  <nav class="main-nav custom-scroll" :class="toggleleftside">
    <div class="logo-warpper">
      <a>
        <nuxt-link to="/">
          <img src="/images/logo/logo.png" alt="logo" />
        </nuxt-link>
      </a>
    </div>
    <div class="sidebar-main">
      <ul class="sidebar-top">
        <li>
          <a
            class="button-effect"
            href="javascript:void(0)"
            :class="{ active: activesidebar === 1 }"
            @click="activemenu(1)"
            
            title="Status"
            data-tippy-content="Status"
            data-intro="Check Status here"
          >
            <div class="user-popup status one">
              <div class="bg-size" :style="{ 'background-image': `url(${getImgUrl(status)})`, ...styleObject }"></div>
            </div>
          </a>
        </li>
        <li>
          <a
            class="icon-btn btn-light button-effect"
            :class="{ active: activesidebar === 2 }"
            href="javascript:void(0)"
            @click="activemenu(2)"
            
            title="Favourite"
            data-tippy-content="Favourite"
          >
            <i class="fa fa-star"></i>
          </a>
        </li>
        <li>
          <a
            class="icon-btn btn-light button-effect"
            :class="{ active: activesidebar === 4 }"
            href="javascript:void(0)"
            @click="activemenu(4)"
            
            title="Contact List"
            data-tippy-content="Contact List"
          >
            <i class="fa fa-users"></i>
          </a>
        </li>
        <li>
          <div class="dot-btn dot-danger grow">
            <a
              class="icon-btn btn-light button-effect"
              :class="{ active: activesidebar === 5 }"
              href="javascript:void(0)"
              @click="activemenu(5)"
              
              title="Notification"
              data-tippy-content="Notification"
            >
              <i class="fa fa-bell"></i>
            </a>
          </div>
        </li>
        <li>
          <a
            class="icon-btn btn-light button-effect"
            :class="{ active: activesidebar === 6 }"
            href="javascript:void(0)"
            @click="activemenu(6)"
            
            title="Setting"
            data-tippy-content="Setting"
            data-intro="You can change settings by clicking here"
          >
            <i class="fa fa-cog"></i>
          </a>
        </li>
      </ul>
      <ul class="sidebar-bottom">
        <li>
          <nuxt-link to="/authentication/login" class="icon-btn btn-light button-effect">
            <i class="fa fa-power-off"  title="SignOut" data-tippy-content="SignOut"></i>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>

</template>

<script setup>
import { ref, computed } from "vue";
import { useCommonStore } from "@/store/common";
import { useLayoutStore } from "@/store/layout";

const store = useCommonStore();
const layoutStore = useLayoutStore();
const config = useRuntimeConfig();


const mixLayout = ref("");
const status = ref("avtar/2.jpg");

const styleObject = {
  "background-size": "cover",
  "background-position": "center",
  display: "block",
};


const toggleleftside = computed(() => store.toggleleftside);
const activesidebar = computed(() => store.activesidebar);


const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

const activemenu = (id) => {
  store.activesidebar = id;
};

const customizeMixLayout = () => {
  mixLayout.value = mixLayout.value === "" ? "dark" : "";
  layoutStore.setLayout(mixLayout.value);
};
</script>
