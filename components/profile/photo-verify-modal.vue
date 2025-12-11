<template>
  <!-- Modal -->
  <div class="modal fade add-popup verify-modal" id="photoVerificationModal" tabindex="-1" role="dialog"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content bg-dark text-white">
        <!-- Header -->
        <div class="modal-header border-0">
          <h2 class="modal-title text-white">Your Photo verification code is {{
            login_store.getUserDetails?.user_udid?.toUpperCase().replace(/-/g, "").slice(-4) }}</h2>
          <button class="close text-danger fs-3 fw-bold" type="button" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <!-- Example Images Row -->
          <div class="row mb-4 g-3 justify-content-center">
            <!-- <div class="col-12 col-md-6 text-center">
              <p class="small text-white fw-bold">Normal Photo Example</p>
              <img src="/images/samples/normal-sample.png" alt="Normal Example"
                class="img-fluid rounded shadow sample-photo" />
            </div> -->
            <div class="col-12 col-md-6 text-center">
              <p class="small text-white fw-bold">Code-in-Hand Example</p>
              <img :src="getCodeImage()"
                alt="Code Example" class="img-fluid rounded shadow sample-photo" />
            </div>
          </div>

          <!-- Upload Section -->
          <div class="upload-area p-4 border border-secondary rounded text-center text-white position-relative"
            ref="uploadArea" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false"
            @drop.prevent="handleDrop" :class="{ 'drag-over': dragOver }" v-if="previewUrl === null">
            <p class="mb-2">Drag & drop your photo here, or click to upload</p>
            <input type="file" accept="image/png,image/jpeg" class="form-control d-none" ref="fileInput"
              @change="handleFileUpload" />
            <button class="btn btn-outline-light btn-sm" @click="triggerFileInput">
              Upload Photo
            </button>

            <!-- Ripple Effect -->
            <span v-if="showRipple" class="ripple" :style="{ top: rippleY + 'px', left: rippleX + 'px' }"
              @animationend="showRipple = false"></span>
          </div>

          <!-- Preview -->
          <div v-if="previewUrl" class="mt-4 d-flex justify-content-center position-relative">
            <div class="text-center">
              <!-- Red Cross Button -->
              <button type="button" class="btn btn-sm position-absolute md-top-0 end-0 m-2 text-white top-[10px]"
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
          <button type="button" class="btn bg-theme-color" @click="submitVerification()">
            Submit for Verification
            <span class="btn-loader" v-if="is_uploading"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UsersModel } from "~/composables/models";

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
var verifyModalSub: any = null
onMounted(() => {
  verifyModalSub = new ($bootstrap as any).Modal(document.getElementById('photoVerificationModal'));
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
    const profile_image = await file.arrayBuffer()
    previewUrlFile.value = new Blob([profile_image])
    previewUrl.value = URL.createObjectURL(file)
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
  const file = event.dataTransfer?.files[0];
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

function getCodeImage() : string
{
  let gender = getGender()
  return "/images/samples/" + gender + "_code" + ".png"
}

function getGender() : string
{
    let profile_type = login_store.getUserDetails?.profile_type ?? ''
    let gender = login_store.getUserDetails?.gender ?? ''
    let partner_gender = login_store.getUserDetails?.partner_gender ?? ''
    if (profile_type === 'Couple')
    { 
      let genderShot = 'M';
      let partnerGenderShot = 'M';
        if (gender === 'Woman')
        {
           genderShot = 'F'
        }
        else if (gender === 'Others')
        {
           genderShot = 'TS'
        }

if (partner_gender === 'Woman')
        {
           partnerGenderShot = 'F'
        }
        else if (partner_gender === 'Others')
        {
           partnerGenderShot = 'TS'
        }

         return genderShot + partnerGenderShot
    }
return gender
}

function removePhoto() {
  previewUrl.value = null;
}

async function submitVerification() {
  if (previewUrl.value === null) {
    showToastError('Please upload photo');
    return;
  }
  if (is_uploading.value) {
    return;
  }
  is_uploading.value = true
  const formData = new FormData();
  formData.append("user_id", (user_store.getLoginId ?? 0).toString());
  if (previewUrlFile.value) {
    formData.append("verify_photo", previewUrlFile.value);
  }
  const api_url = getUrl(RequestURL.uploadVerifyPhoto)
  let response_model = await $fetch<SuccessError<UsersModel.ValidateNicknameResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: formData,
  });
  is_uploading.value = false
  if (response_model.success) {
    previewUrlFile.value = null
    showToastSuccess(response_model.message)
    verifyModalSub.hide()
  }
  else {
    showToastError(response_model.message)
  }
}

</script>