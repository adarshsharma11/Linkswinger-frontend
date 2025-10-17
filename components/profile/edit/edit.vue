<template>
    <div class="login-page2 animat-rate">
        <div class="login-content-main">
            <div class="login-content">
                <div class="form2 text-white">
                    <!-- Row: DOB + Sexual Orientation -->
                    <div class="row">
                        <div class="form-group">
                            <div class="d-flex flex-column align-items-center justify-content-center position-relative">
                                <!-- Avatar Wrapper -->
                                <div class="position-relative d-inline-block" style="width: 120px; height: 120px;">
                                    <!-- Avatar -->
                                    <img :src="getProfileImage()" alt="Profile" class="rounded-circle"
                                        style="width: 120px; height: 120px; object-fit: cover; display: block; margin: 0 auto;" />
                                    <span class="btn-loader" v-if="is_photo_uploading"></span>

                                    <!-- Edit Icon -->
                                    <button v-if="!is_photo_uploading" type="button"
                                        class="btn btn-theme-color rounded-circle position-absolute"
                                        style="top: -12px; right: -8px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;"
                                        @click="triggerFileInput">
                                        <i class="fa fa-pencil text-white fa-lg"></i>
                                    </button>
                                </div>

                                <!-- Hidden File Input -->
                                <input type="file" accept="image/png,image/jpeg" class="d-none" ref="fileInput"
                                    @change="handleFileUpload" />
                            </div>



                        </div>
                        <div class="form-group ">
                            <label>About Me</label>
                            <textarea v-model="about_me" class="form-control" id="exampleFormControlTextarea1"
                                placeholder="Write about yourself" rows="4" style="resize:none;"></textarea>
                        </div>
                        <div class="form-group col-12 col-md-6">
                            <label for="inputdob">Date of Birth
                                <i class="fa fa-info-circle text-info ms-1"
                                    v-tooltip="login_store.getUserDetails?.is_dob_changed ? 'You can only change your date of birth once. This field is now locked.' : 'You can only change your date of birth once. Make sure it\'s correct!'"
                                    style="cursor: help; font-size: 14px;"></i>
                            </label>
                            <div class="dob-tooltip-wrapper">
                                <input class="form-control" id="inputdob" type="date" v-model="dob" :max="maxDob"
                                    :disabled="login_store.getUserDetails?.is_dob_changed ?? false"
                                    :class="{ 'disabled-input': login_store.getUserDetails?.is_dob_changed }"
                                    title="Date of Birth" />
                            </div>
                        </div>
                        <div class="form-group col-12 col-md-6">
                            <label for="inputsexualorientation">Sexual Orientation</label>
                            <select class="form-control" id="inputsexualorientation" v-model="sexualOrientation">
                                <option value="" disabled>Select Sexual Orientation</option>
                                <option v-for="orientation in allOptions.orientations" :key="orientation"
                                    :value="orientation">
                                    {{ orientation }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- <div class="form-group ">
                        <label>Select Gender</label>
                        <Multiselect v-model="gender" :options="allOptions.genders" :multiple="false"
                            :close-on-select="true" placeholder="Select Gender" :disabled="is_gender_disabled" />
                    </div> -->

                    <div class="form-group ">
                        <label>Town/City</label>
                        <Multiselect v-model="selectedTown" :options="allTowns" :multiple="false"
                            :close-on-select="true" placeholder="Select Town" :loading="is_town_loading"
                            @search-change="fetchTowns" label="town" track_by="town_id" />
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
                            <Multiselect v-model="feet_height" :options="feetArray" :multiple="false"
                                :close-on-select="true" placeholder="Select Feet" />
                        </div>
                        <div class="form-group col-12 col-md-6">
                            <label for="inputPassword3">Inches</label>
                            <Multiselect v-model="inch_height" :options="inchesArray" :multiple="false"
                                :close-on-select="true" placeholder="Select Inch" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Sexual Interest</label>
                        <Multiselect v-model="sexualInterest" :options="allOptions.interests" track-by="interest_id"
                            label="interest_name" :multiple="true" class="custom-multiselect" :close-on-select="false"
                            placeholder="Select Sexual Interest" :reduce="(opt: any) => opt.interest_id" />
                    </div>

                    <!-- Meet Preference (Checkboxes) -->
                    <div class="form-group">
                        <label>Meet Preference</label>
                        <Multiselect v-model="meetPreference" :options="allOptions.meetPerferences"
                            track-by="meet_preference_id" label="preference_name" :multiple="true"
                            :close-on-select="false" placeholder="Select Meet Preference"
                            :reduce="(opt: any) => opt.meet_preference_id" />
                    </div>

                    <!-- Meet Preference (Checkboxes) -->
                    <div class="form-group">
                        <label>Looking For</label>
                        <Multiselect v-model="lookingFor" :options="allOptions.lookingFor" :multiple="true"
                            :close-on-select="false" placeholder="Select Looking For" />
                    </div>

                    <div class="form-group">
                        <label>Ethnicity</label>
                        <Multiselect v-model="ethnicity" :options="allOptions.ethnicity" :multiple="false"
                            :close-on-select="true" placeholder="Select Ethnicity" />
                    </div>
                    <div class="form-group">
                        <label>Body Type</label>
                        <Multiselect v-model="body_type" :options="getBodyType()" :multiple="false"
                            :close-on-select="true" placeholder="Select Partner Body Type" />
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
                                <label for="partnerDob">Partner Date of Birth
                                    <i class="fa fa-info-circle text-info ms-1"
                                        v-tooltip="login_store.getUserDetails?.is_partner_dob_changed ? 'You can only change your partner\'s date of birth once. This field is now locked.' : 'You can only change your partner\'s date of birth once. Make sure it\'s correct!'"
                                        style="cursor: help; font-size: 14px;"></i>
                                </label>
                                <div class="dob-tooltip-wrapper">
                                    <input class="form-control" id="partnerDob" type="date" v-model="partnerDob"
                                        :max="maxDob"
                                        :disabled="login_store.getUserDetails?.is_partner_dob_changed ?? false"
                                        title="Partner Date of Birth" />
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="partnerSexualOrientation">Partner Sexual Orientation</label>
                            <select class="form-control" id="partnerSexualOrientation"
                                v-model="partnerSexualOrientation">
                                <option value="">Select Partner Orientation</option>
                                <option v-for="orientation in allOptions.orientations" :key="orientation"
                                    :value="orientation">
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
                            <Multiselect v-model="partner_cm_height" :options="cmArray" :multiple="false"
                                :close-on-select="true" placeholder="Select Height" />
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
                                Update
                                <div v-if="is_signup_loading" class="btn-loader"></div>
                            </button>
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

// Helper reducers for vue-multiselect to avoid implicit any

import { UsersModel } from '~/composables/models';

const login_store = useLoginStore();
const profileType = ref(login_store.getUserDetails?.profile_type ?? '');
const partnerNickName = ref(login_store.getUserDetails?.partner_nick_name ?? '');
const partnerSexualOrientation = ref(login_store.getUserDetails?.partner_orientation ?? '');
const partnerDob = ref(login_store.getUserDetails?.partner_dob ?? '');

const dob = ref(login_store.getUserDetails?.dob ?? '');
const sexualOrientation = ref(login_store.getUserDetails?.orientation ?? '');
const ethnicity = ref(login_store.getUserDetails?.ethnicity ?? '');
const partner_ethnicity = ref(login_store.getUserDetails?.partner_ethnicity ?? '');
const body_type = ref(login_store.getUserDetails?.body_type ?? '');
const partner_body_type = ref(login_store.getUserDetails?.partner_body_type ?? '');

const nickName = ref('');
const email = ref('');
const password = ref('');
const about_me = ref(login_store.getUserDetails?.about_me ?? '');
const cm_height = ref('');
const feet_height = ref('');
const inch_height = ref('0');
const partner_cm_height = ref('');
const partner_feet_height = ref('');
const partner_inch_height = ref('0');


const height_unit = ref(login_store.getUserDetails?.height_unit ?? 'cm');

const sexualInterest = ref<UsersModel.InterestsModel[]>(login_store.getUserDetails?.interests ?? []);
const meetPreference = ref<UsersModel.MeetPreferencesModel[]>(login_store.getUserDetails?.meet_perferences ?? []);
const allTowns = ref<UsersModel.FetchTownResponseModel[]>([]);

const selectedTown = ref<UsersModel.FetchTownResponseModel>({});
const lookingFor = ref<string[]>(login_store.getUserDetails?.looking_for ?? []);

const today = new Date();
const maxDob = `${today.getFullYear() - 18}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const is_town_loading = ref(false);
const is_nick_loading = ref(false);
const is_signup_loading = ref(false);
const is_photo_uploading = ref(false);
const is_nick_valid = ref(false);

const gender = ref('');
const partner_gender = ref('');
const is_gender_disabled = ref(true);
const previewUrlFile = ref<Blob | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);
function triggerFileInput() {
    fileInput.value?.click();
}

async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const profile_image = await file.arrayBuffer()
        previewUrl.value = URL.createObjectURL(file)
        previewUrlFile.value = new Blob([profile_image])
        await uploadPhoto(file.type)
    }
    target.value = ''
}
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
selectedTown.value = { town_id: login_store.getUserDetails?.town_id, town: login_store.getUserDetails?.town } as UsersModel.FetchTownResponseModel
getHeight();
getPartnerHeight();


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

function fetchTowns(query: string) {
    if (query.length === 0) {
        allTowns.value = []
        return;
    }
    let api_url = getUrl(RequestURL.fetchTowns);
    is_town_loading.value = true;
    allTowns.value = []
    $fetch<SuccessError<UsersModel.SignUpResponseModel>>(api_url, {
        method: 'POST',
        body: { "search": query },
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
    let height = cm_height.value.toString() ?? ""
    let partner_height = partner_cm_height.value.toString() ?? ""
    if (unit !== 'cm') {

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
        user_id: login_store.getUserDetails?.user_id,
        profile_type: profileType.value,
        nick_name: nickName.value,
        email: email.value,
        password: password.value,
        dob: toDate((dob.value ?? ''), 'yyyy-MM-dd')?.toISOString().split('T')[0],
        orientation: sexualOrientation.value,
        partner_nick_name: partnerNickName.value,
        partner_orientation: partnerSexualOrientation.value,
        partner_dob: toDate((partnerDob.value ?? ''), 'yyyy-MM-dd')?.toISOString().split('T')[0],
        interest_ids: sexualInterest.value.map(i => i.interest_id),
        meet_preference_ids: meetPreference.value.map(p => p.meet_preference_id),
        ethnicity: ethnicity.value,
        partner_ethnicity: partner_ethnicity.value,
        looking_for: lookingFor.value.map(l => l),
        body_type: body_type.value,
        partner_body_type: partner_body_type.value,
        height_unit: height_unit.value,
        height: height,
        partner_height: partner_height,
        town_id: town_id,
        device_id: "",
        gender: gender.value,
        partner_gender: partner_gender.value,
        about_me: about_me.value
    } as UsersModel.SignUpRequestModel

    let api_url = getUrl(RequestURL.updateUserProfile);
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
            showToastSuccess('Profile Updated', true);
            // Optionally, redirect to login page or clear form
            reloadNuxtApp({
                path: "/profile",
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

async function uploadPhoto(contentType:string = 'image/jpeg') {
    let api_url = getUrl(RequestURL.getProfilePhotoURL);
    is_photo_uploading.value = true;
    let response = await $fetch<SuccessError<UsersModel.ProfilePhotoResponseModel>>(api_url, {
        method: 'POST',
        body: {
            "user_id": login_store.getUserDetails?.user_id,
            "contentType": contentType
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let worker_model = response.response?.worker_model as WorkerModel
    upload(worker_model,contentType)
}

function upload(worker_model: WorkerModel,contentType:string = 'image/jpeg') 
{
    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            let value = Math.round((e.loaded / e.total) * 100)
            worker_model.progress   = value
            sendmsgtoworker(worker_model,true)
        }
    })

    xhr.upload.addEventListener('error', () => {
        // error.value = 'Upload failed'
        // uploading.value = false
        is_photo_uploading.value = false;
        showToastError('Photo upload failed. Please try again.')
            worker_model.progress = -1
            sendmsgtoworker(worker_model,true)
    })

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            is_photo_uploading.value = false;
            worker_model.progress = 100
            sendmsgtoworker(worker_model,true)
        }
    }

    xhr.open('PUT', worker_model.url ?? '')
    xhr.setRequestHeader('Content-Type', contentType)
    // add headers if needed: xhr.setRequestHeader('Authorization', 'Bearer ...')
   
    xhr.send(previewUrlFile.value)
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

function getHeight() {
    let height = login_store.getUserDetails?.height ?? ''
    let height_unit = login_store.getUserDetails?.height_unit ?? 'cm'
    if (height_unit === 'cm') {
        cm_height.value = height
    }
    else {
        let parseHeight = parseFloat(height)
        let feet_inch = convertToInches(parseHeight)
        feet_height.value = feet_inch.feet.toString()
        inch_height.value = feet_inch.inches.toString()
    }
}
function getPartnerHeight() {
    let height = login_store.getUserDetails?.partner_height ?? ''
    let height_unit = login_store.getUserDetails?.height_unit ?? 'cm'
    if (height_unit === 'cm') {
        partner_cm_height.value = height
    }
    else {
        let parseHeight = parseFloat(height)
        let feet_inch = convertToInches(parseHeight)
        partner_feet_height.value = feet_inch.feet.toString()
        partner_inch_height.value = feet_inch.inches.toString()
    }
}

watch(profileType, () => {
    gender.value = ''
    partner_gender.value = ''
    is_gender_disabled.value = false
    if (profileType.value === 'Man' || profileType.value === 'Woman') {
        gender.value = profileType.value
        is_gender_disabled.value = true
    }

});

function checkValidation(): boolean {
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
    if (dobVal.length === 0) {
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

    else if ((sexualInterest.value ?? []).length === 0) {
        showalert('Please select sexual interest');
        // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
        return false;
    }
    else if ((meetPreference.value ?? []).length === 0) {
        showalert('Please select meet preference');
        // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
        return false;
    }

    else if ((lookingFor.value ?? []).length === 0) {
        showalert('Please select looking for');
        // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
        return false;
    }

    else if ((ethnicity.value ?? '').trim().length === 0) {
        showalert('Please select ethnicity');
        // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
        return false;
    }
    else if ((body_type.value ?? '').trim().length === 0) {
        showalert('Please select body type');
        // toDate((item.created_at ?? ''),'yyyy-MM-dd')?.toISOString().split('T')[0] }}
        return false;
    }

    else if (profileType.value === 'Couple' && (partnerNickName.value ?? '').trim().length === 0) {
        showalert('Please enter partner nickname');
        return false;
    }
    else if (profileType.value === 'Couple' && (partnerDob.value ?? '').length === 0) {
        showalert('Please enter partner date of birth');
        return false;
    }
    else if (profileType.value === 'Couple' && (partnerSexualOrientation.value ?? '').trim().length === 0) {
        showalert('Please select partner sexual orientation');
        return false;
    }
    else if (profileType.value === 'Couple' && (partner_ethnicity.value ?? '').trim().length === 0) {
        showalert('Please select partner ethnicity');
        return false;
    }
    else if (profileType.value === 'Couple' && (partner_body_type.value ?? '').trim().length === 0) {
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
    return true;
}
function getProfileImage() : string
{
  let url = previewUrl.value ?? ''
    if (url.length > 0) return url

  let media_path = login_store.getUserDetails?.media_path ?? ''
  let profile_image = login_store.getUserDetails?.profile_image ?? ''
  if (media_path.length > 0 && profile_image.length > 0)
  {
    console.log("Profile Image Path: " + media_path + profile_image)
    return media_path + profile_image
  }
  return "/images/avtar/1.jpg"
}
</script>

<style scoped>
.dob-tooltip-wrapper {
    display: block;
    width: 100%;
}

.form-group label {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}

.form-group label i {
    margin-left: 4px;
}

/* Ensure tooltip appears above other elements */
.form-group label i:hover {
    z-index: 9999;
}

/* Add subtle animation to info icon */
.form-group label i {
    transition: transform 0.2s ease-in-out;
}

.form-group label i:hover {
    transform: scale(1.1);
    color: #17a2b8;
}
</style>