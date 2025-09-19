<template>
  <section class="bg-darker text-white min-vh-100 d-flex flex-column justify-content-center">
    <!-- Top Red Strip -->
    <div class="w-100 bg-theme-color" style="height: 70px;"></div>

    <div class="container text-center py-5">
      <div class="row justify-content-center landing-logo">
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
        <nuxt-link 
          to="/authentication/signup" 
          class="btn bg-theme-color btn-lg fw-bold"
        >
          Sign up free
        </nuxt-link>

        <nuxt-link 
          to="/authentication/login" 
          class="btn btn-lg bg-success text-white"
        >
          Log in
        </nuxt-link>
      </div>

      <!-- Small note -->
      <p class="small text-white-50 mb-5">
        18+ only · By continuing you agree to our 
        <a href="#" class="text-decoration-underline text-white">Terms & Privacy</a>
      </p>

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

<script>
export default {};
</script>
