<template>
  <nav>
    <ul>
      <li><router-link to="/" class="text-xl">Home Page</router-link></li>
      <li>
        <router-link to="/" class="text-xl">Categories</router-link>
      </li>
      <li><router-link to="/" class="text-xl">Profile</router-link></li>
      <li><button @click="logout" class="text-xl">Log-Out</button></li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function logout() {
  console.log("successfully exited");
}
</script>

<style>
nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
nav ul li {
  display: inline;
  margin-right: 20px;
}
</style>
