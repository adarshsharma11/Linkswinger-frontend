<template>
    <NuxtLoadingIndicator color="#FF0000" />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { NuxtLoadingIndicator } from '#components';
const id_store = idStore()

onMounted(() => {
     useDatabase();
    if (typeof SharedWorker !== 'undefined') {
        initworker()
       
        let socketmodel = new SocketIdModel()
        socketmodel.event_name = "socketId"
        socketmodel.socketId = id_store.device_id
        sendmsgtoworker(socketmodel)
    }

});

</script>
