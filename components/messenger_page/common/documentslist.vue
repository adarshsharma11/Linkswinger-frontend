<template>
  <ul class="chat-main">
    <li v-for="document in documents" :key="document.id">
      <div class="chat-box">
        <div class="d-flex">
          <div class="profile">
            <a
              class="icon-btn btn-xl pull-right rouded15"
              :class="document.btn_class"
              href="javascript:void(0)"
            >
              <i :class="document.doc_type"></i>
            </a>
          </div>
          <div class="details">
            <h5>{{ document.filename }}</h5>
            <h6>{{ document.time }}</h6>
          </div>
          <div class="flex-grow-1">
            <a
              class="icon-btn btn-outline-light btn-sm pull-right"
              :href="document.doc"
              :download="document.doc"
              target="_blank"
            >
              <Icon name="lucide:download" size="15" height="15"></Icon>
            </a>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import { useSidebarStore } from "@/store/sidebar";

const sidebarStore = useSidebarStore();
const documents = computed(() => sidebarStore.documentData);
</script>
