<template>
  <div class="flex">
    <!-- Avatar -->
    <div class="flex flex-col items-center justify-between">
      <base-avatar
        :title="getFirstLetterOfName(answer.user.name)"
        :wnh="12"
      ></base-avatar>
      <!-- Show this if this answer is best -->
      <!-- <tick-icon class="mb-5 text-xl text-green-600"/> -->
    </div>
    <div class="ml-5">
      <!-- headings -->
      <div class="flex">
        <!-- Name -->
        <h1 class="text-md font-semibold">{{ answer.user.name }}</h1>
        <p class="flex text-sm items-center mx-3 text-gray-400">
          <clock-icon />
          <span class="mx-1">{{ timeDifference(answer.createdAt) }}</span>
        </p>
      </div>
      <!-- Details -->
      <p class="text-sm my-2 whitespace-pre-line">
        {{answer.details}}
      </p>
    </div>
  </div>
  <div class="ml-10">
    <div class="border-b border-gray-300 h-1 w-full my-4" />
  </div>
</template>

<script setup lang="ts">
import BaseAvatar from "./BaseAvatar.vue";
import { getFirstLetterOfName, timeDifference } from "../../logic/utils";
import clockIcon from "virtual:vite-icons/ic/baseline-access-time";
import tickIcon from "virtual:vite-icons/subway/tick";

const props = defineProps({
  answer: Object as any,
});
</script>