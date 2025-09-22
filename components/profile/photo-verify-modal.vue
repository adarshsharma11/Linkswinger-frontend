<template>
  <!-- Modal -->
  <div
    class="modal fade add-popup verify-modal"
    id="photoVerificationModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content bg-dark text-white">
        <!-- Header -->
        <div class="modal-header border-0">
          <h2 class="modal-title text-white">Photo Verification</h2>
          <button
            class="close text-danger fs-3 fw-bold"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <!-- Example Images Row -->
          <div class="row mb-4 g-3">
            <div class="col-12 col-md-6 text-center">
              <p class="small text-white fw-bold">Normal Photo Example</p>
              <img
                src="/images/samples/normal-sample.png"
                alt="Normal Example"
                class="img-fluid rounded shadow sample-photo"
              />
            </div>
            <div class="col-12 col-md-6 text-center">
              <p class="small text-white fw-bold">Code-in-Hand Example</p>
              <img
                src="/images/samples/code-sample.png"
                alt="Code Example"
                class="img-fluid rounded shadow sample-photo"
              />
            </div>
          </div>

          <!-- Upload Section -->
          <div
            class="upload-area p-4 border border-secondary rounded text-center text-white position-relative"
            ref="uploadArea"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            @drop.prevent="handleDrop"
            :class="{ 'drag-over': dragOver }"
          >
            <p class="mb-2">Drag & drop your photo here, or click to upload</p>
            <input
              type="file"
              accept="image/*"
              class="form-control d-none"
              ref="fileInput"
              @change="handleFileUpload"
            />
            <button
              class="btn btn-outline-light btn-sm"
              @click="triggerFileInput"
            >
              Upload Photo
            </button>

            <!-- Ripple Effect -->
            <span
              v-if="showRipple"
              class="ripple"
              :style="{ top: rippleY + 'px', left: rippleX + 'px' }"
              @animationend="showRipple = false"
            ></span>
          </div>

          <!-- Preview -->
          <div
            v-if="previewUrl"
            class="mt-4 d-flex justify-content-center position-relative"
          >
            <div class="text-center">
              <!-- Red Cross Button -->
              <button
                type="button"
                class="btn btn-sm position-absolute md-top-0 end-0 m-2 text-white top-[10px]"
                aria-label="Remove"
                @click="removePhoto"
              >
                ✖
              </button>

              <p class="small text-white fw-bold">Your Uploaded Photo</p>
              <img
                :src="previewUrl"
                alt="Preview"
                class="img-fluid rounded shadow uploaded-photo"
              />
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button type="button" class="btn bg-theme-color">
            Submit for Verification
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const uploadArea = ref<HTMLElement | null>(null);

const dragOver = ref(false);
const showRipple = ref(false);
const rippleX = ref(0);
const rippleY = ref(0);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    previewUrl.value = URL.createObjectURL(file);
  }
}

function handleDrop(event: DragEvent) {
  dragOver.value = false;
  const file = event.dataTransfer?.files[0];
  if (file) {
    previewUrl.value = URL.createObjectURL(file);

    // Ripple position (relative to drop area)
    if (uploadArea.value) {
      const rect = uploadArea.value.getBoundingClientRect();
      rippleX.value = event.clientX - rect.left;
      rippleY.value = event.clientY - rect.top;
      showRipple.value = true;
    }
  }
}

function removePhoto() {
  previewUrl.value = null;
}
</script>