<template>
  <div class="bg-gray-100 flex justify-center items-center w-full h-screen">
    <div class="container w-100 bg-white rounded-md shadow-lg">
      <h1 class="text-3xl font-bold px-3 my-3 text-center">Sign Up</h1>
      <div class="divider border-b border-gray-500" />
      <form action="#" class="px-8 my-8">
        <input
          type="text"
          placeholder="Name"
          class="
            bg-gray-200
            w-full
            outline-none
            text-lg
            px-4
            py-2
            rounded-full
            focus:shadow-lg
            my-2
          "
        />
        <input
          type="text"
          placeholder="Username"
          class="
            bg-gray-200
            w-full
            outline-none
            text-lg
            px-4
            py-2
            rounded-full
            focus:shadow-lg
            my-2
          "
        />
        <input
          type="password"
          placeholder="Password"
          class="
            bg-gray-200
            w-full
            outline-none
            text-lg
            px-4
            py-2
            rounded-full
            focus:shadow-lg
            my-2
          "
        />
        <button
          class="
            bg-blue-500
            w-full
            my-2
            text-white
            active:bg-blue-600
            outline-none
            text-lg
            px-4
            py-2
            rounded-full
          "
        >
          Register Now
        </button>
        <div class="text-center my-4 text-sm">
          <p>Already Registered? 
            <a href="#" class="text-blue-500 hover:underline">Sign In</a>
            instead
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
</style>