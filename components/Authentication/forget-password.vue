<template>
  <div class="login-page2 animat-rate">
    <div class="login-content-main">
      <div class="login-content login-content-form">
        <div class="login-content-header"><nuxt-link to="/"><img src="/images/logo/landing-logo.gif"
              alt="sign-logo"></nuxt-link></div>
        <h4 class="text-white">Please enter your email to reset your password.</h4>
        <div class="form2 text-white">
          <div class="form-group">
            <label class="col-form-label text-white" for="inputPassword3">Email</label><span> </span>
            <input class="form-control" v-model="email" id="inputPassword3" type="email" name="login[password]" required
              placeholder="example@mail.com">
          </div>
          <div class="form-group mb-0">
            <div class="buttons btn button-effect btn-primary signpbtn" @click="forgetPassword()">Send Reset Link <span class="btn-loader" v-if="is_forgot_loading"></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UsersModel } from '~/composables/models';


const is_forgot_loading = ref(false);
const email = ref("");

async function forgetPassword() {
  if (is_forgot_loading.value)
  {
return;
  }
  if (checkValidation()) {
    is_forgot_loading.value = true;
    let api_url = getUrl(RequestURL.forgotPassword);
    let postData = {
      email: email.value.trim()
    }
    let response = await $fetch<SuccessError<UsersModel.LoginRequestModel>>(api_url, {
      method: 'POST',
      body: postData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    is_forgot_loading.value = false;
    if (response.success) {
      showToastSuccess(response.message ?? "Reset link sent to your email");
    }
    else {
      showToastError(response.message ?? "Something went wrong");
    }
  }
}
function checkValidation(): boolean {
  if (email.value.trim().length === 0) {
    showToastError('Please enter email');
    return false;
  }
  else if (!validateEmail(email.value.trim())) {
    showToastError('Please enter valid email');
    return false;
  }
  return true;
}

</script>