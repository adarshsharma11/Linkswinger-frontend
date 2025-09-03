import { defineStore } from "pinia";
import { reactive } from "vue";
import Layout from "@/data/layout.json";

export const useLayoutStore = defineStore("layout", () => {
  const layout = reactive(Layout.config);

  const setLayoutType = (payload) => {
    if (payload === "") {
      document.body.classList.remove("rtl");
    } else {
      document.body.classList.add(payload);
    }
  };

  const setLayout = (payload) => {
    if (payload === "") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add(payload);
    }
  };

  const setSidebarLayout = (payload) => {
    layout.sidebar_layout = payload;
  };

  const setSidebarSetting = (payload) => {
    layout.sidebar_setting = payload;
  };

  const setColor = (payload) => {
    layout.color = payload;
  };

  const setWallpaper = (payload) => {
    layout.wallpaper = payload;
  };

  return {
    layout,
    setLayoutType,
    setLayout,
    setSidebarLayout,
    setSidebarSetting,
    setColor,
    setWallpaper,
  };
});
