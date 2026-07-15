import api from "./axios";

export const getReviews = (placeId) => {
  return api.get("/api/reviews", {
    params: {
      place_id: placeId,
    },
  });
};

export const getReview = (id) => {
  return api.get(`/api/reviews/${id}`);
};

export const createReview = (data) => {
  return api.post("/api/reviews", data);
};

export const updateReview = (id, data) => {
  return api.patch(`/api/reviews/${id}`, data);
};

export const deleteReview = (id, data) => {
  return api.delete(`/api/reviews/${id}`, { data, });
};
