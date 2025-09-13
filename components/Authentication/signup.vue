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
                @blur="validateNickname(nickName)" :readonly="is_nick_loading"> </input>
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
              <input class="form-control" id="inputEmail3" type="email" placeholder="Demo@123gmail.com"
                v-model="email" />
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="inputPassword3">Password</label>
              <input class="form-control" id="inputPassword3" type="password" placeholder="Password"
                v-model="password" />
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
                <option value="" disabled>Select Sexual Orientation</option>
                <option v-for="orientation in allOptions.orientations" :key="orientation" :value="orientation">
                  {{ orientation }}
                </option>
              </select>
            </div>
          </div>

           <div class="form-group ">
            <label>Town/City</label>
            <Multiselect v-model="selectedTown" :options="allTowns" :multiple="false"
              :close-on-select="true" placeholder="Select Town" :loading="is_town_loading"   @search-change="fetchTowns" label="town" track_by="town_id" />
          </div>

          <div class="form-group ">
            <label>Height Unit</label>
            <Multiselect v-model="height_unit" :options="allOptions.heightUnits" :multiple="false"
              :close-on-select="true" placeholder="Select Height Unit" />
          </div>

          <div class="form-group " v-if="height_unit === 'cm'">
            <label for="inputEmail3">Height</label>
            <Multiselect v-model="cm_height" :options="cmArray" :multiple="false" :close-on-select="true"
              placeholder="Select Height" />
          </div>

          <div class="row" v-if="height_unit !== 'cm' && height_unit !== '' && height_unit">
            <div class="form-group col-12 col-md-6">
              <label for="inputEmail3">Feet</label>
              <Multiselect v-model="feet_height" :options="feetArray" :multiple="false" :close-on-select="true"
                placeholder="Select Feet" />
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="inputPassword3">Inches</label>
              <Multiselect v-model="inch_height" :options="inchesArray" :multiple="false" :close-on-select="true"
                placeholder="Select Inch" />
            </div>
          </div>

          <div class="form-group">
            <label>Sexual Interest</label>
            <Multiselect v-model="sexualInterest" :options="allOptions.interests" track-by="interest_id"
              label="interest_name" :multiple="true" class="custom-multiselect" :close-on-select="false"
              placeholder="Select Sexual Interest" :reduce="(opt : any) => opt.interest_id" />
          </div>

          <!-- Meet Preference (Checkboxes) -->
          <div class="form-group">
            <label>Meet Preference</label>
            <Multiselect v-model="meetPreference" :options="allOptions.meetPerferences" track-by="meet_preference_id"
              label="preference_name" :multiple="true" :close-on-select="false" placeholder="Select Meet Preference"
              :reduce="(opt : any) => opt.meet_preference_id" />
          </div>

          <!-- Meet Preference (Checkboxes) -->
          <div class="form-group">
            <label>Looking For</label>
            <Multiselect v-model="lookingFor" :options="allOptions.lookingFor" :multiple="true" :close-on-select="false"
              placeholder="Select Looking For"  />
          </div>

          <div class="form-group">
            <label>Ethnicity</label>
            <Multiselect v-model="ethnicity" :options="allOptions.ethnicity" :multiple="false" :close-on-select="true"
              placeholder="Select Ethnicity" />
          </div>
          <div class="form-group">
            <label>Body Type</label>
            <Multiselect v-model="body_type" :options="getBodyType()" :multiple="false" :close-on-select="true"
              placeholder="Select Partner Body Type" />
          </div>


          <div v-if="profileType === 'Couple'">
            <h5 class="mt-3 text-white">Partner Details</h5>

            <div class="row">
              <div class="form-group col-12 col-md-6">
                <label for="partnerNickName">Partner Nickname</label>
                <input class="form-control" id="partnerNickName" type="text" placeholder="Nickname"
                  v-model="partnerNickName" />
              </div>
              <div class="form-group col-12 col-md-6">
                <label for="partnerDob">Partner Date of Birth</label>
                <input class="form-control" id="partnerDob" type="date" v-model="partnerDob" :max="maxDob" />
              </div>
            </div>

            <div class="form-group">
              <label for="partnerSexualOrientation">Partner Sexual Orientation</label>
              <select class="form-control" id="partnerSexualOrientation" v-model="partnerSexualOrientation">
                <option value="">Select Partner Orientation</option>
                <option v-for="orientation in allOptions.orientations" :key="orientation" :value="orientation">
                  {{ orientation }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Partner Ethnicity</label>
              <Multiselect v-model="partner_ethnicity" :options="allOptions.ethnicity" :multiple="false"
                :close-on-select="true" placeholder="Select Partner Ethnicity" />
            </div>
            <div class="form-group">
              <label>Partner Body Type</label>
              <Multiselect v-model="partner_body_type" :options="getBodyType()" :multiple="false"
                :close-on-select="true" placeholder="Select Partner Body Type" />
            </div>


            <div class="form-group " v-if="height_unit === 'cm'">
              <label for="inputEmail3">Height</label>
              <Multiselect v-model="partner_cm_height" :options="cmArray" :multiple="false" :close-on-select="true"
                placeholder="Select Height" />
            </div>

            <div class="row" v-if="height_unit !== 'cm' && height_unit !== '' && height_unit">
              <div class="form-group col-12 col-md-6">
                <label for="inputEmail3">Feet</label>
                <Multiselect v-model="partner_feet_height" :options="feetArray" :multiple="false"
                  :close-on-select="true" placeholder="Select Feet" />
              </div>
              <div class="form-group col-12 col-md-6">
                <label for="inputPassword3">Inches</label>
                <Multiselect v-model="partner_inch_height" :options="inchesArray" :multiple="false"
                  :close-on-select="true" placeholder="Select Inch" />
              </div>
            </div>

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
const ethnicity = ref('');
const partner_ethnicity = ref('');
const body_type = ref('');
const partner_body_type = ref('');

const cm_height = ref('');
const feet_height = ref('');
const inch_height = ref('0');

const partner_cm_height = ref('');
const partner_feet_height = ref('');
const partner_inch_height = ref('0');

const height_unit = ref('cm');
const sexualInterest = ref<UsersModel.InterestsModel[]>([]);
const meetPreference = ref<UsersModel.MeetPreferencesModel[]>([]);
const allTowns = ref<UsersModel.FetchTownResponseModel[]>([]);
const selectedTown = ref<UsersModel.FetchTownResponseModel>({});
const lookingFor = ref<string[]>([]);

const today = new Date();
const maxDob = `${today.getFullYear() - 18}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const is_town_loading = ref(false);
const is_nick_loading = ref(false);
const is_signup_loading = ref(false);
const is_nick_valid = ref(false);

const cmToInch = 0.393701;

// Arrays to hold values
let cmArray: number[] = [];
let feetArray: number[] = [];
let inchesArray: number[] = [];

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
  if (nick.length === 0) {
    return;
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
    if (response.success === false) {
      showalert(response.message)
    }


  } catch (error) {
    is_nick_valid.value = false;
    is_nick_loading.value = false;
    // Handle error as needed
  }
};

function getBodyType(): string[] {
  if (profileType.value.length === 0) {
    return []
  }
  var bodyTypes: string[] = []
  let globalarray = allOptions.value.bodyTypes ?? []
  globalarray.forEach(element => {
    if (element.profileTypes?.includes(profileType.value)) {
      bodyTypes.push(element.bodyType ?? "")
    }
  });
  return bodyTypes
}

function fetchTowns(query:string) 
{
  if (query.length === 0) {
    allTowns.value = []
    return;
  }
  console.log("Search Query:", query);

 let api_url = getUrl(RequestURL.fetchTowns);
  is_town_loading.value = true;
  allTowns.value = []
  $fetch<SuccessError<UsersModel.SignUpResponseModel>>(api_url, {
    method: 'POST',
    body: {"search":query},
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
  
    if (response.success) {
     allTowns.value = (response.result ?? []) as UsersModel.FetchTownResponseModel[] 
    } 
     is_town_loading.value = false;
  }).catch((error) => {
    is_town_loading.value = false;
  });
}

function usersignup() {

  

  if (!checkValidation() || is_signup_loading.value) {
    return;
  }

  const unit = height_unit.value ?? ""
  let height = cm_height.value ?? ""
  let partner_height = partner_cm_height.value ?? ""
  if (unit !== 'cm') 
  {
    
   const f = feet_height.value ?? '0'
    const i = inch_height.value ?? '0'
    const concat = f + '.' + i
    const f_i = parseFloat(concat)
    height = convertToCm(f_i).toString()

    const p_f = partner_feet_height.value ?? '0'
    const p_i = partner_inch_height.value ?? '0'
    const p_concat = p_f + '.' + p_i
    const p_f_i = parseFloat(p_concat)

    partner_height = convertToCm(p_f_i).toString()
  }
 const town_id = selectedTown.value?.town_id ?? 0
  let request_mdoel = {
    profile_type: profileType.value,
    nick_name: nickName.value,
    email: email.value,
    password: password.value,
    dob: toDate((dob.value ?? ''), 'yyyy-MM-dd')?.toISOString().split('T')[0],
    orientation: sexualOrientation.value,
    partner_first_name: partnerFirstName.value,
    partner_last_name: partnerLastName.value,
    partner_nick_name: partnerNickName.value,
    partner_orientation: partnerSexualOrientation.value,
    partner_dob: toDate((partnerDob.value ?? ''), 'yyyy-MM-dd')?.toISOString().split('T')[0],
    interest_ids: sexualInterest.value.map(i => i.interest_id),
    meet_preference_ids: meetPreference.value.map(p => p.meet_preference_id),
    ethnicity: ethnicity.value,
    partner_ethnicity: partner_ethnicity.value,
    lookingFor: lookingFor.value.map(l => l),
    body_type: body_type.value,
    partner_body_type: partner_body_type.value,
    height_unit: height_unit.value,
    height: height,
    partner_height: partner_height,
    town_id : town_id
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
      showalert('Signup successful! Please check your email to verify your account.', true);
      // Optionally, redirect to login page or clear form
        reloadNuxtApp({
        path: "/authentication/login",
        ttl: 1000
      })
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



// Loop from 122 cm to 242 cm
for (let cm = 122; cm <= 242; cm++) {
  cmArray.push(cm);
}
for (let feet = 4; feet <= 8; feet++) {
  feetArray.push(feet);
}
for (let inch = 0; inch <= 11; inch++) {
  inchesArray.push(inch);
}

function checkValidation(): boolean {
  const profiletype = profileType.value.trim();
  const nickname = nickName.value.trim();
  const emailVal = email.value.trim();
  const passwordVal = password.value;
  const dobVal = dob.value;
  const sexualorientation = sexualOrientation.value.trim();
  const unit = height_unit.value ?? ""

  const cmheight = cm_height.value ?? ""
  const feetheight = feet_height.value ?? ""
  const inchheight = inch_height.value ?? ""

  const partnercmheight = partner_cm_height.value ?? ""
  const partnerfeetheight = partner_feet_height.value ?? ""
  const partnerinchheight = partner_inch_height.value ?? ""
  const town_id = selectedTown.value?.town_id ?? 0

  if (nickname.length === 0) {
    showalert('Please enter nickname');
    return false;
  }
  else if (!is_nick_valid.value) {
    showalert('Please enter valid nickname');
    return false;
  }
  else if (profiletype.length === 0) {
    showalert('Please select profile type');
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

  else if (sexualorientation.length === 0) {
    showalert('Please select sexual orientation');
    return false;
  }
   else if (town_id === 0) {
    showalert('Please select town');
    return false;
  }


  else if (unit.length === 0) {
    showalert('Please select height unit');
    return false;
  }
  else if (unit === "cm" && cmheight.length === 0) {
    showalert('Please select height');
    return false;
  }
  else if (unit !== "cm" && feetheight.length === 0) {
    showalert('Please select feet');
    return false;
  }
  else if (unit !== "cm" && inchheight.length === 0) {
    showalert('Please select inches');
    return false;
  }

  else if (sexualInterest.value.length === 0) {
    showalert('Please select sexual interest');
    // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
    return false;
  }
  else if (meetPreference.value.length === 0) {
    showalert('Please select meet preference');
    // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
    return false;
  }

  else if (lookingFor.value.length === 0) {
    showalert('Please select looking for');
    // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
    return false;
  }

  else if (ethnicity.value.length === 0) {
    showalert('Please select ethnicity');
    // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
    return false;
  }
  else if (body_type.value.length === 0) {
    showalert('Please select body type');
    // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
    return false;
  }

  else if (profileType.value === 'Couple' && partnerNickName.value.trim().length === 0) {
    showalert('Please enter partner nickname');
    return false;
  }
  else if (profileType.value === 'Couple' && partnerDob.value.length === 0) {
    showalert('Please enter partner date of birth');
    return false;
  }
  else if (profileType.value === 'Couple' && partnerSexualOrientation.value.trim().length === 0) {
    showalert('Please select partner sexual orientation');
    return false;
  }
  else if (profileType.value === 'Couple' && partner_ethnicity.value.trim().length === 0) {
    showalert('Please select partner ethnicity');
    return false;
  }
  else if (profileType.value === 'Couple' && partner_body_type.value.trim().length === 0) {
    showalert('Please select partner body type');
    return false;
  }

  else if (profileType.value === 'Couple' && unit === "cm" && partnercmheight.length === 0) {
    showalert('Please select height');
    return false;
  }
  else if (profileType.value === 'Couple' && unit !== "cm" && partnerfeetheight.length === 0) {
    showalert('Please select partner feet');
    return false;
  }
  else if (profileType.value === 'Couple' && unit !== "cm" && partnerinchheight.length === 0) {
    showalert('Please select partner inches');
    return false;
  }

  // Add more checks as needed (e.g., sexual orientation, interests, meet preference)
  return true;
}
</script>