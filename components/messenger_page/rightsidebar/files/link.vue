<template>

  <div
    class="tab-pane fade"
    :class="activesharedmedia == 2 ? 'active show' : ''"
    id="tab2"
  >
    <div class="link-group" v-for="link in links" :key="link.id">
      <div class="d-flex">
        <Icon name="lucide:link" size="15" height="15"></Icon>
        <div class="flex-grow-1">
          <h5 class="mt-0">{{ link.themeName }}</h5>
          <h6>{{ link.time }}</h6>
        </div>
      </div>
      <a :href="link.themeLink">{{ link.placeholder }}</a>
      <div class="d-flex">
        <img class="img-fluid" :src="getImgUrl(link.logo)" alt="media-img" />
        <div class="flex-grow-1">
          <h5>{{ link.template }}</h5>
          <h6 class="mt-0">{{ link.templateLine }}</h6>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script setup>
import { useCommonStore } from "@/store/common";
import {useSidebarStore} from "@/store/sidebar"

let commonStore = useCommonStore();
let store=useSidebarStore()
const config = useRuntimeConfig();

const links = computed(() => store.linkData);
const activesharedmedia = computed(() => commonStore.activesharedmedia);

const getImgUrl = (path) => {
  return `${config.public.baseURL}/images/${path}`;
};

</script>