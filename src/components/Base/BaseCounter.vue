<template>
  <div class="inline-block">
    <div class="flex flex-col text-sm items-center">
      <p class="bg-gray-50 border border-gray-300 w-10 h-10 flex justify-center items-center rounded-full">

      <slot name="counter"></slot>
      </p>
      <p class="mt-2"><slot></slot></p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>