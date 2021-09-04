<template>
  <div
    class="
      bg-gray-100
      w-full
      h-screen
      flex-col flex
      justify-center
      items-center
    "
  >
    <div class="flex">
      <h1
        class="text-6xl font-bold text-purple-500 px-5 border-r border-gray-300"
      >
        404
      </h1>
      <div class="mx-5 flex flex-col">
        <h1 class="text-5xl font-bold mb-2">Page Not Found</h1>
        <p class="text-gray-400 tracking-wider">
          We can not find what you are looking for
        </p>
      </div>
    </div>
    <button
      @click="$router.push('/questions')"
      class="
        mt-10
        bg-purple-500
        text-white
        px-3
        py-2
        rounded-md
        hover:bg-purple-600
        active:bg-purple-700
      "
    >
      Back To Home
    </button>
  </div>
</template>
