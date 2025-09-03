import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import Contact from "@/data/contact.json";
import Logs from "@/data/chatcontent.json";
import layout from "@/data/layout.json";
import wallpaper from "@/data/wallpapers.json";

export const useCommonStore = defineStore("common", () => {
 
  const activechatType = ref(1);
  const activechat = ref(1);
  const activecall = ref(1);
  const activecalltabs = ref(1);
  const activeTabs = ref(false);
  const toggleleftside = ref(layout.config.sidebar_setting);
  const ContactList = reactive(Contact.contacts);
  const allCalls = reactive(Contact.allCalls);
  const allwallpaper = reactive(wallpaper.wallpaper);
  const receivedCalls = reactive(Contact.received_Dail_Calls);
  const dialCalls = reactive(Contact.received_Dail_Calls);
  const missedCalls = reactive(Contact.missedCalls);
  const calllogs = reactive(Logs.callcontent);
  const showsticker = ref(false);
  const showemogi = ref(false);
  const showcontactcontent = ref(false);
  const showprofilemenu = ref(false);
  const activesidebar = ref(0);
  const activesetting = ref(0);
  const activesharedmedia = ref(1);
  const activerightsidebarmenu = ref(0);
  const togglerightside = ref(true);
  const opencustomizer = ref(false);
  const chatwallpaperIndex = ref(layout);
  const chatwallpaper = ref("");
  const chatwallpapergrandiant = ref("");

 
  function setActiveChat(type) {
    activechat.value = type;
  }

  function setActiveChatType(type) {
    activechatType.value = type;
    showprofilemenu.value = false;
    showsticker.value = false;
    showemogi.value = false;
    showcontactcontent.value = false;
  }

  return {
    activechatType,
    activechat,
    activecall,
    activecalltabs,
    activeTabs,
    toggleleftside,
    ContactList,
    allCalls,
    allwallpaper,
    receivedCalls,
    dialCalls,
    missedCalls,
    calllogs,
    showsticker,
    showemogi,
    showcontactcontent,
    showprofilemenu,
    activesidebar,
    activesetting,
    activesharedmedia,
    activerightsidebarmenu,
    togglerightside,
    opencustomizer,
    chatwallpaperIndex,
    chatwallpaper,
    chatwallpapergrandiant,
    setActiveChat,
    setActiveChatType,
  };
});
