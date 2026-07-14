<template>
  <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const mapContainer = ref(null);

const loadKakaoMap = () => {
  console.log(import.meta.env.VITE_KAKAO_MAP_KEY);
  
  const script = document.createElement("script");

  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;

  script.onload = () => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(
          37.5665,
          126.9780
        ),
        level: 3,
      };

      const map = new window.kakao.maps.Map(
        mapContainer.value,
        options
      );

    });
  };

  document.head.appendChild(script);
};

onMounted(() => {
  loadKakaoMap();
});
</script>