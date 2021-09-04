<template>
  <div class="flex w-full h-screen bg-gray-50 justify-center items-center">
    <div class="flex w-auth-width flex-col">
      <div class="bg-white px-6 py-8 rounded-md shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
        <base-input
          placeholder="Full Name"
          error-message="Name is required"
          v-model="user.name"
          type="text"
        />
        <base-input
          placeholder="Usename"
          error-message="Username is required"
          v-model="user.userName"
          type="text"
        />

        <base-input
          placeholder="Password"
          error-message="Password of min 8 char is required"
          v-model="user.password"
          type="password"
        />
        <base-input
          placeholder="Confrim Password"
          error-message="Password of min 8 char is required"
          v-model="confirmPassword"
          type="password"
        />

        <button
          @click="register"
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
          Register Now
        </button>
        <div class="text-center my-4 text-sm text-gray-500">
          <p>
            Already Registered?
            <a
              @click="gotoRegister"
              class="cursor-pointer text-purple-500 hover:underline"
              >Sign In</a
            >
            instead
          </p>
        </div>
      </div>
      <div class="text-center mt-4">
        <a
          class="text-sm cursor-pointer text-blue-700 underline"
          @click="$router.push('/questions')"
          >Skip For Now</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue-demi";
import { useRouter } from "vue-router";
import { userAuth } from "../store/auth";

const auth = userAuth();
const router = useRouter();

const user = reactive({
  name: "",
  userName: "",
  password: "",
});

const confirmPassword = ref("");

function register(e: any) {
  e.preventDefault();
  if (user.name === '' || user.password === '' || user.password === '') return
  if (confirmPassword.value !== user.password) {
    console.error("Password not matched");
    return;
  }
  auth.signup(user, (success: boolean, msg: string) => {
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

function gotoRegister(e: any) {
  e.preventDefault();
  router.push("/login");
}
</script>