<template>
  <div class="media-gallery portfolio-section grid-portfolio">
    <div class="collapse-block open">
      <template v-for="(item, index) in medias" :key="index">
        <h5 class="block-title" @click="toggle(index)">
          {{ item.date }}
          <label class="badge badge-primary sm ms-2">{{ item.badge }}</label>
        </h5>
        <div class="block-content" :style="[active(index) ? { display: 'none' } : { display: '' }]">
          <div class="row share-media zoom-gallery">
            <div
              class="col-4"
              :class="data.perentClass"
              v-for="(data, childIndex) in item.children"
              :key="childIndex"
            >
              <div
                :class="[
                  data.mediaclass==true ? 'media-big' : 'media-small',
                  'isotopeSelector filter',
                ]"
                @click="showImg(getImageIndex(data.img))"
              >
                <div class="overlay">
                  <div class="border-portfolio">
                    <div class="overlay-background">
                      <i class="ti-plus" aria-hidden="true"></i>
                    </div>
                    <img
                      class="img-fluid bg-img"
                      :src="getImgUrl(data.img)"
                      alt="portfolio-image"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="data.class"
                :class="['media-small', data.class]"
                @click="showImg(getImageIndex(data.img1))"
              >
                <div class="overlay">
                  <div class="border-portfolio">
                    <div class="overlay-background">
                      <i class="ti-plus" aria-hidden="true"></i>
                    </div>
                    <img
                      class="img-fluid bg-img"
                      :src="getImgUrl(data.img1)"
                      alt="portfolio-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <ClientOnly>
        <vue-easy-lightbox
          :index="indexRef"
          :visible="visible"
          :imgs="lightboxRef"
          @hide="handleHide"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useSidebarStore } from "@/store/sidebar";

let store = useSidebarStore();
const lightboxRef = ref([]);
const visible = ref(false);
const indexRef = ref(0);
const activeIndex = ref([]);
const config = useRuntimeConfig();

const medias = computed(() => store.mediaDatas);

function showImg(index) {
  indexRef.value = index;
  visible.value = true;
}

function handleHide() {
  visible.value = false;
}

const getImgUrl = (path) => {
  return path ? `${config.public.baseURL}/images/${path}` : "";
};
const active = (index) => {
  return activeIndex.value.includes(index);
};

const toggle = (id) => {
  const index = activeIndex.value.indexOf(id);
  if (index >= 0) {
    activeIndex.value.splice(index, 1);
  } else {
    activeIndex.value.push(id);
  }
};

const getImageIndex = (img) => {
  return lightboxRef.value.findIndex((item) => item.src === getImgUrl(img));
};

onMounted(() => {
  lightboxRef.value = store.mediaDatas.flatMap((item) =>
    item.children.flatMap((child) => [
      { src: getImgUrl(child.img) },
      ...(child.img1 ? [{ src: getImgUrl(child.img1) }] : []),
    ])
  );
});
</script>
