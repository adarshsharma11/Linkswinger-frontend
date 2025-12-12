<template>
  <section class="media-settings-page text-white min-vh-100 py-4">
    <div class="settings-header">
      <div class="container">
        <div class="stmedia-breadcrumbs">
          <span>Settings</span> &nbsp;/&nbsp; <strong>Media</strong>
        </div>
        <div class="st-page-header d-flex flex-wrap align-items-center justify-content-between">
          <div class="st-page-title-block">
            <div class="st-page-title">
              <span class="st-page-title-dot"></span>
              <span>Media settings</span>
            </div>
            <div class="st-page-subtitle">
              Manage visibility for all your photos and videos in one place.
            </div>
          </div>

          <!-- BIGGER LOGO BETWEEN TITLE AND NOTE -->
          <div class="st-logo-block">
            <img class="img-fluid st-logo-img" src="/images/logo/landing-logo.gif" alt="landing-logo.gif">
          </div>

          <div class="st-note-block">
            <strong>Note:</strong><br />
            Private media &amp; videos is visible only to you.
          </div>
        </div>
      </div>
    </div>

    <!-- Global filters / info -->
    <div class="st-filter-mm">
      <div class="container">
        <div class="st-filters d-flex flex-wrap">
          <select v-model="feedTypeFilter">
            <option value="">Show: All media</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="public">Public only</option>
            <option value="friends">Friends only</option>
            <option value="private">Private only</option>
          </select>
          <span>{{ getImages().length }} photos · {{ getVideos().length }} videos</span>
        </div>
      </div>
    </div>

    <!-- PHOTOS SECTION -->
    <section class="st-section" id="photos-section">
      <div class="container">
        <div class="st-section-header">
          <div class="st-section-title">
            <span>Photos</span>
            <span class="st-section-title-pill">Profile &amp; gallery</span>
          </div>
          <div class="st-page-subtitle">Adjust visibility, comments or likes for photo media.</div>
        </div>
        <div class="st-section-divider"></div>

        <div class="st-media-wrapper">
          <div class="st-media-header">
            <div>
              <strong>Your photos</strong> &nbsp;·&nbsp; visibility + comments/likes controls per photo
            </div>
            <div>Changes are saved automatically</div>
          </div>

          <div class="st-media-grid">
            <!-- Photo – Public -->
            <article class="st-media-item" v-for="image in getImages()" @click="openPreview(image)">
              <div class="st-thumb-wrapper">
                <img class="st-thumb-placeholder" :src="(image.media_path ?? '') + image.hd_feed_image"
                  style="width: 100%; height: 100%; object-fit: cover;"></img>
                <div class="st-thumb-badge thumb-badge--photo">{{ image.feed_type?.toUpperCase() }}</div>
              </div>
              <div class="st-media-meta">
                <div class="st-media-meta-top">

                  <!-- <span class="st-media-length">Photo</span> -->
                </div>
                <span class="btn-loader" v-if="image.is_loading === true"></span>
                <div class="st-media-controls" v-if="image.is_loading !== true">
                  <select class="st-media-select" v-model="image.feed_type" @change="updateFeedType(image)">
                    <option value="public" selected>Public</option>
                    <option value="friends">Friends only</option>
                    <option value="private">Private</option>
                  </select>
                  <button class="st-btn-delete" @click="deleteFeed(image)">Delete</button>
                </div>
                <div class="st-media-options" v-if="image.is_loading !== true">
                  <div class="st-media-option">
                    <span class="st-option-label">Comments</span>
                    <select class="st-option-select" v-model="image.can_comment" @change="updateCommentStatus(image)">
                      <option :value="true">On</option>
                      <option :value="false">Off</option>
                    </select>
                  </div>
                  <div class="st-media-option">
                    <span class="st-option-label">Likes</span>
                    <select class="st-option-select" v-model="image.can_like" @change="updateLikeStatus(image)">
                      <option :value="true">On</option>
                      <option :value="false">Off</option>
                    </select>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- VIDEOS SECTION -->
    <section class="st-section" id="videos-section">
      <div class="container">
        <div class="st-section-header d-flex flex-wrap align-items-center justify-content-between">
          <div class="st-section-title">
            <span>Videos</span>
            <span class="st-section-title-pill">Clips &amp; previews</span>
          </div>
          <div class="st-page-subtitle">Change visibility, comments or likes, or play a quick preview.</div>
        </div>
        <div class="st-section-divider"></div>

        <div class="st-media-wrapper">
          <div class="st-media-header">
            <div>
              <strong>Your videos</strong> &nbsp;·&nbsp; visibility + comments/likes controls per video
            </div>
            <div>Changes are saved automatically</div>
          </div>

          <div class="st-media-grid">
            <!-- Video – Public -->
            <article class="st-media-item" v-for="video in getVideos()" @click="openPreview(video)">
              <div class="st-thumb-wrapper st-video-thumb">
                <img class="st-thumb-placeholder" :src="(video.media_path ?? '') + video.feed_thumbnail"
                  style="width: 100%; height: 100%; object-fit: cover;"></img>
                <div class="st-thumb-badge st-thumb-badge--video">{{ video.feed_type?.toUpperCase() }}</div>
                <div class="st-video-play-pill">
                  <span>▶</span>
                  <span>Play</span>
                </div>
              </div>
              <div class="st-media-meta">
                <div class="st-media-meta-top">
                  <!-- <span class="st-media-name">VID_001.mp4</span>
                <span class="st-media-length">01:23</span> -->
                </div>
                <span class="btn-loader" v-if="video.is_loading === true"></span>
                <div class="st-media-controls" v-if="video.is_loading !== true">
                  <select class="st-media-select" v-model="video.feed_type" @change="updateFeedType(video)">
                    <option value="public" selected>Public</option>
                    <option value="friends">Friends only</option>
                    <option value="private">Private</option>
                  </select>
                  <button class="st-btn-delete" @click="deleteFeed(video)">Delete</button>
                </div>
                <div class="st-media-options" v-if="video.is_loading !== true">
                  <div class="st-media-option">
                    <span class="st-option-label">Comments</span>
                    <select class="st-option-select" v-model="video.can_comment" @change="updateCommentStatus(video)">
                      <option :value="true">On</option>
                      <option :value="false">Off</option>
                    </select>
                  </div>
                  <div class="st-media-option">
                    <span class="st-option-label">Likes</span>
                    <select class="st-option-select" v-model="video.can_like" @change="updateLikeStatus(video)">
                      <option :value=true>On</option>
                      <option :value=false>Off</option>
                    </select>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </section>
  <!-- Simple video preview modal -->

  <!-- 
  <div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg " role="document">
      <div class="modal-content bg-dark text-white">
     
        <div class="modal-body comment-body">
          <Feeds :all-feeds="selectedFeeds" :from-feeds="false" :media-type="selectedFeeds[0].media_type"
            v-if="selectedFeeds.length > 0" />
        </div>
      </div>
    </div>
  </div> -->

  <!-- Simple video preview modal -->


  <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModal" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content bg-black">
        <div class="modal-body p-0 h-100">
          <Feeds :key="selectedFeeds.length > 0 ? selectedFeeds[0].feed_id : 0" :all-feeds="selectedFeeds"
            :from-feeds="false" :media-type="selectedFeeds[0]?.media_type" v-if="selectedFeeds.length > 0" />
        </div>
      </div>
    </div>
  </div>


</template>



<script setup lang="ts">
import { Feeds } from '#components'
import { ref, computed, onMounted } from 'vue'
import type { FeedsModel } from '~/composables/models'

const allFeeds = ref([] as FeedsModel.FeedsResponseModel[])
const login_store = useLoginStore()
const feedTypeFilter = ref('')
const { $bootstrap } = useNuxtApp();
var videoModalSub: any = null
var selectedFeeds = ref([] as FeedsModel.FeedsResponseModel[])
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


function getImages(): FeedsModel.FeedsResponseModel[] {
  if (feedTypeFilter.value.length === 0) {
    return allFeeds.value.filter((el) => {
      return el.media_type === 'image'
    })
  }

  return allFeeds.value.filter((el) => {
    return el.media_type === 'image' && (el.feed_type === feedTypeFilter.value || el.approval_status === feedTypeFilter.value)
  })
}

function getVideos(): FeedsModel.FeedsResponseModel[] {
  if (feedTypeFilter.value.length === 0) {
    return allFeeds.value.filter((el) => {
      return el.media_type === 'video'
    })
  }
  return allFeeds.value.filter((el) => {
    return el.media_type === 'video' && (el.feed_type === feedTypeFilter.value || el.approval_status === feedTypeFilter.value)
  })
}

async function deleteFeed(feed: FeedsModel.FeedsResponseModel) {
  feed.is_loading = true;
  let api_url = getUrl(RequestURL.deleteFeed);
  let postData = {
    feed_id: feed.feed_id
  }
  let response = await $fetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  feed.is_loading = false;

  if (response.success) {
    showToastSuccess(response.message ?? "Reset link sent to your email");
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}
async function updateCommentStatus(feed: FeedsModel.FeedsResponseModel) {
  feed.is_loading = true;
  let api_url = getUrl(RequestURL.updateCommentStatus);
  let postData = {
    feed_id: feed.feed_id
  }
  let response = await $fetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  feed.is_loading = false;

  if (response.success) {
    showToastSuccess(response.message ?? "Reset link sent to your email");
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}
async function updateLikeStatus(feed: FeedsModel.FeedsResponseModel) {
  feed.is_loading = true;
  let api_url = getUrl(RequestURL.updateLikeStatus);
  let postData = {
    feed_id: feed.feed_id
  }
  let response = await $fetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  feed.is_loading = false;

  if (response.success) {
    showToastSuccess(response.message ?? "Reset link sent to your email");
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}

async function updateFeedType(feed: FeedsModel.FeedsResponseModel) {
  feed.is_loading = true;
  let api_url = getUrl(RequestURL.updateFeedType);
  let postData = {
    feed_id: feed.feed_id,
    feed_type: feed.feed_type
  }
  let response = await $fetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  feed.is_loading = false;

  if (response.success) {
    showToastSuccess(response.message ?? "Reset link sent to your email");
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}

function openPreview(feed: FeedsModel.FeedLikeDisLikeResponseModel) {

  selectedFeeds.value = [feed]

  videoModalSub.show();

}

onMounted(async () => {
  videoModalSub = new ($bootstrap as any).Modal(document.getElementById('videoModal'));

  videoModalSub._element.addEventListener('hidden.bs.modal', () => {
    selectedFeeds.value = []
  })



})



// export default {
//   mounted() {
//     // DELETE BUTTON WORKING
// document.querySelectorAll('.st-btn-delete').forEach((btn) => {
//   btn.addEventListener('click', function () {
//     const card = this.closest('.st-media-item');
//     const name =
//       card?.querySelector('.st-media-name')?.textContent || 'this media';
//     const ok = confirm('Delete ' + name + '?');
//     if (ok) card.remove();
//   });
// });
//     // VIDEO MODAL LOGIC (FIXED)
//     const modal = document.getElementById('videoModal');
//     const modalClose = modal.querySelector('.st-video-modal-close');
//     const modalPlayer = document.getElementById('videoModalPlayer');
//     const modalTitle = document.getElementById('videoModalTitle');

//     function openVideoModal(card) {
//       const name =
//         card?.querySelector('.st-media-name')?.textContent || 'Video preview';
//       const src = card?.getAttribute('data-video-src') || '';

//       modalTitle.textContent = name;
//       modalPlayer.pause();

//       if (src) {
//         modalPlayer.querySelector('source').src = src;
//         modalPlayer.load();
//       }

//       modal.style.display = 'flex';
//     }

//     function closeVideoModal() {
//       modal.style.display = 'none';
//       modalPlayer.pause();
//     }

//     // ✅ FIXED SELECTOR (aapke HTML ke according)
//     document
//       .querySelectorAll('.st-video-thumb, .st-video-play-pill')
//       .forEach((el) => {
//         el.addEventListener('click', function (e) {
//           e.stopPropagation();
//           const card = this.closest('.st-media-item');
//           openVideoModal(card);
//         });
//       });

//     // Close button
//     modalClose.addEventListener('click', closeVideoModal);

//     // Backdrop click close
//     modal.addEventListener('click', function (e) {
//       if (e.target === modal) closeVideoModal();
//     });
//   },
// };
</script>
