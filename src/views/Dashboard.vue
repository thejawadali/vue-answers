<template>
  <div v-if="questions.length > 0">
    <Question
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
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue-demi";
import { getFirstLetterOfName, timeDifference } from "../logic/utils";
import Question from "../components/Question.vue";
import { questionStore } from "../store/question";


const store = questionStore();
const questions = ref([] as any);

onMounted(() => {
  store.fetchQuestions((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    questions.value = JSON.parse(msg);
  });
});
</script>
