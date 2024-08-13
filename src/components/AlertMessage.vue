<template>
  <div
    v-if="visible"
    class="alert fixed top-4 right-4 z-50 bg-blue-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  message: String,
});

const visible = ref(false);

const showAlert = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 3000);
};

watchEffect(() => {
  if (props.message) {
    showAlert();
  }
});
</script>

<style>
.alert {
  opacity: 0;
}
.alert[style*="opacity: 1;"] {
  opacity: 1;
}
</style>
