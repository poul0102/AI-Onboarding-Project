import api from "./axios";

export const getTouristSpots = () => {
  return api.get("/api/tourist-spots");
};

export const getAccommodations  = () => {
  return api.get("/api/accommodations");
}