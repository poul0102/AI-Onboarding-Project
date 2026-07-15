<template>

  <div class="p-8">

    <h1 class="text-3xl font-bold mb-6">Reviews</h1>

    <button 
    @click="showForm=!showForm" 
    class="bg-blue-500 text-white px-4 py-2 rounded"
    >
    리뷰 작성
    </button>

    <ReviewForm
    v-if="showForm"
    @created="loadReviews"
    />

    <div v-for="review in reviews" :key="review.id" class="border p-4 mt-4 rounded">
      <h2 class="cont-bold">{{ review.title }}</h2>
      <p>{{ review.content }}</p>
    </div>

  </div>

</template>

<script setup>
import { getReviews } from '@/api/reviewApi.js';
import ReviewForm from '@/components/review/ReviewForm.vue';
import { onMounted, ref } from 'vue';

const reviews = ref([]);
const loadReviews = async() => {
  const response = await getReviews();
  reviews.value = response.data;
};
const showForm = ref(false);

onMounted(() => {
  loadReviews();
});

</script>