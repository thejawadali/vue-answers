<template>
  <nav
    class="
      bg-white
      fixed
      top-0
      right-0
      left-0
      h-14
      flex
      justify-between
      items-center
      px-5
      shadow-md
    "
  >
    <!-- Logo -->
    <h1>Q&A</h1>

    <!-- search field -->
    <div
      class="
        flex
        border border-gray-200
        justify-between
        items-center
        pr-2
        pl-3
        focus-within:shadow-md
        py-1
        rounded-full
      "
    >
      <input
        type="text"
        placeholder="Search"
        class="outline-none text-md bg-transparent w-48"
      />
      <search></search>
    </div>

    
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import search from "virtual:vite-icons/ion/ios-search-strong";
import chevronDown from "virtual:vite-icons/mdi/chevron-down";

const open = ref(false);
</script>
