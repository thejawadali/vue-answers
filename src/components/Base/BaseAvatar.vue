<template>
  <div
    :class="`w-${props.wnh} h-${props.wnh} bg-${color}-500`"
    class="
      w-7
      h-7
      flex
      justify-center
      items-center
      text-white
      cursor-pointer
      rounded-full
    "
  >
    <p class="text-lg">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  wnh: {
    type: Number,
    default: 7,
  },
});
const color = 'blue'
</script>