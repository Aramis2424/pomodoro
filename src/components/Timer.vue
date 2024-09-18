<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { requestNotificationPermission, showNotification } from './notification'

const emit = defineEmits(['increment'])

const getWorkTime = () => {
  return 25 * 60 * 1000
}

const getRelaxTime = () => {
  return 5 * 60 * 1000
}

const duration = ref(getWorkTime())
const elapsed = ref(0)

let startTime
let pauseTime

let isActive = ref(false)
let isModeWork = ref(true)

let handle // timer animation
const audio = new Audio('./bell.mp3');

const worker = new Worker('./timerWorker.js');
const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    worker.postMessage({ type: 'stop' });
  } else {
      if (isActive.value)
        worker.postMessage({ type: 'start', cnt: elapsed.value });
  }
};
onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
  handleVisibilityChange();
});
onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});

worker.onmessage = function(event) {
  const { type, counter } = event.data;
  if (type === 'tick') {
    elapsed.value = counter;
    document.title = `Pomodoro ${getTime.value}`;
    if (elapsed.value >= duration.value) {
        worker.postMessage({ type: 'reset' });
        whenTimeout()
    }
  }
};

const initSystem = () => {
  startTime = performance.now()
  pauseTime = 0
  isActive.value = false
  isModeWork.value = true
  duration.value = getWorkTime()
}

const getTime = computed(() => {
  const totalSeconds = duration.value / 1000 - Math.floor(elapsed.value / 1000) // обратный счет
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const update = () => {
  elapsed.value = performance.now() - startTime
  document.title = `Pomodoro ${getTime.value}`;
  if (elapsed.value >= duration.value) {
    whenTimeout()
  } else {
    handle = requestAnimationFrame(update)
  }
}

const whenTimeout = () => {
  if (isModeWork.value)
    emit("increment")
  isActive.value = false
  cancelAnimationFrame(handle)
  audio.play();
  showNotification()
  changeMode()
  start()
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

onUnmounted(() => {
  cancelAnimationFrame(handle)
})

const changeColor = () => {
  let rose = 'var(--vt-c-darkrose)'
  let teal = 'var(--vt-c-teal)'
  if (isModeWork.value === true) {
    document.body.style.backgroundColor = rose
  } else {
    document.body.style.backgroundColor = teal
  }
}

const changeMode = () => {
  stop()
  if (isModeWork.value === true) {
    isModeWork.value = false
    duration.value = getRelaxTime()
  } else {
    isModeWork.value = true
    duration.value = getWorkTime()
  }
  changeColor()
}

initSystem()
requestNotificationPermission()
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
    </div>
  </div>

  <div class="btns-container">
    <div class="btnMode">
        <button class="btn" @click="changeMode">Смена режима</button>
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
    grid-template-rows: repeat(2, 80px);   
    gap: 10px;
    justify-content: center;
    align-items: center;
}
.btnMode {
    display: grid;
    grid-template-columns: repeat(1, 200px); 
    grid-template-rows: repeat(1, 90px);   
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
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
    font-size: 250%;
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
