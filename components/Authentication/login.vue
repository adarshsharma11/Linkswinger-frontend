<template>
  <div class="login-page2 animat-rate">
    <div class="login-content-main">
      <!-- Login Form -->
      <div class="login-content login-content-form">
        <div class="login-content-header">
          <nuxt-link to="/">
            <img class="img-fluid" src="/images/logo/landing-logo.gif" alt="logo" />
          </nuxt-link>
        </div>
        <h4 class="text-white">Welcome to LinkSwingers – Please log in to your account.</h4>

        <Form
          :validation-schema="schema"
          :initial-values="{ nickemail: '', password: '', confirmAge: false, agreeTerms: false }"
          @submit="userlogin"
          v-slot="{ meta }"
          class="form2"
        >
          <!-- Email / Nickname -->
          <div class="form-group">
            <label class="col-form-label text-white" for="nickemail">
              Email or Nickname
            </label>
            <Field id="nickemail" name="nickemail" type="text" class="form-control" placeholder="Email or Nickname" />
            <ErrorMessage name="nickemail" class="text-danger small" />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="col-form-label text-white" for="password">
              Password
            </label>
            <Field id="password" name="password" type="password" class="form-control" placeholder="Password" />
            <ErrorMessage name="password" class="text-danger small" />
          </div>

          <!-- Age confirmation -->
          <div class="form-group">
            <div class="rememberchk">
              <Field
                type="checkbox"
                id="gridCheck1"
                name="confirmAge"
                class="form-check-input"
                :value="true"
                :unchecked-value="false"
              />
              <label class="form-check-label ps-4 text-white" for="gridCheck1">
                I confirm that I am 18 years or older
              </label>
            </div>
            <ErrorMessage name="confirmAge" class="text-danger small" />
          </div>

          <!-- Terms acceptance -->
          <div class="form-group">
            <div class="rememberchk">
              <Field
                type="checkbox"
                id="gridCheck2"
                name="agreeTerms"
                class="form-check-input"
                :value="true"
                :unchecked-value="false"
              />
              <label class="form-check-label ps-4 text-white" for="gridCheck2">
                I agree to the
                <nuxt-link to="/terms">Terms & Conditions</nuxt-link> and
                <nuxt-link to="/privacy">Privacy Policy</nuxt-link>, and confirm that I am 18 years or older
              </label>
            </div>
            <ErrorMessage name="agreeTerms" class="text-danger small" />
          </div>

          <!-- Forgot -->
          <div class="form-group">
            <div class="rememberchk">
              <h6 class="pull-right">
                <nuxt-link to="/authentication/forget_password">Forgot Password?</nuxt-link>
              </h6>
            </div>
          </div>

          <!-- Submit -->
          <div class="form-group mb-4">
            <div class="buttons">
              <button
                type="submit"
                class="btn button-effect btn-primary mt-4"
                :disabled="is_login_loading || !meta.valid"
              >
                <template v-if="is_login_loading">
                  <span class="btn-loader"></span>
                </template>
                <template v-else>
                  Login
                </template>
              </button>
            </div>
             <!-- <p class="text-white">
              Don't have an account?
              <nuxt-link to="/authentication/signup">Create new account</nuxt-link>
            </p> -->
          </div>

          <div class="form-group mb-0 text-center">
            <p class="text-white">
              Don't have an account?
              <nuxt-link to="/authentication/signup">Create new account</nuxt-link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import { showToastError } from "~/utils/toast";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import type { UsersModel } from "~/composables/models";

const is_login_loading = ref(false);
const user_store = userStore();
const id_store = idStore();

// ✅ Yup schema
const schema = Yup.object({
  nickemail: Yup.string().trim().required("Email or Nickname is required"),
  password: Yup.string().required("Password is required"),
  confirmAge: Yup.boolean()
    .oneOf([true], "You must confirm that you are 18 or older")
    .required(),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must accept the Terms & Privacy Policy")
    .required(),
});

// ✅ Form submit
async function userlogin(values: any, { resetForm }: any) {
  if (is_login_loading.value) return;

  const request_model = {
    nickemail: values.nickemail,
    password: values.password,
    device_id: id_store.getDeviceId,
    is_update_device: false,
  } as UsersModel.LoginRequestModel;

  const api_url = getUrl(RequestURL.login);
  is_login_loading.value = true;

  try {
    const response = await $fetch<SuccessError<UsersModel.LoginResponseModel>>(api_url, {
      method: "POST",
      body: request_model,
      headers: { "Content-Type": "application/json" },
    });

    is_login_loading.value = false;

    if (response.success) {
      user_store.setLoginId(response.response?.user_id ?? 0);
      await storerole(response.response?.user_id ?? 0);
      reloadNuxtApp({ path: "/profile", ttl: 1000 });
    } else {
      if (response.code === 100) {
        showmultiple(response.message);
      } else {
        showToastError(response.message || "Login failed. Please try again.");
      }
    }
  } catch (error) {
    is_login_loading.value = false;
    showToastError("An error occurred during login. Please try again.");
    console.error("Login failed:", error);
  }
}

function showmultiple(message: string) {
  Swal.fire({
    title: "",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Proceed",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await userlogin({ nickemail: "", password: "" }, { resetForm: () => {} });
    }
  });
}
</script>
