<template>
   <age-verification/>
</template>
<script setup>
useHead({
    title: "LinkSwinger – Age Verification"
})
 definePageMeta({
        middleware:'validateuser'
    })
</script>