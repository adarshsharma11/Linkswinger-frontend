import { defineStore } from "pinia";
import type { UsersModel } from "~/composables/models";

export const idStore  = defineStore('idStore', { 
    state: () => {
    return {
      device_id: useCookie('idStore', { default: () => ({ device_id: '' }) }).value.device_id ?? ''
    }
  },
   getters: {
    getDeviceId: (state : any) => {
      return state.device_id ?? ''
    },
  },
   actions: {
    setVendorId(device_id: string) {
      const userCookie = useCookie('idStore', { default: () => ({ device_id: '' }) });
      this.device_id = device_id;
      userCookie.value.device_id = device_id
    },
    clear() {
      const authCookie = useCookie('idStore')
      authCookie.value = null
      this.device_id = '';
    }
  }
});
export const userStore  = defineStore('userInfo', { 
    state: () => {
    return {
      login_id: useCookie('userInfo', { default: () => ({ login_id: 0 }) }).value.login_id ?? 0
    }
  },
   getters: {
    getLoginId: (state : any) => {
      return state.login_id ?? 0
    },
  },
   actions: {
    setLoginId(login_id: number) {
      const userCookie = useCookie('userInfo', { default: () => ({ login_id: 0 }) });
      this.login_id = login_id;
      userCookie.value.login_id = login_id
    },
    clear() {
      const authCookie = useCookie('userInfo')
      authCookie.value = null
      this.login_id = 0;
    }
  }
});

export const useLoginStore = defineStore('login_details', {
    state: () => {
      return {
        user: null as UsersModel.ProfileDetailsResponseModel | null | undefined,
      }
    },
    getters: {
      getUserDetails: state => {
        return state.user 
     }
    },
    actions: {
       setUserDetails(user : UsersModel.ProfileDetailsResponseModel | null | undefined)
       {
           this.user = user
       },
        setProfilePic(profile_image : string , hd_profile_image:string)
       {
        if(this.user)
        {
           this.user.profile_image = profile_image
           this.user.hd_profile_image = hd_profile_image
        }
         
       },
        setIsLocationOn(is_location_on:boolean)
       {
        if(this.user)
        {
           this.user.is_location_on = is_location_on
        }
         
       },
       clear()
      {
        this.setUserDetails(null)
      },
    }
  })

  export const useCallStore = defineStore('call_details', {
    state: () => {
      return {
        callDetails: null as CallSocketModel | null | undefined,
      }
    },
    getters: {
      getCallDetails: state => {
        return state.callDetails 
     }
    },
    actions: {
       setCallDetails(call : CallSocketModel | null | undefined)
       {
           this.callDetails = call
       },
       clear()
      {
        this.setCallDetails(null)
      },
    }
  })

  