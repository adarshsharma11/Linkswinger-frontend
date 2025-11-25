<template>
  <profile-picture-content/>
</template>

<script setup>
useHead({
    title: "Profile Picture Selection - LinkSwinger"
})

definePageMeta({
    middleware:'userdetails'
})
</script>