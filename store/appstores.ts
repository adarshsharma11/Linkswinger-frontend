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

