<template>
  <div class="home-page">
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Card from "../components/Card.vue";
import { useRouter } from "vue-router";

const updateCartItemCount = () => {
  const event = new CustomEvent("update-cart");
  window.dispatchEvent(event);
};

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref(null);

const router = useRouter();

onMounted(() => {
  axios
    .get("https://dummyjson.com/products")
    .then((response) => {
      products.value = response.data.products;
      categories.value = [...new Set(products.value.map((p) => p.category))];
    })
    .catch((error) => {
      console.error(error);
    });
});

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value;
  return products.value.filter(
    (product) => product.category === selectedCategory.value
  );
});

const goToDetail = (productId) => {
  router.push({ name: "ProductDetail", params: { id: productId } });
};
</script>

<style>
.home-page {
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
