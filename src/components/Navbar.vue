<template>
  <nav
    class="
      bg-white
      fixed
      top-0
      z-30
      right-0
      left-0
      h-14
      flex
      justify-between
      items-center
      px-5
      shadow-md
    "
  >
    <!-- Logo -->
    <h1 class="text-xl font-bold cursor-pointer">Q&A</h1>

    <!-- search field -->

    <form
      @submit.prevent="searchQuestion"
      class="
        flex
        border border-gray-200
        justify-between
        items-center
        pr-2
        pl-3
        focus-within:shadow-md
        py-1
        rounded-full
      "
    >
      <input
        v-model="search"
        type="text"
        placeholder="Search"
        class="outline-none text-md bg-transparent w-80"
      />
      <search-icon></search-icon>
    </form>

    <!-- Avatar -->
    <div>
      <div v-if="loggedIn" id="avatar-container" class="flex items-center">
        <base-avatar :title="getFirstLetterOfName(nameOfUser)" />
        <p id="name" class="px-2 text-sm">{{ nameOfUser }}</p>
        <chevron-down
          @click="open = !open"
          class="cursor-pointer hover:bg-gray-200 rounded-full"
        ></chevron-down>
        <ul
          v-if="open"
          x-transition:leave="transition ease-in duration-150"
          x-transition:leave-start="opacity-100"
          x-transition:leave-end="opacity-0"
          aria-expanded="false"
          class="
            absolute
            right-3
            top-9
            w-56
            p-2
            mt-2
            space-y-2
            text-gray-600
            bg-white
            border border-gray-100
            rounded-md
            shadow-md
          "
        >
          <li class="flex" v-for="item in dialogItems" :key="item.title">
            <a
              @click="item.onclick"
              class="
                inline-flex
                items-center
                w-full
                px-2
                py-1
                text-sm
                font-semibold
                transition-colors
                duration-150
                rounded-md
                hover:bg-gray-100
                hover:text-gray-800
                dark:hover:bg-gray-800
                dark:hover:text-gray-200
              "
            >
              <component :is="item.icon" class="mr-2" />
              <span>{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </div>
      <button
        v-else
        id="login-btn"
        class="
          flex
          items-center
          bg-gray-100
          active:bg-gray-200
          rounded-md
          px-2
          py-1
          border-none
          outline-none
        "
        @click="loginUserIn"
      >
        <login class="mr-2" />
        Login
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import searchIcon from "virtual:vite-icons/ion/ios-search-strong";
import chevronDown from "virtual:vite-icons/mdi/chevron-down";
import account from "virtual:vite-icons/mdi/account";
import login from "virtual:vite-icons/mdi/login";
import logout from "virtual:vite-icons/mdi/logout";
import settings from "virtual:vite-icons/ri/settings-3-line";
import { useRouter } from "vue-router";
import { LS, userAuth } from "../store/auth";
import BaseAvatar from "../components/Base/BaseAvatar.vue";
import { getFirstLetterOfName } from "../logic/utils";

const auth = userAuth();
const router = useRouter();
const open = ref(false);
const search = ref("");

const loggedIn = computed(() => {
  return localStorage.getItem(LS.authToken);
});

const nameOfUser = JSON.parse(
  localStorage.getItem(LS.userProfile) as string
).name;

const dialogItems = [
  {
    title: "Profile",
    icon: account,
    onclick: () => {
      console.log("Clicked Profile button");
      open.value = false;
    },
  },
  {
    title: "Settings",
    icon: settings,
    onclick: () => {
      console.log("Clicked Settings button");
      open.value = false;
    },
  },
  {
    title: "Log out",
    icon: logout,
    onclick: () => {
      loggedIn.value = false;
      auth.logout();

      open.value = false;
    },
  },
];

function searchQuestion() {
  console.log(`search field is ${search.value}`);
  search.value = "";
}

function loginUserIn() {
  router.push("/login");
}
</script>
