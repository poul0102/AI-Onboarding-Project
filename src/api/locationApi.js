import api from "./axios";

export const getTouristSpots = () => {
  return api.get("/api/tourist-spots");
};

export const getAccommodations  = () => {
  return api.get("/api/accommodations");
}

export const searchPlace = (keyword) => {
  return api.get("/api/places/search", {
    params: {
      q: keyword,
    },
  });
};
