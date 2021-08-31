<template>
  <div v-if="route.meta.layout && route.meta.layout === 'full'">
    <router-view />
  </div>
  <div v-else class="w-full h-screen overflow-hidden relative bg-gray-50">
    <Navbar />
    <div class="relative top-16 w-full">
      <Sidebar />
      <main
        class="
          h-screen
          overflow-scroll
          bg-transparent
          absolute
          left-0
          lg:left-48
          right-0
          
        "
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
