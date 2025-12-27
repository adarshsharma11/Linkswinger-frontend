<template>
    <div class="chat-wrapper" :class="{ open: isOpen }">
        <!-- Header -->
        <div class="chat-header" @click="isOpen = !isOpen">
           Admin Chat
        </div>

        <!-- Body -->
        <div class="chat-body">
            <div class="bubble left">
                Hi 
            </div>

            <div class="bubble right">
                Hello! How can I help?
            </div>
        </div>

        <!-- Input -->
        <div class="chat-input">
            <input type="text" placeholder="Type a message..." />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<style scoped>

.chat-wrapper {
    position: fixed;
    right: 20px;
    bottom: 0;
    width: 300px;
    height: 420px;
    background: #fff;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);

    transform: translateY(360px);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-wrapper.open {
    transform: translateY(0);
}

.chat-header {
    background: #ff0000;
    color: #fff;
    padding: 12px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
}

.chat-body {
    flex: 1;
    padding: 12px;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.bubble {
    max-width: 70%;
    padding: 8px 12px;
    border-radius: 16px;
    font-size: 14px;
}

.bubble.left {

    align-self: flex-start;
       background-color: rgba(32,32,32,0.8);
      border: 1px solid #3a3a3a;
}

.bubble.right {
    background: #FF0000;
    color: #fff;
    align-self: flex-end;
}

.chat-input {
    padding: 10px;
    border-top: 1px solid #ddd;
}

.chat-input input {
    width: 100%;
    padding: 8px 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    outline: none;
}
</style>