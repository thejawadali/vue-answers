<template>
  <div v-if="!isEmpty(question)" class="p-10 flex mb-8">
    <!-- avatar -->
    <div class="mt-3">
      <base-avatar
        :title="getFirstLetterOfName(question.user.name)"
        :wnh="12"
      ></base-avatar>
    </div>
    <!-- Question Details -->
    <div class="ml-8 w-full">
      <!-- Headings -->
      <div>
        <!-- title -->
        <h1 class="text-xl tracking-wide">
          {{ question.title }}
        </h1>

        <!-- Time when question asked -->
        <p class="text-sm text-gray-500">
          Asked by
          <span class="text-purple-400 cursor-pointer">{{
            question.user.name
          }}</span>
          on {{ dayjs(question.createdAt).format("MMM D, YYYY") }}
        </p>
      </div>
      <!-- Tags -->
      <div class="flex mt-5">
        <category-flag
          class="mr-2"
          v-for="tag in question.tags"
          :key="tag._id"
          >{{ tag.title }}</category-flag
        >
      </div>
      <!-- Border -->
      <div class="border-b-2 border-gray-300 border-dashed h-1 w-full my-4" />

      <!-- Question details -->
      <p class="text-sm my-3 whitespace-pre-line">
        {{ question.details }}
      </p>
      <div class="border-b-2 border-gray-300 border-dashed h-1 w-full my-4" />
      <!-- Answers -->
      <h1 class="text-lg font-bold">{{ question.answers.length }} Answers</h1>

      <!-- Base Answer -->
      <div v-for="ans in question.answers" :key="ans._id" class="my-4">
        <base-answer :answer="ans" />
      </div>
      <!-- Add Answer -->
      <form @submit.prevent="addAnswer" class="flex my-10">
        <!-- avatar -->
        <div class="mt-3">
          <base-avatar
            :title="getFirstLetterOfName(question.user.name)"
            :wnh="12"
          ></base-avatar>
        </div>
        <div class="w-full ml-4">
          <textarea
            v-model="answerDetails"
            class="
              border border-gray-300
              w-full
              p-2
              text-base
              resize-none
              bg-white
              text-gray-700
              rounded-lg
              outline-none
            "
            cols="30"
            rows="10"
            placeholder="Your Answer"
          ></textarea>
          <div class="flex justify-end mt-3">
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    <h3>Loading question</h3>
  </div>
</template>

<script setup lang="ts">
import CategoryFlag from "../components/Base/BaseCategoryFlag.vue";
import BaseAnswer from "../components/Base/BaseAnswer.vue";
import BaseAvatar from "../components/Base/BaseAvatar.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue-demi";
import { questionStore } from "../store/question";
import dayjs from "dayjs";
import { getFirstLetterOfName, reloadBrowser } from "../logic/utils";
import { isEmpty } from "lodash";
import { LS } from "../store/auth";

const route = useRoute();
const qStore = questionStore();
const question = ref({} as any);
const answerDetails = ref("");

function getQuestion() {
  qStore.fetchSingleQuestion(
    route.params.questionId as string,
    (success: boolean, msg: string) => {
      if (!success) {
        console.error(msg);
        return;
      }
      question.value = JSON.parse(msg);
    }
  );
}

function addAnswer() {
  if (localStorage.getItem(LS.authToken)) {
    const details = answerDetails.value
    qStore.addAnswer(details, route.params.questionId as string, (success: boolean, msg: string)=> {
      if (!success) {
        console.error(msg);
        return
      }
      console.log(msg);
      reloadBrowser()
    })
  } else {
    console.error("Login First");
  }
}

onMounted(() => {
  getQuestion();
});
</script>