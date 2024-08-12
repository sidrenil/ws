<template>
  <div class="card">
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
</script>

<style>
.card {
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
</style>
