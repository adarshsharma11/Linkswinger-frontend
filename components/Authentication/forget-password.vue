<template>
     <div class="login-page2 animat-rate">
      <div class="login-content-main"> 
        <div class="login-content login-content-form">
          <div class="login-content-header"><nuxt-link to="/"><img src="/images/logo/landing-logo.png" alt="sign-logo"></nuxt-link></div>
          <h3 class="text-white">Hello Everyone , We are LinkSwingers</h3>
          <h4 class="text-white">Please enter your email to reset your password.</h4>
          <form class="form2 text-white">
            <div class="form-group">
              <label class="col-form-label text-white" for="inputPassword3">Email</label><span> </span>
              <input class="form-control" id="inputPassword3" type="email" name="login[password]" required placeholder="example@mail.com">
            </div>
            <div class="form-group mb-0">
              <div class="buttons"><nuxt-link class="btn button-effect btn-primary signpbtn" to="/authentication/reset_password">Send Reset Link</nuxt-link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>