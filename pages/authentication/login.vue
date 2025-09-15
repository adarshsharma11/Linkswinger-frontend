<template>
<AuthenticationLogin/>
</template>

<script setup>
useHead({
    title: "Login- Chat Messenger Nuxt Template"
})
   definePageMeta({
        middleware:'validateuser'
    })
</script>
