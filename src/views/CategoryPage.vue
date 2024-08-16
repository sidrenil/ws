<template>
  <div class="category-page">
    <h2>{{ category }} products</h2>
    <div
      class="card-container grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <Card
        v-for="product in filteredProducts"
        :key="product.id"
        :image="
          product.images && product.images.length > 0
            ? product.images[0]
            : 'path/to/default-image.png'
        "
        :title="product.title"
        :price="product.price"
        :category="product.category"
        @update-cart="updateCartItemCount"
        @click="goToDetail(product.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import Card from "../components/Card.vue";
import { useRouter, useRoute } from "vue-router";

const updateCartItemCount = () => {
  const event = new CustomEvent("update-cart");
  window.dispatchEvent(event);
};

const products = ref([]);
const category = ref(null);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  category.value = route.params.category;
  fetchProductsByCategory();
});

watch(
  () => route.params.category,
  (newCategory) => {
    category.value = newCategory;
    fetchProductsByCategory();
  }
);

const fetchProductsByCategory = async () => {
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category.value}`
    );
    products.value = response.data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

const filteredProducts = computed(() => {
  return products.value;
});

const goToDetail = (productId) => {
  router.push({ name: "ProductDetail", params: { id: productId } });
};
</script>

<style>
.category-page {
  padding: 20px;
  margin-top: 50px;
}

.card-container {
  margin-top: 70px;
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}
</style>
