<template>
  <div>
    <h1>Basket</h1>
    <div v-if="groupedCartItems.length > 0">
      <ul>
        <li
          v-for="(item, index) in groupedCartItems"
          :key="index"
          class="cart-item"
        >
          <img
            :src="
              item.image && item.image.length > 0
                ? item.image
                : 'path/to/default-image.png'
            "
            alt="Product image"
            class="cart-item-image"
          />
          <div class="cart-item-details">
            <h2>{{ item.title }}</h2>
            <p>{{ item.category }}</p>
            <p>{{ formatCurrency(item.price) }}</p>
            <p class="item-quantity">Quantity: {{ item.quantity }}</p>
          </div>
          <button @click="removeItem(item.id)" class="remove-button">
            Remove
          </button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Your basket is currently empty.</p>
    </div>

    <div v-if="showAlert" class="alert-message">
      <p>{{ alertMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const cart = ref([]);
const showAlert = ref(false);
const alertMessage = ref("");

const formatCurrency = (value) => {
  return `$${parseFloat(value).toFixed(2)}`;
};

onMounted(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.value = groupCartItems(storedCart);
});

const groupCartItems = (cartItems) => {
  const groupedItems = {};
  cartItems.forEach((item) => {
    if (groupedItems[item.id]) {
      groupedItems[item.id].quantity += 1;
    } else {
      groupedItems[item.id] = { ...item, quantity: 1 };
    }
  });
  return Object.values(groupedItems);
};

const removeItem = (itemId) => {
  const updatedCart = cart.value.filter((item) => item.id !== itemId);
  cart.value = updatedCart;
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new CustomEvent("update-cart"));

  alertMessage.value = `Item has been removed from your basket`;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
};

const groupedCartItems = computed(() => cart.value);
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

.item-quantity {
  font-size: 0.9rem;
  color: #2d3748;
  margin-top: 5px;
}

.remove-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.remove-button:hover {
  background-color: #ff4b4b;
}

.alert-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f57979;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
</style>
