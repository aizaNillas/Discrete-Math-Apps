<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleDrawer" class="q-mr-sm" />
        <q-toolbar-title>{{ currentTitle }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- ✅ Drawer Section -->
    <q-drawer v-model="drawerOpen" :width="200" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <!-- 📚 Add Lessons for Admin -->
        <q-item v-if="isAdmin" clickable v-ripple :active="route.path === '/admin'" active-class="bg-red-1" @click="$router.push('/admin')">
          <q-item-section avatar>
            <q-icon name="admin_panel_settings" />
          </q-item-section>
          <q-item-section>Add Lessons</q-item-section>
        </q-item>

        <!-- 🏠 Home -->
        <q-item clickable v-ripple :active="route.path === '/main/home'" active-class="bg-red-1" @click="$router.push('/main/home')">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <!-- 📚 Lessons -->
        <q-item clickable v-ripple :active="route.path.startsWith('/main/lessons')" active-class="bg-red-1" @click="$router.push('/main/lessons')">
          <q-item-section avatar>
            <q-icon name="menu_book" />
          </q-item-section>
          <q-item-section>Lessons</q-item-section>
        </q-item>

        <!-- 📝 Assessments -->
        <q-item clickable v-ripple :active="route.path === '/main/assessments'" active-class="bg-red-1" @click="$router.push('/main/assessments')">
          <q-item-section avatar>
            <q-icon name="library_books" />
          </q-item-section>
          <q-item-section>Assessments</q-item-section>
        </q-item>

        <!-- 📊 Progress -->
        <q-item clickable v-ripple :active="route.path === '/main/progress'" active-class="bg-red-1" @click="$router.push('/main/progress')">
          <q-item-section avatar>
            <q-icon name="bar_chart" />
          </q-item-section>
          <q-item-section>Progress</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- ✅ Page Container for Routing -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const route = useRoute();
    const drawerOpen = ref(false);
    const isAdmin = ref(false);
    const isStudent = ref(false);

    // ✅ Dynamic Title Based on Route
    const currentTitle = computed(() => {
      if (route.path === '/admin' && isAdmin.value) return 'Add Lessons';
      if (route.path === '/main/home') {
        return isStudent.value ? 'Dashboard' : 'Home';
      }
      if (route.path.startsWith('/main/lessons')) return 'Lesson';
      if (route.path === '/main/assessments') return 'Assessment';
      if (route.path === '/main/progress') return 'Progress';
      return 'Lesson';
    });

    // ✅ Check User Role on Page Load
    onMounted(() => {
      isAdmin.value = localStorage.getItem("isAdmin") === "true";
      isStudent.value = localStorage.getItem("isStudent") === "true";
    });

    // ✅ Toggle Drawer
    const toggleDrawer = () => {
      drawerOpen.value = !drawerOpen.value;
    };

    return {
      route,
      drawerOpen,
      toggleDrawer,
      isAdmin,
      isStudent,
      currentTitle,
    };
  },
});
</script>

<style scoped>
/* ✅ Reduce drawer width for mobile */
@media (max-width: 600px) {
  .q-drawer {
    width: 180px !important;
  }
}

/* ✅ Adjust toolbar for mobile */
@media (max-width: 400px) {
  .q-toolbar-title {
    font-size: 16px;
  }
}

/* ✅ Side indicator for active items (red border) */
:deep(.q-item--active) {
  border-left: 4px solid red !important;
}
</style>
