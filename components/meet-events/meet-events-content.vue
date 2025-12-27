<template>
  <section class="meet-events-page text-white min-vh-100 py-4">
    <div class="meet-topbar">
      <div class="meet-brand">
        <img src="/images/logo/landing-logo.gif" alt="LinkSwingers" class="nm-brand-logo">
        <div class="nm-brand-title">
          <div class="nm-brand-title">Meet Events</div>
          <div class="nm-brand-sub">Browse active meet posts • Newest first</div>
        </div>
      </div>

      <div class="nm-top-actions">
        <button class="meet-btn meet-primary" aria-label="Go to Add Meet Event" @click="openMeetEvent()">Add Meet
          Event</button>
      </div>
    </div>
    <div class="meet-grid">
      <div class="nm-mobile-filter-overlay" :class="{ active: mobileFiltersOpen }" @click="closeMobileFilters"></div>
      <!-- Left: Filters -->
      <div class="meet-panel meet-sidefilter" :class="{ 'mobile-open': mobileFiltersOpen }">
        <h2>Filters <button class="nm-close-btn" @click="closeMobileFilters">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button></h2>
        <p class="meet-hint">Location, today/date filters, looking for, friends/crush, and age range.</p>

        <div class="meet-filter-block">
          <div class="meet-label-row">
            <img src="/images/badges/animated/50X50px/location.gif" class="meet-loc-icon" alt="">
            <span class="meet-label">Location (town/postcode)</span>
          </div>
          <!-- <input type="text" id="filterLocation" placeholder="e.g., Walsall / WS1 / Birmingham" /> -->
          <Multiselect class="input" v-model="selectedPostTown" :options="allTownsPostCode" :multiple="false"
            :close-on-select="true" placeholder="Enter town or postcode" :loading="is_town_post_loading"
            @search-change="fetchTownsPostCodes" label="name" track_by="id" :internal-search="false" />
        </div>

        <!-- ✅ Replaced Mode with Today + Specific Date filters -->
        <div class="meet-filter-block">
          <span class="meet-label">Meeting time filters</span>
          <div class="meet-chips">
            <label class="meet-chip">
              <input type="checkbox" id="filterTodayOnly" v-model="isFilterTodayMode">
              <span>Meeting today</span>
            </label>
          </div>
        </div>

        <div class="meet-filter-block">
          <span class="meet-label">Meeting on a specific date</span>
          <input type="date" id="filterSpecificDate" v-model="filterMeetDate"
            :min="new Date().toISOString().split('T')[0]" />
          <div class="meet-filter-actions">
            <button class="meet-btn meet-small meet-ghost" id="clearSpecificDateBtn" type="button"
              @click="clearDate()">Clear date</button>
          </div>
        </div>

        <div class="meet-filter-block">
          <span class="meet-label">Looking for (multi-select)</span>
          <div class="meet-chips" id="filterLookingFor">
            <label class="meet-chip"><input v-model="selectedFilterLookingFor" type="checkbox"
                value="Man"><span>Man</span></label>
            <label class="meet-chip"><input v-model="selectedFilterLookingFor" type="checkbox"
                value="Woman"><span>Woman</span></label>
            <label class="meet-chip"><input v-model="selectedFilterLookingFor" type="checkbox"
                value="Couple MF"><span>Couple M/F</span></label>
            <label class="meet-chip"><input v-model="selectedFilterLookingFor" type="checkbox"
                value="Couple MM"><span>Couple M/M</span></label>
            <label class="meet-chip"><input v-model="selectedFilterLookingFor" type="checkbox"
                value="Couple FF"><span>Couple F/F</span></label>
            <label class="meet-chip"><input v-model="selectedFilterLookingFor" type="checkbox"
                value="TS"><span>TS</span></label>
          </div>
        </div>

        <div class="meet-filter-block">
          <span class="meet-label">Show</span>
          <select id="filterRelationship" v-model="filterRelationship">
            <option value="all" selected>All users</option>
            <option value="friends">Friends only</option>
            <option value="crush">Crush list</option>
          </select>
        </div>

        <div class="meet-filter-block">
          <span class="meet-label">Age range</span>
          <div class="meet-inline">
            <div>
              <span class="meet-label">Min</span>
              <input type="number" id="filterMinAge" v-model.number="filterMinAge" min="18" max="99" step="1" />
            </div>
            <div>
              <span class="meet-label">Max</span>
              <input type="number" id="filterMaxAge" v-model.number="filterMaxAge" min="18" max="99" step="1" />
            </div>
          </div>
          <div class="meet-filter-actions">
            <button class="meet-btn meet-small meet-ghost" id="resetAgeBtn" type="button">Reset 18–99</button>
          </div>
        </div>

        <div class="meet-filter-actions">
          <button class="meet-btn meet-small meet-ghost" id="clearFiltersBtn" @click="clearFilter()">Clear</button>
          <button class="meet-btn meet-small" id="applyFiltersBtn" @click="fetchMeetEventWithFilter()">Apply</button>
        </div>

        <div class="meet-divider"></div>
        <div class="meet-foot">
          Demo only. Real build should filter active events server-side.
        </div>
      </div>

      <!-- Right: List -->
      <div class="meet-panel">
        <div class="meet-list-head">
          <div>
            <button class="nm-btn nm-btn-ghost filters-btn" @click="openMobileFilters" v-show="!mobileFiltersOpen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
              </svg>
              Filters
            </button>
            <h2 style="margin-bottom:2px;">Active Meet Events</h2>
            <div class="meet-hint" style="margin:0;">Click a card to open event info.</div>
          </div>
          <div class="meet-count" id="countLabel">{{ allMeetEvents.length }} events</div>
        </div>

        <div id="eventList" class="meet-event-list">
          <div class="meet-event-card" aria-label="Go to details" data-bs-toggle="modal"
            data-bs-target="#detailsBackdrop" v-for="meet in allMeetEvents" @click="selectEvent(meet)">
            <div class="meet-event-row">
              <div class="meet-who">
                <img v-if="(meet.meet_photo?.length ?? 0) > 0" :src="(meet.media_path ?? '') + meet.meet_photo"
                  style="max-width: 30px; max-height: 30px; border-radius: 5px;"></img>
                <div v-if="(meet.meet_photo?.length ?? 0) === 0" class="meet-avatar">{{
                  meet.nick_name?.slice(0, 2).toUpperCase() }}</div>
                <div>
                  <div class="meet-name">{{ meet.nick_name }}</div>
                  <div class="meet-tagline">
                    {{ meet.profile_type }}
                  </div>
                </div>
              </div>
              <span class="meet-badge live">Meeting on date</span>
            </div>

            <div class="meet-event-meta">
              <span class="meet-badge">{{ meet.meet_type }}</span>
              <span class="meet-badge">Date: {{ formatLocal(meet.meet_date ?? '') }}</span>
              <span class="meet-badge">{{ meet.town }}</span>
              <span class="meet-badge">Age: {{ meet.min_age }}-{{ meet.max_age }}</span>
            </div>

            <div class="meet-event-mini" style="margin-top:6px;">
              <span class="meet-muted">Looking for:</span>
              {{ meet.looking_for?.join(',') }}
            </div>

            <div class="meet-event-desc-mini">{{ meet.description }}</div>
          </div>
        </div>

        <div id="emptyState" class="meet-empty" style="display:none;">
          No meet events match your filters.
        </div>
      </div>
    </div>


    <div class="modal fade meetdetails-modal" id="detailsBackdrop" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content text-white modal-inner">
          <!-- Header -->
          <div class="modal-head">
            <div>
              <div class="modal-title">Meet Event</div>
              <!-- <div class="modal-sub" id="detailsSub">Created: {{ selectedEvent?.nick_name }}/div> -->
            </div>

            <div class="meet-head-right">
           
              <span class="meet-head-pill" id="detailsMeetTypePill">{{ selectedEvent?.meet_type }}</span>
              <button class="meet-btn meet-small meet-ghost" data-bs-dismiss="modal" aria-label="Close">Close</button>
            </div>
          </div>
          <!-- Body -->
          <div class="meet-modal-grid">
            <div>
              <div class="meet-detail-photo" v-if="(selectedEvent?.meet_photo?.length ?? 0) > 0">
                <img :src="(selectedEvent?.media_path ?? '') + selectedEvent?.meet_photo"
                  style="max-height: 160px; object-fit: cover;"></img>
              </div>

              <div class="meet-section">
                <span class="meet-label">Description</span>
                <div id="detailsDesc" style="font-size:12px; line-height:1.45; color:#dfe3f7; white-space:pre-wrap;">
                  {{ selectedEvent?.description }}</div>
              </div>
            </div>

            <div>
              <div class="meet-section">
                <span class="meet-label">Event info</span>
                <div class="meet-info-stack">
                  <div class="meet-info-box">
                    <div class="meet-info-label">Profile</div>
                    <div class="meet-info-value" id="detailsWhoText" @click="openProfile()">{{ selectedEvent?.nick_name
                      }} {{
                        selectedEvent?.profile_type }}</div>

                  </div>
                  <div class="meet-info-box">
                    <div class="meet-info-label">When</div>
                    <div class="meet-info-value" id="detailsWhenText">{{ formatLocal(selectedEvent?.meet_date ?? '') }}
                    </div>
                  </div>
                  <div class="meet-info-box">
                    <div class="meet-info-label">Looking for</div>
                    <div class="meet-info-value" id="detailsLookingText">{{ selectedEvent?.looking_for?.join(',') }}
                    </div>
                  </div>
                  <div class="meet-info-box">
                    <div class="meet-info-label">Location</div>
                    <div class="meet-info-value" id="detailsLocationText">{{ selectedEvent?.town }}</div>
                  </div>
                  <div class="meet-info-box">
                    <div class="meet-info-label">Age target</div>
                    <div class="meet-info-value" id="detailsAgeText">{{ selectedEvent?.min_age }}-{{
                      selectedEvent?.max_age }}</div>
                  </div>
                </div>
              </div>

              <div class="meet-section" id="ownerInteractionBlock"
                v-if="selectedEvent?.user_id === login_store.getUserDetails?.user_id">
                <span class="meet-label">Your event settings</span>
                <div class="meet-inline">
                  <div class="meet-toggle-row">
                    <div>
                      <div class="meet-t-label">Comments</div>
                      <div class="meet-t-sub">Turn comments on/off</div>
                    </div>
                    <div class="meet-switch" :class="{ 'on': selectedEvent?.can_comment }" id="ownerCommentsSwitch"
                      role="switch" aria-checked="true" tabindex="0" v-if="(selectedEvent?.is_comment_loading ?? false) === false" @click="updateCommentStatus(selectedEvent)">
                    </div>
                     <span class="btn-loader" v-if="selectedEvent?.is_comment_loading"></span>
                  </div>

                  <div class="meet-toggle-row">
                    <div>
                      <div class="meet-t-label">Likes</div>
                      <div class="meet-t-sub">Turn likes on/off</div>
                    </div>
                    <div class="meet-switch" :class="{ 'on': selectedEvent?.can_like }" id="ownerLikesSwitch"
                      role="switch" aria-checked="true" tabindex="0" v-if="(selectedEvent?.is_like_loading ?? false) === false" @click="updateLikeStatus(selectedEvent)">
                    </div>
                    <span class="btn-loader" v-if="selectedEvent?.is_like_loading"></span>
                  </div>
                </div>
                <div class="meet-foot">Only visible for your own meet event.</div>
              </div>

              <div class="meet-section">
              <div class="meet-inline mb-2">
                    <button class="meet-btn meet-small"
                    >Delete</button>
              </div>
                <div class="meet-inline">
                  <span class="btn-loader" v-if="is_like_loading"
                    style="width: 20px; height: 20px; max-width: 20px; max-height: 40px;"></span>
                  <button class="meet-btn meet-small"
                    v-if="(selectedEvent?.can_like ?? false) && is_like_loading === false" @click="addLikeDisLike()">{{
                      selectedEvent?.is_liked ? 'Unlike' : 'Like' }} {{ selectedEvent?.like_count ?? 0 }}</button>
                  <button class="meet-btn meet-small" v-if="selectedEvent?.can_comment ?? false"
                    @click="openComments()">Comment {{ selectedEvent?.comment_count ?? 0 }}</button>
                  <button class="meet-btn meet-small meet-ghost"
                    v-if="selectedEvent?.user_id !== user_store.getLoginId">Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CREATE MODAL -->
    <div class="modal fade addenvent-modal" id="addMeetBtn" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content text-white modal-inner meet-small">
          <!-- Header -->
          <div class="modal-head">
            <div>
              <div class="modal-title">Add Meet Event</div>
              <div class="modal-sub">Meet today with a time in the next 12 hours, or choose a specific date.</div>
            </div>
            <div class="meet-inline" style="flex:0 0 auto;">
              <button class="meet-btn meet-small meet-ghost" data-bs-dismiss="modal" aria-label="Close">Close</button>
            </div>
          </div>
          <!-- Body -->
          <div class="meet-section">
            <span class="meet-label">When are you meeting?</span>
            <div class="meet-choice-row">
              <div class="meet-choice-card" :class="{ 'active': isTodayMode }" id="choiceToday"
                @click="isTodayMode = !isTodayMode">
                <div class="meet-t">Meet today</div>
                <div class="meet-d">Select a time within the next 12 hours</div>
                <input type="text" :value="todayDateISO" disabled />

              </div>
              <div class="meet-choice-card" :class="{ 'active': !isTodayMode }" id="choiceDate"
                @click="isTodayMode = !isTodayMode">
                <div class="meet-t">Meet on a specific date</div>
                <div class="meet-d">Pick a date (next 14 days)</div>
                <select v-model="selectedDateISO">
                  <option disabled>Select date</option>
                  <option v-for="d in next14Days" :key="d.value" :value="d.value">
                    {{ d.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="meet-section" id="todayTimeSection">
            <span class="meet-label">Select time</span>
            <select v-model="selectedTimeISO">
              <option disabled value="">Select time</option>

              <option v-for="t in timeOptions" :key="t.value" :value="t.value">
                {{ t.label }}
              </option>
            </select>

            <div class="meet-foot">This is a rolling list based on current time (demo).</div>
          </div>
          <div class="meet-section" id="dateSection" style="display:none;">
            <span class="meet-label">Select date</span>
            <input type="date" id="createSpecificDate" min="2025-12-16" max="2025-12-30">
          </div>
          <div class="meet-section">
            <span class="meet-label">Meet type (pick one)</span>
            <div class="meet-chips">
              <label class="meet-chip"><input v-model="selectedMeetType" type="radio" name="createMeetType"
                  value="Outdoor" checked><span>Outdoor</span></label>
              <label class="meet-chip"><input v-model="selectedMeetType" type="radio" name="createMeetType"
                  value="Host"><span>Host</span></label>
              <label class="meet-chip"><input v-model="selectedMeetType" type="radio" name="createMeetType"
                  value="Travel"><span>Travel</span></label>
            </div>
          </div>
          <div class="meet-section">
            <span class="meet-label">Looking for (multi-select)</span>
            <div class="meet-chips" id="createLookingFor">
              <label class="meet-chip"><input v-model="selectedLookingFor" type="checkbox"
                  value="Man"><span>Man</span></label>
              <label class="meet-chip"><input v-model="selectedLookingFor" type="checkbox"
                  value="Woman"><span>Woman</span></label>
              <label class="meet-chip"><input v-model="selectedLookingFor" type="checkbox"
                  value="Couple MF"><span>Couple M/F</span></label>
              <label class="meet-chip"><input v-model="selectedLookingFor" type="checkbox"
                  value="Couple MM"><span>Couple M/M</span></label>
              <label class="meet-chip"><input v-model="selectedLookingFor" type="checkbox"
                  value="Couple FF"><span>Couple F/F</span></label>
              <label class="meet-chip"><input v-model="selectedLookingFor" type="checkbox"
                  value="TS"><span>TS</span></label>
            </div>
          </div>
          <div class="meet-section">
            <span class="meet-label">Target age range</span>
            <div class="meet-inline">
              <div>
                <span class="meet-label">Min</span>
                <input type="number" id="createMinAge" min="18" max="99" v-model.number="minAge">
              </div>
              <div>
                <span class="meet-label">Max</span>
                <input type="number" id="createMaxAge" min="18" max="99" v-model.number="maxAge">
              </div>
            </div>
          </div>
          <div class="meet-section">
            <div class="meet-label-row">
              <img src="/images/badges/animated/50X50px/location.gif" class="meet-loc-icon" alt="">
              <span class="meet-label">Location</span>
            </div>

            <div class="meet-toggle-row">
              <div>
                <div class="meet-t-label">Custom location</div>
                <div class="meet-t-sub">If off, we use your account location</div>
              </div>
              <div class="meet-switch" :class="{ 'on': isCustomLocation }" id="createCustomLocSwitch" role="switch"
                aria-checked="false" tabindex="0" @click="isCustomLocation = !isCustomLocation"></div>
            </div>
            <div class="meet-inline" style="margin-top:10px;">
              <div>
                <span class="meet-label">Town</span>
                <!-- <input type="text" id="createCustomLocInput" placeholder="Optional" disabled> -->
                <Multiselect v-model="selectedTown" :options="allTowns" :multiple="false" :close-on-select="true"
                  placeholder="Select Town" label="town" track_by="town_id" :loading="is_town_loading"
                  @search-change="fetchTowns" :disabled="!isCustomLocation" />
              </div>
            </div>
            <div class="meet-section">
              <span class="meet-label">Radius (miles)</span>
              <input type="range" min="1" max="40" step="1" v-model.number="radius" />
              <div class="meet-foot">{{ radius }} miles</div>
            </div>

          </div>
          <div class="meet-section">
            <span class="meet-label">Description (emoji enabled)</span>
            <textarea v-model="description" id="createDesc" placeholder="Write your meet details 😈🔥"></textarea>
          </div>
          <div class="meet-section">
            <span class="meet-label">Picture</span>
            <div class="meet-inline">
              <button @click="showAddPicture()" v-if="allFeeds.length === 0" class="meet-btn meet-small"
                id="openGalleryBtn" type="button">Add
                picture</button>
              <!-- <input type="text" id="selectedPhotoField" value="No picture selected" readonly> -->
            </div>

            <div class="lsv-media-grid">
              <div v-for="media in allFeeds" :key="media.feed_id" class="lsv-media-item"
                :class="{ 'lsv-media-item--selected': selectedMedia?.feed_id === media.feed_id }"
                @click="selectMedia(media)">
                <div class="lsv-media-image">
                  <img :src="(media.media_path ?? '') + media.hd_feed_image" />
                  <div class="lsv-media-overlay" v-if="selectedMedia?.feed_id === media.feed_id">
                    <span class="lsv-check-icon">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="meet-section">
            <span class="meet-label">Your event settings</span>
            <div class="meet-inline">
              <div class="meet-toggle-row">
                <div>
                  <div class="meet-t-label">Comments</div>
                  <div class="meet-t-sub">Allow comments on your event</div>
                </div>
                <div class="meet-switch" :class="{ 'on': can_comment }" id="createCommentsSwitch" role="switch"
                  aria-checked="true" tabindex="0" @click="can_comment = !can_comment">
                </div>
              </div>

              <div class="meet-toggle-row">
                <div>
                  <div class="meet-t-label">Likes</div>
                  <div class="meet-t-sub">Allow likes on your event</div>
                </div>
                <div class="meet-switch" :class="{ 'on': can_like }" id="createLikesSwitch" role="switch"
                  aria-checked="true" tabindex="0" @click="can_like = !can_like"></div>
              </div>
            </div>
          </div>
          <div class="meet-divider"></div>
          <div class="meet-inline" v-if="!is_event_loading">
            <button class="meet-btn meet-small meet-ghost" id="createResetBtn" type="button"
              @click="resetMeetEvent()">Reset</button>
            <button class="meet-btn meet-small meet-primary" id="createSaveBtn" type="button"
              @click="createMeetEvent()">Save Event</button>
          </div>
          <span class="btn-loader" v-if="is_event_loading"></span>
          <div class="meet-foot">
            Saves an event by "You" and adds it to the feed.
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="modal fade comment-modal" id="commentmodal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content bg-dark text-white">
        <!-- Header -->

        <div class="modal-header ad-sc-header border-0">
          <h2 class="modal-title text-white">Comments</h2>
          <button class="close text-danger fs-3 fw-bold" type="button" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body comment-body">
          <div class="comment-list">
            <span class="btn-loader" v-if="is_comment_loading"></span>
            <div v-if="!is_comment_loading" class="comment-items" v-for="comment in comments"
              :key="comment.feed_comment_id">
              <div class="cmt-img">
                <img
                  :src="getProfilePlaceholder(comment.media_path ?? '', comment.profile_image ?? '', comment.profile_type ?? '')" />
              </div>
              <div class="cmt-content">
                <h3> {{ comment.nick_name }} </h3>
                <div v-if="comment.comment_type !== 'emoji'">
                  <p>{{ comment.comment }}</p>
                </div>
                <div v-if="comment.comment_type === 'emoji'">
                  <Lottie renderer="svg" v-if="getFileExtension(comment.comment ?? '') === '.json'"
                    :link="(comment.media_path ?? '') + (comment.comment ?? '')"
                    style="max-width: 80px; max-height: 80px;">
                  </Lottie>
                  <video lazy loop autoplay playsinline v-else-if="getFileExtension(comment.comment ?? '') === '.webm'"
                    :src="(comment.media_path ?? '') + (comment.comment ?? '')"
                    style="max-width: 40px; max-height: 40px;"></video>
                  <img lazy v-else-if="getFileExtension(comment.comment ?? '') !== '.json'"
                    :src="(comment.media_path ?? '') + (comment.comment ?? '')"
                    style="max-width: 80px; max-height: 80px;" />
                </div>


              </div>
            </div>
          </div>
          <div class="comment-footer">
            <div class="cmt-ath">
              <img
                :src="getProfilePlaceholder(login_store.getUserDetails?.media_path ?? '', login_store.getUserDetails?.profile_image ?? '', login_store.getUserDetails?.profile_type ?? '')" />
            </div>
            <div class="cmt-text">
              <input ref="commentRef" v-model="commentTxt" type="text" placeholder="Add a comment" />
              <button class="btn btn-link text-light fs-5" @click="handleToggle()">😊</button>
              <div class="comt-buttons">
                <button class="cmt-cancel-btn">Cancel</button>
                <button v-if="!is_add_comment_loading" class="cmt-send-btn" @click="addComment()">Comment</button>
                <span class="btn-loader" v-if="is_add_comment_loading"></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <EmojiPicker v-if="showPicker" :key="route.fullPath" ref="emojiPickerRef" v-on:selected-emoji="selectedEmoji"
    v-on:select-custom-emoji="selectCustomEmoji" @closed-emoji-picker="showPicker = false" />
</template>


<script setup lang="ts">
import { RequestURL, type FeedsModel, type MeetEventsModel, type SuccessError, type UsersModel } from '~/composables/models';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
const router = useRouter()
const route = useRoute()
// MOBILE FILTERS
const showPicker = ref(false)
const mobileFiltersOpen = ref(false);
const filtersCollapsed = ref(false);
const user_store = userStore()
const login_store = useLoginStore()
const isCustomLocation = ref(false)
const selectedTown = ref<UsersModel.FetchTownResponseModel>({});
const selectedPostTown = ref<UsersModel.FetchTownPostCodesResponseModel>({});
const selectedMedia = ref<FeedsModel.FeedsResponseModel | null>(null)
const selectedEvent = ref<MeetEventsModel.ListResponseModel | null>(null)
const radius = ref(40) // miles (max 40)
const commentRef = ref<HTMLInputElement | null>(null);
const selectedMeetType = ref('Outdoor')
const selectedLookingFor = ref<string[]>([])

const minAge = ref(18)
const maxAge = ref(99)

const filterMinAge = ref(18)
const filterMaxAge = ref(99)
const selectedFilterLookingFor = ref<string[]>([])

const description = ref('')
const can_comment = ref(true)
const can_like = ref(true)



const friends_only = ref(false)
const crush_only = ref(false)
const isFilterTodayMode = ref<boolean>(false)
const filterRelationship = ref('all')
const filterMeetDate = ref<string | null>('')
const commentTxt = ref('')

// date & time
const isTodayMode = ref(true)
const selectedTimeISO = ref<string | null>(null)
const todayDateISO = ref<string | null>(null)
const selectedDateISO = ref<string | null>(null)
const allTowns = ref<UsersModel.FetchTownResponseModel[]>([]);
const allTownsPostCode = ref<UsersModel.FetchTownPostCodesResponseModel[]>([]);
const allFeeds = ref([] as FeedsModel.FeedsResponseModel[])
const allMeetEvents = ref([] as MeetEventsModel.ListResponseModel[])
const is_event_loading = ref(false)
const is_town_loading = ref(false)
const is_town_post_loading = ref(false)
const comments = ref([] as FeedsModel.FetchFeedCommentResponseModel[])
const is_comment_loading = ref(false);
const is_like_loading = ref(false);
const is_add_comment_loading = ref(false);
const emojiPickerRef = ref<EmojiPicker | null>(null)
var addEventSub: any = null
var commentModal: any = null
var detailEventModal: any = null


const { $bootstrap } = useNuxtApp();


const fetchFeeds = async () => {
  const api_url = getUrl(RequestURL.fetchFeeds);
  const { data: feed_response, error: option_error } = await useFetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      login_id: login_store.getUserDetails?.user_id ?? 0,
      user_id: login_store.getUserDetails?.user_id ?? 0,
      media_type: 'image',
      feed_type: ''
    },
    headers: {
      "content-type": "application/json"
    }
  });
  return feed_response.value?.result ?? []
}
allFeeds.value = await fetchFeeds() as FeedsModel.FeedsResponseModel[]

const fetchMeetEvents = async () => {
  const api_url = getUrl(RequestURL.fetchMeetEvents);
  const { data: meet_response, error: option_error } = await useFetch<SuccessError<MeetEventsModel.ListResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {
      user_id: login_store.getUserDetails?.user_id ?? 0,
    },
    headers: {
      "content-type": "application/json"
    }
  });

  return meet_response.value?.result ?? []
}

allMeetEvents.value = await fetchMeetEvents() as MeetEventsModel.ListResponseModel[]


watch(
  () => route.query.modal,
  (newHash, oldHash) => {
    if ((newHash ?? '').length === 0 && oldHash === 'addEvent') {
      addEventSub.hide()
    }
  }
);

onMounted(() => {
  addEventSub = new ($bootstrap as any).Modal(document.getElementById('addMeetBtn'));
  detailEventModal = new ($bootstrap as any).Modal(document.getElementById('detailsBackdrop'));

  addEventSub._element.addEventListener('hidden.bs.modal', () => {
    router.replace({ query: {} })
  })

  commentModal = new ($bootstrap as any).Modal(document.getElementById('commentmodal'));
})
function fetchTowns(query: string) {
  if (query.length === 0) {
    allTowns.value = []
    return;
  }
  let api_url = getUrl(RequestURL.fetchTowns);
  is_town_loading.value = true;
  allTowns.value = []
  $fetch<SuccessError<UsersModel.SignUpResponseModel>>(api_url, {
    method: 'POST',
    body: { "search": query },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {

    if (response.success) {
      allTowns.value = (response.result ?? []) as UsersModel.FetchTownResponseModel[]
    }
    is_town_loading.value = false;
  }).catch((error) => {
    is_town_loading.value = false;
  });
}

async function openProfile() {
  detailEventModal.hide()
  await navigateTo(`user-profile/${selectedEvent.value?.user_id ?? 0}`)
}

function fetchTownsPostCodes(query: string) {
  if (query.length === 0 || is_town_loading.value) {
    allTownsPostCode.value = []
    return;
  }
  let api_url = getUrl(RequestURL.fetchTownsPostCodes);
  is_town_post_loading.value = true;
  allTownsPostCode.value = []
  $fetch<SuccessError<UsersModel.SignUpResponseModel>>(api_url, {
    method: 'POST',
    body: { "search": query },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    is_town_post_loading.value = false;
    if (response.success) {
      allTownsPostCode.value = (response.result ?? []) as UsersModel.FetchTownPostCodesResponseModel[]
    }
  }).catch((error) => {
    is_town_post_loading.value = false;
  });
}

function openMobileFilters() {
  mobileFiltersOpen.value = true;
  document.body.classList.add('mobile-filters-open');

  nextTick(() => {
    const closeBtn = document.querySelector('.nm-close-btn') as HTMLButtonElement | null;
    if (closeBtn) closeBtn.focus();
  });


}


tommorowDate()

function formatLocal(meet_date: string): string {
  return formatToLocal(meet_date)
}


function tommorowDate() {
  const today = new Date()
  const d = new Date(today)

  todayDateISO.value = d.toISOString().split('T')[0]

  d.setDate(today.getDate() + 1)
  selectedDateISO.value = d.toISOString().split('T')[0]

}

const selectMedia = (media: FeedsModel.FeedsResponseModel) => {
  if (selectedMedia.value === null) {
    selectedMedia.value = media
  }
  else {
    if (media.feed_id === selectedMedia.value.feed_id) {
      selectedMedia.value = null
    }
    else {
      selectedMedia.value = media
    }
  }

}

const selectEvent = (event: MeetEventsModel.ListResponseModel) => {
  selectedEvent.value = event
}


async function updateCommentStatus(feed: MeetEventsModel.ListResponseModel) {
  feed.is_comment_loading = true;
  let api_url = getUrl(RequestURL.meetupdateCommentStatus);
  let postData = {
    meet_event_id: feed.meet_event_id
  }
  let response = await $fetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  feed.is_comment_loading = false;

  if (response.success) {
    feed.can_comment = response.response?.can_comment ?? false
    showToastSuccess(response.message ?? "Reset link sent to your email");
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}
async function updateLikeStatus(feed: MeetEventsModel.ListResponseModel) {
  feed.is_like_loading = true;
  let api_url = getUrl(RequestURL.meetupdateLikeStatus);
  let postData = {
  meet_event_id: feed.meet_event_id
  }
  let response = await $fetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  feed.is_like_loading = false;
  if (response.success) {
    feed.can_like = response.response?.can_like ?? false
    showToastSuccess(response.message ?? "Reset link sent to your email");
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}

function showAddPicture() {
  showToastError('Please add picture in your feeds')
}

const next14Days = computed(() => {
  const days = []
  const today = new Date()

  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)

    days.push({
      label: d.toLocaleDateString(),
      value: d.toISOString().split('T')[0] // YYYY-MM-DD
    })
  }
  return days
})
const timeOptions = computed(() => {
  const options: { label: string; value: string }[] = []

  const now = new Date()

  // ---------- TODAY MODE ----------
  if (isTodayMode.value) {
    // next full hour
    const start = new Date(now)
    start.setMinutes(0, 0, 0)
    start.setHours(start.getHours() + 1)
    // end of today (11:59 PM)
    const end = new Date(now)
    end.setHours(23, 59, 59, 999)
    const current = new Date(start)
    while (current <= end) {
      options.push({
        label: current.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        value: current.toISOString()
      })
      current.setHours(current.getHours() + 1)
    }
    return options
  }

  // ---------- DATE MODE ----------
  const baseDate = new Date()
  baseDate.setHours(12, 0, 0, 0) // 12:00 PM

  for (let hour = 12; hour <= 23; hour++) {
    const t = new Date(baseDate)
    t.setHours(hour)

    options.push({
      label: t.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      value: t.toISOString()
    })
  }

  return options
})


watch(isTodayMode, () => {
  selectedTimeISO.value = null
})
watch(isFilterTodayMode, () => {
  if (isFilterTodayMode.value) {
    filterMeetDate.value = null
  }

})
watch(filterMeetDate, () => {
  if (filterMeetDate.value !== null) {
    isFilterTodayMode.value = false
  }

})


watch(filterRelationship, () => {
  friends_only.value = false
  crush_only.value = false

  if (filterRelationship.value === 'friends') {
    friends_only.value = true
  }
  else if (filterRelationship.value === 'crush') {
    crush_only.value = true
  }

})



function resetMeetEvent() {
  isTodayMode.value = true
  isCustomLocation.value = false
  selectedMedia.value = null
  selectedTimeISO.value = null
  minAge.value = 18
  maxAge.value = 99
  selectedLookingFor.value = []
  selectedMeetType.value = 'Outdoor'
  radius.value = 40
  selectedTown.value = {}
  can_comment.value = true
  can_like.value = true
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
function getFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return ''; // No extension found
  }
  return filename.slice(lastDotIndex);
}

function getProfilePlaceholder(media_path: string, profile_image: string, profile_type: string): string {
  if (media_path.length > 0 && profile_image.length > 0) {
    return media_path + profile_image
  }
  if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png";
  if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png";
  if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png";
  if (profile_type === 'Man') return "/images/profile-placeholders/man.png";
  return "/images/profile-placeholders/man.png"
}

function buildMeetDateISO(): string | null {
  if (isTodayMode.value) {
    return selectedTimeISO.value // already ISO
  }

  if (!selectedDateISO.value || !selectedTimeISO.value) {
    return null
  }

  // combine date + time
  const time = new Date(selectedTimeISO.value)
  const date = selectedDateISO.value

  const combined = new Date(
    `${date}T${time.toISOString().split('T')[1]}`
  )

  return combined.toISOString()
}
function clearDate() {
  filterMeetDate.value = null
}
function clearFilter() {
  friends_only.value = false
  crush_only.value = false
  filterRelationship.value = 'all'
  selectedPostTown.value = {}
  filterMinAge.value = 18
  filterMaxAge.value = 99
  selectedFilterLookingFor.value = []
  isFilterTodayMode.value = false
  filterMeetDate.value = null
  fetchMeetEventWithFilter(false)

}
async function fetchMeetEventWithFilter(isFilter: boolean = true) {
  let par_meet_date: string | null = null

  if (isFilterTodayMode.value) {
    par_meet_date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  }

  if (filterMeetDate.value !== null) {
    par_meet_date = filterMeetDate.value // already YYYY-MM-DD
  }
  const payload: MeetEventsModel.ListRequestModel = {
    is_filter: isFilter,
    user_id: login_store.getUserDetails?.user_id ?? 0,
    latitude: selectedPostTown.value.latitude,
    longitude: selectedPostTown.value.longitude,
    min_age: filterMinAge.value,
    max_age: filterMaxAge.value,
    looking_for: selectedFilterLookingFor.value,
    friends_only: friends_only.value,
    crush_only: crush_only.value,
    meet_date: par_meet_date
  }

  allMeetEvents.value = []
  const api_url = getUrl(RequestURL.fetchMeetEvents);
  let response = await $fetch<SuccessError<MeetEventsModel.CreateResponseModel>>(api_url, {
    method: 'POST',
    body: payload
  })
  console.log(response)
  if (response.success) {
    allMeetEvents.value = response.result ?? []
  }
  else {
    showToastError(response.message)
  }
}

function selectedEmoji(emoji: string) {
  const statusInput = commentRef.value;
  if (statusInput) {
    const start = statusInput.selectionStart;
    const end = statusInput.selectionEnd;
    const value = statusInput.value;

    statusInput.value = value.substring(0, start) + emoji + value.substring(end);

    // Move cursor after the emoji
    const newPos = start + emoji.length;
    statusInput.setSelectionRange(newPos, newPos);

    // Ensure input stays focused
    statusInput.focus();
  }
}
function openMeetEvent() {

  addEventSub.show()
  router.push({
    query: { modal: 'addEvent' }
  })
}

function openComments() {
  commentTxt.value = ''
  commentModal.show();
  fetchComments(selectedEvent.value?.meet_event_id ?? 0)
}
function handleToggle() {
  showPicker.value = true
  nextTick(() => {
    if (emojiPickerRef.value) {
      emojiPickerRef.value.toggleEmojiPicker()
    }
  })
}

async function addLikeDisLike() {

  let meet_event_id = selectedEvent.value?.meet_event_id
  is_like_loading.value = true;
  let api_url = getUrl(RequestURL.meetLikeDisLike);
  let postData = {
    meet_event_id: meet_event_id,
    user_id: login_store.getUserDetails?.user_id
  }
  let response = await $fetch<SuccessError<FeedsModel.FeedLikeDisLikeResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  is_like_loading.value = false;

  if (response.success) {
    let state = response.response?.state ?? ''
    let feed = allMeetEvents.value.filter((history: MeetEventsModel.ListResponseModel) => history.meet_event_id === meet_event_id)
    if (feed.length > 0) {
      if (state === 'liked') {
        feed[0].is_liked = true
        if (selectedEvent.value) {
          selectedEvent.value.like_count = (selectedEvent.value?.like_count ?? 0) + 1
        }

      }
      else {
        feed[0].is_liked = false
        if (selectedEvent.value) {
          selectedEvent.value.like_count = (selectedEvent.value?.like_count ?? 0) - 1
        }
      }
    }
  }
  else {
    showToastError(response.message)
  }


}

async function selectCustomEmoji(emoji: string) {

  if (is_add_comment_loading.value) {
    return;
  }
  is_add_comment_loading.value = true;
  let postData = {
    meet_event_id: selectedEvent.value?.meet_event_id,
    user_id: login_store.getUserDetails?.user_id,
    comment: emoji,
    comment_type: 'emoji'
  }

  let api_url = getUrl(RequestURL.addMeetComment);
  let response = await $fetch<SuccessError<FeedsModel.FetchFeedCommentResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  is_add_comment_loading.value = false;
  if (response.success) {
    comments.value.push(response.response ?? {})
    if (selectedEvent.value) {
      selectedEvent.value.comment_count = (selectedEvent.value.comment_count ?? 0) + 1
    }
  }
  else {
    showToastError(response.message)
  }
}

async function addComment() {
  let trim = commentTxt.value.trim() ?? ''
  if (is_add_comment_loading.value || trim.length === 0) {
    return;
  }
  is_add_comment_loading.value = true;
  let postData = {
    meet_event_id: selectedEvent.value?.meet_event_id,
    user_id: login_store.getUserDetails?.user_id,
    comment: trim,
    comment_type: 'text'
  }

  let api_url = getUrl(RequestURL.addMeetComment);
  let response = await $fetch<SuccessError<FeedsModel.FetchFeedCommentResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  is_add_comment_loading.value = false;
  if (response.success) {
    comments.value.push(response.response ?? {})
    commentTxt.value = ''
    if (selectedEvent.value) {
      selectedEvent.value.comment_count = (selectedEvent.value.comment_count ?? 0) + 1
    }

  }
  else {
    showToastError(response.message)
  }

}
async function fetchComments(feed_id: number) {
  if (is_comment_loading.value) {
    return;
  }
  comments.value = []
  is_comment_loading.value = true;
  let api_url = getUrl(RequestURL.fetchMeetComments);
  let postData = {
    meet_event_id: feed_id
  }
  let response = await $fetch<SuccessError<FeedsModel.FetchFeedCommentResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  is_comment_loading.value = false;
  comments.value = response.result ?? []
  if (selectedEvent.value) {
    selectedEvent.value.comment_count = comments.value.length
  }
}

async function createMeetEvent() {
  const meetDateISO = buildMeetDateISO()

  if (!meetDateISO) {
    showToastError('Please select date and time')
    return;
  }

  const townId = isCustomLocation.value
    ? selectedTown.value?.town_id
    : login_store.getUserDetails?.town_id

  if (!townId) {
    showToastError('Town not selected')
    return;
  }

  if (selectedLookingFor.value.length === 0) {
    showToastError('lookingFor not selected')
    return;
  }

  const payload: MeetEventsModel.CreateRequestModel = {
    user_id: user_store.getLoginId,
    meet_date: meetDateISO,
    meet_type: selectedMeetType.value,
    description: description.value,
    meet_photo: selectedMedia.value?.hd_feed_image ?? '',

    looking_for: selectedLookingFor.value,
    min_age: minAge.value,
    max_age: maxAge.value,

    town_id: townId,
    radius: radius.value,

    can_comment: can_comment.value,
    can_like: can_like.value
  }

  is_event_loading.value = true
  try {
    let requestUrl = getUrl(RequestURL.createMeetEvent)
    let response = await $fetch<SuccessError<MeetEventsModel.CreateResponseModel>>(requestUrl, {
      method: 'POST',
      body: payload
    })
    is_event_loading.value = false


    // success UX
    if (response.success) {
      resetMeetEvent()
      addEventSub.hide()
      showToastSuccess(response.message)
    }
    else {
      showToastError(response.message)
    }
    // TODO: close modal + refresh list

  } catch (e: any) {
    is_event_loading.value = false
    console.log("why in catch", e)
    showToastError(e?.data?.message)
  }
}


</script>
<style scoped>
.lsv-media-grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 200px;
  /* width of each item */
  gap: 16px;

  overflow-x: auto;
  overflow-y: hidden;

  margin-bottom: 24px;
  padding: 16px;


}
</style>
