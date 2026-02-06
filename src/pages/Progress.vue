<template>
  <div class="progress-container">
    <div class="header-section">
      <h7 class="main-title">Your Progress</h7>
      <div class=""></div>
      
      <!-- Carousel Navigation -->
      <div class="carousel-controls">
        <q-btn 
          round 
          dense 
          flat 
          icon="chevron_left" 
          class="nav-btn"
          @click="prevSlide"
          :disable="currentSlide === 0"
        />
        <div class="slide-indicator">
          <span class="current-slide">{{ currentSlide + 1 }}</span>
          <span class="slide-separator">/</span>
          <span class="total-slides">{{ totalSlides }}</span>
        </div>
        <q-btn 
          round 
          dense 
          flat 
          icon="chevron_right" 
          class="nav-btn"
          @click="nextSlide"
          :disable="currentSlide === totalSlides - 1"
        />
      </div>
    </div>
    
    <!-- Carousel Container -->
    <div class="carousel-container">
      <div 
        class="carousel-track" 
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <!-- Slide 1: Propositional Logic -->
        <div class="carousel-slide">
          <q-card class="score-card">
            <q-card-section>
              <h3 class="section-title">Propositional Logic</h3>
              
              <!-- Progress Section moved to top -->
              <div class="progress-section top-progress">
                <div class="progress-header">Overall Progress</div>
                <q-linear-progress :value="propositionalLogicProgress" color="red" class="custom-progress" />
                <div class="progress-percentage">{{ Math.round(propositionalLogicProgress * 100) }}%</div>
              </div>
              
              <!-- Assessment List -->
              <div class="assessment-list">
                <div v-for="(item, key) in propositionalLogicAssessments" :key="key" class="assessment-item">
                  <div class="assessment-label">{{ item.label }}</div>
                  <div class="assessment-score">
                    <span class="score-text">{{ item.score }}/{{ item.max }}</span>
                    <span class="percentage-badge">{{ item.percentage }}%</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Slide 2: Set Theory -->
        <div class="carousel-slide">
          <q-card class="score-card">
            <q-card-section>
              <h3 class="section-title">Set Theory</h3>
              
              <!-- Progress Section moved to top -->
              <div class="progress-section top-progress">
                <div class="progress-header">Overall Progress</div>
                <q-linear-progress :value="setTheoryProgress" color="red" class="custom-progress" />
                <div class="progress-percentage">{{ Math.round(setTheoryProgress * 100) }}%</div>
              </div>
              
              <!-- Assessment List -->
              <div class="assessment-list">
                <div v-for="(item, key) in setTheoryAssessments" :key="key" class="assessment-item">
                  <div class="assessment-label">{{ item.label }}</div>
                  <div class="assessment-score">
                    <span class="score-text">{{ item.score }}/{{ item.max }}</span>
                    <span class="percentage-badge">{{ item.percentage }}%</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Slide 3: Operations on Sets -->
        <div class="carousel-slide">
          <q-card class="score-card">
            <q-card-section>
              <h3 class="section-title">Operations on Sets</h3>
              
              <!-- Progress Section moved to top -->
              <div class="progress-section top-progress">
                <div class="progress-header">Overall Progress</div>
                <q-linear-progress :value="operationsSetsProgress" color="red" class="custom-progress" />
                <div class="progress-percentage">{{ Math.round(operationsSetsProgress * 100) }}%</div>
              </div>
              
              <!-- Assessment List -->
              <div class="assessment-list">
                <div v-for="(item, key) in operationsSetsAssessments" :key="key" class="assessment-item">
                  <div class="assessment-label">{{ item.label }}</div>
                  <div class="assessment-score">
                    <span class="score-text">{{ item.score }}/{{ item.max }}</span>
                    <span class="percentage-badge">{{ item.percentage }}%</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Slide 4: Relations & Functions -->
        <div class="carousel-slide">
          <q-card class="score-card">
            <q-card-section>
              <h3 class="section-title">Relations & Functions</h3>
              
              <!-- Progress Section moved to top -->
              <div class="progress-section top-progress">
                <div class="progress-header">Overall Progress</div>
                <q-linear-progress :value="relationsFunctionsProgress" color="red" class="custom-progress" />
                <div class="progress-percentage">{{ Math.round(relationsFunctionsProgress * 100) }}%</div>
              </div>
              
              <!-- Assessment List -->
              <div class="assessment-list">
                <div v-for="(item, key) in relationsFunctionsAssessments" :key="key" class="assessment-item">
                  <div class="assessment-label">{{ item.label }}</div>
                  <div class="assessment-score">
                    <span class="score-text">{{ item.score }}/{{ item.max }}</span>
                    <span class="percentage-badge">{{ item.percentage }}%</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Slide 5: Algorithm -->
        <div class="carousel-slide">
          <q-card class="score-card">
            <q-card-section>
              <h3 class="section-title">Algorithm</h3>
              
              <!-- Progress Section moved to top -->
              <div class="progress-section top-progress">
                <div class="progress-header">Overall Progress</div>
                <q-linear-progress :value="algorithmProgress" color="red" class="custom-progress" />
                <div class="progress-percentage">{{ Math.round(algorithmProgress * 100) }}%</div>
              </div>
              
              <!-- Assessment List -->
              <div class="assessment-list">
                <div v-for="(item, key) in algorithmAssessments" :key="key" class="assessment-item">
                  <div class="assessment-label">{{ item.label }}</div>
                  <div class="assessment-score">
                    <span class="score-text">{{ item.score }}/{{ item.max }}</span>
                    <span class="percentage-badge">{{ item.percentage }}%</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Slide 6: Graph Theory -->
        <div class="carousel-slide">
          <q-card class="score-card">
            <q-card-section>
              <h3 class="section-title">Graph Theory</h3>
              
              <!-- Progress Section moved to top -->
              <div class="progress-section top-progress">
                <div class="progress-header">Overall Progress</div>
                <q-linear-progress :value="graphTheoryProgress" color="red" class="custom-progress" />
                <div class="progress-percentage">{{ Math.round(graphTheoryProgress * 100) }}%</div>
              </div>
              
              <!-- Assessment List -->
              <div class="assessment-list">
                <div v-for="(item, key) in graphTheoryAssessments" :key="key" class="assessment-item">
                  <div class="assessment-label">{{ item.label }}</div>
                  <div class="assessment-score">
                    <span class="score-text">{{ item.score }}/{{ item.max }}</span>
                    <span class="percentage-badge">{{ item.percentage }}%</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Slide 7: Matrices -->
        <div class="carousel-slide">
          <q-card class="score-card">
            <q-card-section>
              <h3 class="section-title">Matrices</h3>
              
              <!-- Progress Section moved to top -->
              <div class="progress-section top-progress">
                <div class="progress-header">Overall Progress</div>
                <q-linear-progress :value="matricesProgress" color="red" class="custom-progress" />
                <div class="progress-percentage">{{ Math.round(matricesProgress * 100) }}%</div>
              </div>
              
              <!-- Assessment List -->
              <div class="assessment-list">
                <div v-for="(item, key) in matricesAssessments" :key="key" class="assessment-item">
                  <div class="assessment-label">{{ item.label }}</div>
                  <div class="assessment-score">
                    <span class="score-text">{{ item.score }}/{{ item.max }}</span>
                    <span class="percentage-badge">{{ item.percentage }}%</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Slide 8: Other Assessments -->
        <div class="carousel-slide">
          <q-card class="score-card">
            <q-card-section>
              <h3 class="section-title">Other Assessments</h3>
              
              <!-- Progress Section moved to top -->
              <div class="progress-section top-progress">
                <div class="progress-header">Assessment Progress</div>
                <q-linear-progress :value="assessmentProgress" color="red" class="custom-progress" />
                <div class="progress-percentage">{{ Math.round(assessmentProgress * 100) }}%</div>
              </div>
              
              <!-- Assessment List -->
              <div class="assessment-list">
                <div v-for="(assessment, key) in otherAssessments" :key="key" class="assessment-item">
                  <div class="assessment-label">{{ assessment.label }}</div>
                  <div class="assessment-score">
                    <span class="score-text">{{ assessment.score }}</span>
                    <span v-if="assessment.percentage" class="percentage-badge">{{ assessment.percentage }}%</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Slide Dots - Mobile Only -->
    <div class="slide-dots">
      <button 
        v-for="slide in totalSlides" 
        :key="slide"
        class="dot"
        :class="{ active: currentSlide === slide - 1 }"
        @click="goToSlide(slide - 1)"
      >
        <span class="dot-inner"></span>
      </button>
    </div>

    <!-- Reset Button -->
    <div class="reset-section">
      <q-btn label="Reset Scores" class="reset-btn" @click="resetScores" />
    </div>

    <!-- Success Banner -->
    <q-banner v-if="message" class="success-banner">
      {{ message }}
    </q-banner>

    <!-- Auto-save indicator -->
    <div v-if="isAutoSaving" class="auto-save-indicator">
      <q-spinner size="16px" color="white" />
      <span>Saving...</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch, onUnmounted } from 'vue'

export default defineComponent({
  name: 'ProgressPage',
  setup() {
    const assessmentScores = ref({})
    const message = ref('')
    const isAutoSaving = ref(false)
    const currentSlide = ref(0)
    const totalSlides = 8

    // Propositional Logic assessments
    const assessmentMap = {
      'preTest-lesson3': { label: 'Propositional Logic Pre-Test', max: 5, percentage: (score) => Math.round((score / 5) * 100) },
      'truthMastery-lesson3': { label: 'Truth Tables Mastery', max: 5, percentage: (score) => Math.round((score / 5) * 100) },
      'lawMastery-lesson3': { label: 'Laws Mastery Quiz', max: 5, percentage: (score) => Math.round((score / 5) * 100) },
      'derivedMastery-lesson3': { label: 'Derived Connectives Mastery', max: 20, percentage: (score) => Math.round((score / 20) * 100) }
    }

    // Set Theory assessments
    const setTheoryMap = {
      'setPreTest': { label: 'Set Theory Pre-Test', max: 10, percentage: (score) => Math.round((score / 10) * 100) },
      'setCardinality': { label: 'Set Cardinality & Representation', max: 10, percentage: (score) => Math.round((score / 10) * 100) },
      'singletonFiniteEmpty': { label: 'Singleton, Finite & Empty Set', max: 10, percentage: (score) => Math.round((score / 10) * 100) },
      'infiniteEqualUnequal': { label: 'Infinite Equal & Unequal Set', max: 10, percentage: (score) => Math.round((score / 10) * 100) },
      'subsetPowersetUniversal': { label: 'Subset & Superset, Powerset & Universal Set', max: 10, percentage: (score) => Math.round((score / 10) * 100) }
    }

    // Operations on Sets assessments
    const operationsSetsMap = {
      'operationsPreTest': { label: 'Operations on Sets Pre-Test', max: 10, percentage: (score) => Math.round((score / 10) * 100) },
      'operationsMastery': { label: 'Operations on Sets Mastery Quiz', max: 10, percentage: (score) => Math.round((score / 10) * 100) }
    }

    // Relations & Functions assessments
    const relationsFunctionsMap = {
      'relationsPreTest': { label: 'Relations & Functions Pre-Test', max: 10, percentage: (score) => Math.round((score / 10) * 100) },
      'relationsMastery': { label: 'Relations & Functions Mastery Quiz', max: 10, percentage: (score) => Math.round((score / 10) * 100) }
    }

    // Algorithm assessments
    const algorithmMap = {
      'algorithmPreTest': { label: 'Algorithm Pre-Test', max: 5, percentage: (score) => Math.round((score / 5) * 100) },
      'algorithmIdentificationQuiz': { label: 'Algorithm Identification Quiz', max: 5, percentage: (score) => Math.round((score / 5) * 100) },
      'simpleAlgorithmMastery': { label: 'Simple Algorithm Mastery Quiz', max: 10, percentage: (score) => Math.round((score / 10) * 100) },
      'classesSearchAlgorithmMastery': { label: 'Classes of Search Algorithm Mastery Quiz', max: 5, percentage: (score) => Math.round((score / 5) * 100) }
    }

    // Graph Theory assessments
    const graphTheoryMap = {
      'graphPreTest': { label: 'Graph Theory Pre-Test', max: 5, percentage: (score) => Math.round((score / 5) * 100) },
      'graphAlgorithmId': { label: 'Graph Mastery Quiz', max: 5, percentage: (score) => Math.round((score / 5) * 100) },
      'graphSimpleAlgo': { label: 'Types of Graph Mastery Quiz', max: 10, percentage: (score) => Math.round((score / 10) * 100) },
      'graphSearchAlgo': { label: 'Special Graph Types Mastery Quiz', max: 5, percentage: (score) => Math.round((score / 5) * 100) }
    }

    // Matrices assessments
    const matricesMap = {
      'matricesPreTest': { label: 'Matrices Pre-Test', max: 10, percentage: (score) => Math.round((score / 10) * 100) },
      'matricesMastery': { label: 'Matrices Mastery Quiz', max: 10, percentage: (score) => Math.round((score / 10) * 100) }
    }

    // Computed Propositional Logic Results
    const propositionalLogicAssessments = computed(() => {
      return Object.keys(assessmentMap).reduce((acc, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        const entry = assessmentMap[key]
        if (entry) acc[key] = { label: entry.label, score, max: entry.max, percentage: entry.percentage(score) }
        return acc
      }, {})
    })

    const propositionalLogicProgress = computed(() => {
      const totalMax = Object.keys(assessmentMap).reduce((sum, key) => sum + assessmentMap[key].max, 0)
      const achieved = Object.keys(assessmentMap).reduce((sum, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        return sum + score
      }, 0)
      return totalMax ? achieved / totalMax : 0
    })

    // Computed Set Theory Results
    const setTheoryAssessments = computed(() => {
      return Object.keys(setTheoryMap).reduce((acc, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        const entry = setTheoryMap[key]
        if (entry) acc[key] = { label: entry.label, score, max: entry.max, percentage: entry.percentage(score) }
        return acc
      }, {})
    })

    const setTheoryProgress = computed(() => {
      const totalMax = Object.keys(setTheoryMap).reduce((sum, key) => sum + setTheoryMap[key].max, 0)
      const achieved = Object.keys(setTheoryMap).reduce((sum, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        return sum + score
      }, 0)
      return totalMax ? achieved / totalMax : 0
    })

    // Computed Operations on Sets Results
    const operationsSetsAssessments = computed(() => {
      return Object.keys(operationsSetsMap).reduce((acc, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        const entry = operationsSetsMap[key]
        if (entry) acc[key] = { label: entry.label, score, max: entry.max, percentage: entry.percentage(score) }
        return acc
      }, {})
    })

    const operationsSetsProgress = computed(() => {
      const totalMax = Object.keys(operationsSetsMap).reduce((sum, key) => sum + operationsSetsMap[key].max, 0)
      const achieved = Object.keys(operationsSetsMap).reduce((sum, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        return sum + score
      }, 0)
      return totalMax ? achieved / totalMax : 0
    })

    // Computed Relations & Functions Results
    const relationsFunctionsAssessments = computed(() => {
      return Object.keys(relationsFunctionsMap).reduce((acc, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        const entry = relationsFunctionsMap[key]
        if (entry) acc[key] = { label: entry.label, score, max: entry.max, percentage: entry.percentage(score) }
        return acc
      }, {})
    })

    const relationsFunctionsProgress = computed(() => {
      const totalMax = Object.keys(relationsFunctionsMap).reduce((sum, key) => sum + relationsFunctionsMap[key].max, 0)
      const achieved = Object.keys(relationsFunctionsMap).reduce((sum, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        return sum + score
      }, 0)
      return totalMax ? achieved / totalMax : 0
    })

    // Computed Algorithm Results
    const algorithmAssessments = computed(() => {
      return Object.keys(algorithmMap).reduce((acc, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        const entry = algorithmMap[key]
        if (entry) acc[key] = { label: entry.label, score, max: entry.max, percentage: entry.percentage(score) }
        return acc
      }, {})
    })

    const algorithmProgress = computed(() => {
      const totalMax = Object.keys(algorithmMap).reduce((sum, key) => sum + algorithmMap[key].max, 0)
      const achieved = Object.keys(algorithmMap).reduce((sum, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        return sum + score
      }, 0)
      return totalMax ? achieved / totalMax : 0
    })

    // Computed Graph Theory Results
    const graphTheoryAssessments = computed(() => {
      return Object.keys(graphTheoryMap).reduce((acc, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        const entry = graphTheoryMap[key]
        if (entry) acc[key] = { label: entry.label, score, max: entry.max, percentage: entry.percentage(score) }
        return acc
      }, {})
    })

    const graphTheoryProgress = computed(() => {
      const totalMax = Object.keys(graphTheoryMap).reduce((sum, key) => sum + graphTheoryMap[key].max, 0)
      const achieved = Object.keys(graphTheoryMap).reduce((sum, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        return sum + score
      }, 0)
      return totalMax ? achieved / totalMax : 0
    })

    // Computed Matrices Results
    const matricesAssessments = computed(() => {
      return Object.keys(matricesMap).reduce((acc, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        const entry = matricesMap[key]
        if (entry) acc[key] = { label: entry.label, score, max: entry.max, percentage: entry.percentage(score) }
        return acc
      }, {})
    })

    const matricesProgress = computed(() => {
      const totalMax = Object.keys(matricesMap).reduce((sum, key) => sum + matricesMap[key].max, 0)
      const achieved = Object.keys(matricesMap).reduce((sum, key) => {
        const stored = assessmentScores.value[key]
        const score = stored && stored.score ? stored.score : (parseInt(assessmentScores.value[key]) || 0)
        return sum + score
      }, 0)
      return totalMax ? achieved / totalMax : 0
    })

    // Other assessments exclude all above, limited to first 6
    const otherAssessments = computed(() => {
      const all = Object.entries(assessmentScores.value).reduce((acc, [key, stored]) => {
        if (!assessmentMap[key] && !setTheoryMap[key] && !operationsSetsMap[key] && !relationsFunctionsMap[key] && !algorithmMap[key] && !graphTheoryMap[key] && !matricesMap[key]) {
          let score;
          let percentage = null;
          if (typeof stored === 'object' && stored !== null && stored.score !== undefined) {
            score = stored.score;
            percentage = stored.percentage || null;
          } else {
            score = parseInt(stored) || 0;
            percentage = score;
          }
          acc[key] = { label: `Assessment ${key}`, score, percentage }
        }
        return acc
      }, {})
      return Object.fromEntries(Object.entries(all).slice(0, 6))
    })

    // Computed Assessment Progress
    const assessmentProgress = computed(() => {
      const assessments = Object.values(otherAssessments.value)
      if (assessments.length === 0) return 0;
      const totalPercentage = assessments.reduce((sum, a) => sum + (a.percentage || 0), 0)
      return totalPercentage / assessments.length / 100
    })

    // Carousel Navigation
    const nextSlide = () => {
      if (currentSlide.value < totalSlides - 1) {
        currentSlide.value++
      }
    }

    const prevSlide = () => {
      if (currentSlide.value > 0) {
        currentSlide.value--
      }
    }

    const goToSlide = (index) => {
      if (index >= 0 && index < totalSlides) {
        currentSlide.value = index
      }
    }

    // Auto-save function
    const autoSaveScores = () => {
      isAutoSaving.value = true
      try {
        localStorage.setItem('assessmentScores', JSON.stringify(assessmentScores.value))
        message.value = 'Progress saved!'
        setTimeout(() => {
          message.value = ''
        }, 1500)
      } catch (error) {
        console.error('Error auto-saving scores:', error)
        message.value = 'Error saving progress.'
      } finally {
        setTimeout(() => {
          isAutoSaving.value = false
        }, 500)
      }
    }

    // Watch for score changes and auto-save
    watch(assessmentScores, () => {
      autoSaveScores()
    }, { deep: true })

    // Listen for assessment completion messages
    const handleAssessmentComplete = (event) => {
      if (event.detail && event.detail.assessmentId && event.detail.score !== undefined) {
        const { assessmentId, score } = event.detail
        assessmentScores.value[assessmentId] = { score, timestamp: new Date().toISOString() }
      }
    }

    // Listen for storage events
    const handleStorageChange = (event) => {
      if (event.key === 'assessmentScores') {
        try {
          const newScores = JSON.parse(event.newValue)
          assessmentScores.value = newScores || {}
        } catch (error) {
          console.error('Error parsing updated scores:', error)
        }
      }
    }

    // Keyboard navigation
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }

    onMounted(() => {
      // Load initial scores
      let storedData = localStorage.getItem('assessmentScores')
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          assessmentScores.value = parsed
        } catch (e) {
          console.error('Error parsing assessmentScores:', e)
          assessmentScores.value = {}
        }
      } else {
        assessmentScores.value = {}
      }
      
      // Load graph theory progress
      const savedGraph = localStorage.getItem('graphTheoryProgress')
      if (savedGraph) {
        try {
          const progress = JSON.parse(savedGraph)
          assessmentScores.value['graphPreTest'] = { score: progress.preTestScore || 0 }
          assessmentScores.value['graphAlgorithmId'] = { score: progress.identificationScore || progress.lawScore || 0 }
          assessmentScores.value['graphSimpleAlgo'] = { score: progress.simpleAlgoScore || progress.derivedScore || 0 }
          assessmentScores.value['graphSearchAlgo'] = { score: progress.searchAlgoScore || progress.searchScore || 0 }
          autoSaveScores()
        } catch (e) {
          console.error('Error parsing graphTheoryProgress:', e)
        }
      }

      // Load algorithm progress
      const savedAlgorithm = localStorage.getItem('algorithmProgress')
      if (savedAlgorithm) {
        try {
          const progress = JSON.parse(savedAlgorithm)
          assessmentScores.value['algorithmPreTest'] = { score: progress.preTestScore || 0 }
          assessmentScores.value['algorithmIdentificationQuiz'] = { score: progress.identificationQuizScore || progress.lawScore || 0 }
          assessmentScores.value['simpleAlgorithmMastery'] = { score: progress.simpleAlgorithmMasteryScore || progress.derivedScore || 0 }
          assessmentScores.value['classesSearchAlgorithmMastery'] = { score: progress.classesSearchAlgorithmMasteryScore || progress.searchScore || 0 }
          autoSaveScores()
        } catch (e) {
          console.error('Error parsing algorithmProgress:', e)
        }
      }

      // Set up event listeners
      window.addEventListener('assessmentComplete', handleAssessmentComplete)
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('keydown', handleKeyDown)
    })

    // Cleanup event listeners
    onUnmounted(() => {
      window.removeEventListener('assessmentComplete', handleAssessmentComplete)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('keydown', handleKeyDown)
    })

    const resetScores = () => {
      assessmentScores.value = {}
      localStorage.removeItem('assessmentScores')
      localStorage.removeItem('graphTheoryProgress')
      localStorage.removeItem('algorithmProgress')
      message.value = 'All scores reset!'
      setTimeout(() => message.value = '', 2000)
    }

    return {
      assessmentScores,
      propositionalLogicAssessments,
      propositionalLogicProgress,
      setTheoryAssessments,
      setTheoryProgress,
      operationsSetsAssessments,
      operationsSetsProgress,
      relationsFunctionsAssessments,
      relationsFunctionsProgress,
      algorithmAssessments,
      algorithmProgress,
      graphTheoryAssessments,
      graphTheoryProgress,
      matricesAssessments,
      matricesProgress,
      otherAssessments,
      assessmentProgress,
      resetScores,
      message,
      isAutoSaving,
      currentSlide,
      totalSlides,
      nextSlide,
      prevSlide,
      goToSlide
    }
  }
})
</script>

<style scoped>
.progress-container {
  min-height: 100vh;
  height: 100vh;
  padding: 12px;
  background: #001f3f;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.header-section {
  flex-shrink: 0;
  padding-bottom: 8px;
  text-align: center;
}

.main-title {
  color: white;
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 6px 0;
  letter-spacing: 0.3px;
}

.title-underline {
  width: 50px;
  height: 2px;
  background: white;
  margin: 0 auto 8px auto;
  border-radius: 1px;
}

/* Carousel Controls - More Compact */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;
}

.nav-btn {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  width: 32px;
  height: 32px;
  min-height: 32px;
  min-width: 32px;
  transition: all 0.2s ease;
  font-size: 14px;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.nav-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.slide-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  min-width: 40px;
}

.current-slide {
  color: white;
  font-weight: 700;
}

.total-slides {
  color: rgba(255, 255, 255, 0.6);
}

.slide-separator {
  color: rgba(255, 255, 255, 0.4);
}

/* Carousel Container - Takes most of screen */
.carousel-container {
  width: 100%;
  overflow: hidden;
  flex: 1;
  margin-bottom: 8px;
  border-radius: 8px;
  min-height: 0;
}

.carousel-track {
  display: flex;
  transition: transform 0.4s ease;
  height: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* Score Card - Perfect fit for mobile */
.score-card {
  background: teal;
  border-radius: 8px;
  box-shadow: 0 3px 15px rgba(0, 128, 128, 0.3);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}

.q-card__section {
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.section-title {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  flex-shrink: 0;
}

/* Progress Section at TOP - Very close to title */
.top-progress {
  margin: 0 0 12px 0;
  padding: 8px 0;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.top-progress .progress-header {
  color: white;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  text-align: center;
  opacity: 0.9;
}

.top-progress .custom-progress {
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.15);
  margin-bottom: 4px;
}

.top-progress .progress-percentage {
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  opacity: 0.9;
}

/* Assessment List - Takes remaining space */
.assessment-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
  padding-top: 4px;
}

.assessment-list::-webkit-scrollbar {
  width: 3px;
}

.assessment-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1.5px;
}

.assessment-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1.5px;
}

.assessment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.2s ease;
}

.assessment-item:hover {
  background: rgba(255, 255, 255, 0.12);
}

.assessment-label {
  color: white;
  font-size: 12px;
  font-weight: 500;
  flex: 1;
  padding-right: 6px;
  line-height: 1.3;
}

.assessment-score {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.score-text {
  color: white;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.percentage-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Slide Dots - Tiny for mobile */
.slide-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin: 6px 0 8px 0;
  flex-shrink: 0;
}

.dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.dot:hover {
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.dot.active {
  border-color: white;
  background: rgba(255, 255, 255, 0.08);
}

.dot-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
}

.dot.active .dot-inner {
  background: white;
  transform: scale(1.3);
}

/* Reset Button */
.reset-section {
  text-align: center;
  padding-bottom: 10px;
  flex-shrink: 0;
}

.reset-btn {
  background: #dc3545;
  color: white;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 240px;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.25);
}

.reset-btn:hover {
  background: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(220, 53, 69, 0.35);
}

/* Success Banner - Minimal */
.success-banner {
  background: #008080;
  color: white;
  margin: 8px auto 10px auto;
  border-radius: 6px;
  padding: 8px 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  animation: fadeInOut 2s ease;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
  15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
}

/* Auto-save indicator - Minimal */
.auto-save-indicator {
  position: fixed;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 128, 128, 0.85);
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media Queries for different mobile sizes */
@media (max-width: 375px) {
  /* iPhone SE, small phones */
  .progress-container {
    padding: 8px;
  }
  
  .main-title {
    font-size: 18px;
    margin-bottom: 4px;
  }
  
  .title-underline {
    width: 40px;
    margin-bottom: 6px;
  }
  
  .carousel-controls {
    gap: 12px;
    margin-bottom: 6px;
  }
  
  .nav-btn {
    width: 28px;
    height: 28px;
    min-height: 28px;
    min-width: 28px;
    font-size: 12px;
  }
  
  .slide-indicator {
    font-size: 12px;
    min-width: 35px;
  }
  
  .carousel-slide {
    padding: 4px;
  }
  
  .q-card__section {
    padding: 12px;
  }
  
  .section-title {
    font-size: 15px;
    margin-bottom: 10px;
    padding-bottom: 8px;
  }
  
  .top-progress {
    margin: 0 0 10px 0;
    padding: 6px 0;
  }
  
  .top-progress .progress-header {
    font-size: 12px;
    margin-bottom: 4px;
  }
  
  .top-progress .custom-progress {
    height: 6px;
    border-radius: 3px;
    margin-bottom: 3px;
  }
  
  .top-progress .progress-percentage {
    font-size: 11px;
  }
  
  .assessment-item {
    padding: 6px 8px;
  }
  
  .assessment-label {
    font-size: 11px;
  }
  
  .score-text {
    font-size: 12px;
  }
  
  .percentage-badge {
    padding: 1px 5px;
    font-size: 10px;
  }
  
  .dot {
    width: 24px;
    height: 24px;
  }
  
  .dot-inner {
    width: 5px;
    height: 5px;
  }
  
  .reset-btn {
    padding: 6px 16px;
    font-size: 12px;
    max-width: 200px;
  }
}

@media (min-width: 376px) and (max-width: 414px) {
  /* Most modern phones */
  .progress-container {
    padding: 10px;
  }
  
  .main-title {
    font-size: 20px;
  }
  
  .section-title {
    font-size: 17px;
  }
  
  .assessment-label {
    font-size: 13px;
  }
}

@media (min-width: 415px) and (max-width: 480px) {
  /* Larger phones */
  .progress-container {
    padding: 12px;
  }
  
  .main-title {
    font-size: 21px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .assessment-label {
    font-size: 14px;
  }
}

/* Landscape mode */
@media (orientation: landscape) and (max-height: 500px) {
  .progress-container {
    padding: 6px;
  }
  
  .header-section {
    padding-bottom: 6px;
  }
  
  .main-title {
    font-size: 16px;
    margin-bottom: 4px;
  }
  
  .title-underline {
    margin-bottom: 6px;
  }
  
  .carousel-controls {
    margin-bottom: 6px;
  }
  
  .nav-btn {
    width: 30px;
    height: 30px;
  }
  
  .slide-indicator {
    font-size: 12px;
  }
  
  .carousel-container {
    margin-bottom: 6px;
  }
  
  .slide-dots {
    margin: 4px 0 6px 0;
  }
  
  .reset-section {
    padding-bottom: 6px;
  }
  
  .top-progress .progress-header {
    font-size: 11px;
  }
  
  .assessment-label {
    font-size: 11px;
  }
}

/* Prevent text selection for better UX */
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* Allow text selection in specific areas */
.assessment-label, .score-text, .percentage-badge {
  -webkit-user-select: text;
  user-select: text;
}
</style>