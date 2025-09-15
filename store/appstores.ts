import { defineStore } from "pinia";

export const idStore  = defineStore('idStore', { 
    state: () => {
    return {
      device_id: useCookie('idStore', { default: () => ({ device_id: '' }) }).value.device_id ?? ''
    }
  },
   getters: {
    getVendorId: (state : any) => {
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

