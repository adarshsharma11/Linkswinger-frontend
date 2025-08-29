<template>

  <div class="tab-pane" :class="activerightsidebarmenu == 1 ? 'active' : ''">
    <li id="files">
      <div class="theme-title">
        <div class="d-flex">
          <div>
            <h2>Files</h2>
            <h4>Shared Media</h4>
          </div>
          <div class="flex-grow-1 text-end">
            <a
              class="icon-btn btn-sm btn-outline-light close-apps"
              href="javascript:void(0)"
              @click="close(0)"
              ><Icon name="lucide:x" size="15" height="15"></Icon
            ></a>
          </div>
        </div>
      </div>
      <div class="theme-tab">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link button-effect"
              :class="activesharedmedia == 1 ? 'active' : ''"
              data-toggle="pill"
              href="javascript:void(0)"
              @click="activemedia(1)"
              >Media</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link button-effect"
              :class="activesharedmedia == 2 ? 'active' : ''"
              data-toggle="pill"
              href="javascript:void(0)"
              @click="activemedia(2)"
              >Link</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link button-effect"
              :class="activesharedmedia == 3 ? 'active' : ''"
              data-toggle="pill"
              href="javascript:void(0)"
              @click="activemedia(3)"
              >Docs</a
            >
          </li>
        </ul>
      </div>
      <div class="file-tab">
        <div class="tab-content custom-scroll">
          <div
            class="tab-pane"
            :class="activesharedmedia == 1 ? 'active show' : ''"
            id="tab1"
          >
            <MessengerPageRightsidebarFilesMedia/>
          </div>
          <MessengerPageRightsidebarFilesLink/>
          <div
            class="tab-pane fade"
            :class="activesharedmedia == 3 ? 'active show' : ''"
            id="tab3"
          >
            <MessengerPageCommonDocumentslist/>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script setup>
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();
const activesharedmedia = computed(() => commonStore.activesharedmedia);
const activerightsidebarmenu = computed(() => commonStore.activerightsidebarmenu);

const activemedia = (id) => {
  commonStore.activesharedmedia = id; 
};

const close = (id) => {
  commonStore.activerightsidebarmenu = id;
  document.getElementById("content")?.classList.add("small-sidebar");
};

</script>