<template>
  <div>
    <h1>Basket</h1>
    <div v-if="cart.length > 0">
      <ul>
        <li v-for="(item, index) in cart" :key="index" class="cart-item">
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
          </div>
          <button @click="removeItem(index)" class="remove-button">
            Remove
          </button>
        </li>
      </ul>
      <div class="button-container">
        <button @click="emptyCart" class="empty-cart-button">
          Empty Basket
        </button>
      </div>
    </div>

    <div v-if="showAlert" class="alert-message">
      <p>{{ alertMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const cart = ref([]);
const showAlert = ref(false);
const alertMessage = ref("");
const router = useRouter();

const formatCurrency = (value) => {
  return `$${parseFloat(value).toFixed(2)}`;
};

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem("cart")) || [];
});

const removeItem = (index) => {
  const removedItem = cart.value[index];
  cart.value.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart.value));
  window.dispatchEvent(new CustomEvent("update-cart"));

  alertMessage.value = `${removedItem.title} has been removed from your basket`;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
};

const emptyCart = () => {
  cart.value = [];
  localStorage.setItem("cart", JSON.stringify(cart.value));
  window.dispatchEvent(new CustomEvent("update-cart"));

  alertMessage.value = "Your basket has been successfully emptied";
  showAlert.value = true;

  setTimeout(() => {
    showAlert.value = false;
    router.push({ name: "HomePage" });
  }, 3000);
};
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
  object-fit: contain;
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

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.empty-cart-button {
  background-color: #f56565;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.empty-cart-button:hover {
  background-color: #e53e3e;
}

.alert-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #6beca1;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
</style>
