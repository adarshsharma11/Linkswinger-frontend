<template>
  <li class="chat-friend-toggle">
    <a
      class="icon-btn btn-light bg-transparent button-effect outside"
      href="#"
      data-tippy-content="Quick action" @click="toggle"
      ><Icon name="lucide:ellipsis-vertical"></Icon>
    </a>
    <div class="chat-frind-content" :style="commonStore.showprofilemenu?'display: block;':'display: none;'">
      <ul>
        <li>
          <a class="icon-btn btn-outline-primary button-effect btn-sm" href="#"
            ><Icon name="lucide:user"></Icon
          ></a>
          <h5>profile</h5>
        </li>
        <li>
          <a class="icon-btn btn-outline-success button-effect btn-sm" href="#"
            ><Icon name="lucide:circle-plus"></Icon
          ></a>
          <h5>archive</h5>
        </li>
        <li>
          <a class="icon-btn btn-outline-danger button-effect btn-sm" href="#"
            ><Icon name="lucide:trash-2"></Icon
          ></a>
          <h5>delete</h5>
        </li>
        <li>
          <a class="icon-btn btn-outline-light button-effect btn-sm" href="#"
            ><Icon name="lucide:circle-slash-2"></Icon
          ></a>
          <h5>block</h5>
        </li>
      </ul>
    </div>
  </li>
</template>
<script setup>
import { Icon } from "#components";
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();
const toggle = () => {
      commonStore.showprofilemenu = !commonStore.showprofilemenu;
    };
</script>

