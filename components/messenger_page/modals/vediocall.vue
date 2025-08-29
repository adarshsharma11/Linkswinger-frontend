<template>

  <div class="viddiolog modal fade" id="videocall" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-body">
          <div class="videocall call-modal"><img class="bg-img" src="/images/avtar/big/videocall_bg.jpg" alt="Avatar"/>
            <div class="small-image bg-size" :style="[
        {
          'background-image':
            'url(' + getImgUrl('avtar/big/videocall.jpg') + ')',
        },
        styleObject,
      ]"><img class="bg-img d-none" src="/images/avtar/big/videocall.jpg" alt="Avatar"/></div>
            <div class="d-flex gap-3 videocall-details">
              <div class="usersprof">
                <div class="profile"><img class="bg-img" src="/images/avtar/2.jpg" alt="Avatar"/></div>
                <div class="profile"><img class="bg-img" src="/images/avtar/3.jpg" alt="Avatar"/></div>
              </div>
              <div class="flex-grow-1">
                <h5>Josephin water</h5>
                <h6>America ,California</h6>
              </div>
              <div id="basicUsage">00:00:00</div>
              <div class="zoomcontent"><a class="text-dark" @click="toggleFullScreen()" href="javascript:void(0)"  data-tippy-content="Zoom Screen"><img src="/images/logo/maximize.svg" alt="zoom screen"/></a></div>
            </div>
            <div class="center-con text-center">
              <ul>
                <li><a class="icon-btn btn-light button-effect pause" href="#" data-tippy-content="Hold"><i class="ti-control-pause"></i></a></li>
                <li><a class="icon-btn btn-danger button-effect btn-xl is-animating" href="#" data-bs-dismiss="modal" data-tippy-content="Hangup"> <Icon name="lucide:phone"></Icon></a></li>
                <li><a class="icon-btn btn-light button-effect mic" href="#" data-tippy-content="Mute"><i class="fa fa-microphone"></i></a></li>
              </ul>
            </div>
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
});

const toggleFullScreen = () => {
  const modalDialog = document.querySelector(".modal-dialog");
  if (modalDialog?.classList.contains("active")) {
    modalDialog.className = "modal-dialog viddiolog fade show modal-dialog-centered";
  } else {
    modalDialog.className = "modal-dialog viddiolog fade show active modal-dialog-centered";
  }
};

const getImgUrl = (path) => `/images/${path}`;

</script>
