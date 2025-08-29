<template>
 <section class="section-pb-space">
        <div class="row">
          <div class="col-12">
            <div class="element-card">
              <div class="element-card-header heading">
                <h2>Buttons</h2>
              </div>
              <div class="element-card-body popup-group">
                <button class="btn btn-primary fonts font_label" type="button" data-bs-toggle="modal" data-bs-target="#audiocall">Audio call</button>
              
                <div class="modal fade" id="audiocall" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-body">
                      <div class="audiocall1 call-modal" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/audiocall.jpg') + ')'},styleObject]">
                        <div class="center-con text-center">
                          <div class="title2">Josephin water</div>
                          <h6>log angelina california</h6>
                          <ul>
                            <li><a class="icon-btn btn-success button-effect btn-xl is-animating" @click="$bvModal.hide('audiocall')" href="javascript:void(0)"><Icon name="lucide:phone"></Icon></a></li>
                            <li><a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" @click="$bvModal.hide('audiocall')" href="javascript:void(0)"><Icon name="lucide:phone"></Icon></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="custom-dropdown add-chat custom-scroll">
                  <h3>Start new conversation</h3>
                  <ul class="contact-log-main">
                    <li>
                      <div class="contact-box">
                        <div class="profile offline"><img class="bg-img" src="/images/contact/2.jpg" alt="Avatar"></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+21 3523 25544</h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect"><Icon name="lucide:message-square"></Icon></div>
                        </div>
                      </div>
                    </li>
                    <li class="active">
                      <div class="contact-box">
                        <div class="profile online"><img class="bg-img" src="/images/contact/1.jpg" alt="Avatar"></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+54 541447 255</h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect"><Icon name="lucide:message-square"></Icon></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="contact-box">
                        <div class="profile busy"><img class="bg-img" src="/images/contact/3.jpg" alt="Avatar"></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+58 2564 02554</h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect"><Icon name="lucide:message-square"></Icon></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="contact-box">
                        <div class="profile unreachable"><img class="bg-img" src="/images/contact/4.jpg" alt="Avatar"></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+44 55124 2524</h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect"><Icon name="lucide:message-square"></Icon></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="contact-box">
                        <div class="profile online"><img class="bg-img" src="/images/contact/4.jpg" alt="Avatar"></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+54 541447 255</h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect"><Icon name="lucide:message-square"></Icon></div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <button class="btn btn-primary fonts font_label" type="button" data-bs-toggle="modal" data-bs-target="#audiorcvcall">Receive Audio Call</button>
                
                <div class="modal fade" id="audiorcvcall" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-body">
                      <div class="audiocall2 call-modal" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/audiocall.jpg') + ')'},styleObject]">
                        <div class="center-con text-center">
                          <div id="basicUsage2">00:00:00</div>
                          <div class="title2">Josephin water</div>
                          <h6>log angelina california</h6>
                          <ul>
                            <li><a class="icon-btn btn-light button-effect mute" href="javascript:void(0)" data-tippy-content="Mute"><i class="fa fa-microphone"></i></a></li>
                            <li><a class="icon-btn btn-light button-effect mute" href="javascript:void(0)" data-tippy-content="Speaker"><i class="fa fa-volume-up"></i></a></li>
                            <li><a class="icon-btn btn-danger button-effect btn-xl is-animating" @click="$bvModal.hide('audiorcvcall')" href="javascript:void(0)" data-tippy-content="Hangup" data-dismiss="modal"><Icon name="lucide:phone"></Icon></a></li>
                            <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" data-tippy-content="Add Call"><Icon name="lucide:user-plus" size="15" height="15"></Icon></a></li>
                            <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" data-tippy-content="Disable Video"><Icon name="lucide:pause" size="15" height="15"></Icon></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary fonts font_label" type="button" data-bs-toggle="modal" data-bs-target="#confercall">conference call</button>
                
                <div class="modal fade" id="confercall" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-body">
                      <div class="conferencecall call-modal" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/audiocall.jpg') + ')'},styleObject]">
                        <div class="center-con text-center">
                          <div class="usersprof">
                            <div class="profile" :style="[{'background-image': 'url(' + getImgUrl('avtar/2.jpg') + ')'},styleObject]"></div>
                            <div class="profile" :style="[{'background-image': 'url(' + getImgUrl('avtar/3.jpg') + ')'},styleObject]"></div>
                            <div class="profile" :style="[{'background-image': 'url(' + getImgUrl('avtar/5.jpg') + ')'},styleObject]"></div>
                            <div class="profile" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/videocall_bg.jpg') + ')'},styleObject]"></div>
                          </div>
                          <p>Incoming Call</p>
                          <h3>Conference Call</h3>
                          <ul>
                            <li><a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" @click="$bvModal.hide('confercall')" href="javascript:void(0)"><Icon name="lucide:phone"></Icon></a></li>
                            <li><a class="icon-btn btn-success button-effect btn-xl is-animating" @click="$bvModal.hide('confercall')" href="javascript:void(0)"><Icon name="lucide:video"></Icon></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary fonts font_label" type="button" data-bs-toggle="modal" data-bs-target="#onecall">One Person call</button>
                
                <div class="modal fade" id="onecall" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-body">
                      <div class="conferencecall call-modal" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/audiocall.jpg') + ')'},styleObject]">
                        <div class="center-con text-center">
                          <div class="usersprof">
                            <div class="profile" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/videocall_bg.jpg') + ')'},styleObject]"></div>
                          </div>
                          <p>Incoming Call</p>
                          <h3>Jack p angulo</h3>
                          <p>Product Manager</p>
                          <ul>
                            <li><a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" @click="$bvModal.hide('onecall')" href="javascript:void(0)"><Icon name="lucide:phone"></Icon></a></li>
                            <li><a class="icon-btn btn-success button-effect btn-xl is-animating" @click="$bvModal.hide('onecall')" href="javascript:void(0)"><Icon name="lucide:video"></Icon></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary fonts font_label" type="button" data-bs-toggle="modal" data-bs-target="#nointernetmodal">No Internet</button>
                
                <div class="modal fade" id="nointernetmodal" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-body">
                      <div class="no-internet animat-rate">
                        <div class="connection-img"><img class="left-img" src="/images/disconnect/3.png" alt="Disconnected"><img class="right-img" src="/images/disconnect/2.png" alt="Disconnected internet"></div>
                        <div class="quarterCircle">
                          <div class="close-btn" data-dismiss="modal" @click="$bvModal.hide('nointernetmodal')"><span aria-hidden="true">&times;</span></div>
                        </div>
                        <div class="bg_circle">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                        <div class="cross"></div>
                        <div class="cross1"></div>
                        <div class="dot"></div>
                        <div class="dot1"></div>
                        <div class="content text-center"><a class="icon-btn btn-danger button-effect btn-sm is-animating" href="javascript:void(0)"><i class="fa fa-wifi"></i></a>
                          <h5>Internet issue</h5>
                          <div class="title2">Disconnected</div>
                          <button class="btn reconnect-btn" type="button" @click="$bvModal.hide('nointernetmodal')" data-dismiss="modal">Reconnect</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary fonts font_label" type="button" data-bs-toggle="modal" data-bs-target="#videocall">video call</button>
                
                <div class="viddiolog modal fade" id="videocall" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-body">
                      <div class="videocall call-modal" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/videocall_bg.jpg') + ')'},styleObject]">
                        <div class="small-image" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/videocall.jpg') + ')'},styleObject]"></div>
                        <div class="media videocall-details d-flex">
                          <div class="usersprof">
                            <div class="profile" :style="[{'background-image': 'url(' + getImgUrl('avtar/2.jpg') + ')'},styleObject]"></div>
                            <div class="profile" :style="[{'background-image': 'url(' + getImgUrl('avtar/3.jpg') + ')'},styleObject]"></div>
                          </div>
                          <div class="media-body">
                            <h5>Josephin water</h5>
                            <h6>America ,California</h6>
                          </div>
                          <div id="basicUsage1">00:00:00</div>
                          <div class="zoomcontent"><a class="text-dark" href="javascript:void(0)" onclick="javascript:toggleFullScreen()"><img src="/images/logo/maximize.svg" alt="zoom screen"></a></div>
                        </div>
                        <div class="center-con text-center">
                          <ul>
                            <li><a class="icon-btn btn-light button-effect pause" href="javascript:void(0)"><i class="ti-control-pause"></i></a></li>
                            <li><a class="icon-btn btn-danger button-effect btn-xl is-animating" @click="$bvModal.hide('videocall')" href="javascript:void(0)"><Icon name="lucide:phone"></Icon></a></li>
                            <li><a class="icon-btn btn-light button-effect mic" href="javascript:void(0)"><i class="fa fa-microphone"></i></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary fonts font_label" type="button" data-bs-toggle="modal" data-bs-target="#videocallhang">video call hang</button>
                
                <div class="viddiolog modal fade" id="videocallhang" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-body">
                      <div class="videocallhang call-modal" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/videocall_bg.jpg') + ')'},styleObject]">
                        <div class="media videocall-details d-flex">
                          <div class="usersprof">
                            <div class="profile" :style="[{'background-image': 'url(' + getImgUrl('avtar/2.jpg') + ')'},styleObject]"></div>
                            <div class="profile" :style="[{'background-image': 'url(' + getImgUrl('avtar/3.jpg') + ')'},styleObject]"></div>
                          </div>
                          <div class="media-body">
                            <h5>Josephin water</h5>
                            <h6>America ,California</h6>
                          </div>
                          <div class="red-notification">
                            <div class="dot-btn dot-danger grow"></div>
                            <h6>Ringing</h6>
                          </div>
                          <div class="zoomcontent"><a class="text-dark" href="javascript:void(0)" onclick="javascript:toggleFullScreen()"><img src="/images/logo/maximize.svg" alt="zoom screen"></a></div>
                        </div>
                        <div class="center-con text-center">
                          <ul>
                            <li><a class="icon-btn btn-success button-effect btn-xl is-animating" @click="$bvModal.hide('videocallhang')" href="javascript:void(0)"><Icon name="lucide:video"></Icon></a></li>
                            <li><a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" @click="$bvModal.hide('videocallhang')"  href="javascript:void(0)"><Icon name="lucide:phone"></Icon></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary fonts font_label" type="button" data-bs-toggle="modal" data-bs-target="#confvideocl">video call conference</button>
                
                <div class="modal fade" id="confvideocl" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-body">
                        <div class="row confimg">
                          <div class="col-6">
                            <div class="vclimg" :style="[{'background-image': 'url(' + getImgUrl('avtar/big/videocall_bg.jpg') + ')'},styleObject]"></div>
                          </div>
                          <div class="col-6">
                            <div class="vclimg" :style="[{'background-image': 'url(' + getImgUrl('avtar/1.jpg') + ')'},styleObject]"></div>
                          </div>
                          <div class="col-6">
                            <div class="vclimg" :style="[{'background-image': 'url(' + getImgUrl('avtar/2.jpg') + ')'},styleObject]"></div>
                          </div>
                          <div class="col-6">
                            <div class="vclimg" :style="[{'background-image': 'url(' + getImgUrl('avtar/4.jpg') + ')'},styleObject]"></div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer clfooter">
                        <div id="basicUsage3">00:00:00
                          <ul>
                              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" data-tippy-content="speaker"><Icon name="lucide:volume-2" size="15" height="15"></Icon></a></li>
                              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" data-tippy-content="Camera"><Icon name="lucide:camera-off" size="15" height="15"></Icon></a></li>
                              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" data-tippy-content="Add Call"><Icon name="lucide:user-plus" size="15" height="15"></Icon></a></li>
                              <li><a class="icon-btn btn-danger button-effect is-animating" @click="$bvModal.hide('confvideocl')" href="javascript:void(0)" data-dismiss="modal" data-tippy-content="Hangup"><Icon name="lucide:phone" size="15" height="15"></Icon></a></li>
                              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" data-tippy-content="Disable Video"><Icon name="lucide:video-off" size="15" height="15"></Icon></a></li>
                              <li><a class="icon-btn btn-light button-effect mic" href="javascript:void(0)" data-tippy-content="Mute"><Icon name="lucide:mic-off" size="15" height="15"></Icon></a></li>
                              <li><a class="icon-btn btn-light button-effect" href="javascript:void(0)" data-tippy-content="Hold"><Icon name="lucide:pause" size="15" height="15"></Icon></a></li>
                          </ul>
                        </div>
                      </div>
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

const config = useRuntimeConfig();

let styleObject=ref({
  "background-size": "cover",
              "background-position": "center",
              display: "block",
})
const getImgUrl = (path) => {
      return `${config.public.baseURL}/images/${path}`;
    };
</script>