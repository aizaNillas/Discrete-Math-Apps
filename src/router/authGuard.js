// router/authGuard.js (RECOMMENDED VERSION)

export const authGuard = (to, from, next) => {
    // Check all possible login states
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    const isStudent = localStorage.getItem('isStudent') === 'true'
    const userData = localStorage.getItem('currentUser')
    const isRegistered = userData && userData !== 'null' && userData !== 'undefined' && userData !== ''
    
    const isLoggedIn = isAdmin || isStudent || isRegistered
    
    // If route requires auth but user not logged in
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login')
    }
    // If user logged in but trying to access login/register
    else if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
        next('/main/home')
    }
    // All good
    else {
        next()
    }
}