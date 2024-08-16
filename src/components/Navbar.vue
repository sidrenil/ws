<template>
  <nav>
    <div class="navbar-container items-center justify-center relative">
      <div v-if="showBackButton" class="backbtn-container absolute inset-2.5">
        <i class="fas fa-arrow-left backbtn" @click="goBack"></i>
      </div>
      <ul class="menu">
        <li><router-link to="/" class="text-xl">Home Page</router-link></li>
        <li class="relative">
          <button @click="toggleDropdown" class="text-xl">Categories</button>
          <ul v-if="dropdownOpen" class="dropdown-menu">
            <li v-for="(category, index) in uniqueCategories" :key="index">
              <router-link :to="`/category/${category}`">
                {{ category }}
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/profile" class="text-xl">Profile</router-link>
        </li>
        <li><button @click="logout" class="text-xl">Log-Out</button></li>
      </ul>
      <div class="cart-container">
        <router-link to="/basket">
          <i class="fa-solid fa-cart-shopping cartshp"></i>
          <span v-if="cartItemCount > 0" class="cart-count">
            {{ cartItemCount }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const cartItemCount = ref(0);
const categories = ref([]);
const dropdownOpen = ref(false);

const goBack = () => {
  router.back();
};

const showBackButton = computed(() => route.name !== "HomePage");

const updateCartItemCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemCount.value = cart.length;
};

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

// `uniqueCategories` computed özelliği burada tanımlanıyor
const uniqueCategories = computed(() => categories.value);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

onMounted(() => {
  updateCartItemCount();
  fetchCategories();
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
  position: relative;
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

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  list-style-type: none;
  padding: 10px;
  margin: 0;
  z-index: 1000;
}

.dropdown-menu li {
  padding: 5px 10px;
}

.dropdown-menu li a {
  text-decoration: none;
  color: black;
}

.dropdown-menu li a:hover {
  text-decoration: underline;
}
</style>
