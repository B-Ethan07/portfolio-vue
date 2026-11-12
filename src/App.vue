<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Navbar from './components/Navbar.vue'
import AppFooter from './components/AppFooter.vue'
import StarField from './components/StarField.vue'
import BootScreen from './components/BootScreen.vue'
import { useSound } from '@/composables/useSound'

const booting = ref(!sessionStorage.getItem('booted'))
const { click } = useSound()

function onClick(e: MouseEvent) {
  const el = e.target as HTMLElement
  if (el.closest('a, button') && !el.closest('.term')) click()
}

onMounted(() => document.addEventListener('click', onClick))
onBeforeUnmount(() => document.removeEventListener('click', onClick))
</script>

<template>
  <BootScreen v-if="booting" @done="booting = false" />
  <StarField />
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