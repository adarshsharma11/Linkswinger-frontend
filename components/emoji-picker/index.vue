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

                    <button class="emj-close" id="closeBtn" aria-label="Close" @click="closeEmojiPicker()">✕</button>
                </div>
                <!-- Body -->
                <div class="emj-tabs" role="tablist" aria-label="Tabs">
                    <button class="emj-tab active" id="tabEmoji" role="tab" aria-selected="true">😄
                        Emoji</button>
                    <button class="emj-tab"  id="tabStickers" role="tab" aria-selected="false">✨
                        Stickers</button>
                </div>
                <div class="emj-search">
                    <div class="emj-searchbox">
                        <span>⌕</span>
                        <input id="search" v-model="searchQuery" type="text"
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
                            <span id="countLabel">{{ filteredEmojis.length }} items</span>
                            <span>•</span>
                            <span>Click to pick</span>
                        </div>
                    </div>
                    <div class="emj-grid" id="grid">
                        <button v-for="(emoji, i) in filteredEmojis" :key="i" class="emj-item" type="button"
                            :title="emoji.title">
                            <span class="emj-emoji">
                                {{ emoji.char }}
                            </span>
                        </button>
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
import emojisData from '@/assets/emojis.json'
import { ref, computed } from 'vue'

/**
 * Emoji JSON item type
 */
interface EmojiItem {
    n: string[]   // names / aliases
    u: string     // unicode (hex)
    v?: string[]  // skin tone variants
}

/**
 * Category map type
 */
type EmojiMap = Record<string, EmojiItem[]>

const rawEmojis = emojisData as EmojiMap
const searchQuery = ref('')
/**
 * Active category (you can change later)
 */
const activeCategory = ref('smileys_people')

/**
 * Convert "1f600" or "1f468-200d-2695-fe0f" → 😀
 */
function unicodeToEmoji(code: string): string {
    return code
        .split('-')
        .map(u => String.fromCodePoint(parseInt(u, 16)))
        .join('')
}

/**
 * Normalized emojis for rendering
 */
const emojis = computed(() =>
    rawEmojis[activeCategory.value].map(e => ({
        char: unicodeToEmoji(e.u),
        names: e.n,
        title: `:${e.n[0]}:`
    }))
)
const filteredEmojis = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return emojis.value

  console.log('searching',searchQuery)
  return emojis.value.filter(e =>
    e.names.some(name =>
      name.toLowerCase().includes(q.replace(/\s+/g, '_'))
    )
  )
})

const activeTab = ref('emoji');

const showEmojiPicker = ref(false)
const emojiButtonRef = ref(null)
const emojiPickerRef = ref(null)
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const pickerPosition = ref({ x: 500, y: 200 }) // initial position
const pickerWidth = ref(300)
const pickerHeight = ref(410)
const stickers = ref([] as EmojisModel.FetchEmojiResponseModel[])
const emit = defineEmits(['selectedEmoji', 'selectCustomEmoji'])
const { $bootstrap } = useNuxtApp();
var pickerModel: any = null
const toggleEmojiPicker = () => {
    showEmojiPicker.value = !showEmojiPicker.value

    
    pickerModel.show();
}
const closeEmojiPicker = () => {
    showEmojiPicker.value = false
        pickerModel.hide();
}


const onSelectEmoji = (emoji: any) => {
    emit('selectedEmoji', emoji.i)
}

const onSelectCustomEmoji = (name: string) => {
    emit('selectCustomEmoji', name)
}

const startDrag = (e: any) => {
    // if (!emojiPickerRef.value) return
    // isDragging.value = true
    // const rect = emojiPickerRef.value.getBoundingClientRect()
    // dragOffset.value = {
    //     x: e.clientX - rect.left,
    //     y: e.clientY - (rect.top - 50),
    // }
    // document.addEventListener('mousemove', onDrag)
    // document.addEventListener('mouseup', stopDrag)
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
    stickers.value = await fetchEmojis() as EmojisModel.FetchEmojiResponseModel[]
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
