<template>

  <div
    class="document-tab dynemic-sidebar"
    :class="activesidebar === 3 ? 'active' : ''"
    id="document"
  >
    <div class="theme-title">
      <div class="d-flex">
        <div>
          <h2>Document</h2>
          <h4>List of document</h4>
        </div>
        <div class="flex-grow-1 text-end">
          <a
            class="icon-btn btn-outline-light btn-sm m-r-15 search"
            href="javascript:void(0)"
            @click="toggleSearchbar"
          >
            <Icon name="lucide:search" size="15" height="15"></Icon>
          </a>
          <form
            class="form-inline search-form"
            :class="{ open: openSearch }"
          >
            <div class="form-group">
              <input
                class="form-control-plaintext"
                type="search"
                placeholder="Search.."
              />
              <div
                class="icon-close close-search"
                @click="openSearch = false"
              ></div>
            </div>
          </form>
          <a
            class="icon-btn btn-outline-light btn-sm close-panel"
            href="javascript:void(0)"
            @click="activemenu(0)"
          >
            <Icon name="lucide:x" size="15" height="15"></Icon>
          </a>
        </div>
      </div>
    </div>
<MessengerPageCommonDocumentslist/>
  </div>

</template>

<script setup>
import { ref, computed } from "vue";
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();

const openSearch = ref(false);
const activesidebar = computed(() => commonStore.activesidebar);

const activemenu = (id) => {
  commonStore.activesidebar = id;
};

const toggleSearchbar = () => {
  openSearch.value = !openSearch.value;
};
</script>