<template>
    <div class="modal fade" id="confercall" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-body">
          <div class="conferencecall call-modal bg-size" :style="[
                {
                  'background-image': 'url(/images/avtar/big/audiocall.jpg )',
                },
                styleObject,
              ]"><img class="bg-img d-none" src="/images/avtar/big/audiocall.jpg" alt="Avatar"/>
            <div class="center-con text-center">
              <div class="usersprof">
                <div class="profile bg-size" :style="[
                {
                  'background-image': 'url(/images/avtar/2.jpg )',
                },
                styleObject,
              ]"></div>
                <div class="profile bg-size" :style="[
                {
                  'background-image': 'url(/images/avtar/3.jpg )',
                },
                styleObject,
              ]"></div>
                <div class="profile bg-size" :style="[
                {
                  'background-image': 'url(/images/avtar/5.jpg )',
                },
                styleObject,
              ]"></div>
                <div class="profile bg-size" :style="[
                {
                  'background-image': 'url(/images/avtar/big/videocall_bg.jpg )',
                },
                styleObject,
              ]"></div>
              </div>
              <p>Incoming Call</p>
              <h3>Conference Call</h3>
              <ul>
                <li>     <a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" href="#" data-bs-dismiss="modal"> <Icon name="lucide:phone"></Icon></a></li>
                <li><a class="icon-btn btn-success button-effect btn-xl is-animating" href="#"> <Icon name="lucide:video"></Icon></a></li>
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
    })
</script>