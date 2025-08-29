<template>
 
  <div class="sidebar-pannle-main">
    <ul>
      <li
        class="rtl-setting icon-btn btn-primary"
        @click="customizeLayoutType()"
      >
        {{ layoutType == "" ? "RTL" : "LTR" }}
      </li>
      <li class="cog-click icon-btn btn-success" @click="open()">
        <i class="fa fa-cog"></i>
      </li>
    </ul>
  </div>
 
</template>

<script setup>
import { useCommonStore } from "@/store/common";
import {useLayoutStore} from "@/store/layout"

const commonStore = useCommonStore();
let store=useLayoutStore()

const layoutType = ref("");

const opencustomizer = computed(() => commonStore.opencustomizer);
const layout = computed(() => store.layout);
const data = computed(() => JSON.stringify(store.layout));

const open = () => {
  commonStore.opencustomizer = true;
};

const customizeLayoutType = () => {
  layoutType.value = layoutType.value === "rtl" ? "" : "rtl";
  store.setLayoutType(layoutType.value);
};
</script>