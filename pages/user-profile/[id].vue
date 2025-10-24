<template>
   <Profile :user_id="route.params.id"/>
   <CommonFooter/>
</template>
<script setup>
useHead({
    title: "LinkSwinger – Discover Like-Minded Connections"
})
 definePageMeta({
        middleware:'auth'
    })
const route = useRoute();
</script>