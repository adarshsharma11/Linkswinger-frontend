<template>

  <div class="sidebar-setting">
    <h5>Sidebar</h5>
    <ul>
      <li
        class="three-column"
        :class="activesidebar == 'on' ? 'active' : ''"
        @click="activeSidebar('on')"
      >
        <div class="sm-sidebar"></div>
        <div class="sidebar"></div>
        <div class="sidebar-content"></div>
      </li>
      <li
        class="two-column"
        :class="activesidebar == '' ? 'active' : ''"
        @click="activeSidebar('')"
      >
        <div class="sidebar"></div>
        <div class="sidebar-content"></div>
      </li>
    </ul>
  </div>

</template>

<script setup>
import layout from '../../../data/layout.json'
import { useCommonStore } from "@/store/common";
import { useLayoutStore } from "@/store/layout";

const commonStore = useCommonStore();
const layoutStore = useLayoutStore();

const activesidebar = ref(layout.config.sidebar_setting);


const activeSidebar = (index) => {
  activesidebar.value = index;
  commonStore.toggleleftside = index === "on" ? "on" : "";
  layoutStore.setSidebarSetting(index);
};
</script>