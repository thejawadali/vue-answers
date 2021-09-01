<template>
  <div class="hover:bg-gray-50">
    <!-- Question -->
    <div class="flex justify-between items-center px-8 py-3">
      <div class="">
        <!-- title -->
        <h1 class="font-bold cursor-pointer">{{ question.title }}</h1>
        <!-- details -->
        <p
          class="
            truncate
            cursor-pointer
            text-gray-500
            h-5
            w-100
            text-sm
            my-1
          "
        >
          <!-- <p class="cursor-pointer w-20 text-gray-500 h-5 text-sm my-1"> -->
          {{ question.details }}
        </p>
        <div class="flex my-4 mx-2 items-center">
          <!-- avatar -->
          <base-avatar :title="getFirstLetterOfName(question.user.name)" />
          <!-- time -->
          <p class="mx-2 text-sm text-gray-500">
            Asked by
            <span class="text-purple-500">{{
              question.user.name
            }}</span>
            {{ timeDifference(question.createdAt) }}
          </p>
          <div v-for="(tag, index) in tags" :key="index" class="mx-2">
            <category-flag>{{ tag }}</category-flag>
          </div>
        </div>
      </div>

      <!-- Views and answers section -->
      <div class="flex">
        <div class="mx-3">
          <base-counter>
            <template #counter> {{ question.views }} </template>
            views
          </base-counter>
        </div>
        <div class="mx-3">
          <base-counter>
            <template #counter> {{ question.answers.length }} </template>
            answers
          </base-counter>
        </div>
      </div>
    </div>
    <!-- Border -->
    <div class="border-b-2 border-gray-200 h-1 mx-4" />
  </div>
</template>

<script setup lang="ts">
import CategoryFlag from "./BaseCategoryFlag.vue";
import BaseAvatar from "./BaseAvatar.vue";
import BaseCounter from "./BaseCounter.vue";
import { getFirstLetterOfName, timeDifference } from "../../logic/utils";

const props = defineProps({
  question: Object as any,
});
const tags = props.question.tags.map((t: any) => t.title);
</script>