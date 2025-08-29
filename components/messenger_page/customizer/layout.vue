<template>

  <div class="theme-layout">
    <h5>Layout</h5>
    <ul>
      <li
        :class="activelayout == '' ? 'active' : ''"
        @click="activeLayout('')"
        data-attr=""
      >
        <div class="sidebar"></div>
        <div class="sidebar-content"></div>
      </li>
      <li
        :class="activelayout == 'dark-sidebar' ? 'active' : ''"
        @click="activeLayout('dark-sidebar')"
        data-attr="dark-sidebar"
      >
        <div class="sidebar"></div>
        <div class="sidebar-content"></div>
      </li>
      <li
        :class="activelayout == 'dark' ? 'active' : ''"
        @click="activeLayout('dark')"
        data-attr="dark"
      >
        <div class="sidebar"></div>
        <div class="sidebar-content"></div>
      </li>
      <li
        :class="activelayout == 'colorfull' ? 'active' : ''"
        @click="activeLayout('colorfull')"
        data-attr="colorfull"
      >
        <div class="sidebar"></div>
        <div class="sidebar-content"></div>
      </li>
    </ul>
  </div>
 
</template>
<script setup>
import { useCommonStore } from "@/store/common";
import { useLayoutStore } from "@/store/layout";

import layout from "../../data/layout.json";

const activelayout = ref(layout.config.sidebar_layout);
const commonStore = useCommonStore();
const layoutStore = useLayoutStore();

const activerightsidebarmenu = computed(() => commonStore.activerightsidebarmenu);
const togglerightside = computed(() => commonStore.togglerightside);

const activeLayout = (index) => {
  activelayout.value = index;
  const body = document.getElementById("body");
  if (!body) return;

  body.classList.remove("dark-sidebar", "dark", "colorfull", "undefined");

  if (index === "") {
    body.classList.add("undefined");
  } else {
    body.classList.add(index);
  }

  layoutStore.setSidebarLayout(index);

  document.querySelector(".app-sidebar")?.classList.add("active");
  document.body.classList.remove("menu-active");
  document.body.classList.add("sidebar-active");

  commonStore.setTogglerightSide(true);
};
</script>


