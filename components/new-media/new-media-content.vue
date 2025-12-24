<template>
  <section class="new-media-page text-white min-vh-100 py-4">
    <!-- TOP BAR -->
    <div class="nm-topbar">
      <div class="nm-topbar-inner">
        <div class="nm-brand">
          <img class="nm-brand-logo" src="/images/logo/landing-logo.gif" alt="LinkSwingers Logo" />
          <div>
            <div class="nm-brand-title">New Media</div>
            <div class="nm-brand-sub">Recently added uploads across the site</div>
          </div>
        </div>
        <!-- <div class="nm-top-actions">
          <button class="nm-pill" :class="{ active: activePill === 'recent' }" @click="setActivePill('recent')">Recently
            Added</button>
          <button class="nm-pill" :class="{ active: activePill === 'friends' }"
            @click="setActivePill('friends')">Friends Focus</button>
          <button class="nm-pill" :class="{ active: activePill === 'nearby' }" @click="setActivePill('nearby')">Local
            Focus</button>
        </div> -->
      </div>
    </div>

    <!-- MAIN WRAP -->
    <div class="nm-wrap">

      <!-- Mobile Filter Overlay -->
      <div class="nm-mobile-filter-overlay" :class="{ active: mobileFiltersOpen }" @click="closeMobileFilters"></div>

      <!-- FILTER PANEL -->
      <aside class="nm-panel" :class="{ collapsed: filtersCollapsed, 'mobile-open': mobileFiltersOpen }">

        <!-- Mobile Filter Header -->
        <div class="nm-mobile-filter-header">
          <h3>Filters</h3>
          <button class="nm-close-btn" @click="closeMobileFilters">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <div class="nm-row-between">
          <h3><span class="nm-dot"></span> Filters</h3>
          <button class="nm-btn nm-btn-ghost nm-filter-toggle" @click="toggleFilters">{{ filtersCollapsed ? 'Show' :
            'Hide' }}</button>
        </div>

        <!-- Location radius -->
        <div class="nm-group">
          <div class="nm-group-title">
            <span>Location radius</span>
            <span class="nm-range-value">{{ radius }} miles</span>
          </div>
          <!-- <label class="nm-chk">
            <input type="checkbox" v-model="radiusAll" />
            All distances
          </label> -->
          <input class="nm-range" type="range" min="5" max="3000" step="5" v-model.number="radius" />
          <div class="nm-hint">Used for Nearby/Local filtering. Max shown is 3000 miles.</div>
        </div>


        <div class="nm-group">
          <div class="nm-group-title">
            <span>Media type</span>
          </div>
          <label class="nm-chk">
            <input type="checkbox" :checked="selectedMediaType === 'all'" @change="onMediaTypeChange($event, 'all')" />
            All
          </label>
          <label class="nm-chk">
            <input type="checkbox" :checked="selectedMediaType === 'image'"
              @change="onMediaTypeChange($event, 'image')" /> Photos only
          </label>
          <label class="nm-chk">
            <input type="checkbox" :checked="selectedMediaType === 'video'"
              @change="onMediaTypeChange($event, 'video')" /> Videos only
          </label>
        </div>

        <!-- Profile types -->
        <div class="nm-group">
          <div class="nm-group-title">
            <span>Profile type</span>
            <span class="nm-range-value">{{ selectedProfileTypes.length }}/5</span>
          </div>
          <label class="nm-chk">
            <input type="checkbox" value="Man" v-model="selectedProfileTypes" /> Man
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="Woman" v-model="selectedProfileTypes" /> Women
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="Couple MM" v-model="selectedProfileTypes" /> Couple M/M
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="Couple FF" v-model="selectedProfileTypes" /> Couple F/F
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="Couple MF" v-model="selectedProfileTypes" /> Couple M/F
          </label>
        </div>


        <!-- Friends / Local-only toggles -->
        <div class="nm-group">
          <div class="nm-group-title"><span>Source</span></div>
          <label class="nm-chk">
            <input type="checkbox" :checked="sourceFilter === 'friends'"
              @change="onSourceFilterChange($event, 'friends')" />
            Friends photos only
          </label>
          <label class="nm-chk">
            <input type="checkbox" :checked="sourceFilter === 'local'"
              @change="onSourceFilterChange($event, 'local')" />
            Local profiles only
          </label>
        </div>

        <!-- Explicit filter -->
        <div class="nm-group">
          <div class="nm-group-title"><span>Content type</span></div>
          <label class="nm-chk">
            <input type="radio" name="explicitMode" value="both" v-model="explicitMode" /> Both
          </label>
          <label class="nm-chk">
            <input type="radio" name="explicitMode" value="nonexplicit" v-model="explicitMode" /> Non-explicit only
          </label>
          <label class="nm-chk">
            <input type="radio" name="explicitMode" value="explicit" v-model="explicitMode" /> Explicit only
          </label>
        </div>

        <!-- Age range -->
        <div class="nm-group">
          <div class="nm-group-title">
            <span>Uploader age range</span>
            <span class="nm-range-value">{{ ageMin }}–{{ ageMax }}</span>
          </div>

          <div class="nm-age-inputs">
            <div class="nm-age-field">
              <span>Min</span>
              <input type="number" min="18" max="99" step="1" v-model.number="ageMin" />
            </div>
            <div class="nm-age-field">
              <span>Max</span>
              <input type="number" min="18" max="99" step="1" v-model.number="ageMax" />
            </div>
          </div>

          <div class="nm-hint">Filters the profile age of the uploader. Default 18–99.</div>
        </div>

        <div class="nm-panel-actions">
          <button class="nm-btn nm-btn-primary" @click="applyFilters">Apply Filters</button>
          <button class="nm-btn nm-btn-ghost" @click="clearFilters">Clear</button>
        </div>

        <div class="nm-sep"></div>
        <div class="nm-hint">
          This is a UI mockup with placeholder images and sample data.
        </div>
      </aside>

      <!-- CONTENT -->
      <main class="nm-content-card">
        <div class="nm-content-head">
          <div class="nm-title">
            <div>
              <h1>Latest Media Uploads</h1>
              <div class="nm-sub">{{ resultsSubtitle }}</div>
            </div>
          </div>

          <!-- Mobile Filter Controls -->
          <div class="nm-mobile-filter-controls">
            <div class="nm-filter-row">
              <button class="nm-btn nm-btn-ghost filters-btn" @click="openMobileFilters" v-show="!mobileFiltersOpen">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                </svg>
                Filters
              </button>
              <div class="nm-search-mini">
                <img src="/images/badges/animated/150X150px/search.gif" alt="Search"
                  style="width:18px;height:18px;object-fit:contain;opacity:.85;" />
                <input type="text" v-model="nameSearch" placeholder="Filter by profile name" />
              </div>
            </div>
            <!-- <div class="nm-filter-row">
              <div class="nm-sort">
                <select v-model="sortBy">
                  <option value="recent">Sort: Recently added</option>
                  <option value="distance">Sort: Nearest first</option>
                  <option value="age">Sort: Uploader age</option>
                  <option value="name">Sort: Profile name A–Z</option>
                </select>
              </div>
            </div> -->
          </div>
        </div>

        <div class="nm-grid-wrap">
          <!-- UNIFIED GRID -->
          <div class="nm-grid">
            <div v-for="(item, index) in allFeeds" :key=item.feed_id
              :class="item.media_type === 'video' ? 'nm-video-card' : 'nm-photo-card'" @click="openViewer(item)">
              <div class="nm-thumb">
                <img v-if="item.media_type !== 'video'" :src="(item.media_path ?? '') + item.hd_feed_image"
                  loading="lazy" />
                <img v-if="item.media_type === 'video'" :src="(item.media_path ?? '') + item.feed_thumbnail"
                  loading="lazy" />
                <div v-if="item.media_type === 'video'" class="nm-play-badge">▶</div>
              </div>

              <!-- <div class="nm-meta">
                <div>
                  <div class="nm-name">{{ item.name }}</div>
                  <div class="nm-time">{{ item.timeText }}</div>
                </div>
                <div v-if="item.isNew"><span class="nm-badge-mini">NEW</span></div>
              </div> -->
            </div>
          </div>

          <div v-if="filteredMedia.length === 0" class="nm-empty">
            No media matches these filters.
          </div>
        </div>
      </main>
    </div>
  </section>


  <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModal" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content bg-black">
        <!-- Modal Header -->
        <div class="modal-header">
          <button type="button" class="msgf-pill" data-bs-dismiss="modal" aria-label="Close">
            ✕
          </button>
        </div>
        <div class="modal-body p-0 h-100">
          <Feeds :key="selectedFeeds.length > 0 ? selectedFeeds[0].feed_id : 0" :all-feeds="selectedFeeds"
            :from-feeds="false" :media-type="selectedFeeds[0]?.media_type" v-if="selectedFeeds.length > 0"
            :selected-index="selectedFeedIndex" @model-open="modelOpen" @model-closed="modelClosed" />
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue';
import type { FeedsModel } from '~/composables/models';
const login_store = useLoginStore()
const feedTypeFilter = ref('')
const { $bootstrap } = useNuxtApp();
var videoModalSub: any = null
var selectedFeeds = ref([] as FeedsModel.FeedsResponseModel[])
const allFeeds = ref([] as FeedsModel.FeedsResponseModel[])
const selectedFeedIndex = ref(0)
const fetchFeeds = async () => {
  const api_url = getUrl(RequestURL.fetchNewFeeds);
  const { data: feed_response, error: option_error } = await useFetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      login_id: login_store.getUserDetails?.user_id ?? 0,
      user_id: 0,
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

// FILTER STATE
const selectedMediaType = ref<string>('all');
const selectedProfileTypes = ref<string[]>(['Man', 'Woman', 'Couple MM', 'Couple FF', 'Couple MF']);
const radius = ref(3000);

const sourceFilter = ref<string>('');

const explicitMode = ref<'both' | 'nonexplicit' | 'explicit'>('both');
const ageMin = ref(18);
const ageMax = ref(99);
const nameSearch = ref('');
const is_new_media_loading = ref(false);

// MOBILE FILTERS
const mobileFiltersOpen = ref(false);
const filtersCollapsed = ref(false);
const isModalOpen = ref(false)

// -----------------------------
// COMPUTED: FILTERED MEDIA
// -----------------------------
const filteredMedia = computed(() => {

  return allFeeds.value;
});

// -----------------------------
// COMPUTED: RESULTS SUBTITLE
// -----------------------------
const resultsSubtitle = computed(() => {
  const count = filteredMedia.value.length;
  if (count === 0) return "No media found";
  if (count === 1) return "Showing 1 media item";
  return `Showing ${count} media items`;
});

// -----------------------------
// METHODS
// -----------------------------

function onMediaTypeChange(event: Event, value: string) {
  if (event.target instanceof HTMLInputElement) {
    if (event.target.checked) {
      selectedMediaType.value = value;
    } else {
      if (selectedMediaType.value === 'all') {
        (event.target as HTMLInputElement).checked = true;
      }
      else {
        selectedMediaType.value = 'all';
      }

      console.log("Media type changed to:", selectedMediaType.value);
    }
  }
}
function onSourceFilterChange(event: Event, value: string) {
  if (event.target instanceof HTMLInputElement) {
    if (event.target.checked) {
      sourceFilter.value = value;
    } else {
      sourceFilter.value = '';
    }
  }
}

function openMobileFilters() {
  mobileFiltersOpen.value = true;
  document.body.classList.add('mobile-filters-open');

  nextTick(() => {
    const closeBtn = document.querySelector('.nm-close-btn') as HTMLButtonElement | null;
    if (closeBtn) closeBtn.focus();
  });
}

function closeMobileFilters() {
  mobileFiltersOpen.value = false;
  document.body.classList.remove('mobile-filters-open');

  const triggerBtn = document.querySelector('.filters-btn') as HTMLButtonElement | null;
  if (triggerBtn) triggerBtn.focus();
}



function toggleFilters() {
  filtersCollapsed.value = !filtersCollapsed.value;
}

async function applyFilters() {
  console.log("Filters applied:", {
    radius: radius.value,
    profileTypes: selectedProfileTypes.value,
    source: sourceFilter.value,
    explicitMode: explicitMode.value,
    ageRange: [ageMin.value, ageMax.value],
  });
  if (is_new_media_loading.value) {
    return;
  }
  allFeeds.value = []
  is_new_media_loading.value = true;
  let api_url = getUrl(RequestURL.fetchNewFeeds);
  let postData = {
    // REQUIRED
    login_id: login_store.getUserDetails?.user_id ?? 0,

    // BASIC
    user_id: 0,
    feed_type: "",

    // MEDIA TYPE
    // 'image' | 'video' | '' (all)
    media_type: selectedMediaType.value === "all"
      ? ""
      : selectedMediaType.value,

    // APPROVAL (OPTIONAL)
    approval_status: "",

    // DISTANCE (MILES)
    distance: radius.value || null,

    // SOURCE FILTER
    // 'friends' | 'local' | null
    source: sourceFilter.value || null,

    // CONTENT TYPE
    // 'explicit' | 'nonexplicit' | null
    content_type:
      explicitMode.value === "explicit"
        ? "explicit"
        : explicitMode.value === "nonexplicit"
          ? "nonexplicit"
          : null,

    // PROFILE TYPES (ARRAY)
    profileTypes: selectedProfileTypes.value.length
      ? selectedProfileTypes.value
      : null,

    // AGE RANGE
    age_min: ageMin.value || null,
    age_max: ageMax.value || null,
  };

  console.log("Filters applied:", postData);

  let response = await $fetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  is_new_media_loading.value = false;
  if (response.success) {
    allFeeds.value = response.result ?? []
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}

async function clearFilters() {
  radius.value = 3000;
  selectedProfileTypes.value = ['Man', 'Woman', 'Couple MM', 'Couple FF', 'Couple MF']
  selectedMediaType.value = 'all';
  sourceFilter.value = '';
  explicitMode.value = 'both';
  ageMin.value = 18;
  ageMax.value = 99;
  nameSearch.value = '';

  if (is_new_media_loading.value) {
    return;
  }
  allFeeds.value = []
  is_new_media_loading.value = true;
  let api_url = getUrl(RequestURL.fetchNewFeeds);
  let postData = {
    // REQUIRED
    login_id: login_store.getUserDetails?.user_id ?? 0,

    // BASIC
    user_id: 0,
    feed_type: "",

    // MEDIA TYPE
    // 'image' | 'video' | '' (all)
    media_type: ''
  };
  let response = await $fetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  is_new_media_loading.value = false;
  if (response.success) {
    allFeeds.value = response.result ?? []
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}

function openViewer(feed: FeedsModel.FeedsResponseModel) {

  let selectedIndex = allFeeds.value.findIndex(feed1 => feed1.feed_id === feed.feed_id)

  selectedFeedIndex.value = selectedIndex
  selectedFeeds.value = allFeeds.value
  videoModalSub.show();
}
function modelOpen() {
  isModalOpen.value = true
}
function modelClosed() {

}
// -----------------------------
// LIFECYCLE
// -----------------------------
onMounted(() => {
  videoModalSub = new ($bootstrap as any).Modal(document.getElementById('videoModal'));

  videoModalSub._element.addEventListener('hidden.bs.modal', () => {
    if (isModalOpen.value === false) {
      selectedFeeds.value = []
    }
    else {
      isModalOpen.value = false
    }
  })
});
</script>
<style scoped>
.msgf-pill {
  font-size: 14px;
  line-height: 1;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  /* optional */
}

.modal-header {
  min-height: 0 !important;
  max-height: 20px;
  border-bottom: none !important;
}


.modal-dialog {
  height: 100%;
  max-height: 100%;
    margin: 0 auto;
}

@supports (-webkit-touch-callout: none) {
  .modal-dialog {
    height: 100dvh;
  }
}

.modal-content {
  height: auto;
  max-height: 100vh;
  overflow: hidden;
  /* disables internal scroll */
}


</style>
