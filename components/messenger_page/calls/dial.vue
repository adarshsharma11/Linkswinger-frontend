<template>

  <div class="tab-content" id="contactTabContent">
    <div
      class="tab-pane fade"
      :class="activecalltabs == 3 ? 'show active' : ''"
      id="con4"
      role="tabpanel"
      aria-labelledby="con4-tab"
    >
      <ul class="call-log-main">
        <li
          :class="{ active: activeIndex === index }"
          v-for="(user, index) in dialCalls"
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
              <h6><Icon name="lucide:arrow-up-right"></Icon>{{ user.time }}</h6>
            </div>
            <div class="call-status">
              <div class="icon-btn btn-outline-success button-effect btn-sm">
                <Icon
                  :name="user.log_symbol"
                  size="15"
                  height="15"
                ></Icon>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
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

    const dialCalls = computed(() => commonStore.dialCalls);
    const activecalltabs = computed(() => commonStore.activecalltabs);

    const getImgUrl = (path) => {
      return `${config.public.baseURL}/images/${path}`;
    };

    const setActive = (index) => {
      activeIndex.value = index;
    };
</script>