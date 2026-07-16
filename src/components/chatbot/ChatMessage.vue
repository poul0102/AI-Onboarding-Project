<template>
  <div class="flex mb-3" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
    <div class="max-w-[80%] rounded-2xl px-4 py-3" :class="message.role === 'user'
      ? 'bg-blue-500 text-white rounded-br-sm'
      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
      ">
      <p class="whitespace-pre-wrap">
        {{ message.text }}
      </p>

      <div v-if="message.results && message.results.length" class="mt-3 space-y-2">
        <div v-for="place in message.results" :key="place.contentid" @click="selectPlace(place)"
          class="bg-white rounded-lg border p-3 text-sm">
          <div class="font-semibold">
            {{ place.title }}
          </div>

          <div class="text-gray-500 mt-1">
            {{ place.addr1 }}
          </div>

          <div class="mt-2 flex justify-between items-center">
            <span class="text-yellow-500">
              ⭐ {{ place.avg_rating ?? "-" }}
            </span>

            <span class="text-gray-400">
              Reviews {{ place.review_count }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["select-place"]);

defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const selectPlace = (place) => {
  emit(
    "select-place",
    place
  );
};
</script>