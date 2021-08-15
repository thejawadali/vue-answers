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

  

    
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import search from "virtual:vite-icons/ion/ios-search-strong";
import chevronDown from "virtual:vite-icons/mdi/chevron-down";

const open = ref(false);
</script>
