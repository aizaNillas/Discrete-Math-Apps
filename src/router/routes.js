// Import the necessary components
import MainLayout from "../layouts/MainLayout.vue";
import Home from "../pages/Home.vue";
import Lessons from "../pages/Lessons.vue";
import Assessments from "../pages/Assessments.vue";
import Progress from "../pages/Progress.vue";
import Login from "../pages/Login.vue";        // ← ADD THIS
import Register from "../pages/Register.vue";  // ← ADD THIS
import LessonTopic0 from "../pages/LessonTopic0.vue";
import LessonTopic1 from "../pages/LessonTopic1.vue";
import LessonTopic2 from "../pages/LessonTopic2.vue";
import LessonTopic3 from "../pages/LessonTopic3.vue";
import LessonTopic4 from "../pages/LessonTopic4.vue";
import LessonTopic5 from "../pages/LessonTopic5.vue";
import LessonTopic6 from "../pages/LessonTopic6.vue";
import LessonTopic7 from "../pages/LessonTopic7.vue";

const routes = [
  // ✅ Default Route - Redirect to Login (not home) if not logged in
  {
    path: "/",
    redirect: "/login",  // ← CHANGE: Redirect to login instead of home
  },

  // ✅ LOGIN PAGE (Public - no auth required)
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresGuest: true }  // ← ADD: Only accessible when NOT logged in
  },

  // ✅ REGISTRATION PAGE (Public - no auth required)
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { requiresGuest: true }  // ← ADD: Only accessible when NOT logged in
  },

  // ✅ Main Layout with Child Routes (ALL PROTECTED)
  {
    path: "/main",
    component: MainLayout,
    meta: { requiresAuth: true },  // ← ADD: Protect entire main section
    children: [
      { 
        path: "home", 
        name: "home", 
        component: Home,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "lessons", 
        name: "lessons", 
        component: Lessons,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "lesson/0", 
        name: "lesson-0", 
        component: LessonTopic0,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "lesson/1", 
        name: "lesson-1", 
        component: LessonTopic1,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "lesson/2", 
        name: "lesson-2", 
        component: LessonTopic2,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "lesson/3", 
        name: "lesson-3", 
        component: LessonTopic3,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "lesson/4", 
        name: "lesson-4", 
        component: LessonTopic4,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "lesson/5", 
        name: "lesson-5", 
        component: LessonTopic5,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "lesson/6", 
        name: "lesson-6", 
        component: LessonTopic6,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "lesson/7", 
        name: "lesson-7", 
        component: LessonTopic7,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "assessments", 
        name: "assessments", 
        component: Assessments,
        meta: { requiresAuth: true }  // ← ADD
      },
      { 
        path: "progress", 
        name: "progress", 
        component: Progress,
        meta: { requiresAuth: true }  // ← ADD
      },
    ],
  },

  // ✅ Catch-all Route - Redirect to Login (not home) if route not found
  {
    path: "/:catchAll(.*)*",
    redirect: "/login",  // ← CHANGE: Redirect to login instead of home
  },
];

export default routes;