<template>
  <div class="drop-picker">
    <div class="dropdown currency" tabindex="1">
      <div class="select"><span>Assign To</span></div>
      <input type="hidden" name="currency" />
      <ul class="dropdown-menu">
        <li class="dropdown-divider">
          <div class="fa fa-user"></div>
          <h5 class="text-muted">Assign To</h5>
        </li>
        <li><a href="#">Josephin john</a></li>
        <li><a href="#">Lynetin john</a></li>
        <li><a href="#">Sufiya john</a></li>
        <li><a href="#">Jhon john</a></li>
      </ul>
    </div>
    <ClientOnly>
      <VueDatePicker v-model="date"></VueDatePicker>
    </ClientOnly>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const date = ref('');
</script>
