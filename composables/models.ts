import Swal from 'sweetalert2'
import { number } from 'yup';


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
  fetchPostCodes = "/fetchPostCodes",
  fetchTownsPostCodes = "/fetchTownsPostCodes",
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
  addEarlyAccess = "/addEarlyAccess",
  getFeedMediaURL = "/getFeedMediaURL",
  fetchFeeds = "/fetchFeeds",
  fetchNewFeeds = "/fetchNewFeeds",
  fetchallusers = "/fetchallusers",
  chatHistory = "/chatHistory",
  fetchChat = "/fetchChat",
  getChatMediaURL = "/getChatMediaURL",
  fetchCallCode = "/fetchCallCode",
  updateCallCode = "/updateCallCode",
  validateCall = "/validateCall",
  addMeetVerification = "/addMeetVerification",
  fetchMeetVerifications = "/fetchMeetVerifications",
  declineCall = "/declineCall",
  acceptCall = "/acceptCall",
  endCall = "/endCall",
  fetchCallDetails = "/fetchCallDetails",
  deleteChat = "/deleteChat",
  updateUserStatus = "/updateUserStatus",
  getFeedCount = "/getFeedCount",
  removeProfilePhoto = "/removeProfilePhoto",
  deleteWholeChat = "/deleteWholeChat",
  fetchEmojis = "/fetchEmojis",
  addFeedComment = "/addFeedComment",
  feedLikeDisLike = "/feedLikeDisLike",
  fetchFeedComments = "/fetchFeedComments",
  rouletteEnter = "/rouletteEnter",
  rouletteEnd = "/rouletteEnd",
  updateProfilePicture = "/updateProfilePicture",
  updateVisibility = "/updateVisibility",
  fetchGivenMeetVerifications = "/fetchGivenMeetVerifications",
  updateCommentStatus = "/updateCommentStatus",
  updateLikeStatus = "/updateLikeStatus",
  updateFeedType = "/updateFeedType",
  deleteFeed = "/deleteFeed",
  getChatReadCount = "/getChatReadCount",
  addProfileViews = "/addProfileViews",
  fetchProfileViews = "/fetchProfileViews",
  fetchNearByUsers = "/fetchNearByUsers",
  fetchCrushList = "/fetchCrushList",
  addCrush = "/addCrush",
  crushStatus = "/crushStatus",
  sendFriendReq = "/sendFriendReq",
  friendStatus  = "/friendStatus",
  fetchFriends  = "/fetchFriends",
  acceptDeclineFriend = "/acceptDeclineFriend",
  fetchPhotoVerifications = "/fetchPhotoVerifications",
  removeFriend = "/removeFriend",
  userBlock = "/userBlock",
  userUnblock = "/userUnblock",
  checkBlockStatus = "/checkBlockStatus",
  createMeetEvent = "/meet/create",
  fetchMeetEvents = "/meet/list",
  meetLikeDisLike = "/meet/likeDisLike",
  addMeetComment = "/meet/addComment",
  fetchMeetComments = "/meet/fetchComment",
  meetupdateCommentStatus = "/meet/updateCommentStatus",
  meetupdateLikeStatus = "/meet/updateLikeStatus",
  homeDashboard = "/home/dashboard",
  addReport = "/addReport",
  removeBannedWarning = "/removeBannedWarning"
}


export function showalert(text: string,title: string = '', is_success: boolean = false, timer: number = 2000) {
  if (is_success) {
    Swal.fire({
      title: title.length > 0 ? title : 'Success!',
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: timer,
      timerProgressBar: true
    });
  }
  else {
    Swal.fire({
      title: title.length > 0 ? title : 'Error!',
      text: text,
      icon: 'error',
      confirmButtonText: 'Ok',
      timer: timer,
      timerProgressBar: true
    });
  }
}

export function formatNumber(count: number): string {
  if (count < 1000) {
    return count.toString();
  }

  if (count < 1_000_000) {
    const value = count / 1000;
    return value % 1 === 0
      ? `${value}K`
      : `${value.toFixed(1)}K`;
  }

  const value = count / 1_000_000;
  return value % 1 === 0
    ? `${value}M`
    : `${value.toFixed(1)}M`;
}

export function formatRelativeDate(inputDate: string) {
  // Parse date as UTC explicitly
  const date = new Date(inputDate); // input is UTC ISO string
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000 * -1);

  const now = new Date();

  const diffMs = now.getTime() - localDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Minutes
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;

  // Hours
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  // Days
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;

  // Weeks
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "1 week ago";
  if (diffWeeks <= 4) return `${diffWeeks} weeks ago`;

  // More than 4 weeks → return local formatted date
  return localDate.toISOString().split("T")[0]; // YYYY-MM-DD
}



export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function toDate(dateString: string, format: string): Date | null {
  const parsedDate = new Date(dateString);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
}
export function formatToLocal(dateStr?: string) {
  if (!dateStr) return ''

  const d = new Date(dateStr + ' UTC')
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
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

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}
export function getDistanceFromLatLonInMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const km = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
  const milesPerKm = 0.621371
  return km * milesPerKm
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}



export interface SuccessError<T> {
  success: boolean;
  code: number;
  message: string;
  result?: [T];
  response?: T;
}

export namespace PromotionsModel {
  export class AddRequestModel {
    text?: string
  }
  export class FetchResponseModel {
    text?: string
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
    banned_date?:string
    banned_reason? :string
  }

  export class SignUpRequestModel {
    user_id?: number
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
    
    smoking?: string[];
    tattoos? : string[]
    piercings? : string[]

    
  }

  export class ActivateUserRequestModel {
    user_udid?: string;
  }
  export class ActivateUserResponseModel {

  }
  export class FetchTownRequestModel {
    search?: string;
  }
  export class FetchTownResponseModel {
    town_id?: number;
    town?: string;
    latitude?: number;
    longitude?: number;

  }
  export class FetchPostCodeRequestModel {
    search?: string;
  }
  export class FetchPostCodeResponseModel {
    post_code_id?: number;
    post_code?: string;
    latitude?: number;
    longitude?: number;
  }
  export class FetchTownPostCodesResponseModel {
    id?: number;
    name?: string;
    type?: string;
    latitude?: number;
    longitude?: number;

  }
  export class ProfileDetailsRequestModel {
    user_id?: number;
  }
  export class ProfileDetailsResponseModel {
    user_id?: number;
    user_udid?: string;
    nick_name?: string;
    email?: string;
    call_code?: string;
    profile_status?: string;
    profile_image?: string;
    sd_profile_image?: string;
    hd_profile_image?: string;
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
    gender?: string
    partner_gender?: string
    tier_id?: number
    tier_name?: string
    price?: number
    about_me?: string;
    is_photo_verified?: boolean;
    is_meet_verified?: boolean;
    verified_photo?: string;
    assets_path?: string;
    media_path?: string;
    latitude?: number;
    longitude?: number;
    is_typing?: boolean;

    post_code_id?: number;
    post_code?: string
    post_latitude?: number;
    post_longitude?: number;
    viewed_at? : string;
    is_liked?: boolean;
    friend_status? : string;
    isFriendDecisionLoading? : boolean;

    photo_verification_id? : number
    verification_status? : string
    reason? : string

    from_id? : number
    to_id? : number

    smoking? : string
    tattoos? : string
    piercings? : string

    partner_smoking? : string
    partner_tattoos? : string
    partner_piercings? : string

    is_blocked?:boolean
    banned_reason?:string
    has_warning?:boolean
  
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
    session_url?: string
  }

  export class ProfilePhotoRequestModel {
    user_id?: number;
  }
  export class ProfilePhotoResponseModel {
    worker_model?: WorkerModel;
  }

  export class FetchCallCodeRequestModel {
    user_id?: number;
  }
  export class FetchCallCodeResponseModel {
    call_code?: string;
  }

  export class FeedCountResponseModel {
    feed_type?: string;
    media_type?: string;
    count?: number;
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
    email?: string
    should_receive_updates?: boolean
  }
  export class AddResponseModel {

  }

}
export namespace FeedsModel {
  export class FeedsURLRequestModel {
    user_id?: number;
    contentType?: string;
    feed_type?: string;
    feed_desc?: string;
  }
  export class FeedsURLResponseModel {
    worker_model?: WorkerModel;
  }

  export class FeedsRequestModel {
    login_id?: number
    user_id?: number;
    media_type?: string;
    feed_type?: string;
  }
  export class FeedsResponseModel {
    media_path?: string;
    media_type?: string;
    feed_id?: number;
    user_id?: number;
    nick_name?: string;
    profile_image?: string
    hd_profile_image?: string
    profile_type?: string
    feed_thumbnail?: string
    lq_feed_image?: string
    hd_feed_image?: string
    lq_feed_video?: string
    sd_feed_video?: string
    hd_feed_video?: string
    feed_desc?: string
    feed_type?: string
    is_liked?: boolean
    is_loading?: boolean
    comment_count?: number
    can_comment?: boolean
    can_like?: boolean
    approval_status?: string
    classification?: string
    reason?: string
is_attached?: boolean
  }


  export class FeedLikeDisLikeRequestModel {
    user_id?: number
    feed_id?: number
  }

  export class FeedLikeDisLikeResponseModel {
    user_id?: number
    feed_id?: number
    state?: string
  }

  export class AddFeedCommentRequestModel {
    user_id?: number
    feed_id?: number
    comment?: string
    comment_type?: string
  }

  export class AddFeedCommentResponseModel {
    feed_comment_id?: number
    user_id?: number
    feed_id?: number
    comment?: string
    comment_type?: string
  }

  export class FetchFeedCommentRequestModel {
    feed_id?: number
  }

  export class FetchFeedCommentResponseModel {
    feed_comment_id?: number
    user_id?: number
    feed_id?: number
    comment?: string
    comment_type?: string
    nick_name?: string
    profile_type?: string
    profile_image?: string
    hd_profile_image?: string
    media_path?: string
  }



}

export namespace ChatsModel {

  export class ChatResponseModel {
    chat_id?: number;
    from_id?: number;
    to_id?: number;
    width?: number;
    height?: number;
    message_type?: string;
    message?: string;
    created_at?: string;
    status?: string;
    is_read?: boolean
    is_deleted?: boolean
    is_deleting?: boolean

    user_id?: number
    badge_count?: number
    is_typing?: boolean

    page?: number;
    media_path?: string;
    nick_name?: string;
    profile_image?: string;
    profile_type?: string;

    tier_id?: number;
    tier_name?: string;
    price?: number;

    url?: string;
    key?: string;
    unread_user_count?: number

  }


}

export namespace MeetVerificationsModel {
  export class AddVerifyRequestModel {
    from_id?: number
    to_id?: number
    review?: string
  }
  export class AddVerifyResponseModel {

  }
  export class FetchVerifyRequestModel {
    from_id?: number
    to_id?: number
  }

  export class FetchVerifyResponseModel {
    meet_verification_id?: number
    from_id?: number
    to_id?: number
    nick_name?: string
    visibility?: string
    review?: string
    is_public?: boolean
    is_verified?: boolean

    profile_type?: string
    gender?: string
    partner_gender?: string
    media_path?: string
    profile_image?: string
    created_at?: string
    given_count?: number
    received_count?: number

    is_verify_loading?: boolean
    isExpanded?:boolean

  }
}

export namespace EmojisModel {

  export class FetchEmojiResponseModel {
    emoji_id?: number
    emoji?: string
    media_path?: string
  }
}
export namespace ProfileViewsModel {
  export class AddViewRequestModel {
    viewer_id?: number;
    user_id?: number;
  }

  export class AddViewResponseModel {
    viewer_id?: number;
    user_id?: number;
  }

  export class FetchProfileViewRequestModel {
    user_id?: number;
  }

  export class FetchProfileViewResponseModel {
    user_id?: number;
    user_udid?: string;
    nick_name?: string;
    email?: string;
    profile_image?: string;
    sd_profile_image?: string;
    hd_profile_image?: string;
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
    gender?: string;
    partner_gender?: string;
    town?: string;
    tier_id?: number;
    tier_name?: string;
    price?: number;
    is_photo_verified?: boolean;
    is_meet_verified?: boolean;
    about_me?: string;
    verified_photo?: string;
    assets_path?: string;
    media_path?: string;
    profile_status?: string;
    latitude?: number;
    longitude?: number;
    call_code?: string;
    post_code_id?: number;
    post_code?: string;
    post_latitude?: number;
    post_longitude?: number;
    viewed_at?: string;
  }
}
export namespace MeetEventsModel {

  // =========================
  // Create Meet Event
  // =========================

  export class CreateRequestModel {
    user_id?: number

    meet_date?: string        // ISO-8601 (UTC preferred)
    meet_type?: string
    description?: string
    meet_photo?: string

    looking_for?: string[]
    min_age?: number
    max_age?: number

    town_id?: number
    radius?: number           // max 40

    can_comment?: boolean
    can_like?: boolean
  }

  export class CreateResponseModel {
    // intentionally empty
  }

  // =========================
  // Fetch Meet Events List
  // =========================

  export class ListRequestModel {
    user_id?: number          // viewer id
    page?: number

    latitude?: number         // optional
    longitude?: number        // optional

    meet_date?:string | null
    looking_for?: string[]
    min_age?: number
    max_age?: number

    friends_only?: boolean
    crush_only?: boolean
    is_filter?:boolean
  }

  export class ListResponseModel {
    meet_event_id?: number
    user_id?: number

    media_path?:string
    meet_date?: string
    meet_type?: string
    description?: string
    meet_photo?: string

    looking_for?: string[]
    min_age?: number
    max_age?: number

    town_id?: number
    radius?: number
    comment_count?:number
    like_count?:number

    can_comment?: boolean
    can_like?: boolean

    created_at?: string
    is_liked?:boolean

    // event owner info
    nick_name?: string
    profile_image?: string
    profile_type?: string
    town?:string
    is_like_loading?:boolean
    is_comment_loading?:boolean
  }

  // =========================
  // Meet Event Detail
  // =========================

  export class DetailRequestModel {
    meet_event_id?: number
    user_id?: number          // viewer id
  }

  export class DetailResponseModel {
    meet_event_id?: number
    user_id?: number

    meet_date?: string
    meet_type?: string
    description?: string
    meet_photo?: string

    looking_for?: string[]
    min_age?: number
    max_age?: number

    town_id?: number
    radius?: number

    can_comment?: boolean
    can_like?: boolean

    created_at?: string

    // owner info
    nick_name?: string
    profile_image?: string
    profile_type?: string
    is_owner?: boolean
  }
}

export namespace HomeDashboardModel {

  export class Request {
    user_id?: number
    mode?: string
  }

  export class StatusItem {
    user_id?: number
    nick_name?: string
    profile_type?: string
    profile_status?: string
    tag?: string
  }

  export class TopMediaItem {
    feed_id?: number
    user_id?: number
    feed_type?: string
    media_type?: string
    like_count?: number
    comment_count?: number
    score?: number
    nick_name?: string
    profile_type?: string
    distance_miles?: number
    created_at?: string
       media_path?:string
    hd_feed_image?:string
    feed_thumbnail?:string
  }

  export class Response {
    online?: number
    local?: number
    meets?: number
    signups?: number

    women?: number
    men?: number
    couples?: number
    trans?: number

    most_active_region?: string
    trending_category?: string
    meets_today?: number

    status_updates?: StatusItem[]
    top_media?: TopMediaItem[]
 

  }
}



export class RouletteWorkerModel {
  event_name?: string
  user_id?: number
  socket_id?: string
  profile_type?: string
  latitude?: number
  longitude?: number

  radius?: number
  looking_for?: string[]

  matched_id?: number
  matched_socket_id?: string
  socket_status?: string

  is_from?: boolean
  timeStamp?: number
}
export class UserBannedModel {
    event_name?: string
      is_warning?: boolean
}




