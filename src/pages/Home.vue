```vue
<template>
  <q-page class="q-pa-md custom-page">
    <div class="content-wrapper">
      <!-- ✅ Welcome Message with Bigger Text and Color -->
      <h5 class="welcome-text q-mb-md">
        WELCOME, STUDENTS<span class="highlighted-text">{{ userName.toUpperCase() }}</span>!
      </h5>

      <!-- ✅ Start Button with Green Color -->
      <q-btn
        color="green-5"
        label="Let's Start"
        to="/main/lessons"
        icon="play_arrow"
        size="lg"
        class="custom-btn q-mt-md"
      />

      <!-- ✅ Discrete Mathematics Text (Replaces Image) -->
      <div class="custom-math-text rounded-borders q-mt-xl">
        <h2 class="text-h4 gradient-text">Discrete Mathematics</h2>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "HomePage",

  setup() {
    const userName = ref("Student"); // Default Name

    // ✅ Get Logged-in Username
    onMounted(() => {
      userName.value =
        localStorage.getItem("studentName") ||
        (localStorage.getItem("isAdmin") === "true" ? "Admin" : "Student");
    });

    return {
      userName,
    };
  },
});
</script>

<style scoped>
/* ✅ Background Gradient + Image */
.custom-page {
  background: url('/images/bc03.webp') no-repeat center center fixed;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 🔥 Neon Floating Box Background for Discrete Mathematics */
.custom-math-text {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.55);
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.25);
  margin-bottom: 20px;
  animation: floatBox 4s ease-in-out infinite;
}

/* Floating Animation */
@keyframes floatBox {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

/* 🎨 Gradient Text for Discrete Mathematics */
.gradient-text {
  background: linear-gradient(90deg, #ff47b3, #c77dff, #4dd0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-family: Arial, sans-serif;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  animation: slideInFromLeft 1.2s ease-out;
}

/* Slide-In Animation */
@keyframes slideInFromLeft {
  0% { transform: translateX(-120%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

/* Content Wrapper */
.content-wrapper {
  max-width: 600px;
  width: 100%;
}

/* 🎉 Futuristic Neon Button */
.custom-btn {
  width: 200px;
  padding: 12px;
  border-radius: 8px;
  color: white;
  background: #4caf50;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  animation: buttonPulse 2s infinite ease-in-out;
  border: none;
  cursor: pointer;
  font-family: Arial, sans-serif;
}

/* Button Pulse Glow */
@keyframes buttonPulse {
  0% { box-shadow: 0 0 10px rgba(0,255,0,0.5); }
  50% { box-shadow: 0 0 25px rgba(124,255,124,0.8); }
  100% { box-shadow: 0 0 10px rgba(0,255,0,0.5); }
}

/* Blue Glow On Hover */
.custom-btn:hover {
  transform: scale(1.12);
  background: #5ed95e;
}

/* Blue Outer Glow On Hover */
.custom-btn::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #00eaff, #4af6ff);
  z-index: -1;
  opacity: 0;
  filter: blur(12px);
  transition: 0.3s;
}

.custom-btn:hover::before {
  opacity: 1;
}

/* 🌟 NEW: Welcome Text with Pink-Purple-Navy Gradient + Glow */
.welcome-text {
  font-size: 2.5rem;
  font-weight: bold;
  font-family: Arial, sans-serif;

  /* New Gradient Color */
  background: linear-gradient(90deg, #ff4da6, #b14dff, #3b3bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Neon Glow Effect */
  text-shadow: 0 0 20px rgba(255, 0, 128, 0.6),
               0 0 40px rgba(136, 0, 255, 0.6);

  /* Animations */
  animation: welcomeGlow 3s infinite alternate ease-in-out,
             fadeGrow 1.5s ease-out;
}

/* Glow Animation */
@keyframes welcomeGlow {
  0% { text-shadow: 0 0 10px rgba(255, 0, 128, 0.5); }
  100% { text-shadow: 0 0 35px rgba(170, 0, 255, 1); }
}

/* Fade + Scale on Load */
@keyframes fadeGrow {
  0% { opacity: 0; transform: scale(0.7); }
  100% { opacity: 1; transform: scale(1); }
}

/* Gradient Highlight Name */
.highlighted-text {
  background: linear-gradient(90deg, #ff4da6, #c04dff, #6a62ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Mobile-specific: Hide highlighted-text on mobile */
@media (max-width: 599px) {
  .highlighted-text {
    display: none;
  }
}
</style>
```