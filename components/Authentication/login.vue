<template>
  <div class="login-page2 animat-rate">
    <div class="login-content-main">
      <!-- Login Form -->
      <div class="login-content login-content-form">
        <div class="login-content-header">
          <nuxt-link to="/"><img
            class="img-fluid"
            src="/images/logo/landing-logo.png"
            alt="logo"
          /></nuxt-link>
        </div>
        <h3 class="text-white">Hello Everyone, We are LinkSwingers</h3>
        <h4 class="text-white">Welcome to LinkSwingers, please login to your account.</h4>

        <Form
          :validation-schema="schema"
          @submit="userlogin"
          class="form2"
        >
          <!-- Email / Nickname -->
          <div class="form-group">
            <label class="col-form-label text-white" for="nickemail">
              Email or Nickname
            </label>
            <Field
              id="nickemail"
              name="nickemail"
              type="text"
              class="form-control"
              placeholder="Email or Nickname"
              v-model="nickemail"
            />
            <ErrorMessage name="nickemail" class="text-danger small" />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="col-form-label text-white" for="password">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <ErrorMessage name="password" class="text-danger small" />
          </div>

          <!-- Remember + Forgot -->
          <div class="form-group">
            <div class="rememberchk">
              <input class="form-check-input" id="remember" type="checkbox" />
              <label class="form-check-label ps-4 text-white" for="remember">
                Remember Me
              </label>
              <h6 class="pull-right">
                <nuxt-link to="/authentication/forget_password">Forgot Password?</nuxt-link>
              </h6>
            </div>
          </div>

          <!-- Submit -->
          <div class="form-group mb-4">
            <div class="buttons">
              <button type="submit" class="btn button-effect btn-primary" :disabled="is_login_loading">
                 <template v-if="is_login_loading">
                    <span class="btn-loader"></span>
                  </template>
                  <template v-else>
                    Login
                  </template>
              </button>
            </div>
          </div>
            <div class="form-group mb-0 text-center">
            <p class="text-white">Don't have an account? <nuxt-link to="/authentication/signup">Create new account</nuxt-link></p>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import type { UsersModel } from "~/composables/models";

const is_login_loading = ref(false);
const nickemail = ref("");
const password = ref("");

// Yup schema
const schema = Yup.object({
  nickemail: Yup.string().trim().required("Email or Nickname is required"),
  password: Yup.string().required("Password is required"),
});

async function userlogin() {
  if (is_login_loading.value) return;

  const request_model = {
    nickemail: nickemail.value,
    password: password.value,
  } as UsersModel.LoginRequestModel;

  const api_url = getUrl(RequestURL.login);
  is_login_loading.value = true;

  try {
    const response = await $fetch<SuccessError<UsersModel.LoginResponseModel>>(
      api_url,
      {
        method: "POST",
        body: request_model,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    is_login_loading.value = false;

    if (response.success) {
      const is_email_confirmed =
        response.response?.is_email_confirmed ?? false;

      if (is_email_confirmed) {
     //   showalert("Login successful!", true);
     reloadNuxtApp({
        path: "/profile",
        ttl: 1000
      })
      } else {
        showalert(
          "Email Verification is Pending.Please check your email to verify your account.",
          false
        );
      }
    } else {
      showalert(response.message || "Login failed. Please try again.");
    }
  } catch (error) {
    is_login_loading.value = false;
    showalert("An error occurred during login. Please try again.");
    console.error("Login failed:", error);
  }
}

async function resendEmail() 
{
   
}
</script>
