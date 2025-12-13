<template>
   <photo-verification-content/>
</template>
<script setup>
import auth from '~/middleware/auth';

useHead({
    title: "LinkSwinger – Age Verification"
})
 definePageMeta({
        middleware:[auth]
    })
</script>