import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Basket from "../views/Basket.vue";

const routes = [
  { path: "/", component: HomePage },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/basket",
    name: "Basket",
    component: Basket,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
