<template>
    <!-- Modal -->
    <div class="modal fade add-popup verify-modal" id="mediaUploadModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
            <div class="modal-content bg-dark text-white">
                <!-- Header -->

                <div class="modal-header border-0">
                    <h2 class="modal-title text-white">Media Upload</h2>
                    <button class="close text-danger fs-3 fw-bold" type="button" data-bs-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <!-- Example Images Row -->

                    <!-- Upload Section -->
                    <div class="upload-area p-4 border border-secondary rounded text-center text-white position-relative"
                        ref="uploadArea" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false"
                        @drop.prevent="handleDrop" :class="{ 'drag-over': dragOver }" v-if="previewUrl === null">
                        <p class="mb-2">Drag & drop your media here, or click to upload</p>
                        <input type="file" accept="image/png,image/jpeg,video/mp4" class="form-control d-none"
                            ref="fileInput" @change="handleFileUpload" />
                        <button class="btn btn-outline-light btn-sm" @click="triggerFileInput">
                            Upload Media
                        </button>

                        <!-- Ripple Effect -->
                        <span v-if="showRipple" class="ripple" :style="{ top: rippleY + 'px', left: rippleX + 'px' }"
                            @animationend="showRipple = false"></span>
                    </div>
                    <div class="form-group" style="margin-top: 10px;">
                        <Multiselect v-model="feedType" :options="['Public', 'Friends-Only', 'Private']"
                            :multiple="false" :close-on-select="true" placeholder="Select Ethnicity" />
                    </div>
                    <div class="form-group" style="margin-top: 10px;">
                        <textarea v-model="feedDesc" placeholder="Write about this feed" rows="4"
                            style="resize:none; width: 100%; height: 150px;"> </textarea>
                    </div>

                    <div class="form-group" style="margin-top: 10px;">

                    </div>
                    <!-- Preview -->
                    <div v-if="previewUrl" class="mt-4 d-flex justify-content-center position-relative">
                        <div class="text-center">
                            <!-- Red Cross Button -->
                            <button type="button"
                                class="btn btn-sm position-absolute md-top-0 end-0 m-2 text-white top-[10px]"
                                aria-label="Remove" @click="removePhoto" v-if="!is_uploading">
                                ✖
                            </button>

                            <p class="small text-white fw-bold">Your Uploaded Photo</p>
                            <img :src="previewUrl" alt="Preview" class="img-fluid rounded shadow uploaded-photo" />
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button v-if="!is_uploading" type="button" class="btn bg-theme-color" @click="uploadMedia()">
                        Upload
                    </button>
                    <button v-if="is_uploading" type="button" class="btn bg-theme-color">
                        Upload {{ uploadProgress }}%
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FeedsModel, UsersModel } from "~/composables/models";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const uploadArea = ref<HTMLElement | null>(null);
const previewUrlFile = ref<Blob | null>(null);
const { $bootstrap } = useNuxtApp();
const dragOver = ref(false);
const showRipple = ref(false);
const rippleX = ref(0);
const rippleY = ref(0);
const is_uploading = ref(false)
const user_store = userStore();
const login_store = useLoginStore();
const uploadProgress = ref(0);
const feedType = ref('Public');
const feedDesc = ref('');
const contentType = ref('');


var mediaUploadModalSub: any = null
onMounted(() => {
    mediaUploadModalSub = new ($bootstrap as any).Modal(document.getElementById('mediaUploadModal'));
})
function triggerFileInput() {
    fileInput.value?.click();
}

async function handleFileUpload(event: Event) {
    previewUrl.value = null
    const target = event.target as HTMLInputElement;
    let files = target?.files ?? []
    const file = files[0]
    if (file) {
        contentType.value = file.type

        if (file.type.startsWith("image/")) {
            const profile_image = await file.arrayBuffer()
            previewUrlFile.value = new Blob([profile_image])
            previewUrl.value = URL.createObjectURL(file)
        }
        else {

            const video = document.createElement('video');
            video.preload = 'metadata';
            const video_file = await file.arrayBuffer()
            video.onloadedmetadata = function () {
                if (video.duration > 180) {
                    showToastError("Please upload video less than 3 minutes long.");
                    target.value = '' // Clear the selected file
                }
                else {
                    previewUrlFile.value = new Blob([video_file])
                    previewUrl.value = URL.createObjectURL(file)
                }
            };
            video.src = URL.createObjectURL(file);
        }


    }
    target.value = ''
}

function handleDrop(event: DragEvent) {
    dragOver.value = false;

    const files: File[] = Array.from(event.dataTransfer?.files ?? []);

    // Filter only images
    const imageFiles: File[] = files.filter((file: File) =>
        file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
        showToastError("Please drop an image file only!");
        return;
    }
    showRipple.value = true;
    previewUrl.value = null
    const file = files[0];
    contentType.value = file.type
    if (file) {
        previewUrl.value = URL.createObjectURL(file);

        // Ripple position (relative to drop area)
        if (uploadArea.value) {
            const rect = uploadArea.value.getBoundingClientRect();
            rippleX.value = event.clientX - rect.left;
            rippleY.value = event.clientY - rect.top;

        }
    }
}

function getCodeImage(): string {
    let gender = getGender()
    return "/images/samples/" + gender + "_code" + ".png"
}

function getGender(): string {
    let profile_type = login_store.getUserDetails?.profile_type ?? ''
    let gender = login_store.getUserDetails?.gender ?? ''
    let partner_gender = login_store.getUserDetails?.partner_gender ?? ''
    if (profile_type === 'Couple') {
        let genderShot = 'M';
        let partnerGenderShot = 'M';
        if (gender === 'Woman') {
            genderShot = 'F'
        }
        else if (gender === 'Others') {
            genderShot = 'TS'
        }

        if (partner_gender === 'Woman') {
            partnerGenderShot = 'F'
        }
        else if (partner_gender === 'Others') {
            partnerGenderShot = 'TS'
        }

        return genderShot + partnerGenderShot
    }
    return gender
}

function removePhoto() {
    previewUrl.value = null;
    contentType.value = ''
}


async function uploadMedia() {
    if (previewUrl.value === null) {
        showToastError('Please select media to upload.');
        return;
    }
    if (is_uploading.value) {
        return;
    }
    let api_url = getUrl(RequestURL.getFeedMediaURL);
    is_uploading.value = true;
    let response = await $fetch<SuccessError<FeedsModel.FeedsURLResponseModel>>(api_url, {
        method: 'POST',
        body: {
            "user_id": login_store.getUserDetails?.user_id,
            "contentType": contentType.value,
            "feed_type": feedType.value,
            "feed_desc": feedDesc.value
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let worker_model = response.response?.worker_model as WorkerModel
    worker_model.timeStamp = Date.now()
    upload(worker_model, contentType.value)
}

function upload(worker_model: WorkerModel, contentType: string = 'image/jpeg') {
    uploadProgress.value = 0;
    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            let value = Math.round((e.loaded / e.total) * 100)
            worker_model.progress = value
            sendmsgtoworker(worker_model, true)
            uploadProgress.value = value;
        }
    })

    xhr.upload.addEventListener('error', () => {
        // error.value = 'Upload failed'
        // uploading.value = false
        is_uploading.value = false;
        showToastError('Photo upload failed. Please try again.')
        worker_model.progress = -1
        sendmsgtoworker(worker_model, true)
        uploadProgress.value = 0;
    })

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            is_uploading.value = false;
            worker_model.progress = 100
            sendmsgtoworker(worker_model, true)
            uploadProgress.value = 100;
            mediaUploadModalSub.hide();
            removePhoto();
            showalert('Photo uploaded successfully and is under processing. You feed will be updated once processed.', true)
        }
    }

    xhr.open('PUT', worker_model.url ?? '')
    xhr.setRequestHeader('Content-Type', contentType)
    // add headers if needed: xhr.setRequestHeader('Authorization', 'Bearer ...')
    uploadProgress.value = 0;
    xhr.send(previewUrlFile.value)
}

</script>