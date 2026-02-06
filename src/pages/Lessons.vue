<template>
  <q-page class="q-pa-md bg-gradient">
    <!-- Moved the title to appear lower on the screen -->
    <div style="height: 10vh; min-height: 80px;"></div>
    
    <h5 class="text-h6 q-mb-sm text-center text-white">
      Discrete Mathematics Lessons
    </h5>

    <div class="lessons-container">
      <!-- 📚 Existing Lessons -->
      <q-card
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-card"
        @click="navigateToLessonDetail(lesson.id)"
        v-ripple
      >
        <q-card-section class="lesson-content">
          <q-avatar
            :icon="lesson.icon"
            color="primary"
            text-color="white"
            size="34px"
          />
          <div class="lesson-info">
            <div class="lesson-title">{{ lesson.title }}</div>
            <div class="lesson-description">{{ lesson.description }}</div>
          </div>
          <q-icon name="chevron_right" class="lesson-arrow" />
        </q-card-section>
      </q-card>

      <!-- 📝 New Lessons -->
      <q-card
        v-for="(addedLesson, index) in addedLessons"
        :key="index"
        class="lesson-card added-lesson"
        @click="navigateToAddedLessonDetail(index)"
        v-ripple
      >
        <q-card-section class="lesson-content">
          <q-avatar
            name="book"
            color="secondary"
            text-color="white"
            size="34px"
          />
          <div class="lesson-info">
            <div class="lesson-title">{{ addedLesson.title }}</div>
            <div class="lesson-description">{{ addedLesson.content }}</div>
          </div>

          <q-btn
            flat
            dense
            color="negative"
            icon="delete"
            @click.stop="deleteLesson(index)"
            class="delete-btn"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LessonsPage",
  setup() {
    const router = useRouter();

    const lessons = [
      {
        id: 0,
        title: "Introduction to Discrete Mathematics",
        icon: "analytics",
        description: "Overview of Discrete Mathematics"
      },
      { id: 1, title: "Propositional Logic", icon: "psychology", description: "Understand mathematical Propositional Logic" },
      { id: 2, title: "Set Theory", icon: "{ }", description: "Learn about set and types of set" },
      { id: 3, title: "Operations on Sets", icon: "merge_type", description: "Master union, intersection & complement" },
      { id: 4, title: "Relations and functions", icon: "𝒇𝒙", description: "Explore relationships in Relations and function" },
      { id: 5, title: "Algorithm", icon: "memory", description: "Learn fundamentals of algorithms and structured methods for problem solving" },
      { id: 6, title: "Graph Theory", icon: "hub", description: "Fundamentals and Basic Properties" },
      {
        id: 7,
        title: "Matrices",
        icon: "grid_on",
        description: "Understand matrices and their operations"
      }
    ];

    const addedLessons = ref([]);

    onMounted(() => {
      const storedLessons = localStorage.getItem("lessons");
      if (storedLessons) {
        addedLessons.value = JSON.parse(storedLessons);
      }
    });

    const navigateToLessonDetail = (lessonId) => {
      router.push({ name: `lesson-${lessonId}` });
    };

    const navigateToAddedLessonDetail = (index) => {
      const lessonId = index + 5;
      router.push({ name: "lesson-detail", params: { id: lessonId } });
    };

    const deleteLesson = (index) => {
      if (confirm("Are you sure you want to delete this lesson?")) {
        addedLessons.value.splice(index, 1);
        localStorage.setItem("lessons", JSON.stringify(addedLessons.value));
      }
    };

    return {
      lessons,
      addedLessons,
      navigateToLessonDetail,
      navigateToAddedLessonDetail,
      deleteLesson
    };
  }
});
</script>

<style scoped>
.bg-gradient {
  background: url('/images/bac.webp')  no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 0;
  overflow: hidden;
}

.lessons-container {
  width: 100%;
  max-width: 340px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 2px;
}

.lesson-card {
  background: rgba(255, 255, 255, 0.69);
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
}

.lesson-content {
  display: flex;
  align-items: center;
  padding: 3px;
}

.lesson-info {
  flex-grow: 1;
  margin-left: 3px;
}

/* ✅ TITLE MAS DAKO */
.lesson-title {
  font-size: 0.9em;      /* ⬅ increased */
  font-weight: 700;
  color: #111;
  line-height: 1.15;
}

/* ✅ DESCRIPTION MAS GAMAY */
.lesson-description {
  font-size: 0.65em;
  color: #555;
}

.lesson-arrow {
  color: #1e88e5;
  font-size: 1em;
}

@media (max-width: 600px) {
  .lessons-container {
    max-width: 100%;
  }
}
</style>