<template>
  <button
    @click="$emit('toggle')"
    class="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-xl transition-all duration-200 hover:scale-110 z-50 flex items-center justify-center"
    >
    <MessageCircle :size="30" />
  </button>
</template>

<script setup>
import { MessageCircle } from 'lucide-vue-next';

defineEmits(["toggle"]);;
</script>