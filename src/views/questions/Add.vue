<template>
  <div class="w-full bg-orange-500">
    <!-- <nav class="bg-white shadow-md px-5 py-5 rounded-md mb-5">
      <div class="flex items-center">
        <button @click="$router.back()">
          <back-icon class="font-bold text-lg" />
        </button>
        <h2 class="mx-3 text-lg font-semibold">Ask Question</h2>
      </div>
    </nav> -->
    <form @submit.prevent="submitForm" class="w-full flex flex-col bg-white p-4 rounded-md">
      <h1 class="text-center font-semibold text-xl mt-2">Ask Anything</h1>
      <label for="title" class="text-md my-1 font-semibold">Title</label>
      <input
        class="
          border border-gray-400
          focus:border-gray-600
          px-3
          py-2
          rounded-md
          outline-none
        "
        v-model="newQuestion.title"
        id="title"
        type="text"
        placeholder="e.g. How to add two numbers in javascript?"
      />
      <label class="text-md my-1 font-semibold" for="details"
        >Description</label
      >
      <textarea
        v-model="newQuestion.details"
        id="details"
        cols="30"
        rows="12"
        class="
          border border-gray-400
          focus:border-gray-600
          px-3
          resize-none
          py-2
          rounded-md
          outline-none
        "
      ></textarea>
      <label class="text-md my-1 font-semibold" for="tags">Tags</label>
      <select
        v-model="newQuestion.tag"
        v-if="tags.length > 0"
        class="border border-gray-400 outline-none px-3 py-2 rounded-md"
      >
        <option disabled value="">Select tag</option>
        <option v-for="tag in tags" :key="tag._id" :value="tag._id">
          {{ tag.title }}
        </option>
      </select>
      <div class="flex justify-end px-3 mt-3">
        <button
          class="
            bg-green-500
            active:bg-green-600
            text-white
            rounded-md
            px-4
            py-2
          "
        >
          Post
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import backIcon from "virtual:vite-icons/mdi/keyboard-backspace";
import { onMounted, reactive, ref } from "vue-demi";
import { reloadBrowser } from "../../logic/utils";
import { questionStore } from "../../store/question";
import { tagsStore } from "../../store/tag";

const store = tagsStore();
const tags = ref([] as any);
const newQuestion = reactive({
  tag: "",
  title: "",
  details: "",
});

onMounted(() => {
  store.fetchTags((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    tags.value = JSON.parse(msg);
  });
});

function submitForm() {
  questionStore().addQuestion(newQuestion, (success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    console.log("Question added");
    newQuestion.tag = "";
    newQuestion.title = "";
    newQuestion.details = "";
    reloadBrowser("/questions");
  });
}
</script>