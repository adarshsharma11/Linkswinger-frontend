<template>

  <div>
    <client-only>
      <div class="chitchat-container sidebar-toggle">
        <MessengerPageNav />
        <MessengerPageLeftSidebar />
        <MessengerPageChat/>
      </div>
      <MessengerPageModalsAudiocall1 ref="audioComponent" />
      <MessengerPageModalsVediocall/>
      <MessengerPageModalsNotesmodal />
      <MessengerPageModalsTodo/> 
      <MessengerPageModalsCreatetodo/>
<MessengerPageModalsGroupaudiocall/>
<MessengerPageModalsGroupvediocall/>
<MessengerPageModalsConfigurationmodel/>
<MessengerPageModalsSetreminder/>
<MessengerPageModalsPollModal/>
<MessengerPageModalsCodesnippets/>
<MessengerPageModalsNewContact/>
<MessengerPageModalsNewCall/>
<MessengerPageModalsNewChat/>
<MessengerPageCustomizer/>
     
    </client-only>
  </div>
  
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import layout from "@/data/layout.json";
import { useCommonStore } from "@/store/common";
import { MessengerPageModalsConfigurationmodel, MessengerPageModalsCreatetodo, MessengerPageModalsSetreminder } from "#components";


const store = useCommonStore();


const width = ref(0);


const handleResize = () => {
  if (process.client) {
    width.value = window.innerWidth;
  }
};


watchEffect(() => {
  if (width.value < 992) {
    store.toggleleftside = "";
  } else if (width.value > 992 && layout.config.sidebar_setting) {
    store.toggleleftside = "on";
  } else {
    store.toggleleftside = "";
  }
});


onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();

  if (width.value < 992) {
    store.toggleleftside = "";
  } else if (width.value > 992 && layout.config.sidebar_setting) {
    store.toggleleftside = "on";
  } else {
    store.toggleleftside = "";
  }

  store.activechat = true;
  store.activesidebar = 0;
  store.activechatType = 1;
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});


useHead({
  bodyAttrs: {
    class: `main-page ${layout.config.sidebar_layout}`,
    id: "body",
  },
  htmlAttrs: {
    class: `${layout.config.color}`,
  },
});
</script>
