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
      <option value="">Select tag</option>
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
        @click="router.push(`/questions/${question._id}`)"
        :question="question"
      />
    </div>
    <div v-else>
      <h3>No Question Found</h3>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue-demi";
import BaseQuestion from "../../components/Base/BaseQuestion.vue";
import { questionStore } from "../../store/question";
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
    quesStore.removeCategoryFilter()
    return;
  }
  quesStore.applyCategoryFilter(selectedTag.value)
  
}

const questions = computed(()=>{
  return quesStore.questions
})

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
