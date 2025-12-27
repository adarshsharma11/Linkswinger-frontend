<template>
    <!-- Modal -->
    <div class="modal fade add-popup verify-modal" id="callAlertModal" tabindex="-1" role="dialog" aria-hidden="true"
    data-bs-backdrop="static"
     data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
            <div class="modal-content bg-dark text-white">
                <!-- Header -->

                <div class="modal-header border-0">
                    <h2 class="modal-title text-white">Call Alert</h2>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <div v-if="alertModel?.is_video ?? false"> Video Call</div>
                    <div v-if="(alertModel?.is_video ?? false) === false"> Voice Call</div>
                    <div> {{ alertModel?.nick_name }} is calling you </div>
                   
                </div>

                 <div class="modal-footer border-0" v-if="!is_loading">
                    <button type="button" class="btn btn-secondary" @click="onReject">
                        Decline
                    </button>
                    <button  type="button" class="btn bg-theme-color" @click="onAccept">
                        Accept
                    </button>
                </div>
                <span class="btn-loader" v-if="is_loading"></span>

                <!-- Footer -->
               
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['accept', 'reject'])

interface Props {
  is_loading: boolean,
  alertModel?: CallAlertModel | null
}
const props = defineProps<Props>()

function onAccept() {
  emit('accept')
}

function onReject() {
  emit('reject')
}
</script>