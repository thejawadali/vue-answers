<template>
  <Question
    v-for="i in 32"
    :key="i"
    :tags="tags"
    time="56 minutes"
    views-count="40"
    answers-count="33"
    avatar-letter="D"
    title="How to become billionaire in next four years?"
    :details="questionDetails"
  ></Question>
</template>

<script lang="ts" setup>
import Question from "../components/Question.vue";
const tags = ["Computer Science", "Chemistry", "Physics", "Maths"];
const questionDetails = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore itaque
        laudantium repudiandae ut voluptatibus praesentium mollitia omnis
        aperiam odio voluptatum quibusdam eos, consequatur cum odit sunt
        exercitationem animi optio similique maiores excepturi quis qui repellat
        sapiente. Odit unde nulla maxime a, soluta necessitatibus cupiditate
        corporis numquam aut esse molestias veniam explicabo consequuntur enim
        magni recusandae?`;
</script>
