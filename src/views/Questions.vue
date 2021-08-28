<template>
  <nav
    class="
      bg-white
      flex
      items-center
      justify-between
      z-10
      px-4
      h-20
      shadow-md
      fixed
      left-48
      right-0
    "
  >
    <h1 class="text-lg text-gray-600">All Questions</h1>

    <select
      @change="applyFilter"
      v-model="selectedTag"
      v-if="tags.length > 0"
      class="
        block
        w-52
        py-2
        px-3
        border border-gray-300
        bg-white
        rounded-md
        shadow-sm
        focus:outline-none
        focus:ring-primary-500
        focus:border-primary-500
      "
    >
      <option value="">Select an option</option>
      <option v-for="tag in tags" :key="tag._id" :value="tag._id">
        {{ tag.title }}
      </option>
    </select>
  </nav>

  <main class="relative top-20 pb-12">
    <div v-if="questions.length > 0">
      <base-question
        v-for="question in questions"
        :key="question._id"
        :title="question.title"
        :details="question.details"
        :tags="question.tags.map((t) => t.title)"
        :time="timeDifference(question.createdAt)"
        :views-count="question.views"
        :answers-count="question.answers.length"
        :avatar-letter="getFirstLetterOfName(question.user.name)"
      />
    </div>
    <div v-else>
      <h3>No Question Found</h3>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue-demi";
import { getFirstLetterOfName, timeDifference } from "../logic/utils";
import BaseQuestion from "../components/Base/BaseQuestion.vue";
import { questionStore } from "../store/question";
import { tagsStore } from "../store/tag";

const quesStore = questionStore();
const tagStore = tagsStore();
const questions = ref([] as any);
const tags = ref([] as any);

const selectedTag = ref("");

function applyFilter() {
  if (!selectedTag.value) return;
  console.log(selectedTag.value);
}

onMounted(() => {
  quesStore.fetchQuestions((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    questions.value = JSON.parse(msg);
  });

  tagStore.fetchTags((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    tags.value = JSON.parse(msg);
  });
});
</script>
