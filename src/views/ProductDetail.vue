<template>
  <div v-if="product" class="product-detail">
    <div class="product-image-container">
      <img
        :src="
          product.images && product.images.length > 0
            ? product.images[0]
            : 'path/to/default-image.png'
        "
        alt="Product image"
        class="product-image"
      />
    </div>
    <div class="product-info">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ formatCurrency(product.price) }}</p>

      <button @click="addToCart" class="add-to-cart-button">Add to Cart</button>
    </div>
  </div>
  <div v-else class="loading">Loading product details...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const route = useRoute();
const product = ref(null);
const cartStore = useCartStore();

const formatCurrency = (value) => {
  return `$${parseFloat(value).toFixed(2)}`;
};

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart({
      image:
        product.value.images && product.value.images.length > 0
          ? product.value.images[0]
          : "path/to/default-image.png",
      title: product.value.title,
      price: product.value.price,
      category: product.value.category,
    });

    window.dispatchEvent(new CustomEvent("update-cart"));

    console.log("Product added to cart:", product.value);
  }
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
  display: flex;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  gap: 20px;
  text-align: center;
}

.product-image-container {
  flex: 1;
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-top: 20px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
}

.product-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.5rem;
  color: #4a5568;
  margin: 20px 0;
}

.product-description {
  font-size: 1rem;
  margin: 20px 0;
  line-height: 1.6;
}

.add-to-cart-button {
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #0056b3;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 1.25rem;
  color: #6b7280;
}
</style>
