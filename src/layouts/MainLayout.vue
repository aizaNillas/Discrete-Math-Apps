<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="#0b5f62  text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleDrawer" class="q-mr-sm" />
        <q-toolbar-title class="custom-toolbar-title">{{ currentTitle }}</q-toolbar-title>
        
        <q-space />
        <div v-if="isLoggedIn" class="logout-section">
          <span class="user-info q-mr-sm" v-if="userFullName">
            {{ userFullName }}
          </span>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" :width="200" show-if-above bordered content-class="drawer-bg">
      <q-list>

        <q-item v-if="isAdmin" clickable v-ripple :active="route.path === '/admin'" active-class="drawer-active" @click="$router.push('/admin')">
          <q-item-section avatar><q-icon name="admin_panel_settings" /></q-item-section>
          <q-item-section>Add Lessons</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="route.path === '/main/home'" active-class="drawer-active" @click="$router.push('/main/home')">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="route.path.startsWith('/main/lessons')" active-class="drawer-active" @click="$router.push('/main/lessons')">
          <q-item-section avatar><q-icon name="menu_book" /></q-item-section>
          <q-item-section>Lessons</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="route.path === '/main/assessments'" active-class="drawer-active" @click="$router.push('/main/assessments')">
          <q-item-section avatar><q-icon name="library_books" /></q-item-section>
          <q-item-section>Assessments</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="route.path === '/main/progress'" active-class="drawer-active" @click="$router.push('/main/progress')">
          <q-item-section avatar><q-icon name="bar_chart" /></q-item-section>
          <q-item-section>Progress</q-item-section>
        </q-item>
        
        <q-separator class="q-mt-md separator-style" />
        
        <q-item clickable v-ripple @click="showLogoutConfirm = true" class="logout-drawer-item" v-if="isLoggedIn">
          <q-item-section avatar><q-icon name="logout" /></q-item-section>
          <q-item-section><q-item-label>Logout</q-item-label></q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- ✅ LOGOUT CONFIRMATION DIALOG -->
    <q-dialog v-model="showLogoutConfirm" persistent>
      <q-card class="logout-confirm-card">
        <q-card-section class="row items-center">
          <q-avatar icon="logout" color="primary" text-color="white" />
          <span class="q-ml-sm"><strong>Are you sure you want to log out?</strong></span>
        </q-card-section>

        <q-card-section class="confirm-message">
          <p>You will be redirected to the login page.</p>
          <p v-if="currentUser?.fullName" class="user-logout-name">
           <strong> Logging out: </strong><strong>{{ currentUser.fullName }}</strong>
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn 
            flat 
            label="Cancel" 
            color="grey-7" 
            @click="showLogoutConfirm = false" 
            v-close-popup
          />
          <q-btn 
            flat 
            label="Yes, Logout" 
            color="negative" 
            @click="confirmLogout" 
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const drawerOpen = ref(false);
    const showLogoutConfirm = ref(false); // ✅ New: logout confirmation dialog
    const isAdmin = ref(false);
    const isStudent = ref(false);
    const currentUser = ref(null);

    const isLoggedIn = computed(() => isAdmin.value || isStudent.value || currentUser.value);

    const userFullName = computed(() => {
      if (currentUser.value?.fullName) return currentUser.value.fullName;
      if (isAdmin.value) return "Admin";
      if (isStudent.value) return "Student";
      return "";
    });

    const currentTitle = computed(() => {
      if (route.path === '/admin' && isAdmin.value) return 'Add Lessons';
      if (route.path === '/main/home') return isStudent.value ? 'Dashboard' : 'Home';
      if (route.path.startsWith('/main/lessons')) return 'Lesson';
      if (route.path === '/main/assessments') return 'Assessment';
      if (route.path === '/main/progress') return 'Progress';
      return 'Lesson';
    });

    const loadUserData = () => {
      isAdmin.value = localStorage.getItem("isAdmin") === "true";
      isStudent.value = localStorage.getItem("isStudent") === "true";
      const userData = localStorage.getItem("currentUser");
      if (userData) {
        try { currentUser.value = JSON.parse(userData); }
        catch { localStorage.removeItem("currentUser"); }
      }
    };

    // ✅ New: Confirmed logout function
    const confirmLogout = () => {
      // Clear all authentication data
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isStudent");
      localStorage.removeItem("currentUser");
      
      // Reset states
      isAdmin.value = false;
      isStudent.value = false;
      currentUser.value = null;
      drawerOpen.value = false;
      
      // Show success message (optional)
      console.log("User logged out successfully");
      
      // Redirect to landing page
      router.push("/");
      
      // Optional: Show Quasar notification
      // import { useQuasar } from 'quasar';
      // const $q = useQuasar();
      // $q.notify({
      //   message: 'Logged out successfully',
      //   color: 'positive',
      //   icon: 'check',
      //   position: 'top',
      //   timeout: 2000
      // });
    };

    onMounted(loadUserData);
    const toggleDrawer = () => drawerOpen.value = !drawerOpen.value;

    return { 
      route, 
      drawerOpen, 
      showLogoutConfirm, // ✅ Expose for template
      toggleDrawer, 
      isAdmin, 
      isStudent, 
      currentUser, 
      isLoggedIn, 
      userFullName, 
      currentTitle, 
      confirmLogout // ✅ New function
    };
  },
});
</script>

<style scoped>
/* MAIN THEME */
.q-header,
.drawer-bg,
.q-drawer,
.q-drawer .q-item,
.logout-drawer-item,
.q-toolbar,
.q-list {
  background-color: #0b5f62 !important;
  color: white !important;
}

/* ICONS */
.q-icon { color: white !important; }

/* 🔥 ACTIVE MENU = BLACK */
.drawer-active {
  background-color: black !important;
  color: white !important;
}

/* HOVER stays theme */
.q-item:hover {
  background-color: #0b5f62 !important;
}

/* Separator */
.separator-style {
  background: rgba(255,255,255,0.3);
}

.user-info {
  font-size: 0.9rem;
  font-weight: 500;
}

/* ✅ HEADER TITLE STYLES - PREVENT TEXT CUTTING */
.custom-toolbar-title {
  font-size: 1rem; /* Smaller font size */
  font-weight: 500;
  white-space: nowrap; /* Prevent wrapping */
  overflow: visible; /* Allow text to be fully visible */
  text-overflow: clip; /* Don't show ellipsis */
  max-width: 100%; /* Ensure it doesn't overflow container */
  padding-right: 8px; /* Add some padding to prevent cutting */
}

/* Ensure the toolbar can accommodate longer titles */
.q-toolbar {
  min-height: 50px;
  padding-left: 12px;
  padding-right: 12px;
}

@media (max-width: 600px) {
  .q-drawer { width: 180px !important; }
  
  /* ✅ Adjust header title for mobile */
  .custom-toolbar-title {
    font-size: 0.9rem; /* Even smaller on mobile */
    max-width: 180px; /* Limit width on mobile */
  }
  
  /* Adjust user info on mobile */
  .user-info {
    font-size: 0.8rem;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/* ✅ LOGOUT CONFIRMATION DIALOG STYLES */
.logout-confirm-card {
  min-width: 300px;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.logout-confirm-card .q-card-section:first-child {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
  
}

.confirm-message {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
}

.confirm-message p {
  margin: 8px 0;
}

.user-logout-name {
  background: #f5f5f5;
  padding: 8px 12px;
  border-radius: 5px;
  margin-top: 12px !important;
  border-left: 4px solid #0b5f62;
}

.q-card-actions {
  padding: 16px;
  border-top: 1px solid #e0e0e0;
}
</style>