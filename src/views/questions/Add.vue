<script setup lang="ts">
import { onMounted, reactive, ref } from "vue-demi";
import backIcon from "virtual:vite-icons/mdi/keyboard-backspace";
import { reloadBrowser } from "../../logic/utils";
import { questionStore } from "../../store/question";
import { tagsStore } from "../../store/tag";
import Multiselect from "@vueform/multiselect";

const store = tagsStore();
const tags = ref([] as any);
const newQuestion = reactive({
  tags: [],
  title: "",
  details: "",
});

onMounted(() => {
  store.fetchTags((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    tags.value = JSON.parse(msg).map((tag: any) => {
      return {
        value: tag._id,
        label: tag.title,
      };
    });
  });
});

function submitForm() {
  questionStore().addQuestion(newQuestion, (success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    console.log("Question added");
    newQuestion.tags = [];
    newQuestion.title = "";
    newQuestion.details = "";
    reloadBrowser("/questions");
  });
}
</script>



<template>
  <div class="w-full bg-orange-500">
    <form
      @submit.prevent="submitForm"
      class="w-full flex flex-col bg-white p-4 rounded-md"
    >
      <h1 class="text-center font-semibold text-xl mt-2">Ask Anything</h1>
      <label class="text-md my-1 font-semibold" for="tags">Select Tags</label>
      <Multiselect
        v-model="newQuestion.tags"
        placeholder="e.g. software"
        :minChars="1"
        mode="tags"
        :searchable="true"
        :options="tags"
        :classes="{
          container:
            'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-light rounded bg-white text-base leading-snug outline-none',
          containerActive: 'border-purple-500',
          spacer: 'h-9 py-px box-content',
        }"
      />
      <label for="title" class="text-md my-1 font-semibold">Title</label>
      <base-input
        placeholder="e.g. How to add two numbers in javascript?"
        type="text"
        error-message="Title is required"
        v-model="newQuestion.title"
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
          border border-gray-light
          focus:border-purple-500
          px-3
          resize-none
          py-2
          rounded-md
          outline-none
        "
      ></textarea>
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


<style src="@vueform/multiselect/themes/default.css"></style>
