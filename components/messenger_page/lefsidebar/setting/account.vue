<template>

    <div class="setting-block">
      <div class="block" :class="activesetting === 1 ? 'open': ''">                  
        <div class="d-flex">
                <div class="flex-grow-1">
                  <h3>Account</h3>
                </div>
                <div class="media-right"><a class="icon-btn btn-outline-light btn-sm pull-right previous" @click="activeSettingmenu(0)"> <Icon name="lucide:chevron-left">                </Icon></a></div>
              </div>
              <div class="theme-according" id="accordion">
                <div class="card">
                  <div class="card-header" id="headingTwo" role="heading" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"><a>Security<i class="fa fa-angle-down"></i></a></div>
                  <div class="collapse show" id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">
                      <div class="d-flex">
                        <div class="flex-grow-1">
                          <h5>Show Security notification</h5>
                        </div>
                        <div class="media-right"> 
                          <input class="js-switch8" type="checkbox"/>
                        </div>
                      </div>
                      <p> <b>Note : </b>turn on this setting to recive notification when a contact's security code has been changes.</p>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingOne" role="heading" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"><a>Privacy<i class="fa fa-angle-down"></i></a></div>
                  <div class="collapse" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                      <ul class="privacy">
                        <li> 
                          <h5>Last seen</h5>
                          <input class="js-switch10" type="checkbox" checked=""/>
                          <p> <b>Note : </b>turn on this setting to whether your contact can see last seen or not.</p>
                        </li>
                        <li> 
                          <h5>Profile Photo</h5>
                          <input class="js-switch11" type="checkbox"/>
                          <p>
                             turn on this setting to whether your contact can see your profile or not.</p>
                        </li>
                        <li> 
                          <h5>About</h5>
                          <input class="js-switch12" type="checkbox"/>
                          <p> <b>Note : </b>turn on this setting to whether your contact can see about status or not.</p>
                        </li>
                        <li> 
                          <h5>Status</h5>
                          <input class="js-switch14" type="checkbox"/>
                          <p> <b>Note : </b>turn on this setting to whether your contact can see your status or not.                          </p>
                        </li>
                        <li> 
                          <h5>Read receipts</h5>
                          <input class="js-switch16" type="checkbox"/>
                          <p> <b>Note : </b>If turn off this option you won't be able to see read recipts from contact. read receipts are always sent for group chats.                     </p>
                        </li>
                        <li> 
                          <h5>Groups</h5>
                          <input class="js-switch13" type="checkbox" checked=""/>
                          <p> <b>Note : </b>turn on this setting to whether your contact can add in groups or not.  </p>
                        </li>
                        <li> 
                          <h5>Screen Lock(Require Touch ID)</h5>
                          <input class="js-switch17" type="checkbox"/>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingThree" role="heading" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><a>Two Step verification<i class="fa fa-angle-down"></i></a></div>
                  <div class="collapse" id="collapseThree" aria-labelledby="headingThree" data-parent="#accordion">
                    <div class="card-body">
                      <div class="d-flex">
                        <div class="flex-grow-1">
                          <h5>Enable</h5>
                        </div>
                        <div class="media-right"> 
                          <input class="js-switch9" type="checkbox"/>
                        </div>
                      </div>
                      <p> <b>Note : </b>For added security, enable two-step verifiation, which will require a PIN when registering your phone number with Chitchat again.</p>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingFour" role="heading" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"><a>Change Number<i class="fa fa-angle-down"></i></a></div>
                  <div class="collapse" id="collapseFour" aria-labelledby="headingFour" data-parent="#accordion">
                    <div class="card-body change-number">
                      <h5>Your old country code & phone number</h5>
                      <div class="input-group">
                        <div class="input-group-prepend"><span class="input-group-text form-control m-0">+</span></div>
                        <input class="form-control country-code" type="number" placeholder="01"/>
                        <input class="form-control" type="number" placeholder="1234567895"/>
                      </div>
                      <h5>Your new country code & phone number</h5>
                      <div class="input-group">
                        <div class="input-group-prepend"><span class="input-group-text form-control m-0">+</span></div>
                        <input class="form-control country-code" type="number" placeholder="01"/>
                        <input class="form-control" type="number" placeholder=""/>
                      </div>
                      <div class="text-end">  <a class="btn btn-outline-primary button-effect btn-sm" href="#">confirm</a></div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingFive" role="heading" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"><a>Request account info<i class="fa fa-angle-down"></i></a></div>
                  <div class="collapse" id="collapseFive" aria-labelledby="headingFive" data-parent="#accordion">
                    <div class="card-body"><a class="p-0 req-info" id="demo" href="#" :class="requestSent? 'disabled' : ''" v-on:click="deleterequest()">Request Info                            </a>
                      <p> <b>Note : </b>Create a report of your account information and settings, which you can access ot port to another app.</p>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingSix" role="heading" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix"><a>Delete My account<i class="fa fa-angle-down"></i></a></div>
                  <div class="collapse" id="collapseSix" aria-labelledby="headingSix" data-parent="#accordion">
                    <div class="card-body"><a class="p-0 req-info font-danger" :class="deletedAccount? 'disabled' : ''" v-on:click="deleteaccount()">Delete Account                            </a>
                      <p> <b>Note :</b>Deleting your account will delete your account info, profile photo, all groups & chat history.</p>
                    </div>
                  </div>
                </div>
              </div>
      </div>
      <div class="d-flex">
        <div class="flex-grow-1">
          <h3>Account</h3>
          <h4>Update Your Account Details</h4>
        </div>
        <div class="media-right"> <a class="icon-btn btn-outline-light btn-sm pull-right next" href="javascript:void(0)" @click="activeSettingmenu(1)"> <Icon name="lucide:chevron-right" size="15" height="15"></Icon></a></div>
      </div>
    </div>
 
</template>

<script setup>
import { ref, computed } from "vue";
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();
    const deletedAccount = ref(false);
    const requestSent = ref(false);
    const activesetting = computed(() => commonStore.activesetting);
    
    const activeSettingmenu = (id) => {
      commonStore.activesetting = id
    };

    const deleteaccount = () => {
      deletedAccount.value = deletedAccount.value;
    };

    const deleterequest = () => {
      requestSent.value = true;
    };
</script>