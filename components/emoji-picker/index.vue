<template>
    <div class="modal fade emoji-modal" id="emojiPickerModel" tabindex="-1" role="dialog" aria-hidden="false" >
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document" ref="emojiPickerRef">
            <div class="modal-content text-white modal-inner emoji-small">
                <!-- Header -->
                <div class="emj-topbar" id="dragHandle" title="Drag me" style="cursor: grab;" @mousedown="startDrag">
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
                    <button class="emj-tab" :class="{ 'active': activeTab === 'emoji' }" @click="activeTab = 'emoji'"
                        id="tabEmoji" role="tab" aria-selected="true">😄
                        Emoji</button>
                    <button class="emj-tab" :class="{ 'active': activeTab !== 'emoji' }" @click="activeTab = 'stickers'"
                        id="tabStickers" role="tab" aria-selected="false">✨
                        Stickers</button>
                </div>
                <div class="emj-search" v-if="activeTab === 'emoji'">
                    <div class="emj-searchbox">
                        <span>⌕</span>
                        <input id="search" v-model="searchQuery" type="text"
                            placeholder="Search emoji or stickers (e.g. heart, laugh, fire)...">
                    </div>
                    <button class="emj-chip" id="skinBtn" title="Skin tone">🎨 Tone</button>
                </div>
                <div class="emj-body">
                    <div class="emj-wm">
                        <img src="/public/images/badges/animated/150X150px/ls-watermark.gif" alt="">
                    </div>
                    <div class="emj-sectionbar" v-if="activeTab === 'emoji'">
                        <div class="label" id="sectionTitle">Smiles &amp; People</div>
                        <div class="emj-hint">
                            <span id="countLabel">{{ filteredEmojis().length }} items</span>
                            <span>•</span>
                            <span>Click to pick</span>
                        </div>
                    </div>
                    <div class="emj-grid" id="grid" v-if="activeTab === 'emoji'">
                        <button v-for="(emoji, i) in filteredEmojis()" :key="i" class="emj-item" type="button"
                            :title="emoji.title" :class="{ active: selectedEmoji?.char === emoji.char }"
                            @click="pickEmoji(emoji)">
                            <span class="emj-emoji">
                                {{ emoji.char }}
                            </span>
                        </button>
                    </div>
                    <div class="emj-grid" id="grid" v-if="activeTab === 'stickers'">
                        <div class="emj-item" v-for="sticker in stickers"
                            @click="onSelectCustomEmoji(sticker.emoji ?? '')">
                            <Lottie renderer="svg" v-if="getFileExtension(sticker.emoji ?? '') === '.json'"
                                :link="(sticker.media_path ?? '') + sticker.emoji" :key="sticker.emoji_id"></Lottie>
                            <video loop autoplay playsinline
                                v-else-if="getFileExtension(sticker.emoji ?? '') === '.webm'"
                                :src="(sticker.media_path ?? '') + (sticker.emoji ?? '')"
                                style="max-width: 40px; max-height: 40px;"></video>
                            <img lazy v-else-if="getFileExtension(sticker.emoji ?? '') !== '.json'"
                                :src="(sticker.media_path ?? '') + (sticker.emoji ?? '')"
                                style="max-width: 40px; max-height: 40px;" />
                        </div>

                    </div>
                    <div class="emj-footer" v-if="activeTab === 'emoji'">
                        <div class="emj-picked">
                            <div class="emj-bubble" id="pickedBubble">
                                {{ selectedEmoji?.char || '🙂' }}
                            </div>
                            <div class="emj-meta">
                                <b id="pickedTitle">
                                    {{ selectedEmoji?.title || 'Nothing selected' }}
                                </b>
                                <span id="pickedSub">
                                    {{ selectedEmoji?.names?.[0] || 'Pick an emoji or a sticker' }}
                                </span>
                            </div>
                        </div>
                        <div class="emj-actions">
                            <button class="emj-btn secondary" id="clearBtn" @click="clearEmoji()">Clear</button>
                            <button class="emj-btn" id="useBtn" @click="useEmoji()">Use</button>
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
import { ref } from 'vue'
const route = useRoute()

const reloadKey = ref(0);
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

const rawEmojis = ref<EmojiMap>(emojisData)
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

function emojis() {
  const list = rawEmojis.value?.[activeCategory.value]
  if (!Array.isArray(list)) return []

  return list.map(e => ({
    char: unicodeToEmoji(e.u),
    names: e.n,
    title: `:${e.n[0]}:`
  }))
}

function filteredEmojis() {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return emojis()

  return emojis().filter(e =>
    Array.isArray(e.names) &&
    e.names.some(name =>
      name.toLowerCase().includes(q.replace(/\s+/g, '_'))
    )
  )
}


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
const emit = defineEmits(['selectedEmoji', 'selectCustomEmoji', 'closedEmojiPicker'])
const { $bootstrap } = useNuxtApp();
var pickerModel: any = null
const selectedEmoji = ref<null | {
    char: string
    title: string
    names: string[]
}>(null)
const toggleEmojiPicker = () => {
   //rawEmojis.value = emojisData
    pickerModel = new ($bootstrap as any).Modal(document.getElementById('emojiPickerModel'));
    pickerModel._element.addEventListener('hidden.bs.modal', () => {
        emit('closedEmojiPicker')
    })
    pickerModel.show();
}
const closeEmojiPicker = () => {
    pickerModel.hide();
}


const onSelectEmoji = (emoji: any) => {
    emit('selectedEmoji', emoji.i)
}

const onSelectCustomEmoji = (name: string) => {
    emit('selectCustomEmoji', name)
}

const startDrag = (e: MouseEvent) => {
  if (!emojiPickerRef.value) return

  isDragging.value = true

  const rect = emojiPickerRef.value.getBoundingClientRect()

  dragOffset.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}


const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !emojiPickerRef.value) return

  emojiPickerRef.value.style.transform = `translate(
    ${e.clientX - dragOffset.value.x}px,
    ${e.clientY - dragOffset.value.y}px
  )`
}

const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
}
/**
 * 👉 Pick emoji
 */
function pickEmoji(emoji: { char: string; title: string; names: string[] }) {
    selectedEmoji.value = emoji
}

function useEmoji() {
    if (!selectedEmoji.value) return

    emit('selectedEmoji', selectedEmoji.value.char)

}

function getFileExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return '';
    }
    return filename.slice(lastDotIndex);
}

/**
 * ❌ Clear selection
 */
function clearEmoji() {
    selectedEmoji.value = null
}


defineExpose({
    closeEmojiPicker,
    toggleEmojiPicker
})

onMounted(async () => {

        // pickerPosition.value = {
    //     x: window.innerWidth / 2 - pickerWidth.value / 2,
    //     y: window.innerHeight / 2 - pickerHeight.value / 2,
    // }
    //showEmojiPicker.value = true

    console.log('picker mounted');
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
onBeforeUnmount(() => {
    pickerModel?.hide();
})


</script>