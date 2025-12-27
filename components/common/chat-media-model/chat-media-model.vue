<template>
  <!--chat-media popup-->
  <div class="modal fade chatmedia-modal" id="chatmediaBtn" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content text-white modal-inner editstatus-small">
        <!-- Header -->
          <div class="modal-head">
            <div>
              <div class="modal-title">Chat Media Model</div>
              <div class="modal-sub">Meet today with a time in the next 12 hours, or choose a specific date.</div>
            </div>
            <div class="meet-inline" style="flex:0 0 auto;">
              <button class="meet-btn meet-small meet-ghost" data-bs-dismiss="modal" aria-label="Close">Close</button>
            </div>
          </div>
          <div class="meet-section">
            <span class="meet-label">Picture</span>
            <div class="lsv-media-grid">
              <div
                class="lsv-media-item"
                v-for="media in allFeeds"
                :key="media.feed_id"
                @click="selectMedia(media)"
                :class="{ active: selectedMedia?.feed_id === media.feed_id }"
              >
                <div class="lsv-media-image">
                  <img :src="media.url" />
                </div>
              </div>
            </div>
            <div class="meet-inline" style="margin-top: 10px;">
              <button class="meet-btn meet-small" id="addmediaBtn" type="button" @click="triggerFilePicker" > Add picture </button>
              <input type="file"ref="fileInput"style="display:none"accept="image/*"@change="handleFileSelect"/>
            </div>

          </div>
        <div class="edt-sts-footer">
          <button class="btn bg-theme-color" id="saveBtn" type="button">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type MediaItem = {
  feed_id: number;
  url: string;
};

const selectedMedia = ref<MediaItem | null>(null);
const allFeeds = ref<MediaItem[]>([
  { feed_id: 1, url: "/images/user-list/user-1.jpg" },
  { feed_id: 2, url: "/images/user-list/user-2.jpg" },
  { feed_id: 3, url: "/images/user-list/user-3.jpg" },
  { feed_id: 4, url: "/images/user-list/user-4.jpg" },
]);

const fileInput = ref<HTMLInputElement | null>(null);

const triggerFilePicker = () => {
  fileInput.value?.click();
};

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  allFeeds.value.push({
    feed_id: Date.now(),
    url,
  });
};

const selectMedia = (media: MediaItem) => {
  if (selectedMedia.value?.feed_id === media.feed_id) {
    selectedMedia.value = null;
  } else {
    selectedMedia.value = media;
  }
};
</script>
<style>
.lsv-media-grid {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 200px;
    gap: 16px;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 24px;
    padding: 16px;
}  
.lsv-media-item.active {
  outline: 3px solid #00f59a;
  border-radius: 8px;
}
.edt-sts-footer .btn {
  color: #fff;
}
</style>