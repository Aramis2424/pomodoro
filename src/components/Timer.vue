<script setup>
import { ref, onUnmounted, computed } from 'vue'
const duration = ref(2 * 60 * 1000)
const elapsed = ref(0)
const strTime = ref("")

let startTime
let handle

const getTime = computed(() => {
  return `${(elapsed.value / 1000 / 60).toFixed(0)}:${(elapsed.value / 1000 % 60).toFixed(0)}`
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
  update()
}

const stop = () => {
  elapsed.value = 0
  cancelAnimationFrame(handle)
}

const pause = () => {
  startTime = performance.now()
  cancelAnimationFrame(handle)
}

const start = () => {
  elapsed.value = startTime
  handle = requestAnimationFrame(update)
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
        <button class="btn" @click="start">Старт</button>
        <button class="btn" @click="pause">Пауза</button>
        <button class="btn" @click="stop">Стоп</button>
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
