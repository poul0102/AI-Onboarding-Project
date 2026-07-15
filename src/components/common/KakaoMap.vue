<template>
  <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import touristMarker from "@/assets/tourist.png";
import accommodationMarker from "@/assets/accommodation.png";
import selectedMarker from "@/assets/selected.png";

const emit = defineEmits(["select-spot"]);
const mapContainer = ref(null);
const map = ref(null);
const markers = ref(new Map());
const selectedMarkerRef = ref(null);

const props = defineProps({
  places: {
    type: Array,
    default: () => [],
  },
  selectedPlace: {
    type: Object,
    default: null,
  },
});

const getMarkerImage = (spot) => {
  if (spot.selected) {
    return selectedMarker;
  }

  if (spot.type === "tourist") {
    return touristMarker;
  }

  if (spot.type === "accommodation") {
    return accommodationMarker;
  }

  return touristMarker;
};



const createMarkers = () => {
  if (!map.value) return;

  if (!props.places.length) return;

  markers.value.forEach((marker) => {
    marker.setMap(null);
  });

  markers.value.clear();

  props.places.forEach((spot) => {

    const markerPosition =
      new window.kakao.maps.LatLng(
        spot.mapy,
        spot.mapx
      );

    const image =
      new window.kakao.maps.MarkerImage(
        getMarkerImage(spot),
        new window.kakao.maps.Size(32, 32),
        {
          offset:
            new window.kakao.maps.Point(16, 32)
        }
      );

    const marker =
      new window.kakao.maps.Marker({
        position: markerPosition,
        title: spot.title,
        image
      });

    marker.setMap(map.value);

    window.kakao.maps.event.addListener(marker, "click", () => {
      emit("select-spot", spot);
    });

    markers.value.set(
      spot.contentid,
      marker
    );

  });
};

const createSelectedMarker = (place) => {
  if (selectedMarkerRef.value) {
    selectedMarkerRef.value.setMap(null);
  }

  const position =
    new window.kakao.maps.LatLng(
      place.mapy,
      place.mapx
    );

  const image =
    new window.kakao.maps.MarkerImage(
      selectedMarker,
      new window.kakao.maps.Size(32, 32),
      {
        offset:
          new window.kakao.maps.Point(16, 32)
      }
    );

  const marker =
    new window.kakao.maps.Marker({
      position,
      image
    });

  marker.setMap(map.value);

  selectedMarkerRef.value = marker;

};

const moveToPlace = (place) => {
  if (!place || !map.value) return;

  const position = new window.kakao.maps.LatLng(
    place.mapy,
    place.mapx
  );

  map.value.setCenter(position);
  map.value.setLevel(3);

  createSelectedMarker(place);
};

const loadKakaoMap = () => {
  if (window.kakao && window.kakao.maps) {
    initMap();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;

  script.onload = () => {
    window.kakao.maps.load(() => {
      initMap();
    });
  };

  document.head.appendChild(script);
};

const initMap = () => {
  const options = {
    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
    level: 6,
  };

  map.value = new window.kakao.maps.Map(
    mapContainer.value,
    options
  );

  createMarkers();
};

onMounted(() => {
  loadKakaoMap();
});

watch(
  () => props.places,
  () => {
    createMarkers();
  },
  { deep: true }
);

watch(
  () => props.selectedPlace,
  (place) => {
    if (!place) return;
    moveToPlace(place);
  }
);

</script>