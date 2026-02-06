// src/composables/useAuth.js
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
    const router = useRouter()
    const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null)
    const users = ref(JSON.parse(localStorage.getItem('users')) || [])

    // Register new user
    const register = (userData) => {
        // Check if user already exists
        const existingUser = users.value.find(user => 
            user.username === userData.username
        )
        
        if (existingUser) {
            throw new Error('Username already exists')
        }
        
        // Create new user object
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        }
        
        // Save to users array
        users.value.push(newUser)
        localStorage.setItem('users', JSON.stringify(users.value))
        
        // Auto-login after registration
        currentUser.value = newUser
        localStorage.setItem('currentUser', JSON.stringify(newUser))
        
        return newUser
    }

    // Login user
    const login = (username, password) => {
        const user = users.value.find(user => 
            user.username === username && 
            user.password === password
        )
        
        if (!user) {
            throw new Error('Invalid username or password')
        }
        
        currentUser.value = user
        localStorage.setItem('currentUser', JSON.stringify(user))
        return user
    }

    // Logout user
    const logout = () => {
        currentUser.value = null
        localStorage.removeItem('currentUser')
        router.push('/login')
    }

    // Check if user is authenticated
    const isAuthenticated = computed(() => !!currentUser.value)

    // Get current user info
    const getUser = () => currentUser.value

    return {
        currentUser,
        users,
        register,
        login,
        logout,
        isAuthenticated,
        getUser
    }
}