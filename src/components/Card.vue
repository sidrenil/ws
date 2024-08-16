<template>
  <div>
    <div class="card">
      <div class="icon-container" @click.stop="addToCart">
        <i class="fas fa-basket-shopping"></i>
      </div>
      <div class="image-wrapper">
        <img :src="image" alt="Product image" class="card-image" />
      </div>
      <div class="card-content">
        <p class="card-title">{{ title }}</p>
        <p class="card-category">{{ category }}</p>
        <p class="card-price">{{ formatCurrency(price) }}</p>
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

<style scoped>
.card {
  position: relative;
  cursor: pointer;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
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

.image-wrapper {
  width: 80%;
  height: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease-in-out;
}

.card-content {
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
}

.card-title,
.card-category,
.card-price {
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 5px 15px;
  box-sizing: border-box;
  transition: opacity 0.3s ease-in-out;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  height: 50px;
  line-height: 1.3;
  overflow: visible;
  padding: 30px 6px;
}

.card-category {
  font-size: 1rem;
  color: #4a5568;
  padding: 30px 0;
}

.card-price {
  font-size: 0.9rem;
  color: #2d3748;
  margin-top: auto;
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

.card:hover .image-wrapper {
  width: 100%;
  height: 100%;
  padding: 0;
}

.card:hover .card-image {
  object-fit: contain;
}

.card:hover .card-content {
  opacity: 0;
}

.card:hover .card-content * {
  display: none;
}
</style>
