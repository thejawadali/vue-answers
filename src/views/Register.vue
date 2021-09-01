<template>
  <div class="flex w-full h-screen bg-gray-50 justify-center items-center">
    <div class="flex w-auth-width flex-col">
      <div class="bg-white px-6 py-8 rounded-md shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
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
          v-model="user.name"
          placeholder="Full Name"
        />

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
          v-model="confirmPassword"
          placeholder="Confirm Password"
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
  if (confirmPassword.value !== user.password) {
    console.error("Password not matched");
    return;
  }
  auth.signup(user, (success: boolean, msg: string) => {
    if (success) {
      // show toast
      console.log(msg);
      router.push("/dashboard");
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