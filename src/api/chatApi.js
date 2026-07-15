import api from "./axios"

export const sendChat = (message) => {
  return api.post("/api/chat", {
    message,
  });
};
