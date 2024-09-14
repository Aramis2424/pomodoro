<script setup>
import CurrentTask from './components/CurrentTask.vue'
</script>

<template>
  <div class="currentTasks">
    <CurrentTask />
  </div>
</template>

<style scoped>
.currentTasks {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 20%; 
  height: 100vh;
  border: 1px solid #000; 
}
</style>
