<template>
     <div class="login-page2 animat-rate">
      <div class="login-content-main"> 
        <div class="login-content">
          <div class="login-content-header"><img src="/images/logo/landing-logo.png" alt="sign-logo"></div>
          <h3>Hello Everyone , We are Chitchat</h3>
          <h4>Wellcome to chitchat please signup to your account.</h4>
          <form class="form2">
            <div class="form-group">
              <label class="col-form-label" for="inputPassword3">New Password</label><span> </span>
              <input class="form-control" id="inputPassword3" type="password" name="login[password]" required placeholder="*********">
            </div>
            <div class="form-group">
              <label class="col-form-label" for="inputPassword3">Retype Password</label><span> </span>
              <input class="form-control" id="inputPassword4" type="password" name="login[password]" required placeholder="*********">
            </div>
            <div class="form-group">
              <div class="rememberchk">                  
                <input class="form-check-input" id="gridCheck1" type="checkbox">
                <label class="form-check-label ps-4" for="gridCheck1">Remember password</label>
              </div>
            </div>
            <ul class="medialogo">
              <li><a class="icon-btn btn-facebook button-effect rouded15" href="https://www.facebook.com/"><i class="fa fa-facebook-f"></i></a></li>
              <li><a class="icon-btn btn-danger button-effect rouded15" href="https://www.google.com/"><i class="fa fa-google"></i></a></li>
              <li><a class="icon-btn btn-primary button-effect rouded15" href="https://twitter.com/"><i class="fa fa-twitter"></i></a></li>
            </ul>
            <div class="form-group mb-0">
              <div class="buttons"><nuxt-link class="btn button-effect btn-primary signpbtn" to="/messenger/messenger">Signup</nuxt-link></div>
            </div>
          </form>
        </div>
      </div>
      <div class="animat-block">
        <div class="bg_circle">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="cross"></div>
        <div class="cross1"></div>
        <div class="cross2"></div>
        <div class="dot"></div>
        <div class="dot1"></div>
        <div class="top-circle"></div>
        <div class="center-circle"></div>
        <div class="bottom-circle1"></div>
        <div class="right-circle"></div>
        <div class="right-circle1"></div>
        <div class="quarterCircle"></div><img class="cloud-logo" src="/images/login_signup/2.png" alt="login logo"/><img class="cloud-logo1" src="/images/login_signup/2.png" alt="login logo"/><img class="cloud-logo2" src="/images/login_signup/2.png" alt="login logo"/><img class="cloud-logo3" src="/images/login_signup/2.png" alt="login logo"/><img class="cloud-logo4" src="/images/login_signup/2.png" alt="login logo"/><img class="cloud-logo5" src="/images/login_signup/2.png" alt="login logo"/>
      </div>
    </div>
</template>