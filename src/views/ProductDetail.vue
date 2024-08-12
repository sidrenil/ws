<template>
  <div v-if="product" class="product-detail p-5">
    <img :src="product.image" alt="Product image" class="product-image" />
    <div class="product-info">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-price">{{ formatCurrency(product.price) }}</p>
    </div>
    <p class="product-description">{{ product.description }}</p>
    <button @click="addToCart" class="add-to-cart-button">Add to Cart</button>
  </div>
  <div v-else class="loading">Loading product details...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref(null);

const formatCurrency = (value) => {
  return `$${parseFloat(value).toFixed(2)}`;
};

const addToCart = () => {
  console.log("Product added to cart:", product.value);
};

onMounted(() => {
  axios
    .get(`https://dummyjson.com/products/${route.params.id}`)
    .then((response) => {
      product.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<style>
.product-detail {
  max-width: 600px;
  margin: auto;
}

.product-image {
  width: 100%;
  height: auto;
  margin-top: 100px;
}

.product-info {
  text-align: center;
  margin-top: 10px;
}

.product-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.product-price {
  font-size: 1.25rem;
  color: #4a5568;
  margin: 10px 0;
}

.product-description {
  margin-top: 20px;
  line-height: 1.6;
}

.add-to-cart-button {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #0056b3;
}

.loading {
  margin-top: 25px;
  text-align: center;
  padding: 20px;
  font-size: 1.25rem;
  color: #6b7280;
}
</style>
