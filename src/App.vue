<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <Navbar />
    <div class="app-content">
      <RouterView />
    </div>
  <AppFooter />
</template>

<style scoped>
.app-content {
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - 120px);
}
</style>