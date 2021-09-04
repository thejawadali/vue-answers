<script lang="ts" setup>
import { ref } from "vue-demi";

const errMsg = ref("");
const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    requried: true,
  },
  type: {
    type: String,
    default: "text",
  },
  errorMessage: {
    type: String,
    defuault: "",
  },
});

function checkError(event: any) {
  if (!event.target.value) {
    // show error
    errMsg.value = props.errorMessage + "";
  }
}

const emit = defineEmits();
function onChangeValu(event: any) {
  const value = event.target.value
  emit("update:modelValue", value);
  if (value && errMsg.value) {
    // remove error
    errMsg.value = ''
  }
}
</script>

<template>
  <div class="mb-4 w-full">
    <input
      @input="onChangeValu"
      :type="type"
      :value="modelValue"
      @blur="checkError"
      class="
        block
        border 
        w-full
        outline-none
        p-3
        rounded
        focus:border-purple-500
      "
      :class="{errMsg : 'border border-red-600'}"
      :placeholder="placeholder"
    />
    <p v-if="errMsg" class="text-red-600 ml-1 mt-1 text-xs">{{ errMsg }}</p>
  </div>
</template>