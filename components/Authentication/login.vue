<template>
 
  <div class="login-page2 animat-rate">
    <div class="login-content-main">
      <div class="login-content2">
        <div class="theme-tab">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link"
                id="login-tab"
                data-toggle="tab"
                href="javascript:void(0)"
                role="tab"
                aria-selected="false"
                >login</a
              >
            </li>
            <li class="nav-item">
              <nuxt-link to="/authentication/signup" class="nav-link active"
                  id="signup-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-selected="true">                 
                  Signup
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="login-content">
        <div class="login-content-header">
          <img
            class="img-fluid"
            src="/images/logo/landing-logo.png"
            alt="images"
          />
        </div>
        <h3>Hello Everyone , We are Linkswinger</h3>
        <h4>Welcome to Linkswinger please, login to your account.</h4>
        <div class="form2">
          <div class="form-group">
            <label class="col-form-label" for="inputEmail3"
              >Email or Nickname</label
            >
            <input
              class="form-control"
              id="inputEmail3"
              type="email"
              placeholder="Email or Nickname"
              v-model="nickemail"
            />
          </div>
          <div class="form-group">
            <label class="col-form-label" for="inputPassword3">Password</label
            ><span> </span>
            <input
              class="form-control"
              id="inputPassword3"
              type="password"
              placeholder="Password"
                  v-model="password"
            />
          </div>
          <div class="form-group">
            <div class="rememberchk">
              <input
                class="form-check-input"
                id="gridCheck1"
                type="checkbox"
              />
              <label class="form-check-label ps-4" for="gridCheck1"
                >Remember Me</label>
              <h6 class="pull-right"><nuxt-link to="/authentication/login">Forgot Password?</nuxt-link></h6>
            </div>
          </div>
          <div class="form-group mb-0">
            <div class="buttons">
              <button class="btn button-effect btn-primary" @click="userlogin">Login <span v-if="is_login_loading" class="btn-loader"></span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="animation-block">
      <div class="bg_circle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="cross"></div>
      <div class="cross1"></div>
      <div class="cross2"></div>
      <div class="dot"></div>
      <div class="dot1"></div>
      <div class="top-circle"></div>
      <div class="center-circle"></div>
      <div class="bottom-circle1"></div>
      <div class="right-circle"></div>
      <div class="right-circle1"></div>
      <div class="quarterCircle"></div>
      <img
        class="cloud-logo"
        src="/images/login_signup/2.png"
        alt="login logo"
      /><img
        class="cloud-logo1"
        src="/images/login_signup/2.png"
        alt="login logo"
      /><img
        class="cloud-logo2"
        src="/images/login_signup/2.png"
        alt="login logo"
      /><img
        class="cloud-logo3"
        src="/images/login_signup/2.png"
        alt="login logo"
      /><img
        class="cloud-logo4"
        src="/images/login_signup/2.png"
        alt="login logo"
      /><img
        class="cloud-logo5"
        src="/images/login_signup/2.png"
        alt="login logo"
      />
    </div>
  </div>

</template>

<script lang="ts" setup>
import type { UsersModel } from '~/composables/models';
const is_login_loading = ref(false);
const nickemail = ref('');
const password = ref('');

function userlogin() 
{
  if (!checkValidation() || is_login_loading.value) {
    return;
  }
  let request_mdoel = {
        nickemail : nickemail.value,
        password : password.value,
      
  } as UsersModel.LoginRequestModel

    let api_url = getUrl(RequestURL.login);
    is_login_loading.value = true;
    $fetch<SuccessError<UsersModel.LoginResponseModel>>(api_url, {
      method: 'POST',
      body: request_mdoel,  
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      is_login_loading.value = false;
      if (response.success) {
        let is_email_confirmed = response.response?.is_email_confirmed ?? false;
        if  (is_email_confirmed)
        {
    showalert('Login successful!',true);
        }
        else
        {
    showalert('Login successful! Please check your email to verify your account.',true);
        }
    
        // Optionally, redirect to login page or clear form
      } else {
        showalert(response.message || 'Login failed. Please try again.');
      }
    }).catch((error) => {
      is_login_loading.value = false;
      showalert('An error occurred during login. Please try again.');
      console.error('Signup failed:', error);
    });

  // Proceed with signup logic
}

function checkValidation(): boolean {
 
  const emailVal = nickemail.value.trim();
  const passwordVal = password.value;
    if (emailVal.length === 0) {
    showalert('Please enter email');
    return false;
  }
  
  else if (passwordVal.length === 0) {
    showalert('Please enter password');
    return false;
  }
  return true;
}

</script>

<style scoped >
.btn-loader {
  width: 20px;
  height: 20px;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>