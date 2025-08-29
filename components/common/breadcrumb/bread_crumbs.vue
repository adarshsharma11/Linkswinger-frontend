<template>
 
  <section class="breadcrumb-main">
    <div class="custom-container">
      <h2>{{ title }}</h2>
      <ul>
        <li>
          <nuxt-link to="/messenger/messenger" >
            {{ main }}
          </nuxt-link>
        </li>
        <li>
          <a href="javascript:void(0)">{{ title }}</a>
        </li>
      </ul>
    </div>
  </section>

</template>
<script setup>
let props = defineProps({
    title: {
        default: 'home'
    },
    main: {
        default: ''
    },
    
})
</script>
