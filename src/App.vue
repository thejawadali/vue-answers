<template>
  <div v-if="route.meta.layout && route.meta.layout === 'full'">
    <router-view />
  </div>
  <div v-else class="w-full h-screen overflow-hidden relative bg-white">
    <Navbar />
    <div class="relative top-14 w-full">
      <Sidebar />
      <main
        class="
          h-screen
          bg-white
          overflow-scroll
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
