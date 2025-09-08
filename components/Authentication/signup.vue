<template>
  <div class="login-page2 animat-rate">
    <div class="login-content-main">
      <div class="login-content2">
        <div class="theme-tab">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <nuxt-link to="/authentication/login">
                <a class="nav-link active" id="login-tab" data-toggle="tab" role="tab" aria-selected="false">
                  login
                </a>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="signup-tab" data-toggle="tab" href="javascript:void(0)" role="tab"
                aria-selected="true">Signup</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="login-content">
        <div class="login-content-header">
          <img src="/images/logo/landing-logo.png" alt="sign-logo" />
        </div>
        <h3>Hello Everyone , We are Linkswinger</h3>
        <h4>Welcome to Linkswinger please signup to your account.</h4>
        <div class="form2">
          <div class="form-group">
            <label class="col-form-label" for="inputprofiletype">Profile Type</label>
            <select class="form-control" id="inputprofiletype" v-model="profileType">
              <option value="" disabled>Select Profile Type</option>
              <option v-for="type in allOptions.profileTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="col-form-label" for="inputfirstname">First Name</label>
            <input class="form-control" id="inputfirstname" type="text" placeholder="First Name" v-model="firstName" />
          </div>
          <div class="form-group">
            <label class="col-form-label" for="inputlastname">Last Name</label>
            <input class="form-control" id="inputlastname" type="text" placeholder="Last Name" v-model="lastName" />
          </div>
          <div class="form-group">
            <label class="col-form-label" for="inputnickname">Nickname</label>
            <input class="form-control" id="inputnickname" type="text" placeholder="DemoNick" v-model="nickName"
              @blur="validateNickname(nickName)" :readonly="is_nick_loading" />
            <div v-if="is_nick_loading" class="btn-loader"></div>
          </div>
          <div class="form-group" v-if="profileType === 'Couple'">
            <label class="col-form-label" for="inputpartnerfirstname">Partner First Name</label>
            <input class="form-control" id="inputpartnerfirstname" type="text" placeholder="Partner First Name"
              v-model="partnerFirstName" />
          </div>
          <div class="form-group" v-if="profileType === 'Couple'">
            <label class="col-form-label" for="inputpartnerlastname">Partner Last Name</label>
            <input class="form-control" id="inputpartnerlastname" type="text" placeholder="Partner Last Name"
              v-model="partnerLastName" />
          </div>
          <div class="form-group" v-if="profileType === 'Couple'">
            <label class="col-form-label" for="inputpartnernickname">Partner Nickname</label>
            <input class="form-control" id="inputpartnernickname" type="text" placeholder="Partner Nickname"
              v-model="partnerNickName" />
          </div>


          <div class="form-group">
            <label class="col-form-label" for="inputEmail3">Email Address</label>
            <input class="form-control" id="inputEmail3" type="email" placeholder="Demo@123gmail.com" v-model="email" />
          </div>
          <div class="form-group">
            <label class="col-form-label" for="inputPassword3">Password</label><span> </span>
            <input class="form-control" id="inputPassword3" type="password" placeholder="Password" v-model="password" />
          </div>
          <div class="form-group">
            <label class="col-form-label" for="inputdob">Date of Birth</label>
            <input class="form-control" id="inputdob" type="date" placeholder="Date of Birth" v-model="dob"
              :max="maxDob" />
          </div>
          <div class="form-group" v-if="profileType === 'Couple'">
            <label class="col-form-label" for="inputdob">Partner Date of Birth</label>
            <input class="form-control" id="inputdob" type="date" placeholder="Date of Birth" v-model="partnerDob"
              :max="maxDob" />
          </div>
          <div class="form-group mb-0">
            <!-- Profile Type moved to top -->
            <div class="form-group">
              <label class="col-form-label" for="inputsexualorientation">Sexual Orientation</label>
              <select class="form-control" id="inputsexualorientation" v-model="sexualOrientation">
                <option value="">Select Sexual Orientation</option>
                <option v-for="orientation in allOptions.orientations" :key="orientation" :value="orientation">{{
                  orientation }}</option>
              </select>
            </div>
            <div class="form-group" v-if="profileType === 'Couple'">
              <label class="col-form-label" for="inputpartnersexualorientation">Partner Sexual Orientation</label>
              <select class="form-control" id="inputpartnersexualorientation" v-model="partnerSexualOrientation">
                <option value="" disabled>Select Partner Sexual Orientation</option>
                <option v-for="orientation in allOptions.orientations" :key="orientation" :value="orientation">{{
                  orientation }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="col-form-label" for="inputsexualinterest">Sexual Interest</label>
              <select class="form-control" id="inputsexualinterest" multiple v-model="sexualInterest">
                <option value="" disabled>Select Sexual Interest</option>
                <option v-for="interest in allOptions.interests" :key="interest.interest_id"
                  :value="interest.interest_id">{{ interest.interest_name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="col-form-label" for="inputmeetpreference">Meet Preference</label>
              <select class="form-control" id="inputmeetpreference" multiple v-model="meetPreference">
                <option value="" disabled>Select Meet Preference</option>
                <option v-for="pref in allOptions.meetPerferences" :key="pref.meet_preference_id"
                  :value="pref.meet_preference_id">{{ pref.preference_name }}</option>
              </select>
            </div>
            <div class="form-group mb-0">
              <div class="buttons">
                <button class="btn button-effect btn-primary signpbtn" @click="usersignup">Signup <div v-if="is_signup_loading" class="btn-loader"></div></button>
              </div>
            </div>
          </div>
        </div>
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
      <div class="quarterCircle"></div>
      <img class="cloud-logo" src="/images/login_signup/2.png" alt="login logo" /><img class="cloud-logo1"
        src="/images/login_signup/2.png" alt="login logo" /><img class="cloud-logo2" src="/images/login_signup/2.png"
        alt="login logo" /><img class="cloud-logo3" src="/images/login_signup/2.png" alt="login logo" /><img
        class="cloud-logo4" src="/images/login_signup/2.png" alt="login logo" /><img class="cloud-logo5"
        src="/images/login_signup/2.png" alt="login logo" />
    </div>
  </div>
</template>

<script setup lang="ts">





import { getToast, toast } from 'vue3-toastify';
import type { UsersModel } from '~/composables/models';
const profileType = ref('');
const firstName = ref('');
const lastName = ref('');
const partnerFirstName = ref('');
const partnerLastName = ref('');
const partnerNickName = ref('');
const partnerSexualOrientation = ref('');
const partnerDob = ref('');
const nickName = ref('');
const email = ref('');
const password = ref('');
const dob = ref('');
const sexualOrientation = ref('');
const sexualInterest = ref<number[]>([]);
const meetPreference = ref<number[]>([]);
const today = new Date();
const maxDob = `${today.getFullYear() - 18}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const is_nick_loading = ref(false);
const is_signup_loading = ref(false);
const is_nick_valid = ref(false);
const allOptions = ref({} as UsersModel.FetchOptionsResponseModel)
const fetchOptions = async () => {
  const api_url = getUrl(RequestURL.fetchAllOptions);
  const { data: option_response, error: option_error } = await useFetch<SuccessError<UsersModel.FetchOptionsResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {},
    headers: {
      "content-type": "application/json"
    }
  });
  return option_response.value?.response ?? {}
}
allOptions.value = await fetchOptions() as UsersModel.FetchOptionsResponseModel

const validateNickname = async () => {
  let nick = nickName.value.trim();
  if (nick.length === 0) 
  {
    return ;
  }
  try {
    const api_url = getUrl(RequestURL.validateNickname);
    is_nick_loading.value = true;
    is_nick_valid.value = false;
    
    const response = await $fetch<SuccessError<UsersModel.ValidateNicknameResponseModel>>(api_url, {
      method: 'POST',
      body: { nick_name: nickName.value },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    is_nick_loading.value = false;
    // Handle response as needed
     is_nick_valid.value = response.success;
    if (response.success === false)
    {
       showalert(response.message)
    }

   
  } catch (error) {
       is_nick_valid.value = false;
    is_nick_loading.value = false;
    // Handle error as needed
    console.error('Nickname validation failed:', error);
 
  }
};

function usersignup() 
{
  if (!checkValidation() || is_signup_loading.value) {
    return;
  }
  let request_mdoel = {
        profile_type : profileType.value,
        first_name : firstName.value,
        last_name : lastName.value,
        nick_name : nickName.value,
        email : email.value,
        password : password.value,
        dob : toDate((dob.value ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0],
        orientation : sexualOrientation.value,
        partner_first_name : partnerFirstName.value,
        partner_last_name : partnerLastName.value,
        partner_nick_name : partnerNickName.value,
        partner_orientation : partnerSexualOrientation.value,
        partner_dob : toDate((partnerDob.value ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0],
         interest_ids: sexualInterest.value,
         meet_preference_ids: meetPreference.value
  } as UsersModel.SignUpRequestModel

    let api_url = getUrl(RequestURL.signup);
    is_signup_loading.value = true;
    $fetch<SuccessError<UsersModel.SignUpResponseModel>>(api_url, {
      method: 'POST',
      body: request_mdoel,  
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      is_signup_loading.value = false;
      if (response.success) {
        showalert('Signup successful! Please check your email to verify your account.',true);
        // Optionally, redirect to login page or clear form
      } else {
        showalert(response.message || 'Signup failed. Please try again.');
      }
    }).catch((error) => {
      is_signup_loading.value = false;
      showalert('An error occurred during signup. Please try again.');
      console.error('Signup failed:', error);
    });

  // Proceed with signup logic
}

function checkValidation(): boolean {
  const profiletype = profileType.value.trim();
  const nickname = nickName.value.trim();
  const emailVal = email.value.trim();
  const passwordVal = password.value;
  const dobVal = dob.value;
    const sexualorientation = sexualOrientation.value.trim();
        
    if (profiletype.length === 0) {
    showalert('Please select profile type');
    return false;
  }
  else if (nickname.length === 0) {
    showalert('Please enter nickname');
    return false;
  }
  else if (!is_nick_valid.value) {
    showalert('Please enter valid nickname');
    return false;
  } 
   else if(profileType.value === 'Couple' && partnerNickName.value.trim().length === 0)
   {
      showalert('Please enter partner nickname');
       return false;
   }

   else if (emailVal.length === 0) {
    showalert('Please enter email');
    return false;
  }
  else if (!validateEmail(emailVal)) {
    showalert('Please enter valid email');
    return false;
  }
  else if (passwordVal.length === 0) {
    showalert('Please enter password');
    return false;
  }
  else if (dobVal.length === 0) {
    showalert('Please enter date of birth');
   // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
    return false;
  }
 if (profileType.value === 'Couple' && partnerDob.value.length === 0) {
       showalert('Please enter partner date of birth');
       return false;
     }
   else if (sexualorientation.length === 0)
    {
    showalert('Please select sexual orientation');
    return false;
  }
  if (profileType.value === 'Couple' && partnerSexualOrientation.value.trim().length === 0) {
       showalert('Please select partner sexual orientation');
       return false;
     }
    else if (sexualInterest.value.length === 0)
    {
    showalert('Please select sexual interest');
   // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
    return false;
  }
  else if (meetPreference.value.length === 0)
    {
    showalert('Please select meet preference');
   // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
    return false;
  }
  // Add more checks as needed (e.g., sexual orientation, interests, meet preference)
  return true;
}





</script>

<style scoped >
.btn-loader {
  width: 20px;
  height: 20px;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>