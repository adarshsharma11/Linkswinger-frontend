<template>
  <div class="w-100 bg-theme-color fixed-top" style="height: 70px;">
    <div class="marquee" v-if="text.length !== 0">
      <span class="text-black" :style="{ '--scroll-speed': scrollSpeed + 's' }" v-html="text"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string
  speed?: number
}
const props = defineProps<Props>()
const scrollSpeed = ref(props.speed ?? 100) 
</script>

<style scoped>
.marquee {
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
}

.marquee span {
  display: inline-block;
  padding-left: 100%;
  animation: scroll var(--scroll-speed) linear infinite;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}

@keyframes scroll {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>