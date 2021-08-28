<template>
  <div class="flex justify-between items-center px-8 py-3">
    <div class="w-10/12">
      <!-- title -->
      <h1 class="font-bold cursor-pointer">{{ title }}</h1>
      <!-- details -->
      <p class="truncate cursor-pointer text-gray-500 h-5 text-sm my-1">
        {{ details }}
      </p>
      <div class="flex my-4 mx-2 items-center">
        <!-- avatar -->
        <base-avatar :title="avatarLetter" />
        <!-- time -->
        <p class="mx-2 text-sm text-gray-500">Asked {{ time }} ago</p>
        <div v-for="(tag, index) in tags" :key="index" class="mx-2">
          <category-flag>{{ tag }}</category-flag>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="mx-3">
        <base-counter>
          <template #counter> {{viewsCount}} </template>
          views
        </base-counter>
      </div>
      <div class="mx-3">
        <base-counter>
          <template #counter> {{answersCount}} </template>
          answers
        </base-counter>
      </div>
    </div>
    <!-- border -->
  </div>
  <div class="border-b-2 border-gray-200 h-1 mx-4" />
</template>

<script setup lang="ts">
  import CategoryFlag from "./Base/BaseCategoryFlag.vue";
import BaseAvatar from "./Base/BaseAvatar.vue";
import BaseCounter from "./Base/BaseCounter.vue";

const props = defineProps({
  tags: Array,
  time: String,
  avatarLetter: String,
  details: String,
  title: String,
  viewsCount: Number,
  answersCount: Number
});
</script>