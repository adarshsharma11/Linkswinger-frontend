<template>
  <section class="bg-darker text-white min-vh-100 d-flex flex-column justify-content-center">
    <!-- Top Red Strip -->
    <div class="w-100 bg-theme-color fixed-top" style="height: 70px;"></div>

    <div class="container text-center py-5 mt-4">
      <div class="row justify-content-center landing-logo mt-4">
        <nuxt-link to="/">
          <img class="img-fluid" src="/images/logo/landing-logo.gif" alt="logo" />
        </nuxt-link>
      </div>

      <!-- Title -->
      <h1 class="fw-bold display-5 mb-3 position-relative d-inline-block text-white">
        Welcome to LinkSwingers (LS)
        <!-- Animated Underline -->
        <span class="title-underline"></span>
      </h1>
      <p class="lead mb-4 text-white-50">Where open minds connect</p>

      <!-- Buttons -->
      <div class="d-flex justify-content-center gap-3 mb-3 flex-wrap">
        <button 
          @click="goToSignup"
          class="btn bg-theme-color btn-lg fw-bold"
        >
          Sign up free
        </button>

        <button 
          @click="goToLogin"
          class="btn btn-lg bg-success text-white"
        >
          Log in
        </button>
      </div>

      <!-- Small note -->
      <p class="small text-white-50 mb-5">
        <input
          class="form-check-input me-2 custom-theme-checkbox"
          type="checkbox"
          id="termsCheck"
          v-model="acceptedTerms"
        />
        18+ only · By continuing you agree to our 
        <a href="#" class="text-decoration-underline text-white ms-1">Terms & Privacy</a>
      </p>

      <div class="d-flex justify-content-center align-items-center gap-3 my-4 flex-wrap">
        <div class="d-flex gap-3 justify-content-center">
            <img src="/images/badges/18-plus.png" alt="Chat" />
            <img src="/images/badges/chat.png" alt="Call" />
            <img src="/images/badges/call.png" alt="Video" />
            <img src="/images/badges/video-call.png" alt="Like" />
        </div>
        <div class="d-flex gap-3 justify-content-center">
            <img src="/images/badges/video-roulette-available.png" alt="Photo" />
            <img src="/images/badges/location.png" alt="Elite" />
            <img src="/images/badges/elite.png" alt="VIP" />
        </div>
      </div>

       <div class="d-flex justify-content-center align-items-center mb-4">
           <h4 class="text-success">
            <strong>Meets. Chats. Private calls. Video roulette. Club events. All in one place.</strong>
           </h4>
      </div>

      <!-- Join the community -->
      <div class="text-start mx-auto" style="max-width: 800px;">
        <h3 class="fw-bold mb-3 text-white text-center">Join the community</h3>
        <p class="text-white-50">
          Join a community built on trust, respect, and open minds. LinkSwingers (LS) is more 
          than just a platform — it’s a welcoming space where people can meet, explore, and enjoy 
          themselves without judgment. Whether you’re here to chat, join video calls, try video 
          roulette, attend club events, or simply have fun with like-minded people, you’ll find a 
          vibrant and playful community waiting for you.
        </p>
        <p class="text-white-50">
          We put a strong focus on moderation and only welcome genuine members, making sure the 
          environment stays safe, respectful, and enjoyable for everyone. Our mission is to create 
          a place where honesty, freedom, and excitement come first, giving you the confidence to 
          explore your desires openly. Best of all, the platform can be used completely free — so 
          you can sign up without obligation and start enjoying everything LS has to offer today.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { showToastError } from '~/utils/toast';

const router = useRouter();
const acceptedTerms = ref(false);

function goToSignup() {
  if (!acceptedTerms.value) {
    showToastError("You must accept Terms & Privacy to continue.");
    return;
  }
  router.push('/authentication/signup');
}

function goToLogin() {
  if (!acceptedTerms.value) {
    showToastError("You must accept Terms & Privacy to continue.");
    return;
  }
  router.push('/authentication/login');
}
</script>
