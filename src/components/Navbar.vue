<template>
  <nav>
    <div class="navbar-container items-center justify-between relative">
      <div class="left-container">
        <div class="backbtn-container absolute inset-2.5">
          <div
            v-if="showBackButton"
            class="backbtn-container absolute inset-2.5"
          >
            <i class="fas fa-arrow-left backbtn" @click="goBack"></i>
          </div>
        </div>
      </div>

      <div class="menu-container">
        <ul class="menu">
          <li><router-link to="/" class="text-xl">Home Page</router-link></li>
          <li
            class="relative"
            @mouseover="dropdownOpen = true"
            @mouseleave="dropdownOpen = false"
          >
            <button class="text-xl">Categories</button>
            <ul v-if="dropdownOpen" class="dropdown-menu">
              <li v-for="(category, index) in categories" :key="index">
                <router-link :to="`/category/${category}`">{{
                  category
                }}</router-link>
              </li>
            </ul>
          </li>
          <li
            class="relative"
            @mouseover="profileDropdownOpen = true"
            @mouseleave="profileDropdownOpen = false"
          >
            <button class="text-xl">Profile</button>
            <ul v-if="profileDropdownOpen" class="dropdown-menu">
              <li v-if="isLoggedIn">
                <router-link to="/profile">Change Password</router-link>
              </li>
              <li v-if="!isLoggedIn">
                <router-link to="/login">Login</router-link>
              </li>
              <li v-if="isLoggedIn">
                <button @click="logout">Log-Out</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="right-container">
        <div class="cart-container">
          <router-link to="/basket">
            <i class="fa-solid fa-cart-shopping cartshp"></i>
            <span v-if="cartItemCount > 0" class="cart-count">
              {{ cartItemCount }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useCartStore } from "@/stores/cartStore";
import { onAuthStateChanged } from "firebase/auth";

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();

const categories = ref([]);
const dropdownOpen = ref(false);
const profileDropdownOpen = ref(false);
const isLoggedIn = ref(false);

const cartItemCount = computed(() => cartStore.cartItemCount);

const goBack = () => {
  router.back();
};

const showBackButton = computed(() => route.name !== "HomePage");

const fetchCategories = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const allCategories = data.products.map((product) => product.category);
    categories.value = [...new Set(allCategories)];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const updateCartItemCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartStore.cart = cart;
};

const logout = async () => {
  try {
    await signOut(auth);
    alert("Successfully logged out.");
    profileDropdownOpen.value = false;
    router.push("/login");
  } catch (error) {
    console.error("Failed to log out:", error);
    alert("Failed to log out.");
  }
};

onMounted(() => {
  updateCartItemCount();
  window.addEventListener("update-cart", updateCartItemCount);
  fetchCategories();

  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("update-cart", updateCartItemCount);
});
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background-color: white;
  padding: 20px 30px;
  z-index: 1000;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-container {
  flex: 1;
}

.menu-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

nav ul.menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 40px;
}

nav ul.menu li {
  position: relative;
  display: flex;
  align-items: center;
}

nav ul.menu li button,
nav ul.menu li a {
  color: #333;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 30px 35px;
  background-color: transparent;
  border: none;
  box-shadow: none;
}

nav ul.menu li button:hover,
nav ul.menu li a:hover {
  background-color: #f0f0f0;
  color: gray;
  border-radius: 5px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: none;
  border-radius: 5px;
  box-shadow: none;
  list-style-type: none;
  padding: 10px;
  margin: 0;
  z-index: 1000;
  min-width: 150px;
}

.dropdown-menu li {
  padding: 8px 12px;
}

.dropdown-menu li a,
.dropdown-menu li button {
  text-decoration: none;
  color: #333;
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 700;
}

.dropdown-menu li a:hover,
.dropdown-menu li button:hover {
  background-color: #f0f0f0;
  color: #007bff;
}

.right-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
}

.cart-container {
  position: relative;
  margin-left: auto;
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
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  min-width: 20px;
  text-align: center;
}
</style>
