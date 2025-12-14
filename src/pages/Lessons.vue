<template>
  <q-page class="q-pa-md bg-gradient">
    <h2 class="text-h5 q-mb-md text-center text-white">Discrete Mathematics Lessons</h2>

    <div class="q-gutter-sm lessons-container">
      <!-- 📚 Existing Lessons -->
      <q-card
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-card"
        @click="navigateToLessonDetail(lesson.id)"
        v-ripple
      >
        <q-card-section class="lesson-content">
          <q-avatar :icon="lesson.icon" color="primary" text-color="white" size="40px" />
          <div class="lesson-info">
            <div class="lesson-title">{{ lesson.title }}</div>
            <div class="lesson-description">{{ lesson.description }}</div>
          </div>
          <q-icon name="chevron_right" class="lesson-arrow" />
        </q-card-section>
      </q-card>

      <!-- 📝 New Lessons from Admin Panel with Delete Button -->
      <q-card
        v-for="(addedLesson, index) in addedLessons"
        :key="index"
        class="lesson-card added-lesson"
        @click="navigateToAddedLessonDetail(index)"
        v-ripple
      >
        <q-card-section class="lesson-content">
          <q-avatar name="book" color="secondary" text-color="white" size="40px" />
          <div class="lesson-info">
            <div class="lesson-title">{{ addedLesson.title }}</div>
            <div class="lesson-description">{{ addedLesson.content }}</div>
          </div>

          <!-- 🗑️ Delete Button for Admin -->
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
      { id: 1, title: "Propositional Logic", icon: "psychology", description: "Understand mathematical Propositional Logic" },
      { id: 2, title: "Set Theory", icon: "{ }", description: "Learn about set and types of set" },
      { id: 3, title: "Operations on Sets", icon: "merge_type", description: "Master union, intersection & complement" },
      { id: 4, title: "Relations and functions", icon: "𝒇𝒙", description: "Explore relationships within Relations and function" },
      { id: 5, title: "Algorithm", icon: "memory", description: "Learn fundamentals of algorithms in discrete mathematics" },
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
      deleteLesson,
    };
  },
});
</script>

<style scoped>
/* Background */
.bg-gradient {
  background: linear-gradient(135deg, #1565c0, #1e88e5);
  background: url('/src/assets/images/aalesson.jpg') no-repeat center center fixed;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  overflow: hidden; /* prevent scrolling */
}

/* Container to prevent scrolling */
.lessons-container {
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; /* smaller gaps to fit all lessons */
}

/* Lesson Cards */
.lesson-card {
  background: #ffffffd4;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 100%;
  max-width: 300px; /* smaller card */
}

.lesson-card:active {
  transform: scale(0.97);
}

.lesson-content {
  display: flex;
  align-items: center;
  padding: 8px; /* smaller padding */
}

.lesson-info {
  flex-grow: 1;
  margin-left: 8px; /* smaller margin */
}

.lesson-title {
  font-size: 1em; /* smaller font */
  font-weight: 600;
  color: rgb(17, 18, 19);
}

.lesson-description {
  font-size: 0.8em; /* smaller font */
  color: #666;
}

.lesson-arrow {
  color: #1e88e5;
  font-size: 1.2em; /* smaller arrow */
}

/* Responsive */
@media (max-width: 600px) {
  .lesson-card {
    max-width: 90%;
  }
  .lesson-title {
    font-size: 0.95em;
  }
  .lesson-description {
    font-size: 0.75em;
  }
}
</style>
