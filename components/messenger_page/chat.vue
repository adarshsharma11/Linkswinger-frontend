<template>
  
    <div class="chitchat-main" :class="togglerightside ? 'small-sidebar': ''" id="content">
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
          <div class="wrap emojis-main"><a class="icon-btn btn-outline-primary button-effect me-3 toggle-sticker outside" @click="openSticker()" href="javascript:void(0)">
              <svg id="Layer_1" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="2158px" height="2148px" viewBox="0 0 2158 2148" enable-background="new 0 0 2158 2148" space="preserve">
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#000000" stroke-width="60" stroke-miterlimit="10" d="M699,693                        c0,175.649,0,351.351,0,527c36.996,0,74.004,0,111,0c18.058,0,40.812-2.485,57,1c11.332,0.333,22.668,0.667,34,1                        c7.664,2.148,20.769,14.091,25,20c8.857,12.368,6,41.794,6,62c0,49.329,0,98.672,0,148c175.649,0,351.351,0,527,0                        c0-252.975,0-506.025,0-759C1205.692,693,952.308,693,699,693z"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M886,799c59.172-0.765,93.431,25.289,111,66c6.416,14.867,14.612,39.858,9,63                        c-2.391,9.857-5.076,20.138-9,29c-15.794,35.671-47.129,53.674-90,63c-20.979,4.563-42.463-4.543-55-10                        c-42.773-18.617-85.652-77.246-59-141c10.637-25.445,31.024-49,56-60c7.999-2.667,16.001-5.333,24-8                        C877.255,799.833,882.716,801.036,886,799z"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1258,799c59.172-0.765,93.431,25.289,111,66c6.416,14.867,14.612,39.858,9,63                        c-2.391,9.857-5.076,20.138-9,29c-15.794,35.671-47.129,53.674-90,63c-20.979,4.563-42.463-4.543-55-10                        c-42.773-18.617-85.652-77.246-59-141c10.637-25.445,31.024-49,56-60c7.999-2.667,16.001-5.333,24-8                        C1249.255,799.833,1254.716,801.036,1258,799z"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1345,1184c-0.723,18.71-11.658,29.82-20,41c-18.271,24.489-50.129,37.183-83,47                        c-7.333,1-14.667,2-22,3c-12.013,2.798-33.636,5.15-44,3c-11.332-0.333-22.668-0.667-34-1c-15.332-3-30.668-6-46-9                        c-44.066-14.426-80.944-31.937-110-61c-22.348-22.353-38.992-45.628-37-90c0.667,0,1.333,0,2,0c9.163,5.585,24.723,3.168,36,6                        c26.211,6.583,54.736,7.174,82,14c34.068,8.53,71.961,10.531,106,19c9.999,1.333,20.001,2.667,30,4c26.193,6.703,54.673,7.211,82,14                        C1304.894,1178.445,1325.573,1182.959,1345,1184z"></path>
                  <polygon fill-rule="evenodd" clip-rule="evenodd" points="668.333,1248.667 901.667,1482 941.667,1432 922.498,1237.846                         687,1210.667 "></polygon>
              </svg></a>
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
            <a class="icon-btn btn-outline-primary button-effect me-3 ms-3" href="javascript:void(0)"><Icon name="lucide:mic" size="15" height="15"></Icon></a>
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
import emogi from '../../data/emogi.json';
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
