<template>
  <div class="bg-white rounded-2xl shadow-md p-6">

    <div class="flex justify-between items-center mb-6">

      <h2 class="text-2xl font-bold">
        Reviews
      </h2>

      <button
        @click="openModal"
        :disabled="!place"
        class="px-4 py-2 rounded-lg text-white"
        :class="place ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'"
      >
        리뷰 작성
      </button>

    </div>

    <div v-if="place">

      <h3 class="text-xl font-bold">
        {{ place.title }}
      </h3>

      <p class="text-gray-500 mb-3">
        {{ place.addr1 }}
      </p>

      <div class="flex items-center gap-4 mb-6">

        <span class="text-yellow-500 font-bold text-lg">
          ⭐ {{ Number(avgRating).toFixed(1) }}
        </span>

        <span class="text-gray-500">
          리뷰 {{ reviewCount }}개
        </span>

      </div>

      <div
        v-if="reviews.length"
        class="space-y-3"
      >

        <div
          v-for="review in reviews"
          :key="review.id"
          @click="openDetail(review.id)"
          class="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
        >

          <div class="flex justify-between items-center">

            <div>

              <div class="font-bold">
                {{ review.review_title }}
              </div>

              <div class="text-sm text-gray-500 mt-1">
                {{ review.created_at.substring(0, 10) }}
              </div>

            </div>

            <div class="text-yellow-500">
              {{ "⭐".repeat(review.rating) }}
            </div>

          </div>

        </div>

      </div>

      <div
        v-else
        class="text-gray-400"
      >
        아직 등록된 리뷰가 없습니다.
      </div>

    </div>

    <div
      v-else
      class="text-gray-400"
    >
      장소를 선택하면 리뷰를 확인할 수 있습니다.
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      @click="closeModal"
    >

      <div
        class="bg-white rounded-xl w-[500px] p-6"
        @click.stop
      >

        <div class="flex justify-between items-center mb-5">

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

    <ReviewDetail
      :show="showDetail"
      :review="selectedReview"
      @close="showDetail = false"
    />

  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import ReviewForm from "./ReviewForm.vue";
import ReviewDetail from "./ReviewDetail.vue";

import {
  getReviews,
  getReview,
} from "@/api/reviewApi.js";

const props = defineProps({
  place: {
    type: Object,
    default: null,
  },
});

const reviews = ref([]);
const avgRating = ref(0);
const reviewCount = ref(0);
const showModal = ref(false);
const showDetail = ref(false);
const selectedReview = ref(null);

const loadReviews = async () => {
  console.log("장소 변경", props.place);

  if (!props.place) {
    reviews.value = [];
    avgRating.value = 0;
    reviewCount.value = 0;
    return;
  }
  try {
    console.log("요청 place_id :", props.place.contentid);

    const response = await getReviews(
      props.place.contentid
    );

    console.log(response.data);

    reviews.value = response.data.items ?? [];
    avgRating.value = response.data.avg_rating ?? 0;
    reviewCount.value = response.data.review_count ?? 0;
  } catch (error) {
    console.error(error);
  }
};

watch(
  () => props.place,
  loadReviews,
  {
    immediate: true,
  }
);

const openModal = () => {
  if (!props.place) {
    alert("장소를 먼저 선택해주세요.");
    return;
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleCreated = () => {
  closeModal();
  loadReviews();
};

const openDetail = async (id) => {
  try {
    const response = await getReview(id);
    selectedReview.value = response.data;
    showDetail.value = true;
  } catch (error) {
    console.error(error);
  }
};

</script>