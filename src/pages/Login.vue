<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <h5><strong>Sign up Here!</strong></h5>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              v-model="form.username" 
              required
              placeholder="Enter your username"
            />
          </div>

          <div class="form-group password-group">
            <label for="password">Password</label>
            <div class="password-input-wrapper">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="form.password" 
                required
                placeholder="Enter your password"
              />
              <button 
                type="button" 
                class="password-toggle" 
                @click="togglePasswordVisibility"
                tabindex="-1"
              >
                <svg 
                  v-if="showPassword" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
                <svg 
                  v-else 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            
            <!-- ✅ FORGOT PASSWORD LINK MOVED TO LEFT SIDE -->
            <div class="forgot-password-link left-align">
              <a href="#" @click.prevent="handleForgotPassword">Forgot Password?</a>
            </div>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button type="submit" class="login-btn" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>

          <p class="register-link">
            Don't have an account? 
            <router-link to="/register">Register here</router-link>
          </p>
        </form>
      </div>
    </div>

    <!-- ✅ FORGOT PASSWORD MODAL -->
    <q-dialog v-model="showForgotPasswordModal" persistent>
      <q-card class="forgot-password-modal">
        <q-card-section class="row items-center">
          <q-avatar icon="key" color="primary" text-color="white" />
          <span class="q-ml-sm text-h6">Forgot Password</span>
        </q-card-section>

        <q-card-section>
          <div class="forgot-instructions">
            <p>Enter your username to see your existing password:</p>
          </div>
          
          <div class="form-group">
            <label for="forgotUsername">Username</label>
            <input 
              type="text" 
              id="forgotUsername" 
              v-model="forgotForm.username" 
              required
              placeholder="Enter your username"
              class="forgot-input"
            />
          </div>

          <div v-if="forgotError" class="error-message forgot-error">
            {{ forgotError }}
          </div>

          <div v-if="foundPassword" class="password-result">
            <div class="result-header">
              <q-icon name="check_circle" color="positive" size="24px" />
              <span>Password Found!</span>
            </div>
            <div class="password-display">
              <strong>Username:</strong> {{ foundUser.username }}<br>
              <strong>Password:</strong> 
              <span class="password-value">{{ foundUser.password }}</span>
              <button 
                type="button" 
                class="copy-btn" 
                @click="copyToClipboard"
                title="Copy to clipboard"
              >
                <q-icon name="content_copy" size="16px" />
              </button>
            </div>
            <div v-if="foundUser.fullName" class="user-details">
              <strong>Full Name:</strong> {{ foundUser.fullName }}<br>
              <strong>Course:</strong> {{ foundUser.course }}<br>
              <strong>Section:</strong> {{ foundUser.section }}
            </div>
            
            <!-- ✅ GO TO LOGIN BUTTON ADDED BELOW USER DETAILS -->
            <div class="go-to-login-btn-container">
              <button 
                type="button" 
                class="go-to-login-btn"
                @click="closeAndRedirectToLogin"
              >
                Go to Login
              </button>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn 
            flat 
            label="Close" 
            color="grey-7" 
            @click="closeForgotPasswordModal" 
            v-close-popup
          />
          <q-btn 
            flat 
            label="Find Password" 
            color="primary" 
            @click="findPassword" 
            :disabled="!forgotForm.username"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const $q = useQuasar()
const { login } = useAuth()

// Login form
const form = ref({
  username: '',
  password: ''
})
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

// Forgot password modal
const showForgotPasswordModal = ref(false)
const forgotForm = ref({
  username: ''
})
const forgotError = ref('')
const foundPassword = ref(false)
const foundUser = ref(null)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Handle forgot password click
const handleForgotPassword = () => {
  showForgotPasswordModal.value = true
  forgotForm.value.username = ''
  forgotError.value = ''
  foundPassword.value = false
  foundUser.value = null
}

// Close forgot password modal and redirect to login
const closeAndRedirectToLogin = () => {
  showForgotPasswordModal.value = false
  forgotForm.value.username = ''
  forgotError.value = ''
  foundPassword.value = false
  foundUser.value = null
  
  // Focus on username field when returning to login
  setTimeout(() => {
    const usernameInput = document.getElementById('username')
    if (usernameInput) {
      usernameInput.focus()
    }
  }, 100)
}

// Close forgot password modal
const closeForgotPasswordModal = () => {
  showForgotPasswordModal.value = false
  forgotForm.value.username = ''
  forgotError.value = ''
  foundPassword.value = false
  foundUser.value = null
}

// Find password
const findPassword = () => {
  forgotError.value = ''
  foundPassword.value = false
  foundUser.value = null
  
  if (!forgotForm.value.username.trim()) {
    forgotError.value = 'Please enter your username'
    return
  }
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.username === forgotForm.value.username)
  
  if (user) {
    foundUser.value = { ...user }
    foundPassword.value = true
    
    // Show success notification
    $q.notify({
      message: 'Password found successfully!',
      color: 'positive',
      icon: 'check_circle',
      position: 'top',
      timeout: 2000
    })
  } else {
    forgotError.value = 'Username not found. Please check your username.'
    
    // Show error notification
    $q.notify({
      message: 'Username not found',
      color: 'negative',
      icon: 'warning',
      position: 'top',
      timeout: 3000
    })
  }
}

// Copy password to clipboard
const copyToClipboard = () => {
  if (foundUser.value?.password) {
    navigator.clipboard.writeText(foundUser.value.password)
      .then(() => {
        $q.notify({
          message: 'Password copied to clipboard!',
          color: 'positive',
          icon: 'content_copy',
          position: 'top',
          timeout: 2000
        })
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }
}

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  
  try {
    await login(form.value.username, form.value.password)
    router.push('/main/home')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* EXISTING STYLES - NO CHANGES */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top left, #086070, #086070, #2b2e4a);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-card {
  background: rgba(180, 175, 175, 0.95);
  backdrop-filter: blur(12px);
  padding: 2.2rem;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 0.6s ease;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 1.2rem;
}

.password-group {
  position: relative;
}

.password-input-wrapper {
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  color: #444;
  font-weight: 600;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.85rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f9f9ff;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #105ab5;
  box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.15);
  background: white;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  color: #105ab5;
  background: rgba(0, 0, 0, 0.05);
}

.password-toggle:active {
  transform: translateY(-50%) scale(0.95);
}

.password-toggle svg {
  display: block;
}

/* ✅ FORGOT PASSWORD LINK - MOVED TO LEFT SIDE */
.forgot-password-link {
  margin-top: 0.5rem;
  text-align: left; /* Changed from right to left */
}

.forgot-password-link.left-align {
  text-align: left !important;
}

.forgot-password-link a {
  color: #105ab5;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-block; /* Ensures it stays on left */
}

.forgot-password-link a:hover {
  color: #0d4a8c;
  text-decoration: underline;
}

.error-message {
  color: #e74c3c;
  background: #fdecea;
  padding: 0.8rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-size: 0.9rem;
  border-left: 4px solid #e74c3c;
}

.login-btn {
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(135deg, #0f9a21, #118d48);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.35);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(102, 126, 234, 0.45);
}

.login-btn:active {
  transform: scale(0.98);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.register-link {
  text-align: center;
  margin-top: 1.2rem;
  color: #555;
  font-size: 0.9rem;
}

.register-link a {
  color: #0d0e0e;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #161220;
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ✅ FORGOT PASSWORD MODAL STYLES */
.forgot-password-modal {
  min-width: 400px;
  max-width: 500px;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.forgot-password-modal .q-card-section:first-child {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
}

.forgot-instructions {
  color: #555;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.forgot-input {
  width: 100%;
  padding: 0.85rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.forgot-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  outline: none;
}

.forgot-error {
  margin: 1rem 0;
}

.password-result {
  background: #f0f7ff;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 5px solid #4CAF50;
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
  color: #2E7D32;
  font-weight: bold;
  font-size: 1.1rem;
}

.password-display {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  border: 1px solid #e0e0e0;
  position: relative;
  line-height: 1.8;
}

.password-value {
  color: #d32f2f;
  font-weight: bold;
  font-size: 1.1rem;
  font-family: monospace;
  background: #fff5f5;
  padding: 2px 8px;
  border-radius: 4px;
  margin: 0 5px;
}

.copy-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: #5a67d8;
  transform: translateY(-50%) scale(1.05);
}

.copy-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.user-details {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid #e0e0e0;
  line-height: 1.8;
  color: #555;
}

.q-card-actions {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

/* ✅ NEW STYLES FOR GO TO LOGIN BUTTON */
.go-to-login-btn-container {
  margin-top: 1.5rem;
  text-align: center;
}

.go-to-login-btn {
  width: 100%;
  padding: 6px;
  border-radius: 8px;
  background: linear-gradient(135deg, #0f9a21, #118d48);
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(15, 154, 33, 0.3);
}

.go-to-login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 154, 33, 0.4);
}

.go-to-login-btn:active {
  transform: scale(0.98);
}

/* Responsive */
@media (max-width: 600px) {
  .forgot-password-modal {
    min-width: 90vw;
    margin: 10px;
  }
}
</style>