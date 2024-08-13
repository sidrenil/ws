<template>
  <div>
    <div class="card">
      <div class="icon-container" @click.stop="addToCart">
        <i class="fas fa-basket-shopping"></i>
      </div>
      <img :src="image" alt="Product image" class="w-full h-1/2 object-cover" />
      <div class="w-full flex flex-col items-center justify-center p-4">
        <p class="text-base font-semibold mb-1 text-center w-full truncate">
          {{ title }}
        </p>
        <p class="text-lg text-gray-500 mb-1 text-center w-full truncate">
          {{ category }}
        </p>
        <p class="text-sm text-gray-600 text-center w-full truncate">
          {{ formatCurrency(price) }}
        </p>
      </div>
    </div>

    <div v-if="showAlert" class="alert-message">
      <p>{{ alertMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  image: String,
  title: String,
  price: Number,
  category: String,
});

const emit = defineEmits(["update-cart"]);

const showAlert = ref(false);
const alertMessage = ref("");

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
  emit("update-cart");

  alertMessage.value = `${props.title} has been added to your basket`;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
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

.icon-container {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1rem;
  background: white;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s, transform 0.2s;
  z-index: 10;
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

.alert-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #5182db;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
</style>
