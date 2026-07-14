<template>

  <div class="min-h-screen">

    <header class="h-16 flex items-center px-8 border-b">
      <h1 class="text-2xl font-bold">
        관광지 및 숙박 리뷰 서비스 (가제)
      </h1>
    </header>

    <section class="flex justify-center py-8">
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        class="w-1/2 border rounded-lg px-4 py-3"
      />
    </section>
    
    <section class="flex gap-6 px-8 pb-8 h-[calc(100vh-200px)]">

      <div class="w-2/3 rounded-xl overflow-hidden">
        <KakaoMap />
      </div>

      <div class="w-1/3 rounded-xl border p-6">
        <h2 class="text-xl font-bold mb-4">
          지역 정보
        </h2>
      </div>
      
    </section> 

  </div>

</template>


<script setup>
import KakaoMap from "../components/common/KakaoMap.vue";
</script>