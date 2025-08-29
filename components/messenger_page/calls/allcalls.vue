<template>

  <div>
    <li
      :class="{ active: activeIndex === index }"
      v-for="(user, index) in allCalls"
      :key="user.id"
      @click="setActive(index)"
    >
      <div class="call-box">
        <div
          class="profile"
          :class="user.status"
          :style="[
            { 'background-image': 'url(' + getImgUrl(user.img) + ')' },
            styleObject,
          ]"
        ></div>
        <div class="details">
          <h5>{{ user.name }}</h5>
          <h6>
            <Icon
              v-bind:class="{ missed: user.misscall }"
              :name="user.log"
            ></Icon
            >{{ user.time }}
          </h6>
        </div>
        <div class="call-status">
          <div
            class="icon-btn button-effect btn-sm"
            :class="
              user.misscall ? 'btn-outline-danger' : 'btn-outline-success'
            "
          >
            <Icon :name="user.log_symbol" size="15" height="15"></Icon>
          </div>
        </div>
      </div>
    </li>
  </div>

</template>

<script setup>
import { useCommonStore } from "@/store/common";
const config = useRuntimeConfig();
const commonStore = useCommonStore();
const activeIndex = ref(0);

    const styleObject = {
      "background-size": "cover",
      "background-position": "center",
      display: "block",
    };
    const allCalls = computed(() => commonStore.allCalls);
    const activecalltabs = computed(() => commonStore.activecalltabs);
    const getImgUrl = (path) => {
      return `${config.public.baseURL}/images/${path}`;
    };
    const setActive = (index) => {
      activeIndex.value = index;
    };
</script>
