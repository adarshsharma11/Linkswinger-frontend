<template>
 
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12">
        <div class="login-contain-main">
          <div class="left-page">
            <div class="login-content">
              <div class="login-content-header">
                <img
                  class="image-fluid"
                  src="/images/logo/landing-logo.png"
                  alt="images"
                />
              </div>
              <h3>Hello Everyone , We are Chitchat</h3>
              <h4>Welcome to chitchat please login to your account.</h4>
              <form class="form1">
                <div class="form-group">
                  <label class="col-form-label" for="inputEmail3"
                    >Email Address</label
                  >
                  <input
                    class="form-control"
                    id="inputEmail3"
                    type="email"
                    v-model="email"
                    required
                    email
                    placeholder="Demo@123gmail.com"
                  />
                </div>
                <div class="form-group">
                  <label class="col-form-label" for="inputPassword3"
                    >Password</label
                  ><span> </span>
                  <input
                    class="form-control"
                    id="inputPassword3"
                    type="password"
                    v-model="password"
                    required
                    placeholder="Password"
                  />
                </div>
                <div class="form-group">
                  <div class="rememberchk">
                    <div class="form-check ps-0">
                      <input
                        class="form-check-input"
                        id="gridCheck1"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="gridCheck1"
                        >Remember Me</label
                      >
                      <h6 class="pull-right"><nuxt-link to="/authentication/login">Forgot Password?</nuxt-link></h6>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="buttons">
                    <a
                      class="btn btn-primary button-effect"
                      href="javascript:void(0)"
                      @click="doLogin"
                      >Login</a
                    >
                    <nuxt-link class="btn button-effect btn-signup" to="/authentication/signup">
                      SignUp
                    </nuxt-link>
                  </div>
                </div>
              </form>
              <div class="line">
                <h6>OR Connect with</h6>
              </div>
              <div class="medialogo">
                <ul>
                  <li>
                    <a
                      class="icon-btn btn-danger button-effect"
                      href="https://www.google.com/"
                      ><i class="fa fa-google"></i
                    ></a>
                  </li>
                  <li>
                    <a
                      class="icon-btn btn-primary button-effect"
                      href="https://twitter.com/"
                      ><i class="fa fa-twitter"></i
                    ></a>
                  </li>
                  <li>
                    <a
                      class="icon-btn btn-facebook button-effect"
                      href="https://www.facebook.com/"
                      ><i class="fa fa-facebook-f"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <div class="termscondition">
                <h4 class="mb-0">
                  <span>*</span>Terms and condition<b>&amp;</b>Privacy policy
                </h4>
              </div>
            </div>
          </div>
          <div class="right-page">
            <div class="right-login animat-rate">
              <div class="animation-block">
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
                <div class="maincircle"></div>
                <div class="top-circle"></div>
                <div class="center-circle"></div>
                <div class="bottom-circle"></div>
                <div class="bottom-circle1"></div>
                <div class="right-circle"></div>
                <div class="right-circle1"></div>
                <img
                  class="heart-logo"
                  src="/images/login_signup/5.png"
                  alt="login logo"
                /><img
                  class="has-logo"
                  src="/images/login_signup/4.png"
                  alt="login logo"
                /><img
                  class="login-img"
                  src="/images/login_signup/1.png"
                  alt="login logo"
                /><img
                  class="boy-logo"
                  src="/images/login_signup/6.png"
                  alt="login boy logo"
                /><img
                  class="girl-logo"
                  src="/images/login_signup/7.png"
                  alt="girllogo"
                /><img
                  class="cloud-logo"
                  src="/images/login_signup/2.png"
                  alt="login logo"
                /><img
                  class="cloud-logo1"
                  src="/images/login_signup/2.png"
                  alt="login logo"
                /><img
                  class="cloud-logo2"
                  src="/images/login_signup/2.png"
                  alt="login logo"
                /><img
                  class="cloud-logo3"
                  src="/images/login_signup/2.png"
                  alt="login logo"
                /><img
                  class="cloud-logo4"
                  src="/images/login_signup/2.png"
                  alt="login logo"
                /><img
                  class="has-logo1"
                  src="/images/login_signup/4.png"
                  alt="login logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const email = ref('test@admin.com');
    const password = ref('test@123456');
    const type = ref('password');
    const router = useRouter();
    function showPassword() {
    if (type.value === 'password') {
        type.value = 'text';
    } else {
        type.value = 'password';
    }
}
const doLogin = () => {
      if (email.value === 'test@admin.com' && password.value === 'test@123456') {
        router.replace('/');
        localStorage.setItem('user', email.value);
      } else {
        toast.error('Opps... Invalid email and password ', { position: 'top-right', autoClose: 2000 });
      }
    };
</script>
