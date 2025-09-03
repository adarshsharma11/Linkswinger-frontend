<template>
 
  <header id="home">
    <div class="custom-container">
      <div class="row">
        <div class="col-12">
          <div class="landing-header" v-bind:class="fixedheader ? 'fixed' : ''">
            <div class="main-menu">
              <nav class="navbar navbar-expand-sm navbar-light">
                  <CommonLogo :fixedheader="true" :logo="fixedheader ? 'logo-white.png' : 'landing-logo.png'"/>
                  <button class="navbar-toggler d-xl-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                  <CommonNavbar/>
               </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  
</template>

<script setup>
const windowTop = ref(0);
const fixedheader = ref(false);
const onScroll = (e) => {
  windowTop.value = e.target.documentElement.scrollTop;
  if (windowTop.value >= 60) {
        fixedheader.value = true;
      } else {
        fixedheader.value = false;
      }
}

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
