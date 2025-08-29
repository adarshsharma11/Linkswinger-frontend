<template>

  <div
    class="tab-pane fade"
    :class="activechat == 3 ? 'show active' : ''"
    id="contact"
    role="tabpanel"
    aria-labelledby="contact-tab"
  >
    <ul class="contact-log-main">
      <li
        :class="{ active: activeIndex === index }"
        v-for="(contact, index) in contacts"
        :key="contact.id"
        @click="setActive(index)"
      >
        <div class="contact-box">
          <div
            class="profile"
            :class="contact.status"
            :style="[
              { 'background-image': 'url(' + getImgUrl(contact.img ) + ')' },
              styleObject,
            ]"
          ></div>
          <div class="details">
            <h5>{{ contact.name }}</h5>
            <h6>{{ contact.phone }}</h6>
          </div>
          <div class="contact-action">
            <div class="icon-btn btn-outline-primary btn-sm button-effect">
              <Icon name="lucide:phone" size="15" height="15"></Icon>
            </div>
            <div class="icon-btn btn-outline-success btn-sm button-effect">
              <Icon name="lucide:video" size="15" height="15"></Icon>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script setup>
import { useCommonStore } from "@/store/common";
const config = useRuntimeConfig();
    let activeIndex = ref(1);
    let styleObject = {
      "background-size": "cover",
      "background-position": "center",
      display: "block",
    };
    let commonStore = useCommonStore();

    const contacts = computed(() => commonStore.ContactList);
    const activechat = computed(() => commonStore.activechat);

    const getImgUrl = (path) => `${config.public.baseURL}/images/${path}`;
    const setActive = (index) => {
      activeIndex.value = index;
    };
</script>

