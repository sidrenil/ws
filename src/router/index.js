import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Basket from "../views/Basket.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import Profile from "../views/Profile.vue";
import LoginPage from "../views/LoginPage.vue";

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
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
