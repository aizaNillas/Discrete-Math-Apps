// Import the necessary components
import MainLayout from "../layouts/MainLayout.vue";
import Home from "../pages/Home.vue";
import Lessons from "../pages/Lessons.vue";
import Assessments from "../pages/Assessments.vue";
import Progress from "../pages/Progress.vue";
import LessonTopic1 from "../pages/LessonTopic1.vue";
import LessonTopic2 from "../pages/LessonTopic2.vue";
import LessonTopic3 from "../pages/LessonTopic3.vue";
import LessonTopic4 from "../pages/LessonTopic4.vue";
import LessonTopic5 from "../pages/LessonTopic5.vue";


const routes = [
  // ✅ Default Route - Open MainLayout Home directly
  {
    path: "/",
    redirect: "/main/home",
  },

  // ✅ Main Layout with Child Routes
  {
    path: "/main",
    component: MainLayout,
    children: [
      { path: "home", name: "home", component: Home }, // ✅ Home page
      { path: "lessons", name: "lessons", component: Lessons }, // ✅ Lesson List
      { path: "lesson/1", name: "lesson-1", component: LessonTopic1 }, // ✅ Predefined Lesson 1
      { path: "lesson/2", name: "lesson-2", component: LessonTopic2 }, // ✅ Predefined Lesson 2
      { path: "lesson/3", name: "lesson-3", component: LessonTopic3 }, // ✅ Predefined Lesson 3
      { path: "lesson/4", name: "lesson-4", component: LessonTopic4 }, // ✅ Predefined Lesson 4
      { path: "lesson/5", name: "lesson-5", component: LessonTopic5 }, // ✅ Predefined Lesson 5
      { path: "assessments", name: "assessments", component: Assessments }, // ✅ Assessments Section
      { path: "progress", name: "progress", component: Progress }, // ✅ User Progress
    ],
  },

  
  {
    path: "/:catchAll(.*)*",
    redirect: "/main/home", // ✅ Redirect to Home if Route Not Found
  },
];

export default routes;
