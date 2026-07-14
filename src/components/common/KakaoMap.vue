<template>
  <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const mapContainer = ref(null);
const map = ref(null);
const markers = ref([]);

const props = defineProps({
  touristSpots: {
    type: Array,
    default: () => [],
  },
});

const createMarkers = () => {
  if (!map.value) return;

  markers.value.forEach((marker) => {
    marker.setMap(null);
  });

  markers.value = [];

  props.touristSpots.forEach((spot) => {
    const markerPosition =
      new window.kakao.maps.LatLng(
        spot.mapy,
        spot.mapx
      );

    const marker = 
      new window.kakao.maps.Marker({
        position: markerPosition,
        title: spot.title,
      });

    marker.setMap(map.value);

    markers.value.push(marker);
  });
};

const loadKakaoMap = () => {
  
  const script = document.createElement("script");

  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;

  script.onload = () => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(
          37.5665,
          126.9780
        ),
        level: 6,
      };

      map.value = new window.kakao.maps.Map(
        mapContainer.value,
        options
      );

      createMarkers();

    });
  };

  document.head.appendChild(script);
};

onMounted(() => {
  loadKakaoMap();
});

watch(
  () => props.touristSpots,
  () => {
    createMarkers();
  },
  {
    deep: true,
  }
);

</script>