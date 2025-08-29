<template>
  <div>
    <client-only>
      <div class="inner-page">
        <CommonHeader/>
        <CommonBreadcrumbBreadCrumbs main="Home" title="Elements" />
      </div>
      <ul class="page-decore">
        <li class="top">
          <img
            class="img-fluid inner2"
            src="/images/landing/footer/2.png"
            alt="footer-back-img"
          />
        </li>
        <li class="bottom">
          <img
            class="img-fluid inner2"
            src="/images/landing/footer/2.png"
            alt="footer-back-img"
          />
        </li>
      </ul>
      <BonusPageElements />
      <CommonFooter />
      <CommonTapToTopTaptop />
    </client-only>
  </div>
</template>

<script setup>
useHead({
    title: "Bonus Elements - Chat Messenger Nuxt Template"
})
</script>
