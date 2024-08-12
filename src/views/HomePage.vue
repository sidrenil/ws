<template>
  <div class="home-page">
    <div class="card-container">
      <Card
        v-for="product in products"
        :key="product.id"
        :image="product.image"
        :title="product.title"
        :price="product.price"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Card from "../components/Card.vue";

const products = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    products.value = response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

<style>
.home-page {
  padding: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}
</style>
