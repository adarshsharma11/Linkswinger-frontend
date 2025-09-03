<template>

  <div class="contact-details">
    <div class="row">
      <div class="col">
        <div class="d-flex left">
          <div class="media-left">
            <div
              v-if="currentChat.img"
              class="profile online menu-trigger"
              :style="[
                {
                  'background-image': 'url(' + getImgUrl(currentChat.img )+ ')',
                },
                styleObject,
              ]"
            ></div>
            <div
              v-if="!currentChat.img"
              class="profile"
              :class="currentChat.profile ? currentChat.profile : ''"
            >
              <span v-if="currentChat.profile_tag">{{
                currentChat.profile_tag
              }}</span>
            </div>
          </div>
          <div class="flex-grow-1">
            <h5>{{ currentChat.name }}</h5>
            <div class="badge badge-success">Active</div>
          </div>
          <div class="media-right">
            <ul>
              <li>
                <a
                  class="icon-btn btn-light button-effect mute"
                  href="javascript:void(0)"
                  @click="showvolume = !showvolume"
                  ><span v-if="showvolume" class="effect-wave"></span
                  ><i
                    class="fa"
                    :class="showvolume ? 'fa-volume-up' : 'fa-volume-up off'"
                  ></i
                ></a>
              </li>
              <li>
                <a
                  class="icon-btn btn-light search search-right"
                  href="javascript:void(0)"
                >
                <Icon name="lucide:search" size="15" height="15"></Icon
                  ></a>
                <form class="form-inline search-form">
                  <div class="form-group">
                    <input
                      class="form-control-plaintext"
                      type="search"
                      placeholder="Search.."
                    />
                    <div class="icon-close close-search"></div>
                  </div>
                </form>
              </li>
              <li>
                <a
                  class="icon-btn btn-light button-effect mobile-sidebar"
                  @click="backtochat()"
                  href="javascript:void(0)"
                  ><Icon name="lucide:chevron-left" size="15" height="15"></Icon
                    ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col">
        <ul class="calls text-end">
          <li>
            <a
              class="icon-btn btn-light button-effect"
              title="Start Audio Conference"
              href="javascript:void(0)"
              data-tippy-content="Start Audio Conference"
             data-bs-toggle="modal" data-bs-target="#confercall"
              ><Icon name="lucide:phone" size="15" height="15"></Icon
                ></a>
          </li>
          <li>
            <a
              class="icon-btn btn-light button-effect"
             
              title="Start Video Conference"
              href="javascript:void(0)"
              data-tippy-content="Start Video Conference"
            data-bs-toggle="modal" data-bs-target="#confvideocl"
              ><Icon name="lucide:video" size="15" height="15"></Icon
                ></a>
          </li>
        </ul>
      </div>
    </div>


  </div>

</template>

<script setup>
import {useGroupChatStore} from "@/store/groupchat"
import { useCommonStore } from "@/store/common";
const config = useRuntimeConfig();
const showvolume = ref(true);
const currentchat = ref([]);
    const styleObject = ref({
      "background-size": "cover",
      "background-position": "center",
      display: "block",
    })

    const commonStore = useCommonStore();
const chatStore = useGroupChatStore();


const currentChat = computed(() => {
  currentchat.value = chatStore.currentChat;
  return currentchat.value;
});


const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;

const showVedioModal = (vedioComponent) => {
      vedioComponent.value?.show();
    };

    const backtochat = () => {
      document.querySelector(".sidebar-toggle").classList.remove("mobile-menu");
    };

    const togglerightside = () => {
      commonStore.togglerightside = !commonStore.togglerightside;
      if (!commonStore.togglerightside) {
        document.getElementById("body").classList.remove("sidebar-active");
        document.getElementById("body").classList.add("main-page");
      } else {
        document.getElementById("body").classList.remove("menu-active", "main-page");
        document.getElementById("body").classList.add("sidebar-active");
      }
    };

    const showAudioModal = (audioComponent) => {
      audioComponent.value?.show();
    };
</script>