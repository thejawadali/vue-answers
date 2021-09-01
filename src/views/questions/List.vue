<template>
  <main class="flex">
    <!-- side bar -->
    <Sidebar />
    <!-- main content i.e. questions list -->
    <div class="bg-white rounded-md bg-orange-300">
      <div v-if="questions.length > 0">
        <base-question
          v-for="question in questions"
          :key="question._id"
          @click="router.push(`/questions/${question._id}`)"
          :question="question"
        />
      </div>
      <div v-else>
        <h3>No Question Found</h3>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue-demi";
import BaseQuestion from "../../components/Base/BaseQuestion.vue";
import { questionStore } from "../../store/question";
import Sidebar from "../../components/Sidebar.vue";
import { tagsStore } from "../../store/tag";
import { useRouter } from "vue-router";

interface IQuestion {
  _id: any;
  title: string;
  details: string;
  views: number;
  tags: any;
  user: any;
  answers: any;
}

interface ITag {
  _id: any;
  title: string;
}

const quesStore = questionStore();
const tagStore = tagsStore();
const router = useRouter();

const tags = ref([] as ITag[]);

const selectedTag = ref("");

function applyFilter() {
  if (!selectedTag.value) {
    quesStore.removeCategoryFilter();
    return;
  }
  quesStore.applyCategoryFilter(selectedTag.value);
}

const questions = computed(() => {
  return quesStore.questions;
});

// Fetch data from db
onMounted(() => {
  quesStore.fetchQuestions((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
  });

  // Get all tags form db
  tagStore.fetchTags((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    tags.value = JSON.parse(msg);
  });
});
</script>
