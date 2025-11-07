<template>
    <!-- Modal -->
    <div class="modal fade add-popup verify-modal" id="callAlertModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
            <div class="modal-content bg-dark text-white">
                <!-- Header -->

                <div class="modal-header border-0">
                    <h2 class="modal-title text-white">Call Alert</h2>
                    <button class="close text-danger fs-3 fw-bold" type="button" data-bs-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <div v-if="alertModel?.is_video ?? false"> Video Call</div>
                    <div v-if="(alertModel?.is_video ?? false) === false"> Voice Call</div>
                    <div> {{ alertModel?.nick_name }} is calling you </div>
                   
                </div>

                 <div class="modal-footer border-0">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Decline
                    </button>
                    <button  type="button" class="btn bg-theme-color">
                        Accept
                    </button>
                </div>

                <!-- Footer -->
               
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['accept', 'reject'])

interface Props {
  is_loading: boolean,
  alertModel?: CallAlertModel
}
const props = defineProps<Props>()

function onAccept() {
  emit('accept')
}

function onReject() {
  emit('reject')
}
</script>