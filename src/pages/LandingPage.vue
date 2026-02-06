<template>
  <q-page class="landing-page">
    <!-- Background Effects -->
    <div class="math-background">
      <span v-for="symbol in mathSymbols" :key="symbol" class="floating-symbol">{{ symbol }}</span>
    </div>

    <!-- Main Content -->
    <div class="landing-container">
      <!-- Title Section -->
      <div class="title-section">
        <h1 class="main-title">Discrete Mathematics</h1>
        <p class="subtitle">Where Logic Meets Problem Solving</p>
      </div>

      <!-- Button Selection -->
      <div class="button-section">
        <h3 class="select-text">Select Your Role:</h3>
        
        <div class="buttons-container">
          <!-- Admin Button -->
          <q-btn
            color="primary"
            label="Admin"
            icon="admin_panel_settings"
            size="lg"
            class="role-btn admin-btn"
            @click="selectAdmin"
          >
            <q-tooltip>Access admin panel</q-tooltip>
          </q-btn>

          <!-- Student Button -->
          <q-btn
            color="positive"
            label="Student"
            icon="school"
            size="lg"
            class="role-btn student-btn"
            @click="selectStudent"
          >
            <q-tooltip>Access student portal</q-tooltip>
          </q-btn>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p class="footer-text">Discrete Mathematics Learning Platform</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LandingPage',
  setup() {
    const router = useRouter()
    
    // Math symbols for background
    const mathSymbols = ref(['∑', '∏', '∧', '∨', '∈', '∀', '∃', '⊂', '∪', '∩', '→', '↔'])

    // Admin selection
    const selectAdmin = () => {
      // Sa uma, pwede nimo i-redirect sa admin login
      // For now, redirect sa existing login with admin flag
      localStorage.setItem('isAdmin', 'true')
      localStorage.removeItem('isStudent') // Clear student if exists
      router.push('/login')
    }

    // Student selection
    const selectStudent = () => {
      // Set as student and go to login
      localStorage.setItem('isStudent', 'true')
      localStorage.removeItem('isAdmin') // Clear admin if exists
      router.push('/login')
    }

    return {
      mathSymbols,
      selectAdmin,
      selectStudent
    }
  }
})
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0b5f62 0%, #031e1f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

/* Math Background Effects */
.math-background {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-symbol {
  position: absolute;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.1);
  animation: float 20s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Position symbols randomly */
.floating-symbol:nth-child(1) { left: 10%; animation-duration: 25s; animation-delay: 0s; }
.floating-symbol:nth-child(2) { left: 20%; animation-duration: 30s; animation-delay: 2s; }
.floating-symbol:nth-child(3) { left: 30%; animation-duration: 22s; animation-delay: 4s; }
.floating-symbol:nth-child(4) { left: 40%; animation-duration: 28s; animation-delay: 1s; }
.floating-symbol:nth-child(5) { left: 50%; animation-duration: 26s; animation-delay: 3s; }
.floating-symbol:nth-child(6) { left: 60%; animation-duration: 24s; animation-delay: 5s; }
.floating-symbol:nth-child(7) { left: 70%; animation-duration: 29s; animation-delay: 2.5s; }
.floating-symbol:nth-child(8) { left: 80%; animation-duration: 27s; animation-delay: 4.5s; }
.floating-symbol:nth-child(9) { left: 90%; animation-duration: 23s; animation-delay: 6s; }
.floating-symbol:nth-child(10) { left: 15%; animation-duration: 31s; animation-delay: 1.5s; }
.floating-symbol:nth-child(11) { left: 25%; animation-duration: 26s; animation-delay: 3.5s; }
.floating-symbol:nth-child(12) { left: 35%; animation-duration: 28s; animation-delay: 7s; }

/* Main Container */
.landing-container {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 2rem;
}

/* Title Section */
.title-section {
  margin-bottom: 3rem;
}

.main-title {
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #4dd0ff, #c77dff, #ff47b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(199, 125, 255, 0.3);
  animation: titleGlow 3s infinite alternate;
}

@keyframes titleGlow {
  0% { text-shadow: 0 0 10px rgba(199, 125, 255, 0.3); }
  100% { text-shadow: 0 0 30px rgba(199, 125, 255, 0.6); }
}

.subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
}

/* Button Section */
.button-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.select-text {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: white;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.role-btn {
  min-width: 180px;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.role-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.admin-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.student-btn {
  background: linear-gradient(135deg, #11998e, #38ef7d);
}

/* Footer */
.footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 600px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .buttons-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .role-btn {
    width: 100%;
  }
}
</style>