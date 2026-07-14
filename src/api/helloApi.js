// 삭제 예정
import api from "./axios";

export const getHello = () => {
  return api.get("/hello");
};

export const sendMessage = (message) => {
  return api.post("/message", {
    message: message,
  });
};