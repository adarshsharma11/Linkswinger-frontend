<template>
 
  <div class="contact-profile">
    <div class="theme-title">
      <div class="d-flex">
        <div>
          <h2>Profile</h2>
          <h4>Personal Information</h4>
        </div>
        <div class="flex-grow-1 text-end">
          <a
            class="icon-btn btn-outline-light btn-sm close-profile ms-3"
            href="javascript:void(0)"
          >
            <Icon name="lucide:x" size="15" height="15" @click="close()" />
          </a>
        </div>
      </div>
    </div>
    <div class="details">
      <div
        class="contact-top"
        :style="[
          {
            'background-image': 'url(' + getImgUrl(currentChat.img) + ')',
          },
          styleObject,
        ]"
      ></div>
      <div class="name">
        <h3>{{ currentChat.name }}</h3>
        <h6>Add Description</h6>
      </div>
      <ul class="medialogo">
        <li>
          <a class="icon-btn btn-danger button-effect" href="https://www.google.com/">
            <i class="fa fa-google"></i>
          </a>
        </li>
        <li>
          <a class="icon-btn btn-primary button-effect" href="https://twitter.com/">
            <i class="fa fa-twitter"></i>
          </a>
        </li>
        <li>
          <a class="icon-btn btn-facebook button-effect" href="https://www.facebook.com/">
            <i class="fa fa-facebook-f"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup>
import { ref, computed } from "vue";
import { useDirectChatStore } from "@/store/chat";

const currentchat = ref([]);
const config = useRuntimeConfig();

const styleObject = ref({
  "background-size": "cover",
  "background-position": "center",
  display: "block",
});

const chatStore = useDirectChatStore();
const currentChat = computed(() => {
  currentchat.value = chatStore.currentChat;
  return currentchat.value;
});

const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

const close = async () => {
  document.querySelector(".app-sidebar")?.classList.add("active");
  await nextTick(); 
  const body = document.getElementById("body") || document.body; 
  if (body) {
    body.classList.remove("menu-active");
    body.classList.add("sidebar-active");
  }
  chatStore.togglerightside = true; 
};
</script>
