<template>
  <div class="user-list-container">
    <div class="user-list-header" v-if="showHeader">
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    
    <div class="user-grid" :class="gridClass">
      <UserCard 
        v-for="(user, index) in mockUsers" 
        :key="user.user_id"
        :user="user"
        :online-users="onlineUsers"
        @open-profile="openProfile"
        @open-chat="openChat"
        @show-code-alert="showCodeAlert"
      />
    </div>
    
    <div v-if="mockUsers.length === 0" class="no-users">
      <p>No users found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UsersModel } from '~/composables/models'
import UserCard from '~/components/profile/user/UserCard.vue'

interface Props {
  title?: string
  subtitle?: string
  showHeader?: boolean
  gridColumns?: number
  onlineUsers?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'User List',
  subtitle: '',
  showHeader: true,
  gridColumns: 3,
  onlineUsers: () => []
})

// Event emitters
const emit = defineEmits<{
  openProfile: [user: UsersModel.ProfileDetailsResponseModel]
  openChat: [user: UsersModel.ProfileDetailsResponseModel]
  showCodeAlert: [userId: number, isVideo: boolean]
}>()

// Extended user type with distance for mock data
interface UserWithDistance extends UsersModel.ProfileDetailsResponseModel {
  distance?: number
}

// Mock user data with local images
const mockUsers = ref<UserWithDistance[]>([
  {
    user_id: 1,
    nick_name: 'Sarah',
    profile_type: 'Woman',
    gender: 'Woman',
    town: 'London',
    profile_status: 'Looking for fun and adventure',
    tier_name: 'Elite',
    is_photo_verified: true,
    is_meet_verified: true,
    media_path: '/images/user-list/',
    profile_image: 'user-1.jpg',
    distance: 5,
    interests: [
      { interest_id: 1, interest_name: 'Travel' },
      { interest_id: 2, interest_name: 'Photography' }
    ]
  },
  {
    user_id: 2,
    nick_name: 'Mike',
    profile_type: 'Man',
    gender: 'Man',
    town: 'Manchester',
    profile_status: 'Easy going and friendly',
    tier_name: 'Plus',
    is_photo_verified: true,
    is_meet_verified: false,
    media_path: '/images/user-list/',
    profile_image: 'user-2.jpg',
    distance: 12,
    interests: [
      { interest_id: 3, interest_name: 'Sports' },
      { interest_id: 4, interest_name: 'Music' }
    ]
  },
  {
    user_id: 3,
    nick_name: 'Emma & James',
    profile_type: 'Couple',
    gender: 'Couple',
    town: 'Birmingham',
    profile_status: 'Fun couple looking to meet new people',
    tier_name: 'Basic',
    is_photo_verified: false,
    is_meet_verified: false,
    media_path: '/images/user-list/',
    profile_image: 'user-3.jpg',
    distance: 8,
    interests: [
      { interest_id: 5, interest_name: 'Dining' },
      { interest_id: 6, interest_name: 'Movies' }
    ]
  },
  {
    user_id: 4,
    nick_name: 'Alex',
    profile_type: 'Others',
    gender: 'Others',
    town: 'Liverpool',
    profile_status: 'Open minded and adventurous',
    tier_name: 'Free',
    is_photo_verified: true,
    is_meet_verified: true,
    media_path: '/images/user-list/',
    profile_image: 'user-4.jpg',
    distance: 15,
    interests: [
      { interest_id: 7, interest_name: 'Art' },
      { interest_id: 8, interest_name: 'Fashion' }
    ]
  }
])

// Computed properties
const gridClass = computed(() => {
  return {
    'grid-1': props.gridColumns === 1,
    'grid-2': props.gridColumns === 2,
    'grid-3': props.gridColumns === 3,
    'grid-4': props.gridColumns === 4,
    'grid-5': props.gridColumns === 5
  }
})

// Methods
const openProfile = (user: UsersModel.ProfileDetailsResponseModel) => {
  emit('openProfile', user)
}

const openChat = (user: UsersModel.ProfileDetailsResponseModel) => {
  emit('openChat', user)
}

const showCodeAlert = (userId: number, isVideo: boolean) => {
  emit('showCodeAlert', userId, isVideo)
}
</script>

<style scoped>
.user-list-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.user-list-header {
  text-align: center;
  margin-bottom: 2rem;
}

.user-list-header h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.user-list-header p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

.user-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Grid column variants */
.grid-1 {
  grid-template-columns: 1fr;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-5 {
  grid-template-columns: repeat(5, 1fr);
}

.no-users {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Responsive design */
@media (max-width: 1200px) {
  .grid-5 {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .grid-4,
  .grid-5 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-3,
  .grid-4,
  .grid-5 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .user-list-container {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .grid-1,
  .grid-2,
  .grid-3,
  .grid-4,
  .grid-5 {
    grid-template-columns: 1fr;
  }
  
  .user-list-header h2 {
    font-size: 1.5rem;
  }
}
</style>