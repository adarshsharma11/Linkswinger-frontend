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
        <button class="meet-btn meet-primary" aria-label="Go to Add Meet Event" data-bs-toggle="modal" data-bs-target="#addMeetBtn">Add Meet Event</button>
      </div>
  </div>
  <div class="meet-grid">
      <!-- Left: Filters -->
      <div class="meet-panel">
        <h2>Filters</h2>
        <p class="meet-hint">Location, today/date filters, looking for, friends/crush, and age range.</p>

        <div class="meet-filter-block">
          <div class="meet-label-row">
            <img src="/images/badges/animated/50X50px/location.gif" class="meet-loc-icon" alt="">
            <span class="meet-label">Location (town/postcode)</span>
          </div>
          <input type="text" id="filterLocation" placeholder="e.g., Walsall / WS1 / Birmingham" />
        </div>

        <!-- ✅ Replaced Mode with Today + Specific Date filters -->
        <div class="meet-filter-block">
          <span class="meet-label">Meeting time filters</span>
          <div class="meet-chips">
            <label class="meet-chip">
              <input type="checkbox" id="filterTodayOnly">
              <span>Meeting today</span>
            </label>
          </div>
        </div>

        <div class="meet-filter-block">
          <span class="meet-label">Meeting on a specific date</span>
          <input type="date" id="filterSpecificDate" />
          <div class="meet-filter-actions">
            <button class="meet-btn meet-small meet-ghost" id="clearSpecificDateBtn" type="button">Clear date</button>
          </div>
        </div>

        <div class="meet-filter-block">
          <span class="meet-label">Looking for (multi-select)</span>
          <div class="meet-chips" id="filterLookingFor">
            <label class="meet-chip"><input type="checkbox" value="Man"><span>Man</span></label>
            <label class="meet-chip"><input type="checkbox" value="Woman"><span>Woman</span></label>
            <label class="meet-chip"><input type="checkbox" value="Couple M/F"><span>Couple M/F</span></label>
            <label class="meet-chip"><input type="checkbox" value="Couple M/M"><span>Couple M/M</span></label>
            <label class="meet-chip"><input type="checkbox" value="Couple F/F"><span>Couple F/F</span></label>
            <label class="meet-chip"><input type="checkbox" value="TS"><span>TS</span></label>
          </div>
        </div>

        <div class="meet-filter-block">
          <span class="meet-label">Show</span>
          <select id="filterRelationship">
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
              <input type="number" id="filterMinAge" min="18" max="99" step="1" value="18" />
            </div>
            <div>
              <span class="meet-label">Max</span>
              <input type="number" id="filterMaxAge" min="18" max="99" step="1" value="99" />
            </div>
          </div>
          <div class="meet-filter-actions">
            <button class="meet-btn meet-small meet-ghost" id="resetAgeBtn" type="button">Reset 18–99</button>
          </div>
        </div>

        <div class="meet-filter-actions">
          <button class="meet-btn meet-small meet-ghost" id="clearFiltersBtn">Clear</button>
          <button class="meet-btn meet-small" id="applyFiltersBtn">Apply</button>
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
            <h2 style="margin-bottom:2px;">Active Meet Events</h2>
            <div class="meet-hint" style="margin:0;">Click a card to open event info.</div>
          </div>
          <div class="meet-count" id="countLabel">3 events</div>
        </div>

        <div id="eventList" class="meet-event-list">
          <div class="meet-event-card" aria-label="Go to details" data-bs-toggle="modal" data-bs-target="#detailsBackdrop">
          <div class="meet-event-row">
            <div class="meet-who">
              <div class="meet-avatar">CO</div>
              <div>
                <div class="meet-name">Couple_Ruby</div>
                <div class="meet-tagline">
                  Couple F/F
                  • Friend
                  
                </div>
              </div>
            </div>
            <span class="meet-badge meet-live">Meeting today</span>
          </div>

          <div class="meet-event-meta">
            <span class="meet-badge">Accommodate</span>
            <span class="meet-badge">Time: 06:47 PM</span>
            <span class="meet-badge">Birmingham • B1</span>
            <span class="meet-badge">Age: 25–45</span>
          </div>

          <div class="meet-event-mini" style="margin-top:6px;">
            <span class="meet-muted">Looking for:</span>
            Couple M/F, Couple M/M, Man
          </div>

          <div class="meet-event-desc-mini">Hotel chill, drinks first. Respectful vibes only ✨</div>
        </div><div class="meet-event-card" aria-label="Go to details" data-bs-toggle="modal" data-bs-target="#detailsBackdrop">
          <div class="meet-event-row">
            <div class="meet-who">
              <div class="meet-avatar">DA</div>
              <div>
                <div class="meet-name">Dan_31</div>
                <div class="meet-tagline">
                  Man
                  
                  • Crush
                </div>
              </div>
            </div>
            <span class="meet-badge live">Meeting on date</span>
          </div>

          <div class="meet-event-meta">
            <span class="meet-badge">Outdoor</span>
            <span class="meet-badge">Date: 2025-12-18</span>
            <span class="meet-badge">Walsall • WS1</span>
            <span class="meet-badge">Age: 18–99</span>
          </div>

          <div class="meet-event-mini" style="margin-top:6px;">
            <span class="meet-muted">Looking for:</span>
            Woman, TS
          </div>

          <div class="meet-event-desc-mini">Coffee + walk, open to see where it goes ☕😉</div>
        </div><div class="meet-event-card" aria-label="Go to details" data-bs-toggle="modal" data-bs-target="#detailsBackdrop">
          <div class="meet-event-row">
            <div class="meet-who">
              <div class="meet-avatar">MA</div>
              <div>
                <div class="meet-name">Maya_X</div>
                <div class="meet-tagline">
                  Woman
                  
                  
                </div>
              </div>
            </div>
            <span class="meet-badge meet-live">Meeting today</span>
          </div>

          <div class="meet-event-meta">
            <span class="meet-badge">Travel</span>
            <span class="meet-badge">Time: 09:17 PM</span>
            <span class="meet-badge">London • SW1</span>
            <span class="meet-badge">Age: 28–50</span>
          </div>

          <div class="meet-event-mini" style="margin-top:6px;">
            <span class="meet-muted">Looking for:</span>
            Man, Couple M/F
          </div>

          <div class="meet-event-desc-mini">In town for the night. Discreet, fun, no drama 🔥</div>
        </div></div>

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
			  <div class="modal-sub" id="detailsSub">Created: 12/16/2025, 12:17:55 PM</div>
			</div>

			<div class="meet-head-right">
			  <a href="#" class="meet-profile-link" id="detailsProfileLink">Couple_Ruby</a>
			  <span class="meet-head-pill" id="detailsMeetTypePill">Accommodate</span>
			  <span class="meet-head-pill" id="detailsLookingPill">Couple M/F, Couple M/M, Man</span>
			  <span class="meet-head-pill" id="detailsLocationPill">Birmingham • B1</span>
			  <span class="meet-head-pill live" id="detailsWhenPill">Today • 02:02 PM</span>
			  <button class="meet-btn meet-small meet-ghost" data-bs-dismiss="modal" aria-label="Close">Close</button>
			</div>
		</div>
        <!-- Body -->
		<div class="meet-modal-grid">
			<div>
			  <div class="meet-detail-photo">
				<span class="meet-label" id="detailsPhotoLabel">Photo 3</span>
			  </div>

			  <div class="meet-section">
				<span class="meet-label">Description</span>
				<div id="detailsDesc" style="font-size:12px; line-height:1.45; color:#dfe3f7; white-space:pre-wrap;">Hotel chill, drinks first. Respectful vibes only ✨</div>
			  </div>
			</div>

			<div>
			  <div class="meet-section">
				<span class="meet-label">Event info</span>
				<div class="meet-info-stack">
				  <div class="meet-info-box">
					<div class="meet-info-label">Profile</div>
					<div class="meet-info-value" id="detailsWhoText">Couple_Ruby (Couple F/F)</div>
				  </div>
				  <div class="meet-info-box">
					<div class="meet-info-label">When</div>
					<div class="meet-info-value" id="detailsWhenText">Meeting today at 02:02 PM</div>
				  </div>
				  <div class="meet-info-box">
					<div class="meet-info-label">Looking for</div>
					<div class="meet-info-value" id="detailsLookingText">Couple M/F, Couple M/M, Man</div>
				  </div>
				  <div class="meet-info-box">
					<div class="meet-info-label">Location</div>
					<div class="meet-info-value" id="detailsLocationText">Birmingham • B1</div>
				  </div>
				  <div class="meet-info-box">
					<div class="meet-info-label">Age target</div>
					<div class="meet-info-value" id="detailsAgeText">25–45</div>
				  </div>
				</div>
			  </div>

			  <div class="meet-section" id="ownerInteractionBlock" style="display:none;">
				<span class="meet-label">Your event settings</span>
				<div class="meet-inline">
				  <div class="meet-toggle-row">
					<div>
					  <div class="meet-t-label">Comments</div>
					  <div class="meet-t-sub">Turn comments on/off</div>
					</div>
					<div class="meet-switch on" id="ownerCommentsSwitch" role="switch" aria-checked="true" tabindex="0"></div>
				  </div>

				  <div class="meet-toggle-row">
					<div>
					  <div class="meet-t-label">Likes</div>
					  <div class="meet-t-sub">Turn likes on/off</div>
					</div>
					<div class="meet-switch on" id="ownerLikesSwitch" role="switch" aria-checked="true" tabindex="0"></div>
				  </div>
				</div>
				<div class="meet-foot">Only visible for your own meet event.</div>
			  </div>

			  <div class="meet-section">
				<span class="meet-label">Demo actions</span>
				<div class="meet-inline">
				  <button class="meet-btn meet-small" disabled="">Like</button>
				  <button class="meet-btn meet-small" disabled="">Comment</button>
				  <button class="meet-btn meet-small meet-ghost" disabled="">Message</button>
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
    <div class="meet-choice-card active" id="choiceToday">
    <div class="meet-t">Meet today</div>
    <div class="meet-d">Select a time within the next 12 hours</div>
    </div>
    <div class="meet-choice-card" id="choiceDate">
    <div class="meet-t">Meet on a specific date</div>
    <div class="meet-d">Pick a date (demo: next 14 days)</div>
    </div>
  </div>
</div>
<div class="meet-section" id="todayTimeSection">
  <span class="meet-label">Select time (next 12 hours)</span>
  <select id="createTodayTime"><option value="2025-12-16T07:30:00.000Z">01:00 PM</option><option value="2025-12-16T08:30:00.000Z">02:00 PM</option><option value="2025-12-16T09:30:00.000Z">03:00 PM</option><option value="2025-12-16T10:30:00.000Z">04:00 PM</option><option value="2025-12-16T11:30:00.000Z">05:00 PM</option><option value="2025-12-16T12:30:00.000Z">06:00 PM</option><option value="2025-12-16T13:30:00.000Z">07:00 PM</option><option value="2025-12-16T14:30:00.000Z">08:00 PM</option><option value="2025-12-16T15:30:00.000Z">09:00 PM</option><option value="2025-12-16T16:30:00.000Z">10:00 PM</option><option value="2025-12-16T17:30:00.000Z">11:00 PM</option><option value="2025-12-16T18:30:00.000Z">12:00 AM</option></select>
  <div class="meet-foot">This is a rolling list based on current time (demo).</div>
</div>
<div class="meet-section" id="dateSection" style="display:none;">
  <span class="meet-label">Select date</span>
  <input type="date" id="createSpecificDate" min="2025-12-16" max="2025-12-30">
</div>
<div class="meet-section">
  <span class="meet-label">Meet type (pick one)</span>
  <div class="meet-chips">
    <label class="meet-chip"><input type="radio" name="createMeetType" value="Outdoor" checked=""><span>Outdoor</span></label>
    <label class="meet-chip"><input type="radio" name="createMeetType" value="Accommodate"><span>Accommodate</span></label>
    <label class="meet-chip"><input type="radio" name="createMeetType" value="Travel"><span>Travel</span></label>
  </div>
</div>
<div class="meet-section">
  <span class="meet-label">Looking for (multi-select)</span>
  <div class="meet-chips" id="createLookingFor">
    <label class="meet-chip"><input type="checkbox" value="Man"><span>Man</span></label>
    <label class="meet-chip"><input type="checkbox" value="Woman"><span>Woman</span></label>
    <label class="meet-chip"><input type="checkbox" value="Couple M/F"><span>Couple M/F</span></label>
    <label class="meet-chip"><input type="checkbox" value="Couple M/M"><span>Couple M/M</span></label>
    <label class="meet-chip"><input type="checkbox" value="Couple F/F"><span>Couple F/F</span></label>
    <label class="meet-chip"><input type="checkbox" value="TS"><span>TS</span></label>
  </div>
</div>
<div class="meet-section">
  <span class="meet-label">Target age range</span>
  <div class="meet-inline">
    <div>
    <span class="meet-label">Min</span>
    <input type="number" id="createMinAge" min="18" max="99" value="18">
    </div>
    <div>
    <span class="meet-label">Max</span>
    <input type="number" id="createMaxAge" min="18" max="99" value="99">
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
    <div class="meet-switch" id="createCustomLocSwitch" role="switch" aria-checked="false" tabindex="0"></div>
  </div>
  <div class="meet-inline" style="margin-top:10px;">
    <div>
    <span class="meet-label">Town / Postcode</span>
    <input type="text" id="createCustomLocInput" placeholder="Optional" disabled="">
    </div>
  </div>
</div>
<div class="meet-section">
  <span class="meet-label">Description (emoji enabled)</span>
  <textarea id="createDesc" placeholder="Write your meet details 😈🔥"></textarea>
</div>
<div class="meet-section">
  <span class="meet-label">Picture</span>
  <div class="meet-inline">
    <button class="meet-btn meet-small" id="openGalleryBtn" type="button">Add picture</button>
    <input type="text" id="selectedPhotoField" value="No picture selected" readonly="">
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
    <div class="meet-switch on" id="createCommentsSwitch" role="switch" aria-checked="true" tabindex="0"></div>
    </div>

    <div class="meet-toggle-row">
    <div>
      <div class="meet-t-label">Likes</div>
      <div class="meet-t-sub">Allow likes on your event</div>
    </div>
    <div class="meet-switch on" id="createLikesSwitch" role="switch" aria-checked="true" tabindex="0"></div>
    </div>
  </div>
</div>
<div class="meet-divider"></div>
<div class="meet-inline">
  <button class="meet-btn meet-small meet-ghost" id="createResetBtn" type="button">Reset</button>
  <button class="meet-btn meet-small meet-primary" id="createSaveBtn" type="button">Save Event (Demo)</button>
</div>
<div class="meet-foot">
  Demo: saves an event by "You" and adds it to the feed.
  </div>
</div>
</div>
</div>  
</section>
</template>


<script setup>
    
</script>
