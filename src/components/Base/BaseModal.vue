<template>
  <!--Modal-->
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <!-- Overlay -->
    <div class="absolute w-full h-full bg-gray-900 opacity-50" />
    <!-- Here starts the actual modal -->
    <div
      class="
        bg-white
        w-auth-width
        mx-auto
        rounded
        shadow-lg
        z-50
        overflow-y-auto
      "
    >
      <div class="modal-content text-left">
        <slot name="title"></slot>

        <slot></slot>

        <div class="flex justify-end">
          <slot name="action"></slot>
        </div>
      </div>
    </div>
  </div>
</template>