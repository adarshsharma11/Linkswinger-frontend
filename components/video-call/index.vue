<script setup lang="ts">
import VideoCallContent from './video-call-content.vue';

interface Props {
  is_video: boolean,
}
const props = defineProps<Props>()

</script>

<template>
    <div class="theme-landing">
        <VideoCallContent :is_video="props.is_video"/>
        <CommonFooter/>
        </div>
</template>