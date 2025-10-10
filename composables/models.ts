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
  fetchMemberShips = "/fetchMemberShips",
  fetchUserMembership = "/fetchUserMembership",
  createUserMembership = "/createUserMembership",
  uploadVerifyPhoto = "/uploadVerifyPhoto",
  updateUserProfile = "/updateUserProfile",
  fetchPromotion = "/fetchPromotion",
  getProfilePhotoURL = "/getProfilePhotoURL",
  addEarlyAccess = "/addEarlyAccess"
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

export namespace PromotionsModel {
    export class AddRequestModel{
         text? : string
    }
    export class FetchResponseModel {
       text? : string
       speed?: number
    }
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
    user_id? : number
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
    genders?: string[];
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
    interests?: InterestsModel[];
    meet_perferences?: MeetPreferencesModel[];
    gender?:string
    partner_gender?:string
    tier_id?:number
    tier_name?:string
    price?:number
     about_me?: string;
    is_photo_verified?: boolean;
    verified_photo?:string;
    assets_path?:string;
  }

  export class FetchMembershipRequestModel {
    user_id?: number;
    tier_id?: number;
}

export class FetchMembershipResponseModel {
    user_membership_id?: number;
    user_id?: number;
    tier_id?: number;
    start_date?: string;
    end_date?: string;
    tier_price?: number;
    price_difference?: number;
}

export class CreateMembershipRequestModel {
    user_id?: number;
    tier_id?: number;
}

export class CreateMembershipResponseModel {
    user_membership_id?: number;
    user_id?: number;
    tier_id?: number;
    start_date?: string;
    end_date?: string;
    tier_price?: number;
    price_difference?: number;
    session_url?:string
}

export class ProfilePhotoRequestModel
{
  user_id?: number;
}
export class ProfilePhotoResponseModel
{
  url?: string;
}


}
export namespace MembershipsModel {

export class FetchMembershipsResponseModel {
    tier_id?: number;
    tier_name?: string;
    price?: number;
    tier_features?: TierFeaturesModel[];
}

export class TierFeaturesModel {
    tier_feature_id?: number;
    tier_id?: number;
    feature_id?: number;
    feature_name?: string;
    is_enabled?: boolean;
    limit_per_day?: number;
    max_total?: number;
    duration_minutes?: number;
    quality?: string;
    notes?: string;
    supports_media?: boolean;
    is_unlimited?: boolean;
    can_attach_photos?: boolean;
    can_attach_videos?: boolean;
    can_view_livestream?: boolean;
    can_chat_in_livestream?: boolean;
    can_host_livestream?: boolean;
}

}


export namespace EarlyAccessModel {
    export class AddRequestModel {
         email? : string
         should_receive_updates? : boolean
    }
    export class AddResponseModel {
        
    }
 
}