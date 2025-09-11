<template>
  <div class="login-page2 animat-rate">
    <div class="login-content-main">
      <div class="login-content">
        <div class="login-content-header">
          <nuxt-link to="/"><img src="/images/logo/landing-logo.png" alt="sign-logo" /></nuxt-link>
        </div>
        <h3 class="text-white">Hello Everyone, We are LinkSwingers</h3>
        <h4 class="text-white">Welcome to LinkSwingers, please signup to your account.</h4>

        <div class="form2 text-white">
          <!-- Row: Nickname + Profile Type -->
          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="inputnickname">Nickname</label>
              <input class="form-control" id="inputnickname" type="text" placeholder="DemoNick" v-model="nickName"
                @blur="validateNickname(nickName)" :readonly="is_nick_loading" />
              <div v-if="is_nick_loading" class="btn-loader"></div>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="inputprofiletype">Profile Type</label>
              <select class="form-control" id="inputprofiletype" v-model="profileType">
                <option value="" disabled>Select Profile Type</option>
                <option v-for="type in allOptions.profileTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
          </div>

          <!-- Row: Email + Password -->
          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="inputEmail3">Email Address</label>
              <input class="form-control" id="inputEmail3" type="email" placeholder="Demo@123gmail.com" v-model="email" />
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="inputPassword3">Password</label>
              <input class="form-control" id="inputPassword3" type="password" placeholder="Password" v-model="password" />
            </div>
          </div>

        


          <!-- Row: DOB + Sexual Orientation -->
          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="inputdob">Date of Birth</label>
              <input class="form-control" id="inputdob" type="date" v-model="dob" :max="maxDob" />
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="inputsexualorientation">Sexual Orientation</label>
              <select class="form-control" id="inputsexualorientation" v-model="sexualOrientation">
                <option value="">Select Sexual Orientation</option>
                <option v-for="orientation in allOptions.orientations" :key="orientation" :value="orientation">
                  {{ orientation }}
                </option>
              </select>
            </div>
          </div>

            <!-- Partner Details (only if Couple) -->
        <div v-if="profileType === 'Couple'">
          <h5 class="mt-3 text-white">Partner Details</h5>
          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="partnerFirstName">Partner First Name</label>
              <input
                class="form-control"
                id="partnerFirstName"
                type="text"
                placeholder="First Name"
                v-model="partnerFirstName"
              />
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="partnerLastName">Partner Last Name</label>
              <input
                class="form-control"
                id="partnerLastName"
                type="text"
                placeholder="Last Name"
                v-model="partnerLastName"
              />
            </div>
          </div>

          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="partnerNickName">Partner Nickname</label>
              <input
                class="form-control"
                id="partnerNickName"
                type="text"
                placeholder="Nickname"
                v-model="partnerNickName"
              />
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="partnerDob">Partner Date of Birth</label>
              <input
                class="form-control"
                id="partnerDob"
                type="date"
                v-model="partnerDob"
                :max="maxDob"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="partnerSexualOrientation">Partner Sexual Orientation</label>
            <select
              class="form-control"
              id="partnerSexualOrientation"
              v-model="partnerSexualOrientation"
            >
              <option value="">Select Partner Orientation</option>
              <option
                v-for="orientation in allOptions.orientations"
                :key="orientation"
                :value="orientation"
              >
                {{ orientation }}
              </option>
            </select>
          </div>
        </div>

          <!-- Sexual Interest (Checkboxes) -->
          <div class="form-group">
            <label>Sexual Interest</label>
            <Multiselect
              v-model="sexualInterest"
              :options="allOptions.interests"
              track-by="interest_id"
              label="interest_name"
              :multiple="true"
              class="custom-multiselect"
              :close-on-select="false"
              placeholder="Select Sexual Interest"
              :reduce="interestToId"
            />
          </div>

          <!-- Meet Preference (Checkboxes) -->
          <div class="form-group">
            <label>Meet Preference</label>
            <Multiselect
              v-model="meetPreference"
              :options="allOptions.meetPerferences"
              track-by="meet_preference_id"
              label="preference_name"
              :multiple="true"
              :close-on-select="false"
              placeholder="Select Meet Preference"
              :reduce="prefToId"
            />
          </div>

              <!-- Meet Preference (Checkboxes) -->
          <div class="form-group">
            <label>Looking For</label>
            <Multiselect
              v-model="meetPreference"
              :options="allOptions.meetPerferences"
              track-by="looking_for_id"
              label="looking_for_name"
              :multiple="true"
              :close-on-select="false"
              placeholder="Select Looking For"
              :reduce="lookingForToId"
            />
          </div>

          <!-- Signup Button -->
          <div class="form-group mb-4">
            <div class="buttons">
              <button class="btn button-effect btn-primary signpbtn" @click="usersignup">
                Signup
                <div v-if="is_signup_loading" class="btn-loader"></div>
              </button>
            </div>
          </div>

           <div class="form-group mb-0">
            <div class="text-center">
              <p class="text-white">Already have an account? <nuxt-link to="/authentication/login">Login</nuxt-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">





import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import { getToast, toast } from 'vue3-toastify';

// Helper reducers for vue-multiselect to avoid implicit any
const interestToId = (interest: { interest_id: number; interest_name: string }) => interest.interest_id;
const prefToId = (pref: { meet_preference_id: number; preference_name: string }) => pref.meet_preference_id;
import type { UsersModel } from '~/composables/models';
const profileType = ref('');
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