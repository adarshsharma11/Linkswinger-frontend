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
        <div class="nm-top-actions">
          <button 
            class="nm-pill" 
            :class="{ active: activePill === 'recent' }"
            @click="setActivePill('recent')"
          >Recently Added</button>
          <button 
            class="nm-pill" 
            :class="{ active: activePill === 'friends' }"
            @click="setActivePill('friends')"
          >Friends Focus</button>
          <button 
            class="nm-pill" 
            :class="{ active: activePill === 'nearby' }"
            @click="setActivePill('nearby')"
          >Local Focus</button>
          

        </div>
      </div>
    </div>

    <!-- MAIN WRAP -->
    <div class="nm-wrap">
      
      <!-- Mobile Filter Overlay -->
      <div 
         class="nm-mobile-filter-overlay"
         :class="{ active: mobileFiltersOpen }"
         @click="closeMobileFilters"
       ></div>

      <!-- FILTER PANEL -->
      <aside class="nm-panel" :class="{ collapsed: filtersCollapsed, 'mobile-open': mobileFiltersOpen }">
        
        <!-- Mobile Filter Header -->
        <div class="nm-mobile-filter-header">
          <h3>Filters</h3>
          <button 
            class="nm-close-btn"
            @click="closeMobileFilters"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="nm-row-between">
          <h3><span class="nm-dot"></span> Filters</h3>
          <button 
            class="nm-btn nm-btn-ghost nm-filter-toggle" 
            @click="toggleFilters"
          >{{ filtersCollapsed ? 'Show' : 'Hide' }}</button>
        </div>

        <!-- Location radius -->
        <div class="nm-group">
          <div class="nm-group-title">
            <span>Location radius</span>
            <span class="nm-range-value">{{ radius }} miles</span>
          </div>
          <label class="nm-chk">
            <input type="checkbox" v-model="radiusAll" />
            All distances
          </label>
          <input 
            class="nm-range" 
            type="range" 
            min="5" 
            max="3000" 
            step="5" 
            v-model.number="radius"
            :disabled="radiusAll"
          />
          <div class="nm-hint">Used for Nearby/Local filtering. Max shown is 3000 miles.</div>
        </div>
 <!-- Media types -->
          <div class="nm-group">
          <div class="nm-group-title">
            <span>Media type</span>
            <span class="nm-range-value">{{ selectedMediaTypes.length }}/3</span>
          </div>
          <label class="nm-chk">
            <input type="checkbox" value="All" v-model="selectedMediaTypes" /> All
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="photo" v-model="selectedMediaTypes" /> Photo
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="video" v-model="selectedMediaTypes" /> Video
          </label>
        </div>

        <!-- Profile types -->
        <div class="nm-group">
          <div class="nm-group-title">
            <span>Profile type</span>
            <span class="nm-range-value">{{ selectedProfileTypes.length }}/5</span>
          </div>
          <label class="nm-chk">
            <input type="checkbox" value="man" v-model="selectedProfileTypes" /> Man
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="women" v-model="selectedProfileTypes" /> Women
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="couple_mm" v-model="selectedProfileTypes" /> Couple M/M
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="couple_ff" v-model="selectedProfileTypes" /> Couple F/F
          </label>
          <label class="nm-chk">
            <input type="checkbox" value="couple_mf" v-model="selectedProfileTypes" /> Couple M/F
          </label>
        </div>


        <!-- Friends / Local-only toggles -->
        <div class="nm-group">
          <div class="nm-group-title"><span>Source</span></div>
          <label class="nm-chk">
            <input type="checkbox" v-model="friendsOnly" />
            Friends photos only
          </label>
          <label class="nm-chk">
            <input type="checkbox" v-model="localOnly" />
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
            <input type="radio" name="explicitMode" value="non" v-model="explicitMode" /> Non-explicit only
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
            <button 
              class="nm-btn nm-btn-ghost filters-btn"
              @click="openMobileFilters"
              v-show="!mobileFiltersOpen"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
              </svg>
              Filters
            </button>
            <div class="nm-search-mini">
              <img
                src="/images/badges/animated/150X150px/search.gif"
                alt="Search"
                style="width:18px;height:18px;object-fit:contain;opacity:.85;"
              />
              <input 
                type="text" 
                v-model="nameSearch" 
                placeholder="Filter by profile name" 
              />
            </div>
          </div>
          <div class="nm-filter-row">
            <div class="nm-sort">
              <select v-model="sortBy">
                <option value="recent">Sort: Recently added</option>
                <option value="distance">Sort: Nearest first</option>
                <option value="age">Sort: Uploader age</option>
                <option value="name">Sort: Profile name A–Z</option>
              </select>
            </div>
          </div>
        </div>
        </div>

        <div class="nm-grid-wrap">
          <!-- UNIFIED GRID -->
          <div class="nm-grid">
            <div 
              v-for="(item, index) in filteredMedia" 
              :key="`${item.mediaType}-${index}`"
              :class="item.mediaType === 'video' ? 'nm-video-card' : 'nm-photo-card'"
              @click="openViewer(item)"
            >
              <div class="nm-thumb">
                <img 
                  :src="item.thumb" 
                  :alt="item.name"
                  loading="lazy"
                />
                <div v-if="item.mediaType === 'video'" class="nm-play-badge">▶</div>
                <div v-if="item.mediaType === 'video'" class="nm-duration">{{ item.duration }}</div>
              </div>

              <div class="nm-meta">
                <div>
                  <div class="nm-name">{{ item.name }}</div>
                  <div class="nm-time">{{ item.timeText }}</div>
                </div>
                <div v-if="item.isNew"><span class="nm-badge-mini">NEW</span></div>
              </div>
            </div>
          </div>

          <div v-if="filteredMedia.length === 0" class="nm-empty">
            No media matches these filters.
          </div>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewMediaContent',
  data() {
    return {
      // Mobile filter overlay state
      mobileFiltersOpen: false,
      
      // Mock data for photos and videos
      mediaItems: [
        // Photo items
        {
          id: 1,
          mediaType: 'photo',
          name: 'Couple MM',
          profileType: 'couple_mm',
          age: 34,
          distance: 12,
          isFriend: true,
          isLocal: true,
          explicit: true,
          uploadedAt: new Date('2024-02-21'),
          thumb: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='700'%3E%3Crect width='100%25' height='100%25' fill='%2307080f'/%3E%3C/svg%3E",
          timeText: 'Uploaded 2 days ago',
          isNew: true
        },
        {
          id: 2,
          mediaType: 'photo',
          name: 'Man',
          profileType: 'man',
          age: 28,
          distance: 40,
          isFriend: false,
          isLocal: true,
          explicit: false,
          uploadedAt: new Date('2024-01-18'),
          thumb: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='700'%3E%3Crect width='100%25' height='100%25' fill='%2307080f'/%3E%3C/svg%3E",
          timeText: 'Uploaded 5 days ago',
          isNew: false
        },
        {
          id: 3,
          mediaType: 'photo',
          name: 'Couple MF',
          profileType: 'couple_mf',
          age: 31,
          distance: 65,
          isFriend: false,
          isLocal: false,
          explicit: true,
          uploadedAt: new Date('2023-12-05'),
          thumb: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='700'%3E%3Crect width='100%25' height='100%25' fill='%2307080f'/%3E%3C/svg%3E",
          timeText: 'Uploaded 1 week ago',
          isNew: false
        },
        {
          id: 4,
          mediaType: 'photo',
          name: 'Women',
          profileType: 'women',
          age: 26,
          distance: 8,
          isFriend: true,
          isLocal: true,
          explicit: false,
          uploadedAt: new Date('2024-02-10'),
          thumb: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='700'%3E%3Crect width='100%25' height='100%25' fill='%2307080f'/%3E%3C/svg%3E",
          timeText: 'Uploaded 3 days ago',
          isNew: true
        },
        // Video items
        {
          id: 5,
          mediaType: 'video',
          name: 'BirminghamLady',
          profileType: 'women',
          age: 29,
          distance: 25,
          isFriend: false,
          isLocal: true,
          explicit: false,
          uploadedAt: new Date('2024-02-20'),
          thumb: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='700'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%230b0f1f'/%3E%3Cstop offset='45%25' stop-color='%2307080f'/%3E%3Cstop offset='100%25' stop-color='%2312030a'/%3E%3C/linearGradient%3E%3CradialGradient id='g2' cx='15%25' cy='10%25' r='70%25'%3E%3Cstop offset='0%25' stop-color='rgba(255%2C60%2C110%2C0.30)'/%3E%3Cstop offset='60%25' stop-color='rgba(255%2C0%2C72%2C0.0)'/%3E%3C/radialGradient%3E%3CradialGradient id='g3' cx='90%25' cy='0%25' r='80%25'%3E%3Cstop offset='0%25' stop-color='rgba(255%2C0%2C72%2C0.18)'/%3E%3Cstop offset='70%25' stop-color='rgba(255%2C0%2C72%2C0.0)'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g1)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23g2)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23g3)'/%3E%3Ccircle cx='450' cy='300' r='90' fill='rgba(255%2C255%2C255%2C0.06)' stroke='rgba(255%2C255%2C255%2C0.12)'/%3E%3Cpolygon points='425%2C250 425%2C350 515%2C300' fill='rgba(255%2C255%2C255%2C0.85)'/%3E%3Crect x='60' y='520' width='780' height='120' rx='26' fill='rgba(255%2C255%2C255%2C0.03)' stroke='rgba(255%2C255%2C255%2C0.07)'/%3E%3Ctext x='100' y='575' fill='%23ffffff' font-family='Arial' font-size='44' font-weight='700' letter-spacing='2'%3EWOMEN%3C/text%3E%3Ctext x='100' y='615' fill='%23cfd6ff' font-family='Arial' font-size='20' letter-spacing='1'%3EPlaceholder • New Videos feed demo%3C/text%3E%3Ctext x='680' y='610' fill='%23ff7b9b' font-family='Arial' font-size='16' text-anchor='end'%3E2024-02-20%3C/text%3E%3Crect x='70' y='70' width='110' height='34' rx='12' fill='rgba(0%2C0%2C0%2C0.35)' stroke='rgba(255%2C255%2C255%2C0.10)'/%3E%3Ctext x='125' y='94' fill='%23ffffff' font-family='Arial' font-size='16' text-anchor='middle'%3E02%3A15%3C/text%3E%3C/svg%3E",
          duration: '02:15',
          timeText: 'Uploaded 2 days ago',
          isNew: true
        },
        {
          id: 6,
          mediaType: 'video',
          name: 'NeonPair_78',
          profileType: 'couple_mf',
          age: 32,
          distance: 45,
          isFriend: false,
          isLocal: false,
          explicit: true,
          uploadedAt: new Date('2024-02-18'),
          thumb: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='700'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%230b0f1f'/%3E%3Cstop offset='45%25' stop-color='%2307080f'/%3E%3Cstop offset='100%25' stop-color='%2312030a'/%3E%3C/linearGradient%3E%3CradialGradient id='g2' cx='15%25' cy='10%25' r='70%25'%3E%3Cstop offset='0%25' stop-color='rgba(255%2C60%2C110%2C0.30)'/%3E%3Cstop offset='60%25' stop-color='rgba(255%2C0%2C72%2C0.0)'/%3E%3C/radialGradient%3E%3CradialGradient id='g3' cx='90%25' cy='0%25' r='80%25'%3E%3Cstop offset='0%25' stop-color='rgba(255%2C0%2C72%2C0.18)'/%3E%3Cstop offset='70%25' stop-color='rgba(255%2C0%2C72%2C0.0)'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g1)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23g2)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23g3)'/%3E%3Ccircle cx='450' cy='300' r='90' fill='rgba(255%2C255%2C255%2C0.06)' stroke='rgba(255%2C255%2C255%2C0.12)'/%3E%3Cpolygon points='425%2C250 425%2C350 515%2C300' fill='rgba(255%2C255%2C255%2C0.85)'/%3E%3Crect x='60' y='520' width='780' height='120' rx='26' fill='rgba(255%2C255%2C255%2C0.03)' stroke='rgba(255%2C255%2C255%2C0.07)'/%3E%3Ctext x='100' y='575' fill='%23ffffff' font-family='Arial' font-size='44' font-weight='700' letter-spacing='2'%3ECOUPLE M/F%3C/text%3E%3Ctext x='100' y='615' fill='%23cfd6ff' font-family='Arial' font-size='20' letter-spacing='1'%3EPlaceholder • New Videos feed demo%3C/text%3E%3Ctext x='680' y='610' fill='%23ff7b9b' font-family='Arial' font-size='16' text-anchor='end'%3E2024-02-18%3C/text%3E%3Crect x='70' y='70' width='110' height='34' rx='12' fill='rgba(0%2C0%2C0%2C0.35)' stroke='rgba(255%2C255%2C255%2C0.10)'/%3E%3Ctext x='125' y='94' fill='%23ffffff' font-family='Arial' font-size='16' text-anchor='middle'%3E02%3A15%3C/text%3E%3C/svg%3E",
          duration: '02:15',
          timeText: 'Uploaded 4 days ago',
          isNew: false
        }
      ],
      
      // Filter state
      activePill: 'recent',
      filtersCollapsed: false,
      radius: 50,
      radiusAll: false,
      selectedProfileTypes: ['man', 'women', 'couple_mm', 'couple_ff', 'couple_mf'],
      selectedMediaTypes: ['All','photo', 'video'],
      friendsOnly: false,
      localOnly: false,
      explicitMode: 'both',
      ageMin: 18,
      ageMax: 99,
      nameSearch: '',
      sortBy: 'recent'
    }
  },
  
  computed: {
    filteredMedia() {
      let filtered = this.mediaItems.filter(item => {
        // Profile type filter
        if (!this.selectedProfileTypes.includes(item.profileType)) return false;
        
        // Distance filter
        if (!this.radiusAll && item.distance > this.radius) return false;
        
        // Friends only filter
        if (this.friendsOnly && !item.isFriend) return false;
        
        // Local only filter
        if (this.localOnly && !item.isLocal) return false;
        
        // Explicit filter
        if (this.explicitMode === 'non' && item.explicit) return false;
        if (this.explicitMode === 'explicit' && !item.explicit) return false;
        
        // Age filter
        if (item.age < this.ageMin || item.age > this.ageMax) return false;
        
        // Name search filter
        if (this.nameSearch && !item.name.toLowerCase().includes(this.nameSearch.toLowerCase())) return false;
        
        return true;
      });
      
      // Sorting
      switch (this.sortBy) {
        case 'recent':
          filtered.sort((a, b) => b.uploadedAt - a.uploadedAt);
          break;
        case 'distance':
          filtered.sort((a, b) => a.distance - b.distance);
          break;
        case 'age':
          filtered.sort((a, b) => a.age - b.age);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
      
      return filtered;
    },
    
    resultsSubtitle() {
      const count = this.filteredMedia.length;
      if (count === 0) return 'No media found';
      if (count === 1) return 'Showing 1 media item';
      return `Showing ${count} media items`;
    }
  },
  
  methods: {
    // Mobile filter methods
    openMobileFilters() {
      this.mobileFiltersOpen = true;
      document.body.classList.add('mobile-filters-open');
      // Focus management for accessibility
      this.$nextTick(() => {
        const closeBtn = this.$el.querySelector('.nm-close-btn');
        if (closeBtn) closeBtn.focus();
      });
    },
    
    closeMobileFilters() {
      this.mobileFiltersOpen = false;
      document.body.classList.remove('mobile-filters-open');
      // Return focus to trigger button
      const triggerBtn = this.$el.querySelector('.filters-btn');
      if (triggerBtn) triggerBtn.focus();
    },
    
    setActivePill(pill) {
      this.activePill = pill;
      // Apply preset filters based on pill selection
      switch (pill) {
        case 'friends':
          this.friendsOnly = true;
          this.localOnly = false;
          break;
        case 'nearby':
          this.friendsOnly = false;
          this.localOnly = true;
          this.radius = 100; // Set reasonable local radius
          this.radiusAll = false;
          break;
        default: // recent
          this.friendsOnly = false;
          this.localOnly = false;
          break;
      }
    },
    
    toggleFilters() {
      this.filtersCollapsed = !this.filtersCollapsed;
    },
    
    applyFilters() {
      // Filters are applied automatically through computed properties
      console.log('Filters applied:', {
        radius: this.radius,
        radiusAll: this.radiusAll,
        profileTypes: this.selectedProfileTypes,
        friendsOnly: this.friendsOnly,
        localOnly: this.localOnly,
        explicitMode: this.explicitMode,
        ageRange: [this.ageMin, this.ageMax],
        nameSearch: this.nameSearch,
        sortBy: this.sortBy
      });
    },
    
    clearFilters() {
      this.radius = 50;
      this.radiusAll = false;
      this.selectedProfileTypes = ['man', 'women', 'couple_mm', 'couple_ff', 'couple_mf'];
      this.friendsOnly = false;
      this.localOnly = false;
      this.explicitMode = 'both';
      this.ageMin = 18;
      this.ageMax = 99;
      this.nameSearch = '';
      this.sortBy = 'recent';
      this.activePill = 'recent';
    },
    
    openViewer(item) {
      console.log('Opening viewer for:', item);
      // Implement viewer logic here
    }
  },
  
  mounted() {
    console.log('NewMediaContent component mounted with unified photo/video support');
  }
}
</script>
