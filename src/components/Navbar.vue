<template>
  <nav
    class="
      bg-purple-500
      fixed
      top-0
      z-30
      right-0
      left-0
      h-16
      flex
      justify-between
      items-center
      px-5
      shadow-md
      shadow-purple-500
    "
  >
    <!-- left side items -->
    <div class="flex flex-1 items-center">
      <!-- Logo -->
      <h1
        class="text-xl font-bold cursor-pointer text-white mr-3"
        @click="router.push('/')"
      >
        Vue Answers
      </h1>

      <button
        @click="askQuestion"
        class="bg-white active:bg-gray-100 rounded-md text-purple-500 px-2 py-1 mx-3"
      >
        Ask a Question
      </button>
    </div>

    <!-- right side items -->
    <div class="flex flex-1 items-center justify-end">
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
          rounded-md
          placeholder-light-50
          focus-within:bg-gray-50
        "
      >
        <search-icon />
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="outline-none mx-1 text-md bg-transparent w-80"
        />
        <close-icon v-if="search" @click="clearSearch" class="cursor-pointer" />
      </form>

      <!-- Avatar -->
      <div class="ml-3">
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
            bg-purple-500
            text-white
            active:bg-purple-600
            rounded-md
            px-3
            py-1
            border border-white
            outline-none
          "
          @click="loginUserIn"
        >
          Login
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import searchIcon from "virtual:vite-icons/ion/ios-search-strong";
import closeIcon from "virtual:vite-icons/mdi/close";
import chevronDown from "virtual:vite-icons/mdi/chevron-down";
import account from "virtual:vite-icons/mdi/account";
import login from "virtual:vite-icons/mdi/login";
import logout from "virtual:vite-icons/mdi/logout";
import { useRouter } from "vue-router";
import { LS, userAuth } from "../store/auth";
import BaseAvatar from "../components/Base/BaseAvatar.vue";
import { getFirstLetterOfName } from "../logic/utils";
import { questionStore } from "../store/question";

const auth = userAuth();
const router = useRouter();
const open = ref(false);
const search = ref("");

const loggedIn = computed(() => {
  return localStorage.getItem(LS.authToken);
});

const nameOfUser = localStorage.getItem(LS.userProfile)
  ? JSON.parse(localStorage.getItem(LS.userProfile) as string).name
  : "";

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
    title: "Log out",
    icon: logout,
    onclick: () => {
      auth.logout();
      open.value = false;
    },
  },
];

function clearSearch() {
  search.value = "";
  questionStore().searchQuestion("");
}

function searchQuestion() {
  questionStore().searchQuestion(search.value);
}

function loginUserIn() {
  router.push("/login");
}

function askQuestion() {
  if (!localStorage.getItem(LS.authToken)) {
    router.push("/login");
    return;
  }
  router.push("/questions/add");
}
</script>
