<template>
  <!--Report popup-->
  <div class="modal fade report-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content text-white modal-inner report-small">
        <!-- Header -->
        <div class="rep-modal-header">
          <h2 id="rep-reportTitle">Report content</h2>
          <button class="rep-modal-close" id="closeReport" aria-label="Close" @click="close()">✕</button>
        </div>

        <!-- Body -->
        <div class="rep-modal-body">
          <p class="rep-modal-subtitle">
            Please only report content that clearly breaks our rules.
          </p>

          <div class="rep-warning-box">
            ⚠️ Please do not report for no reason. Misusing reports can lead
            to your own account being flagged and banned.
          </div>

          <div class="rep-field-group">
            <label class="rep-field-label">Reason for report</label>

            <div class="rep-reason-list">
              <label class="rep-reason-option">
                <input v-model="selectedReason" type="radio" name="report_reason" value="underage" />
                <span>Underage / age concern</span>
              </label>

              <label class="rep-reason-option">
                <input v-model="selectedReason" type="radio" name="report_reason" value="violence" />
                <span>Violence or self-harm</span>
              </label>

              <label class="rep-reason-option">
                <input  v-model="selectedReason" type="radio" name="report_reason" value="bestiality" />
                <span>Bestiality or sexual activity with animals</span>
              </label>

              <label class="rep-reason-option">
                <input v-model="selectedReason" type="radio" name="report_reason" value="drugs" />
                <span>Drug use or obvious drug dealing</span>
              </label>

              <label class="rep-reason-option">
                <input v-model="selectedReason" type="radio" name="report_reason" value="nonconsensual" />
                <span>Non-consensual or forced content</span>
              </label>

              <label class="rep-reason-option">
                <input type="radio" v-model="selectedReason" name="report_reason" value="harassment" />
                <span>Hate, harassment or threats</span>
              </label>

              <label class="rep-reason-option">
                <input type="radio" v-model="selectedReason" name="report_reason" value="spam" />
                <span>Spam / scam / fake profile</span>
              </label>

              <label class="rep-reason-option">
                <input type="radio" v-model="selectedReason" name="report_reason" value="copyright" />
                <span>Copyright / impersonation</span>
              </label>

              <label class="rep-reason-option">
                <input type="radio" v-model="selectedReason" name="report_reason" value="other" />
                <span>Other (please describe)</span>
              </label>
            </div>
          </div>

          <div class="rep-field-group">
            <label class="rep-field-label">Additional details (optional)</label>
            <textarea v-model="details" class="textarea"
              placeholder="Write any details that help our team review this report…"></textarea>
            <p class="rep-helper-text">
              For video chat, a screenshot may be captured when you submit this report.
            </p>
          </div>
        </div>

        <div class="rep-modal-footer">
          <button class="rep-btn rep-btn-secondary" id="cancelReport" @click="close()">Cancel</button>
          <button class="rep-btn rep-btn-danger" id="submitReport" v-if="isSubmitLoading === false"
            @click="submitReport()">Submit report</button>
          <span class="btn-loader" v-if="isSubmitLoading"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RequestURL, type UsersModel } from '~/composables/models';


const emit = defineEmits(['close'])

interface Props {
  reportType: "feed" | "user"
  refId: number
  reportedUserId?: number
}

const props = defineProps<Props>()
const selectedReason = ref('')
const details = ref('')
const user_store = userStore()
const isSubmitLoading = ref(false)

async function submitReport() {
  if (selectedReason.value.length === 0) {
    showToastError("Please select a reason")
    return;
  }
  let detail = details.value.trim()
  if (selectedReason.value === 'other')
  {
    if (detail.length === 0)
     {
         showToastError("Please add information")
         return;
     }
     
  }

  if (isSubmitLoading.value) {
    return;
  }
  isSubmitLoading.value = true
  let api_url = getUrl(RequestURL.addReport)
  let response = await $fetch<SuccessError<UsersModel.ActivateUserResponseModel>>(api_url, {
    method: "POST",
    body: {
      reporter_id: user_store.getLoginId,
      reported_user_id: props.reportedUserId ?? null,
      report_type: props.reportType,
      report_ref_id: props.refId,
      reason: selectedReason.value,
      details: detail,
      attachment: null
    }
  })
  isSubmitLoading.value = false
  if (response.success) {
    showToastSuccess(response.message)
    close()
  }
  else {
    showToastError(response.message)
  }
}

function close() {
  emit('close')
}



</script>

<style>
.rep-modal-header {
  padding: 14px 18px;
  background: linear-gradient(to right, #3b0711, #5a0b15);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.report-small {
  width: 520px;
  background: #111827;
  border-radius: 12px;
  border: 1px solid #111827;
  color: #e5e7eb;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  padding: 0;
}

.rep-modal-header h2 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
}

.rep-modal-close {
  background: transparent;
  border: none;
  color: #f9fafb;
  font-size: 1rem;
  cursor: pointer;
}

.rep-modal-body {
  padding: 18px;
}

.rep-modal-subtitle {
  margin: 0 0 10px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.rep-warning-box {
  margin-bottom: 16px;
  padding: 10px 12px;
  font-size: 0.8rem;
  border-radius: 8px;
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #fecaca;
}

.rep-reason-option span {
  color: #fff;
  font-weight: 400;
}

.rep-field-group {
  margin-bottom: 16px;
  text-align: left;
}

.rep-field-label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.85rem;
  color: #d1d5db;
}

.rep-reason-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 18px;
}

.rep-reason-option {
  font-size: 0.8rem;
  display: flex;
  gap: 6px;
  align-items: flex-start;
  color: var(--text-main);
}

.rep-reason-option input {
  margin-top: 2px;
}

.textarea {
  width: 100%;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #020617;
  color: #e5e7eb;
  padding: 8px 10px;
  font-size: 0.85rem;
  resize: vertical;
  min-height: 90px;
}

.textarea:focus {
  outline: none;
  border-color: #f97316;
}

.rep-helper-text {
  margin-top: 6px;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.rep-modal-footer {
  padding: 12px 18px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  background: #020617;
}

.rep-btn {
  border-radius: 8px;
  padding: 7px 16px;
  font-size: 0.85rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.rep-btn-secondary {
  background: #4b5563;
  color: #e5e7eb;
}

.rep-btn-secondary:hover {
  background: #6b7280;
}

.rep-btn-danger {
  background: #ef4444;
  color: #f9fafb;
}

.rep-btn-danger:hover {
  background: #f97373;
}

@media (max-width: 480px) {
  .rep-modal {
    width: 100%;
    margin: 0 10px;
  }

  .rep-reason-list {
    grid-template-columns: 1fr;
  }
}
</style>