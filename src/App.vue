<template>
  <div v-if="$route.meta.layout && $route.meta.layout === 'full'">
    <router-view />
  </div>
  <div v-else class="w-full h-screen overflow-hidden relative bg-gray-100">
    <Navbar />
    <div
      class="relative top-16 w-full h-screen overflow-scroll p-14 bg-transparent"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
</script>
