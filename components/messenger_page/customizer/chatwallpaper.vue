<template>

  <div class="chat-wallpaper">
    <h5>Chat wallpaper</h5>
    <ul class="wallpaper">
      <li
        class="bg-color bg-default"
        :class="activewallpaper == 6 ? 'active' : ''"
        @click="activeWallpaper(6)"
      ></li>
      <li
        class="bg-size"
        :class="{ active: activewallpaper === item.id }"
        v-for="item in allwallpaper"
        :key="item.id"
        @click="activeWallpaper(item.id, item.img)"
        :style="[
          { 'background-image': 'url(' + getImgUrl(item.img) + ')' },
          styleObject,
        ]"
      ></li>
      <br />
      <li
        class="bg-color grediant-1"
        :class="activewallpaper == 7 ? 'active' : ''"
        @click="activeWallpaper(7)"
      ></li>
      <li
        class="bg-color grediant-2"
        :class="activewallpaper == 8 ? 'active' : ''"
        @click="activeWallpaper(8)"
      ></li>
      <li
        class="bg-color grediant-3"
        :class="activewallpaper == 9 ? 'active' : ''"
        @click="activeWallpaper(9)"
      ></li>
      <li
        class="bg-color grediant-4"
        :class="activewallpaper == 10 ? 'active' : ''"
        @click="activeWallpaper(10)"
      ></li>
      <li
        class="bg-color grediant-5"
        :class="activewallpaper == 11 ? 'active' : ''"
        @click="activeWallpaper(11)"
      ></li>
      <li
        class="bg-color grediant-6"
        :class="activewallpaper == 12 ? 'active' : ''"
        @click="activeWallpaper(12)"
      ></li>
    </ul>
  </div>

</template>

<script setup>
import { useCommonStore } from "@/store/common";
import { useLayoutStore } from "@/store/layout";
const config = useRuntimeConfig();

const commonStore = useCommonStore();
const layoutStore = useLayoutStore();

const activewallpaper = ref(6);
const styleObject = ref({
  "background-size": "cover",
  "background-position": "center center",
  display: "block",
});

const allwallpaper = computed(() => commonStore.allwallpaper);
const chatwallpaperIndex = computed(() => commonStore.chatwallpaperIndex);


watchEffect(() => {
  activewallpaper.value = chatwallpaperIndex.value === 0 ? 6 : chatwallpaperIndex.value;
});


const gradientStyles = {
  6: "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(239, 247, 254)))",
  7: "linear-gradient(359.3deg, rgba(28, 157, 234, 0.1) 1%, rgba(187, 187, 187, 0) 70.9%)",
  8: "radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%)",
  9: "linear-gradient(109.6deg, rgb(223, 234, 247) 11.2%, rgb(244, 248, 252) 91.1%)",
  10: "linear-gradient(-109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%)",
  11: "radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%)",
  12: "radial-gradient(circle at 10% 20%, rgb(226, 240, 254) 0%, rgb(255, 247, 228) 90%)",
};


const activeWallpaper = (index) => {
  activewallpaper.value = index;
  commonStore.chatwallpaperIndex = index === 6 ? 0 : index;
  commonStore.chatwallpapergrandiant = gradientStyles[index] || "";
  layoutStore.setWallpaper(index === 6 ? 0 : index);
};

const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;
</script>