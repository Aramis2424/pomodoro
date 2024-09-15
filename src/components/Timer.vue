<script setup>
import { ref, onUnmounted, computed } from 'vue'
const duration = ref(2 * 60 * 1000)
const elapsed = ref(0)

let startTime = performance.now()
let pauseTime = 0
let handle
let isActive = ref(false)

const getTime = computed(() => {
  return `${(elapsed.value / 1000 / 60).toFixed(0).padStart(2, '0')}:${(elapsed.value / 1000 % 59).toFixed(0).padStart(2, '0')}`
})

const update = () => {
  elapsed.value = performance.now() - startTime
  if (elapsed.value >= duration.value) {
    cancelAnimationFrame(handle)
  } else {
    handle = requestAnimationFrame(update)
  }
}

const reset = () => {
  elapsed.value = 0
  startTime = performance.now()
  isActive.value = true
  update()
}

const stop = () => {
  elapsed.value = 0
  isActive.value = false
  cancelAnimationFrame(handle)
}

const pause = () => {
  pauseTime = performance.now() - startTime
  isActive.value = false
  cancelAnimationFrame(handle)
}

const start = () => {
  startTime = performance.now() - pauseTime
  pauseTime = 0
  isActive.value = true
  update()
}

const progressRate = computed(() =>
  Math.min(elapsed.value / duration.value, 1)
)

reset()

onUnmounted(() => {
  cancelAnimationFrame(handle)
})
</script>

<template>
  <div class="timer">{{ getTime }}</div>
  <div class="timerbar">
    <progress :value="progressRate"></progress>
  </div>

  <div class="btns-container">
    <div class="btns">
        <button class="btn" @click="start" :disabled="isActive">Старт</button>
        <button class="btn" @click="pause" :disabled="!isActive">Пауза</button>
        <!-- <button class="btn" @click="stop"  :disabled="!isActive">Стоп</button> -->
        <button class="btn" @click="reset">Сброс</button>
    </div>
  </div>

</template>

<style scoped>
.btns-container {
  display: flex;
  justify-content: center;   
  align-items: center;      
  margin: 0;
}
.btns {
    display: grid;
    grid-template-columns: repeat(3, 100px); 
    grid-template-rows: repeat(1, 100px);   
    gap: 10px;
    justify-content: center;
    align-items: center;
}
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #afdbe0;
    color: black;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    width: 100%;
    height: 100%;
}
.btn:active {
  background-color: #a8bfc2; /* Цвет темнее при нажатии */
}
.btn:disabled {
  background-color: #848c8d;
}
.timerbar {
    display: flex;
    justify-content: center;
    align-items: center; 
    font-size: 40pt;
}
.timer {
    font-size: 100pt;
    display: flex;
    justify-content: center;
    align-items: center; 
}
.elapsed-container {
  width: 300px;
}

.elapsed-bar {
  background-color: red;
  height: 10px;
}
</style>
