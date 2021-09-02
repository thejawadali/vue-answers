<template>
  <main class="flex">
    <!-- side bar -->
    <Sidebar @createTag="open = true" />
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
  <Modal v-if="open">
    <!-- title -->
    <template #title>
      <div
        class="flex justify-between items-center p-5 border-b border-gray-300"
      >
        <h1 class="text-xl font-bold">Create New Tag</h1>
        <close-icon @click="open = false" class="cursor-pointer z-50" />
      </div>
    </template>

    <template #default>
      <!-- @submit.prevent="submitForm" -->
      <div class="w-full flex flex-col px-5 border-b border-gray-300 pb-8">
        <label for="title" class="text-md my-2 font-semibold">Title</label>
        <input
          class="
            border border-grey-light
            focus:border-purple-500
            px-3
            py-2
            rounded-md
            outline-none
          "
          id="title"
          type="text"
          placeholder="e.g. Software"
        />
      </div>
    </template>

    <!-- Modal actions -->
    <template #action>
      <div class="p-4">
        <button
          class="
            px-4
            bg-purple-500
            py-2
            rounded-lg
            text-white
            hover:bg-purple-600
            active:bg-purple-700
          "
        >
          Create
        </button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue-demi";
import BaseQuestion from "../../components/Base/BaseQuestion.vue";
import closeIcon from "virtual:vite-icons/mdi/close-thick";
import { questionStore } from "../../store/question";
import Sidebar from "../../components/Sidebar.vue";
import Modal from "../../components/Base/BaseModal.vue";
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

const open = ref(false);

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
