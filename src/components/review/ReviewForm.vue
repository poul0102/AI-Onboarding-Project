<template>

  <div>

    <input v-model="form.review_title" placeholder="Title" class="border p-2 w-full mb-3" />

    <textarea v-model="form.content" placeholder="Contents" class="border p-2 w-full mb-3" />

    <div class="mb-3">
      <label class="block mb-1 text-sm font-medium">
        평점
      </label>

      <div class="flex gap-1 text-3xl cursor-pointer">

        <span v-for="star in 5" :key="star" @click="form.rating = star" class="cursor-pointer transition"
          :class="star <= form.rating ? 'text-yellow-400' : 'text-gray-300'">
          {{ star <= form.rating ? "★" : "☆" }} </span>
      </div>
    </div>

    <input v-model="form.password" type="password" placeholder="Password" class="border p-2 w-full mb-3" />

    <div class="flex justify-end gap-2">

      <button @click="emit('close')" class="border px-4 py-2 rounded">
        Cancel
      </button>

      <button @click="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>

    </div>

  </div>

</template>

<script setup>
import { createReview } from '@/api/reviewApi.js';
import { ref } from 'vue';

const emit = defineEmits(["created", "close"]);

const props = defineProps({
  place: {
    type: Object,
    default: null
  }
});

const createInitialForm = () => ({
  place_id: "",
  place_title: "",
  addr1: "",
  mapx: 0,
  mapy: 0,
  rating: 5,
  review_title: "",
  content: "",
  password: "",
});

const form = ref(createInitialForm());

const submit = async () => {

  if (!props.place) {
    alert("장소를 먼저 선택해주세요.");
    return;
  }

  try {
    form.value.place_id = String(props.place.contentid);
    form.value.place_title = props.place.title;
    form.value.addr1 = props.place.addr1;
    form.value.mapx = props.place.mapx;
    form.value.mapy = props.place.mapy;

    await createReview(form.value);

    alert("Success");

    emit("created");
    emit("close");

    form.value = createInitialForm();

  } catch (error) {
    console.error(error);
    alert("Fail");
  }
};
</script>