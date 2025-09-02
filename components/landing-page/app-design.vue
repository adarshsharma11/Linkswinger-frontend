<template>

  <section class="section-py-space app-design-block bg-dark text-white" id="features">
    <div class="container-fluid text-white">
      <div class="row">
        <div class="col-12">
          <div class="landing-title">
            <div class="sub-title">
              <div>
                <h2 class="text-white">How it works</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row app-code-block">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="col-md-3 col-sm-6"
        >
          <div class="app-design-main">
            <div class="icon-box">
              <i :class="option.icon"></i>
            </div>
            <img
              class="img-fluid app-hover"
              :src="option.image"
              :alt="option.alt"
            />
            <div class="contant-box">
              <h2 class="text-white">{{ option.title }}</h2>
              <h4 class="text-white">{{ option.description }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          title: "Sign Up",
          description: "Create your account and choose your profile type from our options.",
          icon: "ti-user",
          image: "/images/landing/app/hover.png",
          alt: "Sign Up Image",
        },
        {
          title: "Verify Profile",
          description: "Complete profile verification for enhanced trust and access.",
          icon: "ti-check-box",
          image: "/images/landing/app/hover.png",
          alt: "Verify Profile Image",
        },
        {
          title: "Connect",
          description: "Browse profiles and send friend requests to start connecting.",
          icon: "ti-link",
          image: "/images/landing/app/hover.png",
          alt: "Connect Image",
        },
        {
          title: "Explore",
          description: "Message, share media, video chat, and join community discussions.",
          icon: "ti-world",
          image: "/images/landing/app/hover.png",
          alt: "Explore Image",
        },
      ],
    };
  },
};
</script>
