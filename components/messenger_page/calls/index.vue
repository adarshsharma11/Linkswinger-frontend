<template>

  <div
    class="tab-pane fade"
    :class="activechat == 2 ? 'show active' : ''"
    id="call"
    role="tabpanel"
    aria-labelledby="call-tab"
  >
    <div class="theme-tab tab-icon">
      <ul class="nav nav-tabs" id="contactTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="activecalltabs == 1 ? 'active' : ''"
            @click="activateCalls(1)"
            id="con1-tab"
            data-toggle="tab"
            href="javascript:void(0);"
            role="tab"
            aria-controls="con1"
            aria-selected="true"
            >All</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="activecalltabs == 2 ? 'active' : ''"
            @click="activateCalls(2)"
            id="con3-tab"
            data-toggle="tab"
            href="javascript:void(0);"
            role="tab"
            aria-controls="con3"
            aria-selected="false"
            ><Icon name="lucide:phone-incoming" size="15" height="15"></Icon
          ></a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="activecalltabs == 3 ? 'active' : ''"
            @click="activateCalls(3)"
            id="con4-tab"
            data-toggle="tab"
            href="javascript:void(0);"
            role="tab"
            aria-controls="con4"
            aria-selected="false"
            ><Icon name="lucide:phone-outgoing" size="15" height="15"></Icon
          ></a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="activecalltabs == 4 ? 'active' : ''"
            @click="activateCalls(4)"
            id="con2-tab"
            data-toggle="tab"
            href="javascript:void(0);"
            role="tab"
            aria-controls="con2"
            aria-selected="false"
            ><Icon name="lucide:phone-missed" size="15" height="15"></Icon
          ></a>
        </li>
      </ul>
      <div class="tab-content" id="contactTabContent">
        <div class="tab-content" id="contactTabContent">
          <div
            class="tab-pane fade"
            :class="activecalltabs == 1 ? 'show active' : ''"
            id="con1"
            role="tabpanel"
            aria-labelledby="con1-tab"
          >
            <ul class="call-log-main">
              <MessengerPageCallsAllcalls/>
            </ul>
          </div>
        </div>
        <MessengerPageCallsMissed/>
        <MessengerPageCallsReceived/>
        <MessengerPageCallsDial/>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useCommonStore } from "@/store/common";
const commonStore = useCommonStore();
let activeIndex=ref(0)

const activechat = computed(() => commonStore.activechat);
const activecalltabs = computed(() => commonStore.activecalltabs);
const activateCalls = (type) => {
  commonStore.activecalltabs = type;
};

</script>