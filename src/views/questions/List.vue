<script lang="ts" setup>
import { computed, onMounted, ref } from "vue-demi";
import BaseQuestion from "../../components/Base/BaseQuestion.vue";
import closeIcon from "virtual:vite-icons/mdi/close-thick";
import { questionStore } from "../../store/question";
import Sidebar from "../../components/Sidebar.vue";
import Modal from "../../components/Base/BaseModal.vue";
import { tagsStore } from "../../store/tag";
import { useRouter } from "vue-router";
import { LS } from "../../store/auth";
import { reloadBrowser, toast } from "../../logic/utils";

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
const tStore = tagsStore();
const router = useRouter();

const tags = ref([] as ITag[]);

const selectedTag = ref("");

const newTagtitle = ref("");

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

function openTagsModal() {
  if (!localStorage.getItem(LS.authToken)) {
    router.push("/login");
    return;
  }
  open.value = true;
}

function createTag() {
  if (newTagtitle.value === "") {
    toast("Tag Title is required", "danger")
    return};
  const title = newTagtitle.value;
  tStore.createTag(title, (success: boolean, msg: string) => {
    if (success) {
      console.log(msg);
      open.value = false;
      reloadBrowser();
    } else {
      console.error(msg);
    }
  });
}

// Fetch data from db
onMounted(() => {
  
  quesStore.fetchQuestions((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
  });

  // Get all tags form db
  tStore.fetchTags((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    tags.value = JSON.parse(msg);
  });
});
</script>


<template>
  <main class="flex">
    <!-- side bar -->
    <Sidebar @createTag="openTagsModal" />
    <!-- main content i.e. questions list -->
    <div class="bg-white rounded-md bg-orange-300 flex-1 min-h-screen">
      <div v-if="questions.length > 0">
        <base-question
          v-for="question in questions"
          :key="question._id"
          @click="router.push(`/questions/${question._id}`)"
          :question="question"
        />
      </div>
      <div v-else class="mt-4 text-center">
        <h3 class="text-xl">No Question Found</h3>
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
      <div class="w-full flex flex-col px-5 border-b border-gray-300 pb-8">
        <label class="text-md my-2 font-semibold">Title</label>
        <base-input
          v-model="newTagtitle"
          type="text"
          placeholder="e.g. Software"
          error-message="Tag title is required"
        />
      </div>
    </template>

    <!-- Modal actions -->
    <template #action>
      <div class="p-4">
        <button
          @click="createTag"
          class="
            px-4
            bg-purple-500
            py-2
            rounded-lg
            focus:outline-none
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
