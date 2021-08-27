<template>
  <div
    class="
      bg-blue-500
      w-7
      h-7
      flex
      justify-center
      items-center
      text-white
      rounded-full
    "
  >
    <p class="text-lg">{{title}}</p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: String
  })
</script>