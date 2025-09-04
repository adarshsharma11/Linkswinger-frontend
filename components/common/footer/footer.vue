<template>

  <footer>
    <div class="container footer-main">
      <div class="row footer-block">
        <div class="col-lg-4 col-md-6">
          <div class="footer-title footer-mobile-title">
            <h3>About</h3>
          </div>
          <div class="about-payment footer-contant">
            <div class="logo">
              
              <nuxt-link to="/messenger/messenger">
                  <img
                    src="/images/logo/landing-logo.png"
                    alt="logo"
                />
              </nuxt-link>
            </div>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece Lorem fugit on looked ipsum.
            </p>
            <ul class="social-group">
              <li>
                <a class="icon-btn btn-google button-effect btn-sm" href="https://www.facebook.com/">
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  class="icon-btn btn-twiter button-effect btn-sm"
                  href="https://twitter.com/"
                  ><i class="fa fa-twitter"></i
                ></a>
              </li>
              <li>
                <a
                  class="icon-btn btn-linkedin button-effect btn-sm"
                  href="https://www.linkedin.com/"
                  ><i class="fa fa-linkedin"></i
                ></a>
              </li>
              <li>
                <a
                  class="icon-btn btn-instagram button-effect btn-sm"
                  href="https://www.instagram.com/"
                  ><i class="fa fa-instagram"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <div class="links">
            <div class="footer-title">
              <h3>Useful Links</h3>
            </div>
            <div class="footer-contant">
              <ul>
                <li>
                  <nuxt-link to="/messenger/messenger"
                    >Home</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/bonus/about"
                    >About us</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/bonus/faq"
                    >FAQ</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="links">
            <div class="footer-title">
              <h3>Authentication</h3>
            </div>
            <div class="footer-contant">
              <ul>
                <li>
                  <nuxt-link to="/authentication/login-2"
                    >Login</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/authentication/signup-2"
                    >Create Account</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container copyright-footer">
      <div class="row copyright">
        <div class="col-md-6 col-sm-12">
          <p class="footer-left">© 2025 Linksswinger. All Rights Reserved</p>
        </div>
      </div>
    </div>
  </footer>
 
</template>
