<template>
  <div class="modal notes-modal-main add-popup" id="notesModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"><i class="ti-bookmark-alt"></i>notes</h2>
          <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body custom-scroll p-0">
          <div class="card">
            <div class="card-header">
              <h5>Inline Editor</h5>
            </div>
            <div class="card-body">
              <client-only>
                             <QuillEditor contentType="html" toolbar="full"  v-model:content="editor" theme="snow" />
                        </client-only>
            </div>
            <div class="card-footer">
              <button class="btn btn-danger button-effect btn-sm" type="button">Save</button>
              <button class="btn btn-primary button-effect btn-sm" type="button" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
if (!process.server) {
      const { QuillEditor } = await import('@vueup/vue-quill');
      const { vueApp } = useNuxtApp();
      vueApp.component('QuillEditor', QuillEditor);
    }
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const editor = shallowRef(null);
const editorData = ref("<p>Enter text in the area on the left.</p>");


</script>
