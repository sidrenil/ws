<template>
  <div class="home-page">
    <div
      class="card-container grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <Card
        v-for="product in products"
        :key="product.id"
        :image="product.image"
        :title="product.title"
        :price="product.price"
        :category="product.category"
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
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}
</style>
