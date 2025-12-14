import { defineRouter } from "#q-app/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // ✅ Admin & Student Route Guard to Protect Routes
  Router.beforeEach((to, from, next) => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const isStudent = localStorage.getItem("isStudent") === "true";

    // 🔐 If trying to access protected route but not logged in
    if (to.meta.requiresAuth && !isAdmin && !isStudent) {
      next("/login"); // Redirect to login if not authenticated
    }
    // 🏠 Redirect to Main Home after successful login
    else if (to.path === "/login" && (isAdmin || isStudent)) {
      next("/main/home"); // Redirect to Home after login
    }
    // 🚀 Proceed to the next page
    else {
      next(); // Allow normal navigation
    }
  });

  return Router;
});
