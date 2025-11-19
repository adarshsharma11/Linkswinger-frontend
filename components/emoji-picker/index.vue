<template>
    <div class="absolute" ref="emojiButtonRef">
        <!-- Floating Emoji Picker -->
 
        <transition name="fade">
            <div v-if="showEmojiPicker" ref="emojiPickerRef" class="fixed z-50 bg-white border rounded-lg shadow-lg"
                :style="{
                    position: 'absolute',
                    top: pickerPosition.y + 'px',
                    left: pickerPosition.x + 'px',
                    width: pickerWidth + 'px',
                    height: pickerHeight + 'px',
                }">
                <!-- Header for dragging -->
                <div class="cursor-move bg-gray-100 px-2 py-1 rounded-t-lg border-b flex justify-between items-center select-none"
                    @mousedown="startDrag">
                    <span class="text-sm text-gray-600">Drag me 😄</span>
                    <button @click="showEmojiPicker = false" class="text-gray-400 hover:text-gray-700">&times;</button>
                </div>

                <div class="flex border-b">
                    <button class="flex-1 py-2 text-sm"
                        :class="activeTab === 'emoji' ? 'bg-white border-b-2 border-blue-500 font-semibold' : 'bg-gray-100'"
                        @click="activeTab = 'emoji'">
                        Emoji
                    </button>

                    <button class="flex-1 py-2 text-sm"
                        :class="activeTab === 'stickers' ? 'bg-white border-b-2 border-blue-500 font-semibold' : 'bg-gray-100'"
                        @click="activeTab = 'stickers'">
                        Stickers
                    </button>
                </div>


                <!-- Picker content -->
                <!-- Content -->
                <div class="p-2 overflow-auto block">
                    <!-- Emoji Picker -->
                    <div v-if="activeTab === 'emoji'">
                        <NuxtEmojiPicker @select="onSelectEmoji" />
                    </div>
                    <div v-else-if="activeTab === 'stickers'" class="grid-container">
                        <Lottie class="grid-item" v-for="sticker in emojis" :link="(sticker.media_path ?? '') + sticker.emoji" :key="sticker.emoji_id"
                            style="width: 80px; height: 80px;" @click="onSelectCustomEmoji(sticker.emoji ?? '')" ></Lottie>
                    </div>
                  

                    
                    <!-- Stickers -->

                </div>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
import type { EmojisModel } from '~/composables/models';


const activeTab = ref('emoji');

const showEmojiPicker = ref(false)
const emojiButtonRef = ref(null)
const emojiPickerRef = ref(null)
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const pickerPosition = ref({ x: 500, y: 200 }) // initial position
const pickerWidth = ref(300)
const pickerHeight = ref(410)
const emojis = ref([] as EmojisModel.FetchEmojiResponseModel[])
const emit = defineEmits(['selectedEmoji','selectCustomEmoji'])


const toggleEmojiPicker = () => {
    showEmojiPicker.value = !showEmojiPicker.value
}
const closeEmojiPicker = () => {
    showEmojiPicker.value = false
}


const onSelectEmoji = (emoji: any) => {
    emit('selectedEmoji', emoji.i)
}

const onSelectCustomEmoji = (name: string) => {
    emit('selectCustomEmoji', name)
}

const startDrag = (e: any) => {
    if (!emojiPickerRef.value) return
    isDragging.value = true
    const rect = emojiPickerRef.value.getBoundingClientRect()
    dragOffset.value = {
        x: e.clientX - rect.left,
        y: e.clientY - (rect.top - 50),
    }
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e: any) => {
    if (!isDragging.value) return
    pickerPosition.value = {
        x: e.clientX - dragOffset.value.x,
        y: e.clientY - dragOffset.value.y,
    }
}

const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
}
onMounted(() => {


    pickerPosition.value = {
        x: window.innerWidth / 2 - pickerWidth.value / 2,
        y: window.innerHeight / 2 - pickerHeight.value / 2,
    }
    //showEmojiPicker.value = true

});

defineExpose({
    closeEmojiPicker,
    toggleEmojiPicker
})

onMounted(async () => {
  
const fetchEmojis = async () => {
  const api_url = getUrl(RequestURL.fetchEmojis);
  let response_model = await $fetch<SuccessError<EmojisModel.FetchEmojiResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {},
    headers: {
      "content-type": "application/json"
    }
  });
  return response_model.result ?? []
}
 emojis.value = await fetchEmojis() as EmojisModel.FetchEmojiResponseModel[]
});



</script>

<style scoped>
/* prevent inheriting NuxtEmojiPicker item styles */
.grid-container {
  display: grid; /* Declares the element as a grid container */
  grid-template-columns: repeat(3, 1fr); /* Creates 3 columns, each taking equal fractional space */
  grid-template-rows: repeat(3, 1fr);
  height: 320px;
  max-height: 320px; /* Creates 3 rows, each taking equal fractional space */
}

.grid-item {
  display: flex; /* Centers content within each item */
  justify-content: center; /* Centers content horizontally */
  align-items: center; /* Centers content vertically */
}
</style>
