<template>
  <AuthenticationSignup/>
</template>

<script setup>
useHead({
    title: "Sign Up- Chat Messenger Nuxt Template"
})
 definePageMeta({
        middleware:'validateuser'
    })
</script>
