<template>
   <Profile :user_id="login_store.getUserDetails.user_id"> </Profile>
   <CommonFooter/>
</template>
<script setup>
useHead({
    title: "LinkSwinger – Discover Like-Minded Connections"
})
 definePageMeta({
        middleware:'auth'
    })
const login_store = useLoginStore();
</script>