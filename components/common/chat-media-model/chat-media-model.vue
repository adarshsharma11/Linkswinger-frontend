<template>
  <!--chat-media popup-->
  <div class="modal fade chatmedia-modal" tabindex="-1" role="dialog" aria-hidden="true">
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
            <div class="lsv-media-item" v-for="media in allFeeds" :key="media.feed_id" @click="selectMedia(media)"
              :class="{ active: selectedMedia?.feed_id === media.feed_id }">
              <div class="lsv-media-image">
                <img v-if="media.is_local && media.media_type === 'image'" :src="(media.media_path ?? '')" />
                <video v-if="media.is_local && media.media_type === 'video'" :src="(media.media_path ?? '')"
                  controls></video>
                <img v-else-if="media.media_type === 'image'" :src="(media.media_path ?? '') + media.hd_feed_image" />
                <img v-else-if="media.media_type === 'video'" :src="(media.media_path ?? '') + media.feed_thumbnail" />
              </div>
            </div>
          </div>
          <div class="meet-inline" style="margin-top: 10px;">
            <button class="meet-btn meet-small" id="addmediaBtn" type="button" @click="triggerFilePicker"> Add picture
            </button>
            <input type="file" ref="fileInput" style="display:none" accept="image/png,image/jpeg,video/mp4"
              @change="handleFileSelect" />
          </div>

        </div>
        <div class="edt-sts-footer">
          <button class="btn bg-theme-color" id="saveBtn" type="button" @click="sendMedia()">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeedsModel } from '~/composables/models'
const allFeeds = ref([] as FeedsModel.FeedsResponseModel[])
const login_store = useLoginStore()

const emit = defineEmits(['sendMedia'])
const fetchFeeds = async () => {
  const api_url = getUrl(RequestURL.fetchFeeds);
  const { data: feed_response, error: option_error } = await useFetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      login_id: login_store.getUserDetails?.user_id ?? 0,
      user_id: login_store.getUserDetails?.user_id ?? 0,
      media_type: '',
      feed_type: ''
    },
    headers: {
      "content-type": "application/json"
    }
  });
  return feed_response.value?.result ?? []
}
allFeeds.value = await fetchFeeds() as FeedsModel.FeedsResponseModel[]
const selectedMedia = ref<FeedsModel.FeedsResponseModel | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const triggerFilePicker = () => {
  fileInput.value?.click();
};

function sendMedia() {
  
  if (selectedMedia !== null) {
   
    emit('sendMedia', selectedMedia.value)
  }

}



const handleFileSelect = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const index = allFeeds.value.findIndex(feed => feed.is_local === true)

  if (index !== -1) {
    allFeeds.value.splice(index, 1)
  }
  const url = URL.createObjectURL(file);
  if (file.type.startsWith("image/")) {
    const profile_image = await file.arrayBuffer()
    const img = new Image();
    img.onload = async function () {
      let model = new FeedsModel.FeedsResponseModel()
      model.media_path = url
      model.is_local = true
      model.width = img.width
      model.height = img.height
      model.feed_id = Date.now()
      model.media_type = 'image'
      model.contentType = file.type
      model.fileBlob = new Blob([profile_image])
      allFeeds.value.unshift(model)
      selectedMedia.value = model;
    }

    img.src = url
  }
  else {
    const video = document.createElement('video');
    video.preload = 'metadata';
    const video_file = await file.arrayBuffer()
    video.onloadedmetadata = async function () {
      if (video.duration > 180) {
        showToastError("Please upload video less than 3 minutes long.");
        target.value = ''
      } else {
        let model = new FeedsModel.FeedsResponseModel()
        model.media_path = url
        model.is_local = true
        model.width = video.videoWidth
        model.height = video.videoHeight
        model.feed_id = Date.now()
        model.media_type = 'video'
        model.contentType = file.type
        model.fileBlob = new Blob([video_file])
        allFeeds.value.unshift(model)
        selectedMedia.value = model;
      }
    };
    video.src = url
  }
  target.value = ''
};

const selectMedia = (media: FeedsModel.FeedsResponseModel) => {
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