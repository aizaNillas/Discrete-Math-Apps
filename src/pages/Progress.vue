<template>
  <div class="progress-container">
    <h2 class="text-h5 text-center text-white q-mb-md">Your Progress</h2>

    <div class="row q-col-gutter-md">
      <!-- Lesson Scores -->
      <div class="col-12">
        <q-card class="score-card">
          <q-card-section>
            <h3 class="text-h6 text-center">Lesson Scores</h3>
            <q-list bordered class="rounded-borders">
              <q-item v-for="(score, lessonId) in lessonScores" :key="lessonId">
                <q-item-section>Lesson {{ lessonId }}</q-item-section>
                <q-item-section side class="text-weight-bold text-primary">{{ score }}</q-item-section>
              </q-item>
            </q-list>
            <div class="q-mt-md text-center">
              <h3 class="text-h6">Lesson Progress</h3>
              <q-linear-progress :value="lessonProgress" color="green" stripe animated class="q-mt-sm" />
              <p class="q-mt-sm text-weight-bold">{{ Math.round(lessonProgress * 100) }}% Completed</p>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Assessment Scores -->
      <div class="col-12">
        <q-card class="score-card">
          <q-card-section>
            <h3 class="text-h6 text-center">Assessment Scores</h3>
            <q-list bordered class="rounded-borders">
              <q-item v-for="(score, assessmentId) in assessmentScores" :key="assessmentId">
                <q-item-section>Assessment {{ assessmentId }}</q-item-section>
                <q-item-section side class="text-weight-bold text-blue">{{ score }}</q-item-section>
              </q-item>
            </q-list>
            <div class="q-mt-md text-center">
              <h3 class="text-h6">Assessment Progress</h3>
              <q-linear-progress :value="assessmentProgress" color="blue" stripe animated class="q-mt-sm" />
              <p class="q-mt-sm text-weight-bold">{{ Math.round(assessmentProgress * 100) }}% Completed</p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Success Message -->
    <q-banner v-if="message" class="bg-green text-white q-mt-md text-center rounded-borders">
      {{ message }}
    </q-banner>

    <div class="q-mt-md text-center">
      <q-btn label="Reset Scores" color="red" @click="resetScores" class="full-width q-pa-sm" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'ProgressPage',
  setup() {
    const lessonScores = ref({})
    const assessmentScores = ref({})
    const message = ref('')

    onMounted(() => {
      lessonScores.value = JSON.parse(localStorage.getItem('lessonScores') || '{}')
      assessmentScores.value = JSON.parse(localStorage.getItem('assessmentScores') || '{}')
    })

    const resetScores = () => {
      lessonScores.value = {}
      assessmentScores.value = {}
      localStorage.removeItem('lessonScores')
      localStorage.removeItem('assessmentScores')

      showMessage('Reset scores successfully!')
    }

    const showMessage = (msg) => {
      message.value = msg
      setTimeout(() => {
        message.value = ''
      }, 2000)
    }

    const lessonProgress = computed(() => {
      const totalLessons = 10 // Change if you have more lessons
      const completedLessons = Object.keys(lessonScores.value).length
      return completedLessons / totalLessons
    })

    const assessmentProgress = computed(() => {
      const totalAssessments = 10 // Change if you have more assessments
      const completedAssessments = Object.keys(assessmentScores.value).length
      return completedAssessments / totalAssessments
    })

    return {
      lessonScores,
      assessmentScores,
      resetScores,
      message,
      lessonProgress,
      assessmentProgress
    }
  }
})
</script>

<style scoped>
/* Background Styling */
.progress-container {
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Card Styling */
.score-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
}

/* Reset Button */
.full-width {
  width: 100%;
}

/* Rounded Borders */
.rounded-borders {
  border-radius: 10px;
}
</style>
