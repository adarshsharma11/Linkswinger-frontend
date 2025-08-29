<template>
  
  <div class="tab-pane" :class="activerightsidebarmenu == 2 ? 'active' : ''">
    <li id="notes">
      <div class="notes-main">
        <div class="theme-title">
          <div class="d-flex">
            <div>
              <h2>Notes</h2>
              <h4>Notes List</h4>
            </div>
            <div class="flex-grow-1 text-end">
              <a
                class="icon-btn btn-sm btn-outline-light close-apps"
                href="javascript:void(0)"
                @click="close(0)"
                ><Icon name="lucide:x" size="15" height="15"></Icon>
              </a>
            </div>
          </div>
        </div>
        <form class="default-form">
          <div class="form-group notes-content">
            <select>
              <option>Contact Or Channel</option>
              <option>Weekdays (Mon-Fri)</option>
              <option>Daily</option>
              <option>Weekly (Custom)</option>
            </select>
            <ul>
              <li>
                <a
                  class="icon-btn btn-light button-effect btn-sm"
                 data-bs-toggle="modal" data-bs-target="#notesModal"
                  @click="showNoteModal()"
                  ><Icon name="lucide:plus" size="15" height="15"></Icon
                ></a>
              </li>
            </ul>
          </div>
        </form>
        <div class="notes-list">
          <h6 class="mb-2 text-muted">Joshephin Water.10 Jan</h6>
          <div class="d-flex">
            <img
              class="img-fluid me-3"
              src="/images/file_icons/5.png"
              alt="media-img"
            />
            <div class="flex-grow-1">
              <h5 class="mt-0">Joshephin Water</h5>
            </div>
          </div>
          <h5 class="mb-2">Imporatnt project link</h5>
          <h6 class="mb-2">Please start testing task of your projects.</h6>
          <div class="forward-main">
            <a class="line fa fa-mail-forward" href="javascript:void(0)"
              >Forward
            </a>
          </div>
        </div>
      </div>
    </li>
  </div>
 
</template>
<script setup>
import { useCommonStore } from "@/store/common";
const noteComponent = ref(null);

const commonStore = useCommonStore();

const activerightsidebarmenu = computed(() => commonStore.activerightsidebarmenu);
const close = (id) => {
  commonStore.activerightsidebarmenu = id;
  document.getElementById("content")?.classList.add("small-sidebar");
};

const showNoteModal = () => {
  noteComponent.value?.show();
};
</script>

