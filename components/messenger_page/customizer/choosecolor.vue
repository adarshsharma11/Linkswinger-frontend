<template>

  <div class="color-picker">
    <h5>Choose color</h5>
    <ul class="colors">
      <li
        class="color"
        :class="activecolor == 'style' ? 'active' : ''"
        @click="activeColor('style')"
        data-attr="style"
      ></li>
      <li
        class="color1"
        :class="activecolor == 'style1' ? 'active' : ''"
        @click="activeColor('style1')"
        data-attr="style1"
      ></li>
      <li
        class="color2"
        :class="activecolor == 'style2' ? 'active' : ''"
        @click="activeColor('style2')"
        data-attr="style2"
      ></li>
      <li
        class="color3"
        :class="activecolor == 'style3' ? 'active' : ''"
        @click="activeColor('style3')"
        data-attr="style3"
      ></li>
      <li
        class="color4"
        :class="activecolor == 'style4' ? 'active' : ''"
        @click="activeColor('style4')"
        data-attr="style4"
      ></li>
      <li
        class="color5"
        :class="activecolor == 'style5' ? 'active' : ''"
        @click="activeColor('style5')"
        data-attr="style5"
      ></li>
      <li
        class="color6"
        :class="activecolor == 'style6' ? 'active' : ''"
        @click="activeColor('style6')"
        data-attr="style6"
      ></li>
    </ul>
  </div>
 
</template>

<script setup>
import { useCommonStore } from "@/store/common";
import { useLayoutStore } from "@/store/layout";
import layout from "../../../data/layout.json";

const commonStore = useCommonStore();
const layoutStore = useLayoutStore();
const activecolor = ref(layout.config.color);
const togglerightside = computed(() => commonStore.togglerightside);

const activeColor = (index) => {
  activecolor.value = index;

  const html = document.documentElement;
  const styles = ["style", "style1", "style2", "style3", "style4", "style5", "style6"];

  
  html.classList.remove(...styles);

  if (styles.includes(index)) {
    html.classList.add(index);
  }

  document.querySelector(".app-sidebar")?.classList.add("active");
  document.body.classList.remove("menu-active");
  document.body.classList.add("sidebar-active");

  commonStore.togglerightside = true;
};
</script>