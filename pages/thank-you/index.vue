<template>
    <Thankyou />
</template>
<script setup>
 import { useGtag } from 'vue-gtag-next';
useHead({
    title: "LinkSwinger – Discover Like-Minded Connections"
})
definePageMeta({
    middleware: 'userdetails'
})
  const { event } = useGtag();
onMounted(() => {
sendConversionEvent();
});
    const sendConversionEvent = () => {
      event('conversion', {
        send_to: 'AW-17646009228/yq-UCOjfxbEbEIz3ot5B' 
      });
    };
</script>