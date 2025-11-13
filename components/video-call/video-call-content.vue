<template>
  <section class="video-call-page text-white min-vh-100 py-4">
  <div class="vd-header">
    <div class="container">
      <div class="vdhd-inner d-flex flex-wrap align-items-center justify-content-between">
        <div class="vd-hd-left">
          <span id="callStatusDot" class="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
          <span id="callStatusText">Call ended</span>
        </div>
        <div class="vd-hd-center">
           <img src="/images/logo/landing-logo.gif" alt="LinkSwingers logo" class="">
        </div>
        <div class="vd-hd-right d-flex flex-wrap align-items-center justify-content-end gap-2">
          <button id="btnShowCode" class="sh-btn">Show call code</button>
          <span id="callTimer" class="sh-btn">87:15</span>
        </div>
      </div>
    </div>
  </div>
  <div class="container py-4">
  <div class="row g-4">
    <!-- Left rail: participants & chat (collapsible) -->
    <aside class="col-12 col-lg-4 col-xl-3">
      <div class="vdo-lft-cht border overflow-hidden">
        <div class="border-b d-flex justify-content-between vdo-lft-tp">
          <p class="text-sm text-neutral-300">Participants</p>
          <span class="green-label">Private</span>
        </div>
        <div class="vd-al-pad">
          <div class="d-flex align-items-center gap-3 vd-cht-item">
            <div class="relative">
              <div class="position-relative vd-chat-left">
                <img class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold" src="https://media.linkswingers.co.uk/low-quality-images/FEEA7641-F66A-4B21-8537-87BB43A8EDD1.jpg" style="width: 40px; height: 40px; object-fit: cover; object-position: center center;">
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-black bg-emerald-400"></span>
            </div>
            <div class="vd-chat-right">
              <div class="d-flex align-items-center gap-2">
                <p>You</p>
              </div>
              <small class="text-secondary">Mic on • Cam on</small>
            </div>
          </div>
          <div class="d-flex align-items-center gap-3 vd-cht-item">
            <div class="relative">
              <div class="position-relative vd-chat-left">
                <img class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold" src="/images/profile-placeholders/WOMEN.png" style="width: 40px; height: 40px; object-fit: cover; object-position: center center;">
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-black bg-emerald-400"></span>
            </div>
            <div class="vd-chat-right">
              <div class="d-flex align-items-center gap-2">
                <p>Maya &amp; Tom</p>
              </div>
              <small class="text-secondary">Online • Encrypted</small>
            </div>
          </div>
        </div>
        <div class="cht-btm-opt">
          <div class="vd-al-pad d-flex align-items-center justify-content-between cht-clr-tp">
            <p class="text-sm">Chat</p>
            <button id="btnClearChat" class="clr-btn">Clear</button>
          </div>
          <div id="chatBox" class="h-64 overflow-auto p-3 custom-scroll space-y-2"></div>
          <div class="vd-al-pad d-flex gap-2 cht-lft-type">
            <input id="chatInput" class="flex-1 " placeholder="Type a message…">
            <button id="chatSend" class="px-3 py-2 rounded-xl">Send</button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Video stage -->
    <section class="col-12 col-lg-8 col-xl-9">
      <!-- Remote video with red metallic contour -->
      <div id="videoStage" class="relative red-contour  overflow-hidden">
        <video id="remoteVideo" class="w-100 vh-64 object-cover bg-black" autoplay="" playsinline="" muted=""></video>
        <!-- Labels -->
        <div class="position-absolute top-12 left-12 px-2 py-1 rounded-md bg-black/60 text-[11px]">Maya &amp; Tom — HD</div>
        <div id="netBadge" class="position-absolute top-12 right-12 px-2 py-1 label-red">Ended</div>
        <!-- Local PiP -->
        <div class="position-absolute bottom-12 right-12 selfVideo aspect-video overflow-hidden">
          <video id="localVideo" class="w-100 h-100 object-cover bg-black" autoplay="" playsinline="" muted=""></video>
          <div class="position-absolute bottom-4 left-4 px-2 py-0.5">You</div>
        </div>
      </div>

      <!-- Controls -->
      <div class="d-flex flex-wrap align-items-center justify-content-center gap-2 md:gap-3 vd-controls">
        <button id="btnMic" class="d-inline-flex align-items-center gap-2" data-on="0"><span>🎤</span> Mic off</button>
        <button id="btnCam" class="d-inline-flex align-items-center gap-2" data-on="0"><span>📷</span> <span class="hidden sm:inline">Cam off</span></button>        
        <button id="btnFlip" class="d-inline-flex align-items-center gap-2"><span>🔁</span><span class="hidden sm:inline">Flip</span></button>
        <button id="btnEffects" class="d-inline-flex align-items-center gap-2"><span>✨</span> <span class="hidden sm:inline">Effects</span></button>
        <button id="btnDevices" class="d-inline-flex align-items-center gap-2"><span>🎧</span><span class="hidden sm:inline">Devices</span></button>
        <button id="btnFull" class="d-inline-flex align-items-center gap-2" title="Fullscreen"><span>⛶</span><span class="hidden sm:inline">Fullscreen</span></button>
        <button id="btnEnd" class="text-white font-medium">End</button>
      </div>
    </section>
  </div>
  </div>
</section>  
</template>
