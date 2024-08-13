<template>
  <div class="card">
    <div class="icon-container" @click="addToCart">
      <i class="fas fa-basket-shopping"></i>
    </div>
    <img :src="image" alt="Product image" class="card-image" />
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-category">{{ category }}</p>
      <p class="card-price">{{ formatCurrency(price) }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  image: String,
  title: String,
  price: Number,
  category: String,
});

const formatCurrency = (value) => {
  return `$${parseFloat(value).toFixed(2)}`;
};
const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    image: props.image,
    title: props.title,
    price: props.price,
    category: props.category,
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${props.title} has been added to your cart!`);
};
</script>

<style>
.card {
  position: relative;
  cursor: pointer;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card:hover {
  transform: translateY(-4px);
}

.card-image {
  width: 100%;
  height: 50%;
  object-fit: cover;
}

.card-body {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.card-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.card-category {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 8px;
}

.card-price {
  font-size: 0.875rem;
  color: #4a5568;
}

.icon-container {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1rem;
  background: white;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, background-color 0.2s, font-size 0.2s;
}

.icon-container i {
  color: #007bff;
}

.icon-container:hover {
  background-color: #f0f4f8;
  transform: scale(1.1);
}

.icon-container:hover i {
  color: #0056b3;
  font-size: 1.2rem;
}
</style>
