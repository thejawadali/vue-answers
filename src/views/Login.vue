<template>
  <div class="flex w-full h-screen bg-gray-50 justify-center items-center">
    <div class="flex w-auth-width flex-col">
      <div class="bg-white px-6 py-8 rounded-md shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Login</h1>
        <input
          type="text"
          class="
            block
            border border-grey-light
            w-full
            outline-none
            p-3
            rounded
            mb-4
            focus:border-purple-500
          "
          v-model="user.userName"
          placeholder="Username"
        />

        <input
          type="password"
          class="
            block
            border border-grey-light
            w-full
            outline-none
            p-3
            rounded
            mb-4
            focus:border-purple-500
          "
          v-model="user.password"
          placeholder="Password"
        />
        <!-- <div class="text-right my-2 text-gray-600">
          <a href="#" class="text-sm hover:underline">Forgot Password?</a>
        </div> -->

        <button
          @click="login"
          type="submit"
          class="
            w-full
            text-center
            py-3
            rounded
            bg-purple-500
            text-white
            hover:bg-green-dark
            focus:outline-none
            my-1
          "
        >
          Login
        </button>
        <div class="text-center my-4 text-sm text-gray-500">
          <p>
            Not Registered?
            <a
              @click="gotoRegister"
              class="text-purple-500 hover:underline cursor-pointer"
              >Sign up now</a
            >
          </p>
        </div>
      </div>
      <div class="text-center mt-4">
        <a class="text-sm cursor-pointer text-blue-700 underline" @click="$router.push('/questions')">Skip For Now</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue-demi";
import { useRouter } from "vue-router";
import { userAuth } from "../store/auth";

const auth = userAuth();

const user = reactive({
  userName: "",
  password: "",
});

const router = useRouter();

function login(e: any) {
  e.preventDefault();
  auth.login(user, (success: boolean, msg: string) => {
    if (success) {
      // show toast
      console.log(msg);
      router.push("/questions");
    } else {
      // show toast
      console.error(msg);
    }
  });
}


onMounted(() => {
  (user.userName = "user123"), (user.password = "12345678");
});

function gotoRegister(e: any) {
  e.preventDefault();
  router.push("/signup");
}
</script>
