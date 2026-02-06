<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <h2>Create Account</h2>
        <form @submit.prevent="handleRegister">
          <!-- Full Name -->
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              v-model="form.fullName" 
              required
              placeholder="Enter your full name"
            />
          </div>

          <!-- Course -->
          <div class="form-group">
            <label for="course">Course</label>
            <input 
              type="text" 
              id="course" 
              v-model="form.course" 
              required
              placeholder=" Enter your course e.g., BSIT"
            />
          </div>

          <!-- Section -->
          <div class="form-group">
            <label for="section">Section</label>
            <input 
              type="text" 
              id="section" 
              v-model="form.section" 
              required
              placeholder="Enter your section e.g., BSIT 1-A"
            />
          </div>

          <!-- Username -->
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              v-model="form.username" 
              required
              placeholder="Choose a username"
            />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="form.password" 
              required
              placeholder="Create a password"
              minlength="6"
            />
          </div>

          <!-- Confirm Password -->
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="confirmPassword" 
              required
              placeholder="Confirm your password"
            />
          </div>

          <!-- Error/Success Messages -->
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          <div v-if="success" class="success-message">
            {{ success }}
          </div>

          <!-- Submit Button -->
          <button type="submit" class="register-btn" :disabled="loading">
            {{ loading ? 'Creating Account...' : 'Sign Up' }}
          </button>

          <!-- Login Link -->
          <p class="login-link">
            Already have an account? 
            <router-link to="/login">Login here</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { register } = useAuth()

const form = ref({
  fullName: '',
  course: '',
  section: '',
  username: '',
  password: ''
})
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleRegister = async () => {
  // Reset messages
  error.value = ''
  success.value = ''
  
  // Validate passwords match
  if (form.value.password !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  
  // Validate password length
  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }
  
  loading.value = true
  
  try {
    await register(form.value)
    success.value = 'Account created successfully! Redirecting...'
    
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/main/home')
    }, 2000)
    
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Mobile-first responsive design */
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#086070, #086070, #2b2e4a);
  padding: 16px;
  box-sizing: border-box;
}

.register-container {
  width: 100%;
  max-width: 400px;
  padding: 0 16px;
}

.register-card {
  background: rgba(180, 175, 175, 0.95);
  padding: 24px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(111, 110, 110, 0.1);
  width: 100%;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 24px;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.3;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #555;
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.4;
}

input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #514d4d;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  height: 48px;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Mobile-specific input adjustments */
@media (max-width: 480px) {
  input {
    padding: 12px 14px;
    font-size: 16px; /* Prevents zoom on iOS */
    height: 44px;
  }
}

.error-message {
  color: #e74c3c;
  background: #fdeded;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 16px 0;
  font-size: 0.9rem;
  line-height: 1.4;
  border-left: 4px solid #e74c3c;
}

.success-message {
  color: #27ae60;
  background: #edf7ed;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 16px 0;
  font-size: 0.9rem;
  line-height: 1.4;
  border-left: 4px solid #27ae60;
}

.register-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #138c3d 0%, #12972b 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  transition: all 0.2s ease;
  height: 52px;
  box-sizing: border-box;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(19, 140, 61, 0.3);
}

.register-btn:active:not(:disabled) {
  transform: translateY(0);
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Mobile-specific button adjustments */
@media (max-width: 480px) {
  .register-btn {
    padding: 14px;
    height: 48px;
    font-size: 1.05rem;
  }
}

.login-link {
  text-align: center;
  margin-top: 24px;
  color: #080707;
  font-size: 0.95rem;
  line-height: 1.5;
}

.login-link a {
  color: #0e0e10;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
  margin-left: 4px;
}

.login-link a:hover {
  color: #667eea;
  text-decoration: underline;
}

/* Additional responsive breakpoints */
@media (max-width: 360px) {
  .register-card {
    padding: 20px 16px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 14px;
  }
  
  input {
    padding: 10px 12px;
    height: 42px;
  }
  
  .register-btn {
    padding: 12px;
    height: 46px;
  }
}

/* Prevent landscape mode issues */
@media (max-height: 500px) and (orientation: landscape) {
  .register-page {
    padding: 8px;
    align-items: flex-start;
  }
  
  .register-container {
    margin-top: 8px;
  }
  
  .register-card {
    padding: 16px 14px;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  input {
    padding: 8px 10px;
    height: 40px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .register-btn,
  input {
    transition: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  input {
    border-width: 2px;
  }
  
  .error-message,
  .success-message {
    border-width: 2px;
  }
}

/* Safe area insets for notched devices */
@supports (padding: max(0px)) {
  .register-page {
    padding-left: max(16px, env(safe-area-inset-left));
    padding-right: max(16px, env(safe-area-inset-right));
    padding-top: max(16px, env(safe-area-inset-top));
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
}
</style>