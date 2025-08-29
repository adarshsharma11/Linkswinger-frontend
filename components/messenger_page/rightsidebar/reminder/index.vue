<template>
  <div class="tab-pane" :class="activerightsidebarmenu == 4 ? 'active' : ''">
    <li id="reminder">
      <div class="reminder-main">
        <div class="theme-title">
          <div class="d-flex">
            <div>
              <h2>Reminders</h2>
              <h4>Set reminders</h4>
            </div>
            <div class="flex-grow-1 text-end">
              <a
                class="icon-btn btn-sm btn-outline-light close-apps"
                href="javascript:void(0)"
                @click="close(0)"
                ><Icon name="lucide:x" size="15" height="15"></Icon
                  ></a>
            </div>
          </div>
        </div>
        <div class="reminder-content tab-card">
          <i class="ti-alarm-clock"></i>
          <p>Never forget important tasks. Set personal and group reminders.</p>
          <a
            class="setreminder btn btn-primary button-effect btn-sm"
           data-bs-toggle="modal" data-bs-target="#setReminder"
            >set reminder</a
          >
        </div>
        <div class="reminder-list-disp">
          <h5>Themeforest Discusssion</h5>
          <h6>Project Discussion</h6>
          <span>11:22 PM | 15 FAB</span>
          <ul class="reminder-disp">
            <li class="reminder-list-toggle">
              <a class="icon-btn bg-transparent" href="javascript:void(0)"
                ><Icon name="lucide:ellipsis-vertical" size="15" height="15"></Icon
              ></a>
              <div class="reminder-contentlist-toggle">
                <ul>
                  <li>
                    <a class="icon-btn btn-sm" href="javascript:void(0)"
                      ><Icon name="lucide:trash"></Icon>
                    </a>
                    <h5>Delete</h5>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="reminder-list">
          <button
            class="Show-reminder"
            :style="showsession ? 'display:none' : 'display: '"
            @click="toggle()"
          >
            Show Completed
          </button>
          <button
            class="Hide-reminder"
            :style="showsession ? 'display:inline-block' : 'display:none'"
            @click="toggle()"
          >
            Hide Completed
          </button>
          <div
            class="target-reminder-list"
            :style="showsession ? 'display:block' : 'display:none'"
          >
            <h5>Session Start</h5>
            <h6>Project Discussion</h6>
            <h6>05:22 PM | 1 JAN</h6>
            <ul class="reminder-disp">
              <li class="reminder-toggle">
                <a
                  class="icon-btn bg-transparent"
                  href="javascript:void(0)"
                  data-tippy-content="Quick action"
                  ><Icon name="lucide:ellipsis-vertical" size="15" height="15"></Icon
                    ></a>
                <div class="reminder-content-toggle">
                  <ul>
                    <li>
                      <a class="icon-btn btn-sm" href="javascript:void(0)"
                        ><Icon name="lucide:trash"></Icon></a>
                      <h5>Delete</h5>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script setup>
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();
const showsession = ref(false);

const activerightsidebarmenu = computed(() => commonStore.activerightsidebarmenu);

const close = (id) => {
  commonStore.activerightsidebarmenu = id;
  document.getElementById("content").classList.add("small-sidebar");
};

const toggle = () => {
  showsession.value = !showsession.value;
};

const reminderComponent = ref(null);

const showReminderModal = () => {
  reminderComponent.value?.show();
};
</script>