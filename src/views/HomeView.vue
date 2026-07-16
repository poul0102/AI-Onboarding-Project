<template>

  <div class="min-h-screen bg-slate-50">

    <section class="py-10 px-8 bg-slate-50">
      <div class="flex items-center justify-center gap-8">
        <h1 class="text-5xl font-bold text-green-600 whitespace-nowrap">
          🌏 SeoulLog
        </h1>

        <input v-model="keyword" @keyup.enter="handleSearch" type="text" placeholder="Search attractions, hotels..."
          class="w-[600px] max-w-[90%] rounded-full border border-gray-200 bg-white px-6 py-4 shadow-sm ontline-none focus:ring-2 focus:ring-blue-500" />
      </div>
    </section>

    <section class="flex gap-6 px-8 pb-8 h-[calc(100vh-250px)]">

      <div class="w-2/3 rounded-2xl overflow-hidden shadow-md bg-white">
        <KakaoMap :places="places" :selected-place="selectPlace" @select-spot="handleSelectSpot" />
      </div>

      <div class="w-1/3 rounded-2xl bg-white shadow-md p-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-4">
            Place Information
          </h2>

          <div v-if="selectPlace" class="space-y-4">
            <div class="border-b pb-4">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ selectPlace.title }}
              </h3>
              <p class="text-sm text-gray-600">
                📍 {{ selectPlace.addr1 }}
              </p>
            </div>
          </div>

          <div v-else
            class="text-gray-400 text-sm flex flex-col items-center justify-center h-48 border border-dashed border-gray-200 rounded-xl">
            <span class="text-3xl mb-2">🗺️</span>
            <span>Click a marker on the map to see details.</span>
          </div>
        </div>
      </div>
    </section>

    <section class="px-8 pb-8">
      <ReviewBoard :place="selectPlace" />
    </section>

    <ChatBotButton v-if="!showChatBot" @click="showChatBot = true" />

    <ChatBotPopup v-if="showChatBot" @close="showChatBot = false" @select-place="handleChatSelect" />

  </div>

</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import KakaoMap from "../components/common/KakaoMap.vue";
import { getAccommodations, getTouristSpots, searchPlace } from "@/api/locationApi.js";
import ReviewBoard from "@/components/review/ReviewBoard.vue";
import ChatBotButton from "@/components/chatbot/ChatBotButton.vue";
import ChatBotPopup from "@/components/chatbot/ChatBotPopup.vue";

const touristSpots = ref([]);
const accommodations = ref([]);

const places = computed(() => [
  ...touristSpots.value.map(place => ({
    ...place,
    type: "tourist"
  })),
  ...accommodations.value.map(place => ({
    ...place,
    type: "accommodation"
  }))
]);

const selectPlace = ref(null);
const keyword = ref("");

const handleSearch = async () => {
  if (!keyword.value.trim()) {
    return;
  }

  try {
    const response = await searchPlace(keyword.value);

    if (!response.data.length) return;

    const place = {
      ...response.data[0],
      selected: true
    };

    selectPlace.value = place;
    keyword.value = "";
  } catch (error) {
    console.error(error);
  }
};

const handleSelectSpot = (spot) => {
  selectPlace.value = spot;
};

const showChatBot = ref(false);

const handleChatSelect = (place) => {
  selectPlace.value = {
    ...place,
    type:
      place.place_type === "ACCOMMODATION" ? "accommodation" : "tourist",
    selected: true
  };
};

onMounted(async () => {
  try {
    const touristResponse = await getTouristSpots();

    touristSpots.value = touristResponse.data;


    const accommodationResponse = await getAccommodations();

    accommodations.value = accommodationResponse.data;

  } catch (error) {
    console.error(error);
  }
});

</script>