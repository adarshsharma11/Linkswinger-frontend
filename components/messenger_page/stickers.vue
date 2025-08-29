<template>

  <div class="sticker-contain" :class="showsticker ? 'open' : ''">
    <div class="sticker-sub-contain custom-scroll">
      <ul>
        <li v-for="(sticker, index) in stickers" :key="index">
          <a href="javascript:void(0)" @click="addSticker(sticker.stic)">
            <img
              class="img-fluid"
              :src="getImgUrl(sticker.stic )"
              alt="sticker"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup>
import { useCommonStore } from "@/store/common";
import {useGroupChatStore} from "@/store/groupchat"
import {useDirectChatStore} from "@/store/chat"
import sticker from "../../data/sticker.json";
const config = useRuntimeConfig();

const commonStore = useCommonStore();
let store=useGroupChatStore()
let chatStore=useDirectChatStore()
let stickers=sticker

const showsticker = computed(() => commonStore.showsticker);
const activechatType = computed(() => commonStore.activechatType);

const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

let addSticker=(path)=>{
  if (commonStore.activechatType === 1) {
    chatStore.addSticker(path);
    const container = document.querySelector('.scrolltopdirectchat');
    if (container) {
      setTimeout(() => container.scrollBy({ top: 200, behavior: 'smooth' }), 310);
      setTimeout(() => container.scrollBy({ top: 200, behavior: 'smooth' }), 1100);
    }
  } else {
    store.addSticker(path);
    const containerFluid = document.querySelector('.scrolltopgroupchat');
    if (containerFluid) {
      setTimeout(() => containerFluid.scrollBy({ top: 200, behavior: 'smooth' }), 310);
      setTimeout(() => containerFluid.scrollBy({ top: 200, behavior: 'smooth' }), 1100);
    }
  }

  commonStore.showsticker = false;

}

</script>
