import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import Users from "../../data/directchat.json";

export const useDirectChatStore = defineStore("directChat", () => {
  
  const state = reactive({
    users: Users.data,
    chats: Users.chat,
    activeuser: 0,
    typing: false,
  });

 
  const currentChat = computed(() => {
    const chats = state.chats.find((chat) => chat.id === state.activeuser);
    const users = state.users.find((user) => user.id === state.activeuser);
    return { ...users, chat: chats };
  });
  let currentChatData = ref(currentChat.value)

  
  function setActiveuser(payload) {
    state.activeuser = payload;

    const chats = state.chats.find((chat) => chat.id === payload);
    if (!chats) {
      const user = state.users.find((user) => user.id === payload);
      if (user) {
        user.profile = "profile online";
      }
      state.chats.push({
        id: payload,
        users: [0, payload],
        lastMessageTime: "Last seen yesterday 14:14",
        messages: [],
      });
    }
  }

  function addSticker(payload) {
    const today = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const chat = state.chats.find((chat) => chat.id === state.activeuser);
    if (chat) {
      chat.messages.push({
        sender: 0,
        time: today.toLowerCase(),
        stickerpath: payload,
        sticker: true,
      });
    }
  }

  function addChat(payload) {
    const today = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const chat = state.chats.find((chat) => chat.id === state.activeuser);
    if (chat) {
      chat.messages.push({
        sender: 0,
        time: today.toLowerCase(),
        text: payload,
        lastmsg: true,
      });
      state.typing = true;
    }

    setTimeout(() => {
      addChatResponse();
    }, 1000);
  }

  function addChatResponse() {
    const today = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const chat = state.chats.find((chat) => chat.id === state.activeuser);
    const user = state.users.find((user) => user.id === state.activeuser);

    if (chat && user) {
      setTimeout(() => {
        chat.messages.push({
          sender: 1,
          lastmsg: true,
          time: today.toLowerCase(),
          text: `Hi I am ${user.name}, Sorry I am busy right now, I will text you later.`,
        });
        state.typing = false;
      }, 3000);
      
      user.profile = "profile online";
      user.online = true;
    }
  }

  return {
    state,
    currentChat,
    setActiveuser,
    addSticker,
    addChat,
    addChatResponse,
    currentChatData
  };
});
