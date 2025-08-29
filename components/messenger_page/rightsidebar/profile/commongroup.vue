<template>

  <div class="status">
    <div class="collapse-block" v-bind:class="{ open: opendoc }">
      <h5 class="block-title" @click="toggledoc()">
        Common groups
        <label class="badge badge-outline-dark sm ms-2">3</label>
      </h5>
      <div
        class="block-content"
        :style="opendoc ? 'display:block' : 'display:none'"
      >
        <ul class="group-main">
          <li v-for="(group, index) in groups" :key="index">
            <div class="group-box">
              <div
                class="profile"
                :style="[
                  { 'background-image': 'url(' + `${config.public.baseURL}${group.img}` + ')' },
                  styleObject,
                ]"
              ></div>
              <div class="details">
                <h5>{{ group.groupname }}</h5>
                <h6>{{ group.group }}</h6>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script setup>
let groups= ref([
        {
          img: "/images/avtar/teq.jpg",
          groupname: "Tech Ninjas",
          group: "johan, deo, Sufiya Elija, Pabelo & you",
        },
        {
          img: "/images/avtar/family.jpg",
          groupname: "Family Ties",
          group: "Mukrani, deo & you",
        },
      ])
      const config = useRuntimeConfig();
     let opendoc=ref(true)
     let styleObject=ref({
        "background-size": "cover",
        "background-position": "center",
        display: "block",
      })
      function toggledoc() {
      opendoc.value = !opendoc.value;
    }
</script>

