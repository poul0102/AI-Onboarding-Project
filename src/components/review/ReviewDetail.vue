<template>

  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    @click="$emit('close')"
  >

    <div
      class="bg-white rounded-xl w-[550px] p-6"
      @click.stop
    >

      <div class="flex justify-between items-center mb-5">
        <h2 class="text-xl font-bold">
          리뷰 상세
        </h2>

        <button @click="$emit('close')">
          ✕
        </button>
      </div>

      <div v-if="review">
        <div class="text-yellow-500 text-2xl mb-2">
          {{ "⭐".repeat(review.rating) }}
        </div>

        <h3 class="text-xl font-bold mb-4">
          {{ review.review_title }}
        </h3>

        <p class="text-gray-700 whitespace-pre-line">
          {{ review.content }}
        </p>
      </div>

    </div>

  </div>

</template>

<script setup>

defineProps({
  show:Boolean,
  review:Object,
});

defineEmits([
  "close"
]);

</script>