<template>
  
    <div class="chitchat-main" id="content">
      <div class="chat-content tabto" :class="activechat == 1 ? 'active' : ''">
        <div class="scrolltopdirectchat messages custom-scroll" :class="activechatType == 1 ? 'active' : ''" id="chating" 
          :style="chatwallpaperIndex !== 0? [{'background-image': 'url(' + chatwallpaper + ')'},styleObject] 
          : chatwallpapergrandiant !== '' ? [{'background-image': chatwallpapergrandiant},styleObject] : ''">
          <MessengerPageChatDirectChatDirectchatheader />
          <MessengerPageChatDirectChatDirectcustomchat/>
        </div>
        <div class="scrolltopgroupchat messages custom-scroll" :class="activechatType == 2 ? 'active' : ''" id="group_chat"
        :style="chatwallpaperIndex !== 0? [{'background-image': 'url(' + chatwallpaper + ')'},styleObject] 
          : chatwallpapergrandiant !== '' ? [{'background-image': chatwallpapergrandiant},styleObject] : ''">
        <MessengerPageChatGroupChatGroupchatheader/>
          <MessengerPageChatGroupChatGroupcustomchat/>
        </div>
        <div class="message-input">
          <div class="wrap emojis-main">
            <div class="dot-btn dot-primary me-3"><a class="icon-btn btn-outline-primary button-effect toggle-emoji" @click="openEmogi()" href="javascript:void(0)"><Icon name="lucide:smile" size="15" height="15"></Icon></a></div>
              <div class="contact-poll"><a class="icon-btn btn-outline-primary outside" @click="openContactcontent()"><i class="fa fa-plus"></i></a>
                <div class="contact-poll-content">
                  <ul>
                    <li><a href="#"><Icon name="lucide:image"></Icon>gallery</a></li>
                    <li><a href="#"><Icon name="lucide:camera"></Icon>camera</a></li>
                    <li><a data-bs-toggle="modal" data-bs-target="#snippetModal"><Icon name="lucide:code">                       </Icon>Code Snippest</a></li>
                    <li><a href="#"><Icon name="lucide:user">                              </Icon>contact</a></li>
                    <li><a href="#"><Icon name="lucide:map-pin">                       </Icon>location</a></li>
                    <li><a href="#"><Icon name="lucide:clipboard"> </Icon>document</a></li>
                    <li><a data-bs-toggle="modal" data-bs-target="#pollModal"><Icon name="lucide:chart-no-axes-column">                       </Icon>poll</a></li>
                    <li><a href="#"><Icon name="lucide:paperclip">                       </Icon>attach</a></li>
                  </ul>
                </div>
              </div>

            <input class="setemoj" 
                id="setemoj"
                v-model="text"
                v-on:keyup.enter="addChat()" 
                type="text" 
                placeholder="Write your message..."/>
            <button class="submit icon-btn btn-primary" :class="text ==='' ? 'disabled': ''" id="send-msg" :disabled="text ===''" @click="addChat()"><Icon name="lucide:send" size="15" height="15"></Icon></button>
            <div class="emojis-contain" :class="showemogi ? 'open': ''">
              <div class="emojis-sub-contain custom-scroll">
                <ul>
                  <li v-for="(emogi,index) in emogi" :key="index" 
                    @click="addemogi(emogi.emoji)"
                    >{{ emogi.emoji }}</li>
                </ul>
              </div>
            </div>
            <MessengerPageStickers/>
          </div>
        </div>
      </div>
      <div class="call-content tabto" :class="activechat == 2 ? 'active' : ''"><a class="icon-btn btn-outline-primary button-effect mobile-back mb-3" @click="backtochat()" href="javascript:void(0)"><i class="ti-angle-left">                       </i></a>
        <MessengerPageCallsCallcontent/>
      </div>
      <div class="contact-content tabto" :class="activechat == 3 ? 'active' : ''">
        <MessengerPageContactsContactcontent/>
      </div> 
    

    </div>
 
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue';
import { useCommonStore } from "@/store/common";
import {useGroupChatStore} from "@/store/groupchat"
import {useDirectChatStore} from "@/store/chat"
import emogi from '@/data/emogi.json';
import { MessengerPageContactsContactcontent } from '#components';

const commonStore = useCommonStore();
let store=useGroupChatStore()
let chatStore=useDirectChatStore()
const config = useRuntimeConfig();

const text = ref('');
const emogiarray = ref([]);
const styleObject = reactive({
  'background-blend-mode': 'unset',
});


const showsticker = computed(() => commonStore.showsticker);
const showemogi = computed(() => commonStore.showemogi);
const showcontactcontent = computed(() => commonStore.showcontactcontent);
const activechat = computed(() => commonStore.activechat);
const activechatType = computed(() => commonStore.activechatType);
const togglerightside = computed(() => commonStore.togglerightside);
const activerightsidebarmenu = computed(() => commonStore.activerightsidebarmenu);
const chatwallpaper = computed(() => commonStore.chatwallpaper);
const allwallpaper = computed(() => commonStore.allwallpaper);
const chatwallpapergrandiant = computed(() => commonStore.chatwallpapergrandiant);
const chatwallpaperIndex = computed(() => commonStore.chatwallpaperIndex);


watch(chatwallpaperIndex, () => {
  commonStore.chatwallpaper =
    chatwallpaperIndex.value !== 0
      ? getImgUrl(allwallpaper.value.find((x) => x.id === chatwallpaperIndex.value).img)
      : '';
});


const openSticker = () => {
  commonStore.showemogi = false;
  commonStore.showcontactcontent = false;
  commonStore.showsticker = !commonStore.showsticker;
};

const openEmogi = () => {
  commonStore.showsticker = false;
  commonStore.showcontactcontent = false;
  commonStore.showemogi = !commonStore.showemogi;
};

const openContactcontent = () => {
  commonStore.showsticker = false;
  commonStore.showemogi = false;
  commonStore.showcontactcontent = !commonStore.showcontactcontent;
};

const showsnippetmodal = (codesnippetRef) => {
  codesnippetRef.value.show();
};

const showpollmodal = (pollRef) => {
  pollRef.value.show();
};

const backtochat = () => {
  document.querySelector('.sidebar-toggle').classList.remove('mobile-menu');
};

const addChat = () => {
  if (text.value !== '') {
    if (activechatType.value === 1) {
      chatStore.addChat(text.value)
      const container = document.querySelector('.scrolltopdirectchat');
      setTimeout(() => container.scrollBy({ top: 200, behavior: 'smooth' }), 310);
      setTimeout(() => container.scrollBy({ top: 200, behavior: 'smooth' }), 1100);
    } else {
      store.addChat(text.value)
     
      const containerfluid = document.querySelector('.scrolltopgroupchat');
      setTimeout(() => containerfluid.scrollBy({ top: 200, behavior: 'smooth' }), 310);
      setTimeout(() => containerfluid.scrollBy({ top: 200, behavior: 'smooth' }), 1100);
    }

    text.value = '';
    emogiarray.value = [];
  }
};

const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

const addemogi = (emogi) => {
  if (text.value === '') {
    text.value = emogi;
    emogiarray.value.push(emogi);
  } else {
    emogiarray.value.push(emogi);
    text.value = emogiarray.value.join(' ');
  }
  commonStore.showemogi = false;
};


onMounted(() => {
  if (allwallpaper.value?.length > 0) {
    const wallpaperItem = allwallpaper.value.find((x) => x.id === chatwallpaperIndex.value);

    commonStore.chatwallpaper = wallpaperItem ? getImgUrl(wallpaperItem.img) : "";
  } else {
    commonStore.chatwallpaper = "";
  }

  commonStore.chatwallpapergrandiant = "";
  commonStore.togglerightside = true;

  const container = document.querySelector(".scrolltopdirectchat");
  if (container) container.scrollTop = container.scrollHeight;

  const containerfluid = document.querySelector(".scrolltopgroupchat");
  if (containerfluid) containerfluid.scrollTop = containerfluid.scrollHeight;
});
</script>
