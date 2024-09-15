<script setup>
import { ref, onUnmounted, computed } from 'vue'
const duration = ref(1 * 2 * 1000)
const elapsed = ref(0)

let startTime
let pauseTime = 0
let handle
let isActive = ref(false)

const getTime = computed(() => {
  const totalSeconds = duration.value / 1000 - Math.floor(elapsed.value / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const update = () => {
  elapsed.value = performance.now() - startTime
  if (elapsed.value >= duration.value) {
    changeColor()
    isActive.value = false
    cancelAnimationFrame(handle)
  } else {
    handle = requestAnimationFrame(update)
  }
}

const reset = () => {
  elapsed.value = 0
  pauseTime = 0
  cancelAnimationFrame(handle)
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

//reset()

onUnmounted(() => {
  cancelAnimationFrame(handle)
})

const changeColor = () => {
  let rose = 'var(--vt-c-darkrose)'
  let teal = 'var(--vt-c-teal)'
  let curColor = document.body.style.backgroundColor
  let newColor = curColor === rose ? teal : rose
  document.body.style.backgroundColor = newColor
}

changeColor()
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
        <button class="btn" @click="stop"  :disabled="!isActive">Стоп</button>
        <button class="btn" @click="reset" :disabled="isActive">Сброс</button>
        <!-- <button class="btn">Смена режима</button> -->
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
    grid-template-columns: repeat(2, 100px); 
    grid-template-rows: repeat(2, 100px);   
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
