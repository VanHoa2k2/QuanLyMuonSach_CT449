import { createWebHistory, createRouter } from "vue-router";
import LoginEmployee from "@/views/LoginEmployee.vue";
import LoginReader from "@/views/LoginReader.vue";
import RegisterReader from "@/views/RegisterReader.vue";
import ManageBook from "@/views/dashboard/ManageBook.vue";
import ManagePublisher from "@/views/dashboard/ManagePublisher.vue";
import ManageBorrowBook from "@/views/dashboard/ManageBorrowBook.vue";
import Home from "@/views/home/Home.vue";
import Profile from "@/views/home/Profile.vue";
import BookDetail from "@/views/home/BookDetail.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/book/:id",
    name: "book",
    component: BookDetail,
  },
  {
    path: "/login-employee",
    name: "login-employee",
    component: LoginEmployee,
  },
  {
    path: "/login-reader",
    name: "login-reader",
    component: LoginReader,
  },
  {
    path: "/register-reader",
    name: "register-reader",
    component: RegisterReader,
  },
  {
    path: "/manage-book",
    name: "manage-book",
    component: ManageBook,
  },
  {
    path: "/manage-publisher",
    name: "manage-publisher",
    component: ManagePublisher,
  },
  {
    path: "/manage-borrow-book",
    name: "manage-borrow-book",
    component: ManageBorrowBook,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
