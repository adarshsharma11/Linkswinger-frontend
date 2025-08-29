<template>
  <div class="modal reminder-modal-main add-popup" id="setReminder" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content custom-scrollbar">
          <div class="modal-header">
            <h2 class="modal-title">
                        Set redminders</h2>
            <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form class="form default-form">
              <div class="lable">Reminder for (Groups or contacts)</div>
              <div class="form-group">
                <input class="form-control" type="text" placeholder="contact or channel"/>
              </div>
              <div class="lable">Remind about</div>
              <div class="form-group">
                <textarea class="form-control dib" rows="3" placeholder="Some details about task"></textarea>
              </div>
              <div class="lable">Remind about</div>
              <div class="form-group">
                <ul class="reminder-count">
                  <li class="active">
                    <div class="reminder-box">
                      <h3 class="remi-num">15</h3>
                      <h5 class="remi-val">minutes</h5>
                    </div>
                  </li>
                  <li>
                    <div class="reminder-box">
                      <h3 class="remi-num">1</h3>
                      <h5 class="remi-val">hour</h5>
                    </div>
                  </li>
                  <li>
                    <div class="reminder-box">
                      <h3 class="remi-num">5 PM</h3>
                      <h5 class="remi-val">today</h5>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="form-group mb-0">
                <div class="lable">select custom time</div>
                <div class="custom-remider-main">
                  <div class="custom-remider-content">
                    <div class="custom-reminder-inline">
                      <ClientOnly>
                <VueDatePicker class="" v-model="date" />
                </ClientOnly>
                <ClientOnly>
                <VueDatePicker class="" v-model="time" timePicker />
                </ClientOnly>
                    </div>
                    <div class="custom-reminder-block">
                      <select> 
                        <option>Do not repeat</option>
                        <option>Weekdays (Mon-Fri)</option>
                        <option>Daily</option>
                        <option>Weekly (Custom)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="reminder-btn mb-3"><a class="btn btn-primary button-effect">set reminder</a></div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const date = ref();
const time = ref({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes()
});
</script>
