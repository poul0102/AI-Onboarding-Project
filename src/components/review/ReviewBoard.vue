<template>

  <div class="bg-white rounded-2xl shadow-md p-6">

    <div class="flex justify-between items-center mb-6">

      <h2 class="text-2xl font-bold">
        Reviews
      </h2>

      <button 
      @click="openModal"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg">
        리뷰 작성
      </button>

    </div>

    <div v-if="place">
      <h3 class="font-bold text-lg mb-2">
        {{ place.title }}
      </h3>

      <p class="text-gray-500 mb-4">
        {{ place.addr1 }}
      </p>

      <div class="text-gray-400">
        해당 장소의 리뷰 목록이 표시됩니다.
      </div>
    </div>

    <div v-else class="text-gray-400">
      장소를 선택하면 리뷰를 확인할 수 있습니다.
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl w-[500px] p-6 shadow-xl">
        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-bold">
            리뷰 작성
          </h2>

          <button
          @click="closeModal"
          class="text-gray-400"
          >
            ✕
          </button>
        </div>

        <ReviewForm
          :place="place"
          @created="handleCreated"
          @close="closeModal"
        />

      </div>
    </div>

  </div>

</template>

<script setup>
import { ref } from 'vue';
import ReviewForm from './ReviewForm.vue';

const props = defineProps({
  place:{
    type:Object,
    default:null
  }
});

const showModal = ref(false);

const openModal = () => {
  if(!props.place) {
    alert("장소를 먼저 선택해주세요.");
    return;
  }

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
}

const handleCreated = () => {
  closeModal();
};

</script>