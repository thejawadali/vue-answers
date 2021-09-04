<template>
  <main class="w-36 flex flex-col items-start mx-3 px-4">
    <!-- Create Tag button -->
    <button
      @click="$emit('createTag')"
      class="
        bg-gray-200
        w-full
        py-2
        flex
        items-center
        justify-start
        text-sm text-gray-600
        hover:bg-gray-300
        rounded-md
        active:bg-gray-400
      "
    >
      <plus-icon class="bg-gray-300 mr-1 ml-3" /> Create Tag
    </button>
    <div class="text-gray-500 mt-5 w-full">
      <h1 class="pl-4">Select Tag</h1>
      <ul class="my-2">
        <li v-for="tag in tags" :key="tag._id" class="flex items-center">
          <button
            @click="ApplyFilter(tag._id)"
            :class="{ 'bg-gray-200': selectedTag === tag._id }"
            class="
              w-full
              focus:outline-none
              py-2
              text-left
              focus:ring-1
              focus:ring-purple-500
              px-4
              text-xs text-gray-600
              hover:bg-gray-200
              rounded-md
              my-1
            "
          >
            {{ tag.title.toUpperCase() }}
          </button>
        </li>
        <li class="flex items-center gap-8 mt-4">
          <button
            @click="ClearFilters"
            :class="{ 'cursor-default opacity-50': !selectedTag }"
            class="
              w-full
              py-2
              text-center text-sm text-purple-500
              font-semibold
              bg-white
              focus:outline-none
              focus:ring-1
              focus:ring-purple-500
              hover:bg-gray-100
              active:bg-gray-200
              shadow-md
              rounded-md
              my-1
            "
          >
            Clear Filters
          </button>
        </li>
      </ul>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue-demi";
import plusIcon from "virtual:vite-icons/ic/baseline-add";
import { tagsStore } from "../store/tag";
import { questionStore } from "../store/question";

const quesStore = questionStore();

interface ITag {
  _id: any;
  title: string;
}

const emit = defineEmits(["createTag"]);

const tag = tagsStore();
const tags = ref([] as ITag[]);
const selectedTag = ref("");

function ClearFilters() {
  if (!selectedTag.value) return;
  selectedTag.value = "";
  quesStore.removeCategoryFilter();
}

function ApplyFilter(_id: string) {
  selectedTag.value = _id;
  quesStore.applyCategoryFilter(selectedTag.value);
}

// fetch categories here
onMounted(() => {
  tag.fetchTags((success: boolean, msg: string) => {
    if (!success) {
      console.error(msg);
      return;
    }
    tags.value = JSON.parse(msg);
  });
});

</script>
