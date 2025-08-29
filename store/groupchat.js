import { defineStore } from 'pinia';
import Users from '../../data/groupchat.json';

export const useGroupChatStore = defineStore('groupChat', () => {
 
  const users = ref(Users.data);
  const chats = ref(Users.chat);
  const groupchatuser = ref(Users.groupchatusers);
  const activeuser = ref(0);
  const typing = ref(false);

  const currentChat = computed(() => {
    const chat = chats.value.find((chat) => chat.id === activeuser.value);
    const user = users.value.find((user) => user.id === activeuser.value);
    return { ...user, chat };
  });

  
  const setActiveuser = (payload) => {
    activeuser.value = payload;
    const chatExists = chats.value.find((chat) => chat.id === payload);
    if (!chatExists) {
      const user = users.value.find((user) => user.id === payload);
      if (user) {
        user.profile = 'profile online';
      }
      chats.value.push({
        id: payload,
        users: [0, payload],
        lastMessageTime: 'Last seen yesterday 14:14',
        messages: [],
      });
    }
  };

  const addSticker = (payload) => {
    const today = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).toLowerCase();

    const chat = chats.value.find((chat) => chat.id === activeuser.value);
    if (chat) {
      chat.messages.push({
        sender: 0,
        time: today,
        stickerpath: payload,
        sticker: true,
      });
    }
  };

  const addChat = (payload) => {
    const today = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).toLowerCase();

    const chat = chats.value.find((chat) => chat.id === activeuser.value);
    if (chat) {
      chat.messages.push({
        sender: 0,
        time: today,
        text: payload,
        lastmsg: true,
      });
    }
    typing.value = true;

   
    setTimeout(() => addChatResponse(), 1000);
  };

  const addChatResponse = () => {
    const today = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).toLowerCase();

    const chat = chats.value.find((chat) => chat.id === activeuser.value);
    if (chat) {
      setTimeout(() => {
        chat.messages.push({
          sender: 1,
          img: 'contact/1.jpg',
          lastmsg: true,
          time: today,
          text: 'Hi, Sorry I am busy right now, I will text you later',
        });
        typing.value = false;
      }, 3000);
    }
  };

  return {
    users,
    chats,
    groupchatuser,
    activeuser,
    typing,
    currentChat,
    setActiveuser,
    addSticker,
    addChat,
    addChatResponse,
  };
});
