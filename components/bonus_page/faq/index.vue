<template>

  <section class="section-py-space faq-section">
      <ul class="page-decore">
        <li class="top"><img class="img-fluid inner2" src="/images/landing/footer/2.png" alt="footer-back-img"></li>
        <li class="bottom"><img class="img-fluid inner2" src="/images/landing/footer/2.png" alt="footer-back-img"></li>
      </ul>
      <div class="container">
        <div class="row faq-block">
          <div class="col-sm-12">
            <div class="d-flex">
              <div>
                <h2>Frequently Asked Questions</h2>
                <p>Discover you question from underneath or present your inquiry fromt tahe submit box.</p>
              </div>
              <div class="flex-grow-1"><a class="icon-btn btn-outline-primary btn-sm search contact-search float-end" href="javascript:void(0)"><i @click="toggelsearchbar()" class="fa fa-search"></i></a>
                <form class="form-inline search-form" :class="{ 'open': opensearchbar }">
                  <div class="form-group">
                    <input class="form-control-plaintext" type="search" placeholder="Search..">
                    <div @click="opensearchbar = false" class="icon-close close-search"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="accordion theme-accordion" id="accordionExample1">
              <div class="card accordion-item faq-block accordion theme-accordion" id="accordionExample">
                <div class="card-header accordion-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">How can I downgrade to an earlier ?</button>
                  </h5>
                </div>
                <div class="collapse accordion-collapse show" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="card-body">
                    <p><img class="img-fluid faq-decor" src="/images/landing/chitchat/2.png" alt="chit-chat-back-img">it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures</p>
                  </div>
                </div>
              </div>
              <div class="card accordion-item">
                <div class="card-header accordion-header" id="headingTwo">
                  <h5 class="mb-0">
                    <button class="btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">How can I upgrade from Shopify 2.5 to shopify 3?</button>
                  </h5>
                </div>
                <div class="collapse accordion-collapse" id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="card-body">
                    <p><img class="img-fluid faq-decor" src="/images/landing/chitchat/2.png" alt="chit-chat-back-img">it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures</p>
                  </div>
                </div>
              </div>
              <div class="card accordion-item">
                <div class="card-header accordion-header" id="headingThree">
                  <h5 class="mb-0">
                    <button class="btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Under what license are Regular Labs released?</button>
                  </h5>
                </div>
                <div class="collapse accordion-collapse" id="collapseThree" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="card-body">
                    <p><img class="img-fluid faq-decor" src="/images/landing/chitchat/2.png" alt="chit-chat-back-img">it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures</p>
                  </div>
                </div>
              </div>
              <div class="card accordion-item">
                <div class="card-header accordion-header" id="headingFour">
                  <h5 class="mb-0">
                    <button class="btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">What is the Regular Labs Library?</button>
                  </h5>
                </div>
                <div class="collapse accordion-collapse" id="collapseFour" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                  <div class="card-body">
                    <p><img class="img-fluid faq-decor" src="/images/landing/chitchat/2.png" alt="chit-chat-back-img">it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures</p>
                  </div>
                </div>
              </div>
              <div class="card accordion-item">
                <div class="card-header accordion-header" id="headingFive">
                  <h5 class="mb-0">
                    <button class="btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">Can I turn on/off some blocks on the page?</button>
                  </h5>
                </div>
                <div class="collapse accordion-collapse" id="collapseFive" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                  <div class="card-body">
                    <p><img class="img-fluid faq-decor" src="/images/landing/chitchat/2.png" alt="chit-chat-back-img">it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures</p>
                  </div>
                </div>
              </div>
              <div class="card accordion-item">
                <div class="card-header accordion-header" id="headingSix">
                  <h5 class="mb-0">
                    <button class="btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">What is included in the theme package?</button>
                  </h5>
                </div>
                <div class="collapse accordion-collapse" id="collapseSix" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                  <div class="card-body">
                    <p><img class="img-fluid faq-decor" src="/images/landing/chitchat/2.png" alt="chit-chat-back-img">it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>

</template>
<script setup>
let text=ref('it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years,All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures')
let opensearchbar=ref(false)
const togglesearchbar = () => {
  opensearchbar.value = !opensearchbar.value;
};
</script>