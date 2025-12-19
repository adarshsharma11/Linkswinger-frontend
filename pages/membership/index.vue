<template>
   <Membership />
</template>
<script setup lang="ts">
const user_store = userStore();
useHead({
    title: "LinkSwinger – Discover Like-Minded Connections"
})

 definePageMeta({
        middleware: 'auth'
    })

</script>