<template>

  <div
    class="status-tab custom-scroll dynemic-sidebar"
    :class="activesidebar == 1 ? 'active' : ''"
    id="status"
  >
    <div class="my-status-box">
      <div class="status-content">
        <div class="d-flex">
          <div class="img-status">
            <div
              class="user-status bg-size"
              :style="[
                {
                  'background-image':
                    'url(' + getImgUrl('avtar/girls.jpg') + ')',
                },
                styleObject,
              ]"
            ></div>
            <div class="upload-img">
              <input type="file" />
            </div>
          </div>
          <div class="flex-grow-1">
            <h3>my status</h3>
            <p>tap to add status Update</p>
          </div>
          <div>
            <a
              class="icon-btn btn-outline-light btn-sm close-panel"
              @click="activemenu(0)"
              ><Icon name="lucide:x" size="15" height="15"></Icon
            ></a>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-status-box">
      <div class="theme-title">
        <h3>Recent Update</h3>
      </div>
      <div
        class="status-content"
        v-for="user in status"
        :key="user.id"
      >
        <ul>
          <li class="user-status">
            <a
              class="lightbox img-status status"
              :href="`#${user.id}`"
              :style="[
                {
                  'background-image': 'url(' + getImgUrl(user.large_img) + ')',
                },
                styleObject,
              ]"
            >
            </a>
            <div class="lightbox-target" :id="user.id">
              <img :src="getImgUrl(user.large_img)" alt="status" /><a
                class="lightbox-close"
                href="#"
              ></a>
            </div>
          </li>
          <li>
            <h5>{{ user.name }}</h5>
            <p>{{ user.time }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useCommonStore} from "@/store/common"
import {useSidebarStore} from "@/store/sidebar"

let store=useCommonStore()
let sidebarStore=useSidebarStore()
const config = useRuntimeConfig();

let status=sidebarStore.statusData
const activesidebar = computed(() => store.activesidebar);

let styleObject= ref({
        "background-size": "cover",
        "background-position": "center center",
        display: "block",
      })
      const activemenu = (id) => {
  store.activesidebar = id;
};
const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;
   

</script>
