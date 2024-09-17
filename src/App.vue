<script setup>
import { ref } from 'vue'
import CurrentTask from './components/CurrentTask.vue'
import DoneTask from './components/DoneTask.vue'
import Timer from './components/Timer.vue'

const doneTodo = ref({})
const updateDoneTasks = ((data) => {
  doneTodo.value = data
})

const cntTomatos = ref(0)
const incTomatos = () => {
  cntTomatos.value++
}
</script>

<template>
  <div class="currentTasks">
    <CurrentTask @send-data="updateDoneTasks" />
  </div>
  <div class="doneTasks">
    <DoneTask :todo="doneTodo" />
  </div>
  <div class="timer">
    <Timer @increment="incTomatos" />
  </div>
  <div class="counter">
    Всего помидоров: {{ cntTomatos }}
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

.timer {
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
}

.counter {
  position: absolute;
  bottom: 3%;
  left: 90%;
}
</style>
