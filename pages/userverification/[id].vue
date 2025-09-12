<template>
    <section class="bg-dark text-white min-vh-100 d-flex flex-column justify-content-center">
        <!-- Top Red Strip -->
        <div class="w-100 bg-theme-color" style="height: 40px;"></div>

        <div class="container text-center py-5">
            <!-- Title -->
            <h1 class="fw-bold display-5 mb-3 position-relative d-inline-block text-white">
                Welcome to LinkSwingers (LS)
                <!-- Animated Underline -->
                <span class="title-underline"></span>
            </h1>
            <p class="lead mb-4 text-white-50">Where open minds connect</p>
        </div>
        <div class="d-flex justify-content-center gap-3 mb-3 flex-wrap">
        <nuxt-link 
          to="/" 
          class="btn bg-theme-color btn-lg fw-bold"
        >
          Go Home
        </nuxt-link>
      </div>
    </section>
</template>

<script setup lang="ts">
import { RequestURL , UsersModel } from '~/composables/models';
const route = useRoute();
const api_url = getUrl(RequestURL.activateUser);
const { data: usermodel, error: user_error } = await useFetch<SuccessError<UsersModel.ActivateUserResponseModel>>(api_url, {
        cache: "no-cache",
        body: { user_udid: route.params.id },
        method: "post"
});
</script>