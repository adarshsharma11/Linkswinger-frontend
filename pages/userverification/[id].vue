<template>
  <section class="bg-dark text-white min-vh-100 d-flex flex-column">
    <!-- Top Red Strip (fixed at top of section) -->
    <div class="w-100 bg-theme-color" style="height: 40px; flex-shrink: 0;"></div>

    <!-- Centered Content -->
    <div class="flex-grow-1 d-flex flex-column justify-content-center">
      <div class="container text-center py-5">
        <!-- Title -->
        <h1 class="fw-bold display-5 mb-3 position-relative d-inline-block text-white">
          Email Verification
          <span class="title-underline"></span>
        </h1>

        <!-- Status Message -->
        <div v-if="loading" class="text-white-50 lead">
          Verifying your email...
        </div>

        <div v-else>
          <div v-if="verified" class="lead text-success fw-bold mb-4">
            ✅ Your email has been successfully verified!
          </div>
          <div v-else class="lead text-danger fw-bold mb-4">
            ❌ Verification failed. The link may be invalid or expired.
          </div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="d-flex justify-content-center gap-3 mb-5 flex-wrap" v-if="!loading">
        <nuxt-link
          v-if="verified"
          to="/authentication/login"
          class="btn bg-theme-color btn-lg fw-bold"
        >
          Go to Login
        </nuxt-link>

        <nuxt-link
          v-else
          to="/"
          class="btn btn-outline-light btn-lg fw-bold"
        >
          Go Home
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RequestURL, UsersModel } from '~/composables/models';

const route = useRoute();
const api_url = getUrl(RequestURL.activateUser);

const loading = ref(true);
const verified = ref(false);

try {
  const { data, error } = await useFetch<
    SuccessError<UsersModel.ActivateUserResponseModel>
  >(api_url, {
    cache: "no-cache",
    body: { user_udid: route.params.id },
    method: "post",
  });

  if (!error.value && data.value?.success) {
    verified.value = true;
  }
} catch (err) {
  verified.value = false;
} finally {
  loading.value = false;
}
</script>
