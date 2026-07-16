<template>
  <div class="fixed bottom-24 right-6 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl border flex flex-col z-50">
    <div class="bg-blue-500 text-white px-5 py-4 rounded-t-2xl flex justify-between items-center">
      <h2 class="font-bold text-lg">
        SeoulLog ChatBot
      </h2>

      <button @click="$emit('close')" class="text-xl">
        ✕
      </button>
    </div>

    <div ref="messageContainer" class="flex-1 overflow-y-auto p-4 bg-gray-50">
      <ChatMessage v-for="(message, index) in messages" :key="index" :message="message" />

      <div v-if="loading" class="text-gray-400 text-sm">
        Thinking...
      </div>
    </div>

    <div class="border-t p-3 flex gap-2">
      <input v-model="input" @keyup.enter="send" class="flex-1 border rounded-lg px-3 py-2 outline-none"
        placeholder="Type your message" />

      <button @click="send" class="bg-blue-500 text-white px-4 rounded-lg">
        Send
      </button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";

import ChatMessage from "./ChatMessage.vue";
import { sendChat } from "@/api/chatApi";

defineEmits(["close"]);
const input = ref("");
const loading = ref(false);
const messageContainer = ref(null);
const messages = ref([
  {
    role: "bot",
    text: "안녕하세요 😊\n서울 관광지와 숙소를 추천해드릴게요!\n예) '강남 숙소 추천', '경복궁 리뷰 어때?'",
    results: [],
  },
]);

const scrollBottom = async () => {
  await nextTick();

  if (messageContainer.value) {
    messageContainer.value.scrollTop =
      messageContainer.value.scrollHeight;
  }
};

const send = async () => {
  if (!input.value.trim()) return;

  const userMessage = input.value;

  messages.value.push({
    role: "user",
    text: userMessage,
  });

  input.value = "";

  await scrollBottom();

  loading.value = true;

  try {
    const response = await sendChat(userMessage);

    messages.value.push({
      role: "bot",
      text: response.data.reply,
      results: response.data.results,
    });
  } catch (error) {
    console.error(error);

    messages.value.push({
      role: "bot",
      text: "죄송합니다. 오류가 발생했습니다.",
      results: [],
    });
  } finally {
    loading.value = false;
    await scrollBottom();
  }
};
</script>