<template>
  <nav>
    <div class="navbar-container items-center justify-center relative">
      <div class="backbtn-container absolute inset-2.5">
        <i class="fas fa-arrow-left backbtn" @click="goBack"></i>
      </div>
      <ul class="menu">
        <li><router-link to="/" class="text-xl">Home Page</router-link></li>
        <li><router-link to="/" class="text-xl">Categories</router-link></li>
        <li><router-link to="/" class="text-xl">Profile</router-link></li>
        <li><button @click="logout" class="text-xl">Log-Out</button></li>
      </ul>
      <div class="cart-container">
        <router-link to="/basket">
          <i class="fa-solid fa-cart-shopping cartshp"></i>
          <span v-if="cartItemCount > 0" class="cart-count">{{
            cartItemCount
          }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const cartItemCount = ref(0);

const goBack = () => {
  router.back();
};

const updateCartItemCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemCount.value = cart.length;
};

onMounted(() => {
  updateCartItemCount();
  window.addEventListener("update-cart", updateCartItemCount);
});

onBeforeUnmount(() => {
  window.removeEventListener("update-cart", updateCartItemCount);
});
</script>

<style>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 30px 20px;
  z-index: 1000;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
}

nav ul.menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex: 1;
}

nav ul.menu li {
  margin: 0 15px;
}

.backbtn {
  font-size: 1.5rem;
  color: #007bff;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.backbtn:hover {
  transform: scale(1.1);
  color: #0056b3;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

.cart-container {
  position: relative;
  margin-right: 40px;
}

.cartshp {
  font-size: 1.5rem;
  color: #007bff;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.cartshp:hover {
  transform: scale(1.1);
  color: #0056b3;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 3px 8px;
  font-size: 0.75rem;
}
</style>
