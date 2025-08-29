<template>
  <div class="status">
    <div class="collapse-block" v-bind:class="{ open: opendoc }">
      <h5 class="block-title" @click="toggledoc()">
        Starred Messages
        <label class="badge badge-outline-dark sm ms-2">2</label>
      </h5>
      <div class="block-content" :style="opendoc ? 'display:block' : 'display:none'">
        <div class="contact-chat p-0 m-0">
          <ul class="str-msg">
            <li v-for="(message, index) in messages" :key="index">
              <div class="d-flex">
                <div
                  class="profile me-4"
                  :style="[
                    { 'background-image': 'url(' +  `${config.public.baseURL}${message.img}` + ')' },
                    styleObject,
                  ]"
                ></div>
                <div class="flex-grow-1">
                  <div class="contact-name">
                    <h5>{{ message.name }}</h5>
                    <h6>{{ message.time }}</h6>
                    <ul class="msg-box">
                      <li>
                        <h5>{{ message.msg }}</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let messages = ref([
  {
    img: "/images/contact/2.jpg",
    name: "Alan josheph",
    time: "01:35 AM",
    msg: "Hi I am Alan,",
  },
  {
    img: "/images/contact/3.jpg",
    name: "Josephin water",
    time: "01:35 AM",
    msg: "Can you help me to find best chat app?.",
  },
]);
const config = useRuntimeConfig();
let opendoc = ref(true);
let styleObject = ref({
  "background-size": "cover",
  "background-position": "center",
  display: "block",
});
function toggledoc() {
  opendoc.value = !opendoc.value;
}
</script>


