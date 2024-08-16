import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Basket from "../views/Basket.vue";
import CategoryPage from "@/views/CategoryPage.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
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
  {
    path: "/category/:category",
    name: "CategoryPage",
    component: CategoryPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
