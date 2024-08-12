<template>
  <nav>
    <div class="navbar-container">
      <i class="fas fa-arrow-left icon-container" @click="goBack"></i>
      <ul>
        <li><router-link to="/" class="text-xl">Home Page</router-link></li>
        <li><router-link to="/" class="text-xl">Categories</router-link></li>
        <li><router-link to="/" class="text-xl">Profile</router-link></li>
        <li><button @click="logout" class="text-xl">Log-Out</button></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goBack = () => {
  router.back();
};
function logout() {
  console.log("successfully exited");
}
</script>

<style>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: antiquewhite;
  padding: 10px;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin: 0 5px;
}

.icon-container {
  font-size: 1.5rem;
  color: #007bff;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.icon-container:hover {
  transform: scale(1.1);
  color: #0056b3;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
