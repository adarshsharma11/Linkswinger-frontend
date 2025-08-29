<template>
 
    <client-only>
      <div class="collapse navbar-collapse d-xl-block" id="navbarNav">
                      <ul class="navbar-nav">
                        <li class="nav-item active"><nuxt-link to="/messenger/messenger" class="nav-link">Messenger </nuxt-link></li>
                        <li class="nav-item"><a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Blog</a>
                          <ul class="dropdown-menu">
                            <li class="nav-link"><nuxt-link to="/blogs/blog_right-sidebar"
                >Blog Right sidebar</nuxt-link
              ></li>
                            <li class="nav-link"><nuxt-link to="/blogs/blog_left-sidebar"
                >Blog Left sidebar</nuxt-link
              ></li>
                            <li class="nav-link"><nuxt-link to="/blogs/blog_details"
                >Blog Details</nuxt-link
              ></li>
                            <li class="nav-link"><nuxt-link to="/blogs/blog_no-sidebar"
                >Blog No sidebar</nuxt-link
              ></li>
                          </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Email templates</a>
                          <ul class="dropdown-menu">
                            <li class="nav-link"><nuxt-link to="https://themes.pixelstrap.com/chitchat/pages/email.html">Basic</nuxt-link></li>
                            <li class="nav-link"><nuxt-link to="https://themes.pixelstrap.com/chitchat/pages/email-two.html">Reset password</nuxt-link></li>
                            <li class="nav-link"><nuxt-link to="https://themes.pixelstrap.com/chitchat/pages/email-three.html">Reset password</nuxt-link></li>
                          </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Authentication</a>
                          <ul class="dropdown-menu">
                            <li class="nav-link"><nuxt-link to="/authentication/login"
                >Signin</nuxt-link
              ></li>
                            <li class="nav-link"><nuxt-link to="/authentication/login-2"
                >Signin Classic</nuxt-link
              ></li>
                            <li class="nav-link"><nuxt-link to="/authentication/signup"
                >Signup</nuxt-link
              ></li>
                            <li class="nav-link"><nuxt-link to="/authentication/signup-2"
                >Signup Classic</nuxt-link
              ></li>
                            <li class="nav-link"><nuxt-link to="/authentication/forget_password">Forget Password</nuxt-link></li>
                          </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bouns page</a>
                          <ul class="dropdown-menu">
                            <li class="nav-link"><nuxt-link to="/bonus/about">About</nuxt-link></li>
                            <li class="nav-link"><nuxt-link to="/bonus/faq">FAQ</nuxt-link></li>
                            <li class="nav-link"><nuxt-link to="/bonus/elements"
                >Elements</nuxt-link
              ></li>
              <li class="nav-link"><nuxt-link to="/bonus/price">Price</nuxt-link></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
    </client-only>
 
</template>
