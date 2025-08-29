<template>

  <div class="row">
    <div class="col-sm-5">
      <div class="user-profile mb-3">
        <div class="user-content">
          <img
            class="img-fluid"
            src="/images/contact/2.jpg"
            alt="user-img"
          />
          <h3>Josephin water</h3>
          <h4 class="mt-2">+0 1800 76855</h4>
          <ul>
            <li><i class="fa fa-twitch"></i>message</li>
            <li>
              <i
                class="fa fa-phone"
                data-bs-toggle="modal" data-bs-target="#audiocall"
              ></i
              >voice call
            </li>
            <li>
              <i
                class="fa fa-video-camera"
                data-tippy-content="Quick Video Call"
             data-bs-toggle="modal" data-bs-target="#videocall"
              ></i
              >video call
            </li>
          </ul>
        </div>
      </div>
      <div class="user-profile">
        <MessengerPageCommonShareddoc/>
      </div>
    </div>
    <div class="col-sm-7 position-relative">
      <div class="call-log-main custom-scroll">
        <div
          class="coll-log-group"
          v-for="calllog in calllogs"
          :key="calllog.id"
        >
          <div class="log-content-left">
            <div class="media d-flex">
              <Icon :name="calllog.log_symbol"></Icon>
              <div class="media-body flex-grow-1">
                <h5>{{ calllog.log_type }}</h5>
              </div>
            </div>
          </div>
          <div class="log-content-right">
            <h6>{{ calllog.time }} &nbsp;{{ calllog.date }}</h6>
          </div>
        </div>
      </div>
      <div class="call-log-clear">
        <i class="ti-trash font-danger"></i
        ><span class="font-danger">Delete call log</span>
      </div>
    </div>
  </div>


</template>

<script setup>
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();

const calllogs = computed(() => commonStore.calllogs);

</script>