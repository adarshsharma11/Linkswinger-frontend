<template>
     <div class="login-page2 animat-rate">
      <div class="login-content-main"> 
        <div class="login-content login-content-form">
          <div class="login-content-header"><nuxt-link to="/"><img src="/images/logo/landing-logo.png" alt="sign-logo"></nuxt-link></div>
          <h3 class="text-white">Hello Everyone, Please Reset Your Password</h3>
          <h4 class="text-white">Welcome to LinkSwingers, please reset your password.</h4>
          <form class="form2 text-white">
            <div class="form-group">
              <label class="col-form-label text-white" for="inputPassword3">New Password</label><span> </span>
              <input class="form-control" id="inputPassword3" type="password" name="login[password]" required placeholder="*********">
            </div>
            <div class="form-group">
              <label class="col-form-label text-white" for="inputPassword3">Retype Password</label><span> </span>
              <input class="form-control" id="inputPassword4" type="password" name="login[password]" required placeholder="*********">
            </div>
            <div class="form-group mb-0">
              <div class="buttons"><nuxt-link class="btn button-effect btn-primary signpbtn" to="/">Reset Password</nuxt-link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import type { UsersModel } from '~/composables/models';

const is_reset_loading = ref(false);
const password = ref("");
const confirm_password = ref("");

async function resetPassword() {

  if (is_reset_loading.value)
  {
return;
  }
  if (checkValidation()) {
    is_reset_loading.value = true;
    let api_url = getUrl(RequestURL.resetPassword);
    let postData = {
      password: password.value,
      token: useRoute().params.id
    }
    let response = await $fetch<SuccessError<UsersModel.LoginRequestModel>>(api_url, {
      method: 'POST',
      body: postData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    is_reset_loading.value = false;
    if (response.success) {
      showToastSuccess(response.message ?? "Password reset successfully");
      await navigateTo('/authentication/login');
    }
    else {
      showToastError(response.message ?? "Something went wrong");
    }
  }
}
function checkValidation(): boolean {
  if (password.value.trim().length === 0) {
    showToastError('Please enter password');
    return false;
  }
  else if (confirm_password.value.trim().length === 0) {
    showToastError('Please enter password');
    return false;
  }
  else if (password.value.trim() !== confirm_password.value.trim())
   {
    showToastError('Passwords do not match');
    return false;
  }
  return true;
}
</script>