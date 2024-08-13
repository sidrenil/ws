<template>
  <div>
    <h1>Cart</h1>
    <div v-if="cart.length > 0">
      <ul>
        <li v-for="(item, index) in cart" :key="index" class="cart-item">
          <img :src="item.image" alt="Product image" class="cart-item-image" />
          <div class="cart-item-details">
            <h2>{{ item.title }}</h2>
            <p>{{ item.category }}</p>
            <p>{{ formatCurrency(item.price) }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Your cart is currently empty.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const cart = ref([]);

const formatCurrency = (value) => {
  return `$${parseFloat(value).toFixed(2)}`;
};

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem("cart")) || [];
});
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h2 {
  font-size: 1.2rem;
  margin-bottom: 4px;
}

.cart-item-details p {
  font-size: 0.9rem;
  color: #4a5568;
}
</style>
