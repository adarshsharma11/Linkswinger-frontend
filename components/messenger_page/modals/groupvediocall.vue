<template>
    <div class="modal fade" id="confvideocl" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content"> 
          <div class="modal-body">
            <div class="row confimg">
              <div class="col-6">
                <div class="vclimg" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/videocall_bg.jpg') + ')'},styleObject]"></div>
              </div>
              <div class="col-6">
                <div class="vclimg" :style="[{'background-image': 'url(' + getImgUrl('avtar/2.jpg') + ')'},styleObject]"></div>
              </div>
              <div class="col-6">
                <div class="vclimg" :style="[{'background-image': 'url(' + getImgUrl('avtar/4.jpg') + ')'},styleObject]"></div>
              </div>
              <div class="col-6">
                <div class="vclimg" :style="[{'background-image': 'url(' + getImgUrl('avtar/5.jpg') + ')'},styleObject]"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer clfooter">
            <div id="basicUsage3">00:00:00</div>
            <ul> 
              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" v-tooltip.top-start="'speaker'" title="speaker" data-tippy-content="speaker"><Icon name="lucide:volume-2" size="15" height="15"></Icon></a></li>
              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" v-tooltip.top-start="'Camera'" title="Camera" data-tippy-content="Camera"><Icon name="lucide:camera-off" size="15" height="15"></Icon></a></li>
              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" v-tooltip.top-start="'Add Call'" title="Add Call" data-tippy-content="Add Call"><Icon name="lucide:user-plus" size="15" height="15"></Icon></a></li>
              <li><a class="icon-btn btn-danger button-effect is-animating" href="javascript:void(0)" v-tooltip.top-start="'Hangup'" title="Hangup" data-dismiss="modal" data-tippy-content="Hangup"><Icon name="lucide:phone" size="15" height="15"></Icon></a></li>
              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" v-tooltip.top-start="'video-off'" title="video-off" data-tippy-content="Disable Video"><Icon name="lucide:video-off" size="15" height="15"></Icon></a></li>
              <li><a class="icon-btn btn-light button-effect mic" href="javascript:void(0)" v-tooltip.top-start="'mic-off'" title="mic-off" data-tippy-content="Mute"><Icon name="lucide:mic-off" size="15" height="15"></Icon></a></li>
              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" v-tooltip.top-start="'pause'" title="pause" data-tippy-content="Hold"><Icon name="lucide:pause" size="15" height="15"></Icon></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
 const styleObject = ref({
      "background-size": "cover",
      "background-position": "center",
      display: "block",
    })
    const getImgUrl = (path) => `/images/${path}`;
</script>
