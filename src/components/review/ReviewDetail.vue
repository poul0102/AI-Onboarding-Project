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

      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">
          {{ editMode ? "리뷰 수정" : "리뷰 상세" }}
        </h2>

        <button @click="$emit('close')">
          ✕
        </button>
      </div>

      <div v-if="review && !editMode">
        <div class="flex gap-1 text-3xl mb-4">
          <span
            v-for="star in 5"
            :key="star"
            :class="star <= form.rating ? 'text-yellow-400' : 'text-gray-300'"
          >
            ★
          </span>
        </div>

        <h3 class="text-2xl font-bold mb-4">
          {{ review.review_title }}
        </h3>

        <p class="text-gray-700 whitespace-pre-line">
          {{ review.content }}
        </p>

      <div class="flex justify-end gap-2 mt-8">
        <button
          @click="editMode=true"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          수정
        </button>

        <button
          @click="showDelete=true"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          삭제
        </button>

      </div>
    </div>

    <div v-else-if="review">
      <div class="flex gap-1 text-3xl mb-5">

        <span
          v-for="star in 5"
          :key="star"
          @click="form.rating = star"
          class="cursor-pointer transition"
          :class="star <= form.rating ? 'text-yellow-400' : 'text-gray-300'"
        >
          ★
        </span>

      </div>

      <input
        v-model="form.review_title"
        class="border rounded-lg w-full p-3 mb-4"
        placeholder="제목"
      />

      <textarea
        v-model="form.content"
        rows="6"
        class="border rounded-lg w-full p-3 mb-4"
        placeholder="내용"
      />

      <input
        v-model="form.password"
        type="password"
        class="border rounded-lg w-full p-3"
        placeholder="비밀번호"
      />

      <div class="flex justify-end gap-2 mt-6">

        <button
          @click="editMode = false"
          class="border px-4 py-2 rounded-lg"
        >
          취소
        </button>

        <button
          @click="saveReview"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          저장
        </button>

      </div>

      </div>

      <div
        v-if="showDelete"
        class="fixed inset-0 bg-black/30 flex justify-center items-center"
      >
        <div
          class="bg-white rounded-xl p-6 w-[350px]"
          @click.stop
        >
          <h3 class="font-bold text-lg mb-4">
            리뷰 삭제
          </h3>

          <p class="text-gray-500 mb-4">
            비밀번호를 입력해주세요.
          </p>

          <input
            v-model="deletePassword"
            type="password"
            class="border rounded-lg w-full p-2 mb-5"
            placeholder="비밀번호"
          />

          <div class="flex justify-end gap-2">

            <button
              @click="showDelete = false"
              class="border px-4 py-2 rounded-lg"
            >
              취소
            </button>

            <button
              @click="removeReview"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              삭제
            </button>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deleteReview, updateReview } from '@/api/reviewApi';
import { ref, watch } from 'vue';


const props = defineProps({
  show:Boolean,
  review:Object,
});

const emit = defineEmits([
  "close",
  "updated",
  "deleted",
]);

const editMode = ref(false);
const showDelete = ref(false);
const deletePassword = ref("");

const form = ref({
  rating: 5,
  review_title: "",
  content: "",
  password: "",
});

watch(
  () => props.review,
  (review) => {
    if (!review) return;

    form.value = {
      rating: review.rating,
      review_title: review.review_title,
      content: review.content,
      password: "",
    };

    editMode.value = false;
    showDelete.value = false;
    deletePassword.value = "";
  },
  { immediate: true, }
);

const saveReview = async () => {
  try {
    const response = await updateReview(
      props.review.id,
      form.value
    );

    alert("수정되었습니다.");
    emit("updated", response.data);
    editMode.value = false;
  } catch (error) {
    if (error.response?.status === 403) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      alert("수정 실패");
    }
  }
};

const removeReview = async () => {
  try {
    await deleteReview(
      props.review.id,
      deletePassword.value
    );

    alert("삭제되었습니다.");
    emit("deleted");
    emit("close");
  } catch (error) {
    if (error.response?.status === 403) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      alert("삭제 실패");
    }
  }
};

</script>