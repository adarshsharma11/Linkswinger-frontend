<template>
   <video-call :is_video="false"/>
</template>
<script setup>
import userdetails from '~/middleware/userdetails';
import validatecall from '~/middleware/validatecall';
useHead({
    title: "LinkSwinger – Discover Like-Minded Connections"
})
definePageMeta({
    middleware: [userdetails, validatecall],
})
</script>