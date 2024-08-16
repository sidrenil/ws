<template>
  <div>
    <h1>{{ category }} Products</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="products.length > 0">
        <ul>
          <li v-for="product in products" :key="product.id">
            <img :src="product.thumbnail" alt="Product Image" />
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <p>Price: ${{ product.price }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No products found in this category.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const category = ref(route.params.category);
const products = ref([]);
const loading = ref(true);

const fetchProductsByCategory = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category.value}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    products.value = data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProductsByCategory();
});

watch(
  () => route.params.category,
  (newCategory) => {
    category.value = newCategory;
    fetchProductsByCategory();
  }
);
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

li {
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
