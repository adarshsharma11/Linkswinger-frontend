<template>
 
    <client-only>
      <div class="collapse navbar-collapse d-xl-block" id="navbarNav">
                      <ul class="navbar-nav">
                        <li class="nav-item active"><nuxt-link to="/" class="nav-link">Home </nuxt-link></li>
                        <li class="nav-item active"><nuxt-link to="/messenger/messenger" class="nav-link">Messenger </nuxt-link></li>
                       
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
                        <li class="nav-item"><a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</a>
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
