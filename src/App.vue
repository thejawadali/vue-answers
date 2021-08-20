<template>
  <router-view v-if="route.meta.layout === 'full'"/>
  <div v-else class="w-full h-screen">
    <Navbar/>
    <Sidebar/>
    <!-- h-screen -->
    <main class="relative top-14 left-48 bg-white p-4">
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import { useRoute } from "vue-router";
const route = useRoute();

</script>
