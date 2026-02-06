<template>
  <q-page class="q-pa-md custom-page">
    <div class="content-wrapper">

      <!-- 🌧️ RANDOM FALLING DISCRETE MATH SYMBOLS (6 ONLY) -->
      <div class="math-symbols">
        <span>∑</span>
        <span>∏</span>
        <span>∧</span>
        <span>∨</span>
        <span>∈</span>
        <span>∀</span>
      </div>

      <!-- ✅ Discrete Mathematics (ANIMATED) -->
      <h2
        class="text-h4 gradient-text q-mb-xl animated-title"
        style="font-size: 3.2rem; margin-bottom: 12px;"
      >
        Discrete Mathematics
      </h2>

      <!-- ✅ Start Button -->
      <q-btn
        color="green-5"
        label="Let's Start"
        to="/main/lessons"
        icon="play_arrow"
        size="lg"
        class="custom-btn q-mt-md"
        style="margin-top: 8px;"
      />

      <!-- ✅ Welcome Message with User Name -->
      <div
        class="custom-math-text rounded-borders q-mt-xl"
        style="padding: 12px 16px; max-width: 420px; margin-top: 14px;"
      >
        <h5 class="welcome-text animated-welcome">
          {{ welcomeMessage }}
        </h5>
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";

export default defineComponent({
  name: "HomePage",
  setup() {
    // User data
    const currentUser = ref(null);
    const isAdmin = ref(false);
    const isStudent = ref(false);

    // Load user data from localStorage
    const loadUserData = () => {
      // Check for registered user
      const userData = localStorage.getItem("currentUser");
      if (userData) {
        try {
          currentUser.value = JSON.parse(userData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("currentUser");
        }
      }
      
      // Check for admin/student
      isAdmin.value = localStorage.getItem("isAdmin") === "true";
      isStudent.value = localStorage.getItem("isStudent") === "true";
    };

    // Welcome message based on user type
    const welcomeMessage = computed(() => {
      if (currentUser.value && currentUser.value.fullName) {
        return `WELCOME ${currentUser.value.fullName.toUpperCase()}`;
      } else if (currentUser.value && currentUser.value.username) {
        return `WELCOME ${currentUser.value.username.toUpperCase()}`;
      } else if (isAdmin.value) {
        return "WELCOME ADMIN";
      } else if (isStudent.value) {
        return "WELCOME STUDENT";
      } else {
        return "WELCOME STUDENTS";
      }
    });

    // Load user data on component mount
    onMounted(() => {
      loadUserData();
    });

    return {
      welcomeMessage
    };
  },
});
</script>

<style scoped>
/* 🌧️ RANDOM FALLING SYMBOLS (6 ONLY) */
.math-symbols {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.math-symbols span {
  position: absolute;
  top: -15%;
  font-size: 3rem; /* Bigger symbols */
  color: rgba(255, 255, 255, 0.35);
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* Positioning 6 symbols horizontally */
.math-symbols span:nth-child(1) { left: 10%;  animation-duration: 9s;  animation-delay: 0s; }
.math-symbols span:nth-child(2) { left: 25%;  animation-duration: 11s; animation-delay: 2s; }
.math-symbols span:nth-child(3) { left: 40%;  animation-duration: 10s; animation-delay: 4s; }
.math-symbols span:nth-child(4) { left: 55%;  animation-duration: 12s; animation-delay: 1s; }
.math-symbols span:nth-child(5) { left: 70%;  animation-duration: 8s;  animation-delay: 3s; }
.math-symbols span:nth-child(6) { left: 85%;  animation-duration: 10s; animation-delay: 5s; }

@keyframes fall {
  0%   { transform: translateY(-20%) rotate(0deg); opacity: 0; }
  15%  { opacity: 1; }
  100% { transform: translateY(120vh) rotate(360deg); opacity: 0; }
}

/* KEEP CONTENT ABOVE SYMBOLS */
.content-wrapper {
  position: relative;
  z-index: 1;
}

/* ================= EXISTING STYLES ================= */

.custom-page {
  background: url("/images/bc03.webp") no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.custom-math-text {
  background: rgba(0, 0, 0, 0.45);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.25);
}

.gradient-text {
  background: linear-gradient(90deg, #ff47b3, #c77dff, #4dd0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

/* 🎨 Discrete Mathematics ANIMATION (floating + subtle glow) */
.animated-title {
  animation: floatTitle 4s ease-in-out infinite, glowTitle 2s ease-in-out infinite alternate;
}

@keyframes floatTitle {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}

@keyframes glowTitle {
  0% { text-shadow: 0 0 10px rgba(255,255,255,0.4); }
  100% { text-shadow: 0 0 25px rgba(255,255,255,0.6); }
}

.custom-btn {
  width: 200px;
  padding: 18px;
  border-radius: 8px;
  font-weight: bold;
  animation: buttonPulse 2s infinite;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

@keyframes buttonPulse {
  0% { box-shadow: 0 0 10px rgba(0,255,0,0.4); }
  50% { box-shadow: 0 0 25px rgba(0,255,0,0.7); }
  100% { box-shadow: 0 0 10px rgba(0,255,0,0.4); }
}

/* 🎓 WELCOME MESSAGE ANIMATION */
.animated-welcome {
  display: inline-block;
  animation: wavePop 1.2s ease-out, waveTilt 2s ease-in-out infinite;
}

@keyframes wavePop {
  0% { transform: scale(0.6); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes waveTilt {
  0% { transform: rotate(-5deg); }
  25% { transform: rotate(3deg); }
  50% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
}

.welcome-text {
  font-size: 2.4rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff4da6, #b14dff, #3b3bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(170,0,255,0.5);
}
</style>