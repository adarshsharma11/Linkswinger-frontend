<template>

  <div
    class="settings-tab dynemic-sidebar custom-scroll"
    :class="{ active: activesidebar === 6 }"
    id="settings"
  >
    <div class="theme-title">
      <div class="d-flex">
        <div>
          <h2>Settings</h2>
          <h4>Change your app settings.</h4>
        </div>
        <div class="flex-grow-1 text-end">
          <a
            class="icon-btn btn-outline-light btn-sm close-panel"
            href="javascript:void(0)"
            @click="activemenu(0)"
          >
          <Icon name="lucide:x" size="15" height="15"></Icon>
          </a>
        </div>
      </div>
      <div class="profile-box">
        <div class="d-flex" :class="{ open: edit }">
          <div
            class="profile"
            :style="[
              { 'background-image': `url(${getImgUrl('contact/2.jpg')})` },
              styleObject,
            ]"
          ></div>
          <div class="details">
            <h5>Josephin Water</h5>
            <h6>Alabama, USA</h6>
          </div>
          <div class="details edit">
            <form class="form-radious form-sm">
              <div class="form-group mb-2">
                <input class="form-control" type="text" name="username" value="Josephin Water" />
              </div>
              <div class="form-group mb-0">
                <input class="form-control" type="text" name="address" value="Alabama, USA" />
              </div>
            </form>
          </div>
          <div class="flex-grow-1">
            <a
              class="icon-btn btn-outline-light btn-sm pull-right edit-btn"
              href="javascript:void(0)"
              @click="edituser"
            >
              <Icon name="lucide:pen" size="15" height="15"></Icon>
            </a>
          </div>
        </div>
      </div>
    </div>
    <MessengerPageLefsidebarSettingAccount/>
    <MessengerPageLefsidebarSettingChat/>
    <MessengerPageLefsidebarSettingIntegratin/>
    <MessengerPageLefsidebarSettingHelp/>
  </div>

</template>

<script setup>
import { ref, computed } from "vue";
import { useCommonStore } from "@/store/common";

const config = useRuntimeConfig();
const commonStore = useCommonStore();
const edit = ref(false);
const styleObject = ref({
  "background-size": "cover",
  "background-position": "center",
  display: "block",
});

const activesidebar = computed(() => commonStore.activesidebar);

const edituser = () => {
  edit.value = !edit.value;
};

const activemenu = (id) => {
  commonStore.activesidebar = id;
};

const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;
</script>
