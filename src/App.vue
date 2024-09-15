<script setup>
import { ref } from 'vue'
import CurrentTask from './components/CurrentTask.vue'
import DoneTask from './components/DoneTask.vue'

const doneTodo = ref({})
const updateDoneTasks = ((data) => {
  doneTodo.value = data
})
</script>

<template>
  <div class="currentTasks">
    <CurrentTask @send-data="updateDoneTasks" />
  </div>
  <div class="doneTasks">
    <DoneTask :todo="doneTodo" />
  </div>
</template>

<style scoped>
.currentTasks {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 20%; 
  height: 100vh;
  border-right: 1px solid #000; 
}

.doneTasks {
  position: absolute; 
  top: 0; 
  right: 0; 
  width: 20%; 
  height: 100vh;
  border-left: 1px solid #000; 
}
</style>
