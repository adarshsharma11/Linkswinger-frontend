import Swal from 'sweetalert2'


export const getUrl = (request: RequestURL) => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.API_BASE_URL + request;
}
export enum RequestURL {
  fetchAllOptions = "/fetchAllOptions",
  signup = "/signup",
  validateNickname = "/validateNickname",
  login = "/login",
  activateUser = "/activateUser",
  resendVerificationEmail = "/resendVerificationEmail",
  fetchTowns = "/fetchTowns",
  getProfileDetails = "/getProfileDetails",
  logout = "/logout",
  forgotPassword = "/forgotPassword",
  resetPassword = "/resetPassword",
}



export function showalert(title: string, is_success: boolean = false, timer: number = 2000) {
  if (is_success) {
    Swal.fire({
      title: 'Success!',
      text: title,
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: timer,
      timerProgressBar: true
    });
  }
  else {
    Swal.fire({
      title: 'Error!',
      text: title,
      icon: 'error',
      confirmButtonText: 'Ok',
      timer: timer,
      timerProgressBar: true
    });
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function toDate(dateString: string, format: string): Date | null {
  const parsedDate = new Date(dateString);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
}
export function addSecondsToDate(date: Date, seconds: number): Date {
  const newDate = new Date(date);
  newDate.setSeconds(newDate.getSeconds() + seconds);
  return newDate;
}

export function convertToCm(feet: number): number {
  const cm = feet * 30.48;
  return Math.round(cm); // return as integer
}
export function convertToInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}




export interface SuccessError<T> {
  success: boolean;
  code: number;
  message: string;
  result?: [T];
  response?: T;
}

export namespace UsersModel {

  export class LoginRequestModel {
    nickemail?: string;
    password?: string;
    device_id?: string;
    is_update_device?: boolean;
  }

  export class LoginResponseModel {
    user_id?: number;
    first_name?: string;
    last_name?: string;
    nick_name?: string;
    email?: string;
    password?: string;
    profile_image?: string;
    profile_type?: string;
    user_type?: string;
    is_email_confirmed?: boolean;
  }

  export class SignUpRequestModel {
    first_name?: string;
    last_name?: string;
    nick_name?: string;
    email?: string;
    password?: string;
    profile_image?: string;
    profile_type?: string;
    user_type?: string;
    is_email_confirmed?: boolean;
    dob?: string;
    orientation?: string;
    partner_first_name?: string;
    partner_last_name?: string;
    partner_nick_name?: string;
    partner_orientation?: string;
    partner_dob?: string;
    interest_ids?: number[];
    meet_preference_ids?: number[];
    height_unit?: string;
    height?: string;
    partner_height?: string;
    looking_for?: string[];
    town_id?: number;
    ethnicity?: string;
    partner_ethnicity?: string;
    body_type?: string;
    partner_body_type?: string;
    device_id?: string;
  }

  export class SignUpResponseModel {
    user_id?: number;
    first_name?: string;
    last_name?: string;
    nick_name?: string;
    email?: string;
    password?: string;
    profile_image?: string;
    profile_type?: string;
    user_type?: string;
    is_email_confirmed?: boolean;
    asset_base_url?: string;
  }

  export class ValidateNicknameRequestModel {
    nick_name?: string;
  }

  export class ValidateNicknameResponseModel { }

  export class InterestsModel {
    interest_id?: number;
    interest_name?: string;
  }

  export class MeetPreferencesModel {
    meet_preference_id?: number;
    preference_name?: string;
  }

  export class BodyTypeModel {
    profileTypes?: string[];
    bodyType?: string;
  }

  export class FetchOptionsResponseModel {
    orientations?: string[];
    profileTypes?: string[];
    interests?: InterestsModel[];
    meetPerferences?: MeetPreferencesModel[];

    bodyTypes?: BodyTypeModel[];
    lookingFor?: string[];
    ethnicity?: string[];
    heightUnits?: string[];
  }

  export class ActivateUserRequestModel {
    user_udid?: string;
  }
  export class ActivateUserResponseModel {

  }
  export class FetchTownRequestModel
  {
     search?: string;
  }
  export class FetchTownResponseModel
  {
     town_id?: number;
     town?: string;
  }
   export class ProfileDetailsRequestModel {
    user_id?: number;
  }
   export class ProfileDetailsResponseModel {
    user_id?: number;
    user_udid?: string;
    nick_name?: string;
    email?: string;
    profile_image?: string;
    profile_type?: string;
    user_type?: string;
    is_email_confirmed?: boolean;
    dob?: string;
    is_dob_changed?: boolean;
    orientation?: string;
    partner_nick_name?: string;
    partner_profile_image?: string;
    partner_orientation?: string;
    partner_dob?: string;
    is_partner_dob_changed?: boolean;
    height_unit?: string;
    height?: string;
    partner_height?: string;
    looking_for?: string[];
    town_id?: number;
    ethnicity?: string;
    partner_ethnicity?: string;
    body_type?: string;
    partner_body_type?: string;
    town?: string;
  }
  
}