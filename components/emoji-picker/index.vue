<template>
    <!-- <div class="absolute" ref="emojiButtonRef">


        <transition name="fade">
            <div v-if="showEmojiPicker" ref="emojiPickerRef" class="fixed z-50 bg-white border rounded-lg shadow-lg"
                :style="{
                    position: 'absolute',
                    top: pickerPosition.y + 'px',
                    left: pickerPosition.x + 'px',
                    width: pickerWidth + 'px',
                    height: pickerHeight + 'px',
                }">

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


                <div class="p-2 overflow-auto block">
               
                    <div v-if="activeTab === 'emoji'">
                        <NuxtEmojiPicker @select="onSelectEmoji" />
                    </div>
                    <div v-else-if="activeTab === 'stickers'" class="grid-container">
                        <Lottie renderer="svg" class="grid-item" v-for="sticker in emojis" :link="(sticker.media_path ?? '') + sticker.emoji" :key="sticker.emoji_id"
                            style="width: 80px; height: 80px;" @click="onSelectCustomEmoji(sticker.emoji ?? '')" ></Lottie>
                    </div>
                  

                    
       

                </div>

               
        </transition>
    </div> -->

    <div class="modal fade emoji-modal" id="emojiPickerRef" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
            <div class="modal-content text-white modal-inner emoji-small">
                <!-- Header -->
                <div class="emj-topbar" id="dragHandle" title="Drag me" style="cursor: grab;">
                    <div class="emj-brand">
                        <!-- ✅ your logo replaces the LS icon -->
                        <div class="emj-badge">
                            <img src="/public/images/badges/animated/150X150px/ls-watermark.gif" alt="LinkSwingers"
                                class="emj-badgeLogo">
                        </div>
                        <div class="emj-titlewrap">
                            <p class="emj-title">Emoji &amp; Stickers</p>
                            <p class="emj-subtitle">Metallic red popup mock-up • searchable • mobile ready
                            </p>
                        </div>
                    </div>

                    <button class="emj-close" id="closeBtn" aria-label="Close">✕</button>
                </div>
                <!-- Body -->
                <div class="emj-tabs" role="tablist" aria-label="Tabs">
                    <button class="emj-tab active" id="tabEmoji" role="tab" aria-selected="true">😄
                        Emoji</button>
                    <button class="emj-tab" id="tabStickers" role="tab" aria-selected="false">✨
                        Stickers</button>
                </div>
                <div class="emj-search">
                    <div class="emj-searchbox">
                        <span>⌕</span>
                        <input id="search" type="text"
                            placeholder="Search emoji or stickers (e.g. heart, laugh, fire)...">
                    </div>
                    <button class="emj-chip" id="skinBtn" title="Skin tone">🎨 Tone</button>
                </div>
                <div class="emj-body">
                    <div class="emj-wm">
                        <img src="/images/badges/animated/150X150px/ls-watermark.gif" alt="">
                    </div>
                    <div class="emj-sectionbar">
                        <div class="label" id="sectionTitle">Smiles &amp; People</div>
                        <div class="emj-hint">
                            <span id="countLabel">36 items</span>
                            <span>•</span>
                            <span>Click to pick</span>
                        </div>
                    </div>
                    <div class="emj-grid" id="grid">
                        <button class="emj-item" type="button" title=":grin:"><span
                                class="emj-emoji">😁</span></button><button class="emj-item" type="button"
                            title=":smile:"><span class="emj-emoji">😄</span></button><button class="emj-item"
                            type="button" title=":laugh:"><span class="emj-emoji">😂</span></button><button
                            class="emj-item" type="button" title=":rofl:"><span
                                class="emj-emoji">🤣</span></button><button class="emj-item" type="button"
                            title=":wink:"><span class="emj-emoji">😉</span></button><button class="emj-item"
                            type="button" title=":cool:"><span class="emj-emoji">😎</span></button><button
                            class="emj-item" type="button" title=":heart_eyes:"><span
                                class="emj-emoji">😍</span></button><button class="emj-item" type="button"
                            title=":kiss:"><span class="emj-emoji">😘</span></button><button class="emj-item"
                            type="button" title=":thinking:"><span class="emj-emoji">🤔</span></button><button
                            class="emj-item" type="button" title=":fire:"><span
                                class="emj-emoji">🔥</span></button><button class="emj-item" type="button"
                            title=":100:"><span class="emj-emoji">💯</span></button><button class="emj-item"
                            type="button" title=":party:"><span class="emj-emoji">🥳</span></button><button
                            class="emj-item" type="button" title=":cry:"><span
                                class="emj-emoji">😢</span></button><button class="emj-item" type="button"
                            title=":sad:"><span class="emj-emoji">🙁</span></button><button class="emj-item"
                            type="button" title=":angry:"><span class="emj-emoji">😠</span></button><button
                            class="emj-item" type="button" title=":shock:"><span
                                class="emj-emoji">😱</span></button><button class="emj-item" type="button"
                            title=":ok:"><span class="emj-emoji">👌</span></button><button class="emj-item"
                            type="button" title=":clap:"><span class="emj-emoji">👏</span></button><button
                            class="emj-item" type="button" title=":thumbs_up:"><span
                                class="emj-emoji">👍</span></button><button class="emj-item" type="button"
                            title=":eyes:"><span class="emj-emoji">👀</span></button><button class="emj-item"
                            type="button" title=":lips:"><span class="emj-emoji">👄</span></button><button
                            class="emj-item" type="button" title=":love:"><span
                                class="emj-emoji">❤️</span></button><button class="emj-item" type="button"
                            title=":sparkles:"><span class="emj-emoji">✨</span></button><button class="emj-item"
                            type="button" title=":star:"><span class="emj-emoji">⭐</span></button><button
                            class="emj-item" type="button" title=":kiss_mark:"><span
                                class="emj-emoji">💋</span></button><button class="emj-item" type="button"
                            title=":tongue:"><span class="emj-emoji">😛</span></button><button class="emj-item"
                            type="button" title=":smirk:"><span class="emj-emoji">😏</span></button><button
                            class="emj-item" type="button" title=":halo:"><span
                                class="emj-emoji">😇</span></button><button class="emj-item" type="button"
                            title=":devil:"><span class="emj-emoji">😈</span></button><button class="emj-item"
                            type="button" title=":ghost:"><span class="emj-emoji">👻</span></button><button
                            class="emj-item" type="button" title=":skull:"><span
                                class="emj-emoji">💀</span></button><button class="emj-item" type="button"
                            title=":diamond:"><span class="emj-emoji">💎</span></button><button class="emj-item"
                            type="button" title=":crown:"><span class="emj-emoji">👑</span></button><button
                            class="emj-item" type="button" title=":lock:"><span
                                class="emj-emoji">🔒</span></button><button class="emj-item" type="button"
                            title=":pin:"><span class="emj-emoji">📍</span></button><button class="emj-item"
                            type="button" title=":camera:"><span class="emj-emoji">📷</span></button>
                    </div>
                    <div class="emj-footer">
                        <div class="emj-picked">
                            <div class="emj-bubble" id="pickedBubble">🙂</div>
                            <div class="emj-meta">
                                <b id="pickedTitle">Nothing selected</b>
                                <span id="pickedSub">Pick an emoji or a sticker</span>
                            </div>
                        </div>
                        <div class="emj-actions">
                            <button class="emj-btn secondary" id="clearBtn">Clear</button>
                            <button class="emj-btn" id="useBtn">Use</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
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
const emit = defineEmits(['selectedEmoji', 'selectCustomEmoji'])
const { $bootstrap } = useNuxtApp();
var pickerModel: any = null
const toggleEmojiPicker = () => {
    showEmojiPicker.value = !showEmojiPicker.value

    pickerModel.show();
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


    pickerModel = new ($bootstrap as any).Modal(document.getElementById('emojiPickerRef'));
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
    display: grid;
    /* Declares the element as a grid container */
    grid-template-columns: repeat(3, 1fr);
    /* Creates 3 columns, each taking equal fractional space */
    grid-template-rows: repeat(3, 1fr);
    height: 320px;
    max-height: 320px;
    /* Creates 3 rows, each taking equal fractional space */
}

.grid-item {
    display: flex;
    /* Centers content within each item */
    justify-content: center;
    /* Centers content horizontally */
    align-items: center;
    /* Centers content vertically */
}
</style>
