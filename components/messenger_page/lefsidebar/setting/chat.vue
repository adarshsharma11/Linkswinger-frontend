<template>

  <div class="setting-block">
    <div class="block" :class="activesetting == 2 ? 'open' : ''">
      <div class="d-flex">
        <div class="media-body">
          <h3>Chat</h3>
        </div>
        <div class="flex-grow-1">
          <a
            class="icon-btn btn-outline-light btn-sm pull-right previous"
            href="javascript:void(0)"
            @click="activeSettingmenu(0)"
          >
          <Icon name="lucide:chevron-left">                </Icon></a>
        </div>
      </div>
      <ul class="help">
        <li>
                  <h5>Chat Backup</h5>
                  <ul class="switch-list">
                    <li>
                      <label class="switch">
                            <input type="checkbox" checked=""><span class="switch-state"></span>
                          </label>
                      <h5>Auto Backup</h5>
                    </li>
                    <li>
                      <input class="js-switch6" type="checkbox"/>
                      <h5>Include document</h5>
                    </li>
                    <li>
                      <input class="js-switch7" type="checkbox"/>
                      <h5>Include Videos</h5>
                    </li>
                  </ul>
                </li>
        <li>
          <h5>Chat wallpaper</h5>
          <ul class="wallpaper">
            <li
              v-for="item in allwallpaper"
              :key="item.id"
              @click="activeWallpaper(item.id)"
              :style="[
                { 'background-image': 'url(' + getImgUrl(item.img) + ')' },
               
              ]"
            ></li>
          </ul>
        </li>
        <li>
          <h5><a href="javascript:void(0)">Archive all chat</a></h5>
        </li>
        <li>
          <h5><a href="javascript:void(0)"> Clear all chats</a></h5>
        </li>
        <li>
          <h5>
            <a class="font-danger" href="javascript:void(0)"
              >Delete all chats</a
            >
          </h5>
        </li>
      </ul>
    </div>
    <div class="d-flex">
      <div class="flex-grow-1">
        <h3>Chat</h3>
        <h4>Control Your Chat Backup</h4>
      </div>
      <div class="media-right">
        <a
          class="icon-btn btn-outline-light btn-sm pull-right next"
          href="javascript:void(0)"
          @click="activeSettingmenu(2)"
        >
        <Icon name="lucide:chevron-right" size="15" height="15"></Icon></a>
      </div>
    </div>
  </div>

</template>

<script setup>
import { computed } from "vue";
import { useCommonStore } from "@/store/common";
import {useLayoutStore} from "@/store/layout" 
const config = useRuntimeConfig();

const commonStore = useCommonStore();
const layoutStore=useLayoutStore()

const activesetting = computed(() => commonStore.activesetting);
const allwallpaper = computed(() => commonStore.allwallpaper);

const activeSettingmenu = (id) => {
      commonStore.activesetting = id
    };

const activeWallpaper = (index) => {
  commonStore.chatwallpaperIndex = index;
      commonStore.chatwallpapergrandiant = "";
      layoutStore.setWallpaper(index)
};

const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;
</script>