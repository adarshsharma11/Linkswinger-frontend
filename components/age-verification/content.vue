<script setup lang="ts">
const handleBack = () => {
  if (window.history.length > 1) window.history.back()
  else window.location.href = "/"
}

const handleMethodClick = (method: string) => {
  console.log("Start flow:", method)
}
</script>

<template>
  <div class="agecheck-container">
    <div class="page">
      <main class="card">

        <!-- Back Button -->
        <button class="back-btn" @click="handleBack">
          <span class="text-white">⟵</span> Back
        </button>

        <!-- HEADER -->
        <div class="card-header">
          <div class="logo-wrap">
            <img src="/images/logo/landing-logo.gif" alt="LinkSwingers logo" />
          </div>

          <div class="title-row">
            <h1 class="title text-white">Verify your age to continue</h1>
            <span class="title-icon">
              <img src="/images/badges/animated/150X150px/18-plus.gif" alt="18+ icon" />
            </span>
          </div>

          <div class="badge-row">
            <div class="badge">18+ age check required</div>
          </div>

          <p class="subtitle">
            To keep LinkSwingers safe and compliant, we need to confirm that you are over 18.
            Choose one of the secure verification options below.
          </p>

          <p class="partner-note">
           We use our trusted age verification partner <strong>AgeChecked</strong>, which is designed to help us comply with UK online safety rules and Ofcom guidance. All checks are carried out securely and lawfully.
          </p>
          <p class="warning">
            You’ll be redirected to AgeChecked to complete your check. Your personal data is handled securely by them and is not stored by LinkSwingers.
          </p>
        </div>

        <!-- OPTIONS -->
        <section class="methods-grid">
          <article class="method" @click="handleMethodClick('facecheck')">
            <div>
              <div class="method-type">Option 1</div>
              <h2 class="method-title">FaceCheck (Selfie)</h2>
              <p class="method-desc">
                Take a quick selfie. Our partner will estimate your age using secure facial analysis.
              </p>
              <p class="method-meta">
                • No ID upload needed<br>• Fast check, usually a few seconds
              </p>
            </div>
            <button class="method-button">Continue with FaceCheck <span>⟶</span></button>
          </article>

          <article class="method" @click="handleMethodClick('mobile-network')">
            <div>
              <div class="method-type">Option 2</div>
              <h2 class="method-title">Mobile Network</h2>
              <p class="method-desc">
              Verify your age using your mobile phone number with your network provider.
            </p>
              <p class="method-meta">
                • Uses data held by your mobile network<br>• No document upload required
              </p>
            </div>
            <button class="method-button">Continue with Mobile Check <span>⟶</span></button>
          </article>

          <article class="method" @click="handleMethodClick('id-scan')">
            <div>
              <div class="method-type">Option 3</div>
              <h2 class="method-title">ID Scan</h2>
              <p class="method-desc">
              Upload a photo of your passport, driving licence, or other government-issued ID.
            </p>
              <p class="method-meta">
                • Highest assurance level<br>• Exact date of birth verified
              </p>
            </div>
            <button class="method-button">Continue with ID Scan <span>⟶</span></button>
          </article>

          <article class="method" @click="handleMethodClick('credit-card')">
            <div>
              <div class="method-type">Option 4</div>
              <h2 class="method-title">Credit / Debit Card (No Charge)</h2>
              <p class="method-desc">
              Confirm your age using a valid credit or debit card. Your card will not be charged.
            </p>
              <p class="method-meta">
                • Card details checked<br>• Used only for age confirmation
              </p>
            </div>
            <button class="method-button">Continue with Card Check <span>⟶</span></button>
          </article>

          <article class="method" @click="handleMethodClick('database-check')">
            <div>
              <div class="method-type">Option 5</div>
              <h2 class="method-title">Database / Electoral Roll Check</h2>
              <p class="method-desc">Verify your age against trusted databases such as the electoral roll and credit reference data.</p>
              <p class="method-meta">
                • No document upload needed<br>• Uses existing records
              </p>
            </div>
            <button class="method-button">Continue with Database Check <span>⟶</span></button>
          </article>

          <article class="method" @click="handleMethodClick('sms')">
            <div>
              <div class="method-type">Option 6</div>
              <h2 class="method-title">Text Message (SMS)</h2>
              <p class="method-desc">Receive a verification code by text message and confirm your age using your mobile number.</p>
              <p class="method-meta">
                • Quick and simple<br>• Uses mobile network data
              </p>
            </div>
            <button class="method-button">Continue with Text Message <span>⟶</span></button>
          </article>
        </section>

        <!-- FOOTER -->
        <div class="footer">
          By continuing you confirm that the details you provide are accurate and consent
          to an age check carried out by AgeChecked.
          <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.
        </div>

      </main>
    </div>
  </div>
</template>
