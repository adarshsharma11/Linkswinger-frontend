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
onMounted(() => {
window.addEventListener("pagehide", (event) => {
    if (event.persisted) return;

    const nav = performance.getEntriesByType("navigation")[0];
    const isReload = nav && (nav.type === "reload" || nav.type === "navigate");
    if (isReload) {
        localStorage.setItem('pagehide_time', Date.now().toString() + " " + nav.type);   
    }
    else
    {
        localStorage.setItem('pagehide_time',   nav.type);
    }

      
    });
})
 
</script>