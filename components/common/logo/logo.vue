<template>

  <nuxt-link class="navbar-brand" to="/messenger/messenger">
      <div class="logo-block">
        <img
          class="img-fluid"
          :src="`/images/logo/${logo}`"
          :alt="logo"
        />
      </div>
  </nuxt-link>

</template>

<script setup>
defineProps({
  logo: {
    type: String,
    default: 'landing-logo.png'
  }
})
</script>