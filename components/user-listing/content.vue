<template>
  <div class="user-listing-page">
    <UserList 
      title="Discover New People"
      subtitle="Connect with amazing individuals in your area"
      :grid-columns="3"
      :show-header="true"
      @open-profile="handleOpenProfile"
      @open-chat="handleOpenChat"
      @show-code-alert="handleShowCodeAlert"
    />
  </div>
</template>

<script setup lang="ts">
import UserList from '~/components/user-listing/UserList.vue'
import type { UsersModel } from '~/composables/models'
import Swal from 'sweetalert2'

// Navigation handlers
const handleOpenProfile = (user: UsersModel.ProfileDetailsResponseModel) => {
  navigateTo(`/profile/${user.user_id}`)
}

const handleOpenChat = (user: UsersModel.ProfileDetailsResponseModel) => {
  navigateTo(`/chat/${user.user_id}`)
}

const handleShowCodeAlert = (userId: number, isVideo: boolean) => {
  // Implement call functionality
  Swal.fire({
    title: 'Enter Call Code',
    input: 'text',
    inputPlaceholder: 'Enter 4-digit code',
    showCancelButton: true,
    inputValidator: (value: string) => {
      if (!value) return 'Please enter a code'
      if (!/^\d{4}$/.test(value)) return 'Please enter a 4-digit code'
    }
  }).then((result: any) => {
    if (result.isConfirmed) {
      // Handle call validation
      console.log(`Call code entered: ${result.value} for user ${userId}, video: ${isVideo}`)
    }
  })
}
</script>

<style scoped>
.user-listing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 2rem 0;
}
</style>