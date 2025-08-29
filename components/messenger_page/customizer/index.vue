<template>

  <section
    class="setting-sidebar"
    :style="opencustomizer ? 'right: 0px;' : 'right: -400px;'"
  >
    <div class="theme-title">
      <div class="d-flex">
        <div>
          <h2>Customizer</h2>
          <h4>Real Time Customize</h4>
          <button
            data-bs-toggle="modal" data-bs-target="#configModal"
            class="btn btn-primary plus-popup btn-sm mt-2"
          >
            Configuration
          </button>
      
        </div>
        <div class="flex-grow-1">
          <a
            class="icon-btn btn-outline-light button-effect pull-right cog-close"
            href="javascript:void(0)"
            @click="closecustomizer()"
            ><i class="fa fa-close"></i
          ></a>
        </div>
      </div>
    </div>
    <MessengerPageCustomizerChoosecolor/>
    <MessengerPageCustomizerLayout/>
    <MessengerPageCustomizerChatwallpaper/>
    <MessengerPageCustomizerSidebar/>
  </section>

</template>

<script setup>
import { MessengerPageCustomizerLayout } from "#components";
import { useCommonStore } from "@/store/common";
import {useLayoutStore} from "@/store/layout"

const commonStore = useCommonStore();
let store=useLayoutStore()

const opencustomizer = computed(() => commonStore.opencustomizer);
const data = computed(() => JSON.stringify(store.layout.layout));
const layout = computed(() => store.layout.layout);

const modalcustomizer = ref(null);
const layoutRef = ref(null);

const closecustomizer = () => {
  commonStore.opencustomizer = false;
};

const hide = () => {
  modalcustomizer.value?.hide();
};

const copyText = () => {
  layoutRef.value?.select();
  document.execCommand("copy");

  defineExpose({ layoutRef });

  window.$toasted.show("Code Copied to clipboard", {
    theme: "outline",
    position: "top-right",
    type: "default",
    duration: 2000,
  });
};
</script>

