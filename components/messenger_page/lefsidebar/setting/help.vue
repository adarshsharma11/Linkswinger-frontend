<template>

  <div class="setting-block">
    <div class="block" :class="activesetting == 4 ? 'open' : ''">
      <div class="d-flex">
        <div class="flex-grow-1">
          <h3>Help</h3>
        </div>
        <div class="media-right">
          <a
            class="icon-btn btn-outline-light btn-sm pull-right previous"
            href="javascript:void(0)"
            @click="activeSettingmenu(0)"
          >
          <Icon name="lucide:chevron-left">                </Icon></a>
        </div>
      </div>
      <ul class="help">
        <li>
          <h5><a href="javascript:void(0)">FAQ</a></h5>
        </li>
        <li>
          <h5><a href="javascript:void(0)"> Contact Us</a></h5>
        </li>
        <li>
          <h5><a href="javascript:void(0)">Terms and Privacy Policy</a></h5>
        </li>
        <li>
          <h5><a href="javascript:void(0)">Licenses</a></h5>
        </li>
        <li>
          <h5>
            <a href="javascript:void(0)">2025 - 26 Powered by Pixelstrap</a>
          </h5>
        </li>
      </ul>
    </div>
    <div class="d-flex">
      <div class="flex-grow-1">
        <h3>Help</h3>
        <h4>You are Confusion, Tell me</h4>
      </div>
      <div class="media-right">
        <a
          class="icon-btn btn-outline-light btn-sm pull-right next"
          href="javascript:void(0)"
          @click="activeSettingmenu(4)"
        >
        <Icon name="lucide:chevron-right" size="15" height="15"></Icon></a>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useCommonStore } from "@/store/common";
const commonStore = useCommonStore();
const activesetting = computed(() => commonStore.activesetting);
const activeSettingmenu = (id) => {
      commonStore.activesetting = id
    };
</script>
