<template>
  <div
    class="fixed top-14 w-48 bg-gray-100 h-screen flex flex-col items-center"
  >
    <div
      id="top"
      class="
        w-full
        h-32
        flex
        justify-center
        items-center
        border-b border-gray-300
      "
    >
      <button
        class="bg-blue-500 active:bg-blue-600 rounded-md text-white px-2 py-1"
      >
        Ask a Question
      </button>
    </div>

    <ul class="text-gray-500 mt-5 h-2/3 border-b border-gray-300 w-full">
      <li
        v-for="item in sideNavItems"
        :key="item.title"
        class="rounded-md my-3 mx-3 hover:bg-gray-200"
      >
        <a href="#" class="flex items-center px-4 py-2" @click="item.onClick">
          <component :is="item.icon" />
          <p class="mx-2">{{ item.title }}</p>
        </a>
      </li>
    </ul>

    <div id="copyright" class="mt-1 text-xs text-center text-gray-500">
      <p><span class="text-lg text-black">Q&A</span> <br>by <a href="#">alijamil734@gmail.com</a></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import questionIcon from "virtual:vite-icons/ri/question-fill";
import usersIcon from "virtual:vite-icons/clarity/users-solid";
import categoryIcon from "virtual:vite-icons/bx/bx-category";

const sideNavItems = [
  {
    title: "Questions",
    icon: questionIcon,
    onClick: () => {
      console.log("Questions button is clicked");
    },
  },
  {
    title: "Categories",
    icon: categoryIcon,
    onClick: () => {
      console.log("Categories button is clicked");
    },
  },
  {
    title: "Users",
    icon: usersIcon,
    onClick: () => {
      console.log("Users button is clicked");
    },
  },
];
</script>
