<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['send-data'])

// выдаем всем todo уникальные id
let id = 0

const newTodo = ref('')
const newCost = ref(0)

const todos = ref([
  { id: id++, text: 'Составить список задач', cost: 0.5 }
])

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, cost: newCost.value })
  newTodo.value = ''
  newCost.value = 0
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
  emit('send-data', todo)
}
</script>

<template>
    <header>
        Текущие задачи:
    </header>

    <form @submit.prevent="addTodo">
        <input v-model="newTodo" required placeholder="Описание">

        <span>
            <label for="cost-select">Цена:</label>
            <select id="cost-select" required v-model="newCost">
            <option :value="0.5">0.5</option>
            <option v-for="n in 25" :key="n" :value="n">{{ n }}</option>
            </select>
        </span>

        <button>Добавить задачу</button>
  </form>

  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ ` ${todo.text}, ${todo.cost}` }}
      <button @click="removeTodo(todo)">Сделано</button>
    </li>
  </ul>
</template>

<style scoped>
input, button, select {
    border-radius: 20px;
}

form {
  display: flex;         
  flex-direction: column; 
}

form > * {
  margin-bottom: 7px;   
}

span {
    display: inline-flex;
    gap: 10px;
}

ul {
    margin-top: 20px;
}

header {
    font-size: large;
    margin-bottom: 15px;
}

</style>
