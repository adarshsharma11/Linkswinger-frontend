<template>
    <div class="theme-landing">
        <ProfileUser :user_id = props.user_id></ProfileUser>
    </div>
   <ProfilePhotoVerifyModal/>
      <ProfileMediaUploadModal/>
</template>

<script setup lang="ts">
interface Props {
  user_id: number
}
const props = defineProps<Props>()
</script>
