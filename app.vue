<template>
  <NuxtLoadingIndicator color="#FF0000"/>
  <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { NuxtLoadingIndicator } from '#components';


onMounted(() => 
{
    initworker()
    useDatabase();
    // let socketmodel = new SocketIdModel()
    // socketmodel.event_name = "socketId"
    // socketmodel.socketId = id_store.vendor_id
    // sendmsgtoworker(socketmodel)
});

</script>

