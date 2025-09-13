<template>
     <div class="login-page2 animat-rate">
      <div class="login-content-main"> 
        <div class="login-content login-content-form">
          <div class="login-content-header"><nuxt-link to="/"><img src="/images/logo/landing-logo.png" alt="sign-logo"></nuxt-link></div>
          <h3 class="text-white">Hello Everyone , We are LinkSwingers</h3>
          <h4 class="text-white">Welcome to LinkSwingers, please signup to your account.</h4>
          <form class="form2 text-white">
            <div class="form-group">
              <label class="col-form-label text-white" for="inputPassword3">New Password</label><span> </span>
              <input class="form-control" id="inputPassword3" type="password" name="login[password]" required placeholder="*********">
            </div>
            <div class="form-group">
              <label class="col-form-label text-white" for="inputPassword3">Retype Password</label><span> </span>
              <input class="form-control" id="inputPassword4" type="password" name="login[password]" required placeholder="*********">
            </div>
            <div class="form-group">
              <div class="rememberchk">                  
                <input class="form-check-input" id="gridCheck1" type="checkbox">
                <label class="form-check-label ps-4" for="gridCheck1">Remember password</label>
              </div>
            </div>
            <div class="form-group mb-0">
              <div class="buttons"><nuxt-link class="btn button-effect btn-primary signpbtn" to="/messenger/messenger">Signup</nuxt-link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>