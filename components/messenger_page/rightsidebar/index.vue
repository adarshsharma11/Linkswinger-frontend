<template>

  <aside class="app-sidebar" :class="togglerightside ? 'active' : ''">
    <div class="apps">
      <ul class="apps-ul">
        <div class="tab-content">
          <MessengerPageRightsidebarTodo/>
          <MessengerPageRightsidebarFiles/>
          <MessengerPageRightsidebarNotes/>
          <MessengerPageRightsidebarReminder/>
        </div>
      </ul>
    </div>
    <div class="app-list">
      <ul class="app-list-ul custom-scroll">
        <li class="title apps-toggle" @click="close()">
          <Icon name="lucide:grid-2x2" size=20></Icon>
          <h5>Apps</h5>
        </li>
        <li>
          <a
            class="icon-btn btn-outline-success btn-sm button-effect"
            :class="activerightsidebarmenu == 1 ? 'active' : ''"
            href="javascript:void(0);"
            @click="activesidemenu(1)"
            ><Icon name="lucide:file" size="15" height="15"></Icon
          ></a>
          <h5>Files</h5>
        </li>
        <li>
          <a
            class="icon-btn btn-outline-primary btn-sm button-effect"
            :class="activerightsidebarmenu == 2 ? 'active' : ''"
            href="javascript:void(0);"
            @click="activesidemenu(2)"
            ><Icon name="lucide:book" size="15" height="15"></Icon
          ></a>
          <h5>Notes</h5>
        </li>
        <li>
          <a
            class="icon-btn btn-outline-danger btn-sm button-effect"
            :class="activerightsidebarmenu == 3 ? 'active' : ''"
            href="javascript:void(0);"
            @click="activesidemenu(3)"
            ><Icon name="lucide:list" size="15" height="15"></Icon
          ></a>
          <h5>Todo</h5>
        </li>
        <li>
          <a
            class="icon-btn btn-outline-warning btn-sm button-effect"
            :class="activerightsidebarmenu == 4 ? 'active' : ''"
            href="javascript:void(0);"
            @click="activesidemenu(4)"
            ><Icon name="lucide:clock" size="15" height="15"></Icon
          ></a>
          <h5>Reminder</h5>
        </li>
        <li class="close-app">
          <a
            class="icon-btn btn-danger"
            href="javascript:void(0)"
            @click="close()"
            ><Icon name="lucide:x" size="15" height="15"></Icon
          ></a>
          <h5>close</h5>
        </li>
      </ul>
    </div>
  </aside>

</template>

<script setup>
import { MessengerPageRightsidebarFiles } from "#components";
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();
const activerightsidebarmenu = computed(() => commonStore.activerightsidebarmenu);
const togglerightside = computed(() => commonStore.togglerightside);

const activesidemenu = (id) => {
  commonStore.activerightsidebarmenu = id;
  if (process.client) {
    const width = window.innerWidth;
    if (width > 1650) {
      document.getElementById("content")?.classList.remove("small-sidebar");
    }
  }
};

const close = () => {
  commonStore.togglerightside = false;
  const body = document.getElementById("body");

  if (!body) return; 

  if (!commonStore.togglerightside) {
    body.classList.remove("sidebar-active");
    body.classList.add("main-page");
  } else {
    body.classList.remove("main-page");
    body.classList.add("sidebar-active");
  }
};
</script>
