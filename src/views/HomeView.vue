<template>

  <div class="min-h-screen bg-slate-50">

    <header class="h-16 flex items-center justify-between px-8 bg-white border-b">
      <h1 class="text-2xl font-bold text-blue-600">
        🌏 SeoulMate
      </h1>
    </header>

    <section class="py-10 bg-slate-50">
      <h2 class="test-3xl font-bold text-center text-gray-900 mb-6">
        Discover Seoul
      </h2>

      <div class ="flex justify-center">
        <input type="text" placeholder="Search attractions, hotels..." class="w-[600px] max-w-[90%] rounded-full border border-gray-200 bg-white px-6 py-4 shadow-sm ontline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
    </section>
    
    <section class="flex gap-6 px-8 pb-8 h-[calc(100vh-250px)]">

      <div class="w-2/3 rounded-2xl overflow-hidden shadow-md bg-white">
        <KakaoMap
          :tourist-spots="touristSpots"
        />
      </div>

      <div class="w-1/3 rounded-2xl bg-white shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">
          Place Information
        </h2>

        <div class="text-gray-400 text-sm">
          Search a place to see details.
        </div>
      </div>
      
    </section> 

  </div>

</template>


<script setup>
import { ref, onMounted } from "vue";
import KakaoMap from "../components/common/KakaoMap.vue";
import { getAccommodations, getTouristSpots } from "@/api/locationApi.js";

const touristSpots = ref([]);
const accommodations = ref([]);

onMounted(async () => {
  try {
    const touristResponse = await getTouristSpots();

    touristSpots.value = touristResponse.data;

    const accommodationResponse = await getAccommodations();
    accommodations.value = accommodationResponse.data;
  } catch(error) {
    console.error(error);
  }
});

</script>